// `npm run dev`: starts the API and the website together in one terminal,
// with each line labelled [api] or [web]. Ctrl+C stops both completely.
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const APPS = [
  { label: "api", color: 34, workspace: "@urban-hive/api" }, // blue
  { label: "web", color: 35, workspace: "@urban-hive/web" }, // magenta
];

// npm sets npm_execpath to its own script when running `npm run`, so npm can be
// started through Node directly, without depending on a shell or the PATH.
const npmCli = process.env.npm_execpath;

function start({ label, color, workspace }) {
  const args = ["run", "dev", "-w", workspace];
  // Keep colours when output is piped through this script, unless the terminal opted out.
  const env = process.env.NO_COLOR ? process.env : { ...process.env, FORCE_COLOR: "1" };
  const options = { env };
  const child = npmCli
    ? spawn(process.execPath, [npmCli, ...args], options)
    : spawn("npm", args, { ...options, shell: true });

  const prefix = `\x1b[${color}m[${label}]\x1b[0m `;
  for (const [stream, out] of [
    [child.stdout, process.stdout],
    [child.stderr, process.stderr],
  ]) {
    let pending = "";
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => {
      const lines = (pending + chunk).split(/\r?\n/);
      pending = lines.pop();
      for (const line of lines) out.write(prefix + line + "\n");
    });
  }
  child.on("exit", (code) => {
    process.stdout.write(`${prefix}stopped${code ? ` (exit code ${code})` : ""}\n`);
  });
  return child;
}

const children = APPS.map(start);

/** Stops a child and everything it started (npm → node --watch → server). */
function stopTree(child) {
  if (child.exitCode !== null || child.pid === undefined) return;
  if (process.platform === "win32") {
    const taskkill = path.join(process.env.SystemRoot ?? "C:\\Windows", "System32", "taskkill.exe");
    spawnSync(taskkill, ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

function shutdown() {
  children.forEach(stopTree);
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

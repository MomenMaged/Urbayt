import { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { adminApi, errorMessage } from "./api";

export default function LoginPage({ onLogin }: { onLogin: (email: string) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async ({ email, password }: { email: string; password: string }) => {
    setSubmitting(true);
    setError(null);
    try {
      const admin = await adminApi.login(email, password);
      onLogin(admin.email);
    } catch (err) {
      setError(errorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="uh-admin-login">
      <motion.div
        className="uh-admin-login__box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/Logo1.png" alt="Urban Hive" className="uh-admin-login__logo" />
        <div className="uh-admin-login__card">
          <h1>Admin sign in</h1>
          <p>Manage listings and photos on the website.</p>
          {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
          <Form layout="vertical" size="large" requiredMark={false} onFinish={submit}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter your email" }]}>
              <Input prefix={<MailOutlined />} autoComplete="username" autoFocus />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter your password" }]}>
              <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={submitting}>
              Sign in
            </Button>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}

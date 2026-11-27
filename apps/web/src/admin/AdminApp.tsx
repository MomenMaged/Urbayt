import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { App as AntApp, ConfigProvider, Spin } from "antd";
import { adminApi, LOGOUT_EVENT, tokenStore } from "./api";
import { SessionContext } from "./session";
import LoginPage from "./LoginPage";
import AdminLayout from "./AdminLayout";
import ListingsPage from "./ListingsPage";
import ListingEditor from "./ListingEditor";
import GalleryPage from "./GalleryPage";
import "./admin.css";

const theme = {
  token: {
    colorPrimary: "#133848",
    colorLink: "#CE8A39",
    colorLinkHover: "#133848",
    borderRadius: 10,
    fontFamily: "'Circe', Arial, Helvetica, sans-serif",
  },
  components: {
    Layout: { siderBg: "#133848", headerBg: "#ffffff", bodyBg: "#f6f1e8" },
    Menu: {
      darkItemBg: "#133848",
      darkItemSelectedBg: "#CE8A39",
      darkItemColor: "rgba(255,255,255,0.8)",
      darkItemHoverColor: "#ffffff",
    },
  },
};

type AuthState = { status: "checking" } | { status: "signed-out" } | { status: "signed-in"; email: string };

export default function AdminApp() {
  const [auth, setAuth] = useState<AuthState>(() =>
    tokenStore.get() ? { status: "checking" } : { status: "signed-out" },
  );

  // Confirm a saved session is still valid.
  useEffect(() => {
    if (auth.status !== "checking") return;
    adminApi
      .me()
      .then((admin) => setAuth({ status: "signed-in", email: admin.email }))
      .catch(() => {
        tokenStore.clear();
        setAuth({ status: "signed-out" });
      });
  }, [auth.status]);

  // Any request that comes back 401 signs the admin out.
  useEffect(() => {
    const onLogout = () => setAuth({ status: "signed-out" });
    window.addEventListener(LOGOUT_EVENT, onLogout);
    return () => window.removeEventListener(LOGOUT_EVENT, onLogout);
  }, []);

  useEffect(() => {
    document.title = "Admin | Urban Hive";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => {
      document.title = "Urban Hive";
      robots.remove();
    };
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setAuth({ status: "signed-out" });
  }, []);

  const session = useMemo(
    () => (auth.status === "signed-in" ? { email: auth.email, logout } : null),
    [auth, logout],
  );

  return (
    <ConfigProvider theme={theme}>
      <AntApp>
        {auth.status === "checking" ? (
          <div className="uh-admin-loading">
            <Spin size="large" />
          </div>
        ) : !session ? (
          <Routes>
            <Route path="login" element={<LoginPage onLogin={(email) => setAuth({ status: "signed-in", email })} />} />
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        ) : (
          <SessionContext.Provider value={session}>
            <Routes>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="listings" replace />} />
                <Route path="listings" element={<ListingsPage />} />
                <Route path="listings/new" element={<ListingEditor />} />
                <Route path="listings/:id" element={<ListingEditor />} />
                <Route path="gallery" element={<GalleryPage />} />
              </Route>
              <Route path="login" element={<Navigate to="/admin/listings" replace />} />
              <Route path="*" element={<Navigate to="/admin/listings" replace />} />
            </Routes>
          </SessionContext.Provider>
        )}
      </AntApp>
    </ConfigProvider>
  );
}

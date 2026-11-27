import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Header_app from "./Header/Header_app";
import Body from "./Body/Body";
import Cards from "./Cards/Cards";
import Partner from "./Partner/Partner";
import ContactUs from "./ContactUs/ContactUs";
import WhatsAppButton from "./Whatsapp/Whatsapp";
import ListingPage from "./pages/ListingPage/ListingPage";
import NotFound from "./components/NotFound";
import ScrollProgress from "./components/ScrollProgress";
import { EASE } from "./components/Motion";

// The admin panel is a separate bundle, so visitors never download it.
const AdminApp = lazy(() => import("./admin/AdminApp"));

function PublicSite() {
  const location = useLocation();

  return (
    <div className="uh-public">
      <ScrollProgress />
      <Header_app />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Routes location={location}>
            <Route path="/" element={<Body />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/madinaty" element={<ListingPage slug="madinaty" />} />
            <Route path="/sokhna" element={<ListingPage slug="sokhna" />} />
            <Route path="/cfc" element={<ListingPage slug="cairo-festival-city" />} />
            <Route path="/listings/:slug" element={<ListingPage />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}

const App = () => (
  // Respect the visitor's "reduce motion" system setting everywhere.
  <MotionConfig reducedMotion="user">
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  </MotionConfig>
);

export default App;

import {
  Layout,
} from "antd";
import Header_app from "./Header/Header_app";
import Body from "./Body/Body";
import {  Route, Routes, useLocation } from "react-router-dom";
import Second_Caro from "./Second_Caro/Second_Caro";
import Cards from "./Cards/Cards";
import Listing from "./Listing/Listing";
import Partner from "./Partner/Partner";
import ContactUs from "./ContactUs/ContactUs";
import WhatsAppButton from "./Whatsapp/Whatsapp";

import Coming_soon from "./Coming_soon/Coming_soon";
import { AnimatePresence, motion } from "framer-motion";


const App = () => {
  const location = useLocation();

  return (
    <Layout style={{ backgroundColor: "#E2CAA2" }}>
      <Header_app />

      <AnimatePresence mode="wait">
        <motion.div
   key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ width: "100%" }}
>

          <Routes location={location}>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<Second_Caro />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/madinaty" element={<Listing />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cfc" element={<Coming_soon />} />
            <Route path="/sokhna" element={<Coming_soon />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <WhatsAppButton />
    </Layout>
  );
};


export default App;

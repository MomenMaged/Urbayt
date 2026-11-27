import { WhatsAppOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { whatsappLink } from "../data/format";
import "./Whatsapp.css";

const WhatsAppButton = () => (
  <motion.a
    href={whatsappLink()}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-button"
    aria-label="Chat with us on WhatsApp"
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
  >
    <WhatsAppOutlined style={{ fontSize: "30px", color: "white" }} />
    <span className="whatsapp-button__label">Chat with us</span>
  </motion.a>
);

export default WhatsAppButton;

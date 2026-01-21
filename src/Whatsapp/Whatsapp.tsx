// src/components/WhatsAppButton/WhatsAppButton.jsx
import { WhatsAppOutlined } from "@ant-design/icons";
import "./Whatsapp.css";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const phoneNumber = "01065399999960600"; // Replace with your number
  const message = "Hello! I’d like to know more about your services."; // optional message

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }} // starts hidden, small & lower
      animate={{ opacity: 1, scale: 1, y: 0 }} // slides up, grows to normal size
      transition={{ duration: 0.8, ease: "easeOut" }} // smooth entrance
    >
      <div className="whatsapp-button" onClick={handleClick}>
        <WhatsAppOutlined style={{ fontSize: "30px", color: "white" }} />
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;

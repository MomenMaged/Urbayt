// src/components/WhatsAppButton/WhatsAppButton.jsx
import { WhatsAppOutlined } from "@ant-design/icons";
import "./Whatsapp.css";

const WhatsAppButton = () => {
  const phoneNumber = "01065399999960600"; // 👈 Replace with your number (no '+' or spaces)
  const message = "Hello! I’d like to know more about your services."; // optional message

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <WhatsAppOutlined style={{ fontSize: "30px", color: "white" }} />
    </div>
  );
};

export default WhatsAppButton;

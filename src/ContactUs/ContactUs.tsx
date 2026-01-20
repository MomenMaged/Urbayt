import {
  Alert,
  Button,
  ConfigProvider,
  Flex,
  Grid,
  Input,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import "./ContactUS.css";
import { useEffect, useState } from "react";
import Emaill from "../Emaill/Emaill";
import emailjs from "@emailjs/browser";


const { useBreakpoint } = Grid;

const ContactUs = () => {
  const screens = useBreakpoint();

  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  // Touched for validation
  const [touched, setTouched] = useState(false);
  const [Emailtouched, setEmailTouched] = useState(false);
  const [Reasontouched, setReasonTouched] = useState(false);

  // Alert status: success | error | null
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  // Validation errors
  const hasNameError = touched && name.trim() === "";
  const hasEmailError = Emailtouched && email.trim() === "";
  const hasReasonError = Reasontouched && reason.trim() === "";

  // Auto-hide alerts after 3 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setTouched(true);

  if (name.trim() === "" || email.trim() === "" || reason.trim() === "") {
    setSubmitStatus("error");
    return;
  }

  const templateParams = {
    fullName: name,
    email: email,
    phone: phone,
    reason: reason,
    message: message,
  };

  try {
    await emailjs.send(
      "service_02w47lb",     // 🔁 your service ID
      "template_wjprpoi",    // 🔁 your template ID
      templateParams,
      "tznqbnFJhkrknzyS_"       // 🔁 your public key
    );

    setSubmitStatus("success");
    setName("");
    setEmail("");
    setPhone("");
    setReason("");
    setMessage("");
    setTouched(false);
  } catch (error) {
    console.error(error);
    setSubmitStatus("error");
  }
};


  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#133848",
            defaultHoverBg: "#CE8A39",
            ghostBg: "transparent",
            defaultActiveBg: "#CE8A39",
            defaultHoverBorderColor: "transparent",
            defaultHoverColor: "transparent",
            defaultBorderColor: "transparent",
            colorBgLayout: "black",
            defaultActiveBorderColor: "transparent",
          },
        },
      }}
    >
      <div>
        <Flex vertical={!screens.lg} style={{ marginBottom: "4rem" }}>
          <div className={screens.lg ? "Image5" : "Image6"}>
            <img
              className="second-image5"
              alt="cover"
              src="/Contact_Us.jpeg"
            />
          </div>

          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Flex
              vertical
              gap={20}
              style={{
                padding: "2.5rem 3rem",
                backgroundColor: "white",
                width: "100%",
                boxShadow: "inset 0 2px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "#292A2B",
                  fontFamily: "sans-serif",
                }}
              >
                Contact us
              </p>

              {/* Name */}
              <Input
                size="large"
                name="fullName"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                status={hasNameError ? "error" : ""}
              />

              {/* Email & Phone */}
              <Flex gap={10}>
                <Input
                  size="large"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  status={hasEmailError ? "error" : ""}
                />
                <Input
                  size="large"
                  name="phone"
                  placeholder="Number (+20)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Flex>

              {/* Reason */}
              <Input
                size="large"
                name="Reason"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onBlur={() => setReasonTouched(true)}
                status={hasReasonError ? "error" : ""}
              />

              {/* Message */}
              <TextArea
                name="message"
                placeholder="Message"
                autoSize={{ minRows: 4 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* Alerts */}
              {/* {submitStatus === "success" && (
                <Alert
                  message="Success"
                  description="Your message has been sent successfully."
                  type="success"
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}
              {submitStatus === "error" && (
                <Alert
                  message="Error"
                  description="Please fill all required fields or try again."
                  type="error"
                  showIcon
                  style={{
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    width:'50%'
  }}
  closable
                  
                 
                />
              )} */}
              {submitStatus && (
    <Alert
      message={submitStatus === "success" ? "Success" : "Error"}
      description={
        submitStatus === "success"
          ? "Your message has been sent successfully."
          : "Please fill all required fields or try again."
      }
      type={submitStatus}
      showIcon
      closable
       style={{
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    width:'50%'
  }}
    />
  )}

              {/* Submit button */}
              <Button size="large" htmlType="submit" style={{ color: "white" }}>
                Send message
              </Button>
            </Flex>
          </form>
        </Flex>

        {/* Email component */}
        <Emaill />
      </div>
    </ConfigProvider>
  );
};

export default ContactUs;

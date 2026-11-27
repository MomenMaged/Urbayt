import { useState } from "react";
import { ConfigProvider, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleFilled, EnvironmentFilled, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaArrowRight } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Emaill from "../Emaill/Emaill";
import { EASE, MaskReveal, Reveal } from "../components/Motion";
import SmartImage from "../components/SmartImage";
import { CONTACT } from "../data/site";
import "./ContactUS.css";

// EmailJS identifiers (public by design: they're used from the browser).
const EMAILJS_SERVICE = "service_02w47lb";
const EMAILJS_TEMPLATE = "template_wjprpoi";
const EMAILJS_PUBLIC_KEY = "tznqbnFJhkrknzyS_";

interface ContactForm {
  fullName: string;
  email: string;
  phone?: string;
  reason: string;
  message?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

const ContactUs = () => {
  const [form] = Form.useForm<ContactForm>();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (values: ContactForm) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone ?? "",
          reason: values.reason,
          message: values.message ?? "",
        },
        EMAILJS_PUBLIC_KEY,
      );
      form.resetFields();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#133848", borderRadius: 12, controlHeightLG: 50, fontSize: 15 },
      }}
    >
      <div>
        <section className="uh-container uh-contact">
          <MaskReveal className="uh-contact__media">
            <SmartImage src="/Contact_Us.jpeg" alt="UrbanHive" eager />
            <div className="uh-contact__info">
              <a href={CONTACT.phoneHref}>
                <PhoneOutlined /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                <MailOutlined /> {CONTACT.email}
              </a>
              <span>
                <EnvironmentFilled /> {CONTACT.address}
              </span>
            </div>
          </MaskReveal>

          <Reveal delay={0.15} className="uh-contact__card">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  className="uh-contact__sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <CheckCircleFilled className="uh-contact__check" />
                  <h2 className="uh-title">Thank you!</h2>
                  <p className="uh-lead">Your message has been sent successfully. We’ll be in touch soon.</p>
                  <button type="button" className="uh-btn uh-btn--outline" onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="uh-eyebrow">Contact us</p>
                  <h1 className="uh-title">We’d love to hear from you.</h1>

                  <Form form={form} layout="vertical" size="large" requiredMark={false} onFinish={handleSubmit}>
                    <Form.Item name="fullName" label="Full name" rules={[{ required: true, whitespace: true, message: "Please enter your name" }]}>
                      <Input placeholder="Full name" autoComplete="name" />
                    </Form.Item>
                    <div className="uh-contact__row">
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: "Please enter your email" },
                          { type: "email", message: "That doesn’t look like an email address" },
                        ]}
                      >
                        <Input placeholder="Email" autoComplete="email" />
                      </Form.Item>
                      <Form.Item name="phone" label="Phone">
                        <Input placeholder="Number (+20)" autoComplete="tel" />
                      </Form.Item>
                    </div>
                    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true, message: "Please tell us why you’re reaching out" }]}>
                      <Input placeholder="Reason" />
                    </Form.Item>
                    <Form.Item name="message" label="Message">
                      <Input.TextArea placeholder="Message" autoSize={{ minRows: 4 }} />
                    </Form.Item>

                    {status === "error" && (
                      <p className="uh-contact__error" role="alert">
                        Something went wrong sending your message. Please try again, or reach us on WhatsApp.
                      </p>
                    )}

                    <button type="submit" className="uh-btn uh-btn--primary uh-btn--block" disabled={status === "sending"}>
                      {status === "sending" ? "Sending…" : "Send message"} <FaArrowRight />
                    </button>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </section>

        <Emaill />
      </div>
    </ConfigProvider>
  );
};

export default ContactUs;

import { useState } from "react";
import type { CollapseProps } from "antd";
import BrandCollapse from "../components/BrandCollapse";
import { Reveal } from "../components/Motion";
import "./FAQ.css";

const items: CollapseProps["items"] = [
  {
    key: "5",
    label: "What amenities are provided?",
    children: (
      <ul>
        <li>Cooking essentials and toiletries.</li>
        <li>Hotel-grade necessities (sugar, tea, coffee, tissue paper).</li>
        <li>Cleaning once per week.</li>
      </ul>
    ),
  },
  {
    key: "8",
    label: "Is WIFI internet available and reliable?",
    children: (
      <ul>
        <li>Yes, WiFi is available at all spaces.</li>
        <li>We frequently test connections to ensure reliability.</li>
      </ul>
    ),
  },
  {
    key: "2",
    label: "Can I stay with my fiancé/Boyfriend/Girlfriend?",
    children: (
      <ul>
        <li>Following Egyptian law, if any of the couple holds an Arab passport, a marriage certificate is required.</li>
        <li>If either person is Egyptian or Arab, they must submit an official marriage proof — “Orfi” or unofficial documents are not accepted.</li>
        <li>Non-Arab passport holders may stay together without the need for a marriage certificate.</li>
      </ul>
    ),
  },
  {
    key: "16",
    label: "What is your cancellation policy?",
    children: (
      <ul>
        <li>Full refund if cancelled within 48 hours of booking and check-in is at least 14 days away.</li>
        <li>50% refund if cancelled at least 7 days before check-in.</li>
        <li>No refund for cancellations within 7 days of check-in.</li>
      </ul>
    ),
  },
  {
    key: "19",
    label: "Are visits allowed?",
    children: (
      <ul>
        <li>For Arab guests, visitors are allowed only if of the same gender.</li>
        <li>Mixed-gender visitors must be 1st or 2nd degree relatives.</li>
        <li>Otherwise, meetings must take place in public areas.</li>
      </ul>
    ),
  },
];

const INITIAL_COUNT = 4;

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="uh-section uh-container uh-faq">
      <Reveal className="uh-faq__intro">
        <p className="uh-eyebrow">Good to know</p>
        <h2 className="uh-title">FAQS</h2>
        <p className="uh-lead">
          Everything you need to know before you arrive. Can’t find your answer? Message us on WhatsApp.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="uh-faq__list">
        <BrandCollapse items={showAll ? items : items?.slice(0, INITIAL_COUNT)} />
        <button
          type="button"
          className="uh-btn uh-btn--primary uh-faq__toggle"
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? "Show less" : "Show all"}
        </button>
      </Reveal>
    </section>
  );
};

export default FAQ;

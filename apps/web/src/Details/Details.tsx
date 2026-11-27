import type { CollapseProps } from "antd";
import BrandCollapse from "../components/BrandCollapse";
import { MaskReveal, Reveal } from "../components/Motion";
import SmartImage from "../components/SmartImage";
import "./Details.css";

const perks = (
  <ul>
    <li>24/7 CONCIERGE</li>
    <li>DEDICATED ON PROPERTY SECURITY</li>
    <li>BUSINESS LOUNGE</li>
  </ul>
);

const items: CollapseProps["items"] = [
  { key: "1", label: "2BR APARTHOTEL | MADINATY", children: perks },
  { key: "2", label: "3BR POOL/SEA VIEW | BLUMAR", children: perks },
  { key: "3", label: "2BR GARDEN VIEW | CFC", children: perks },
];

const Details = () => (
  <section className="uh-section uh-container uh-details">
    <MaskReveal className="uh-details__media">
      <SmartImage src="/Details.jpeg" alt="UrbanHive interior" className="uh-details__img" />
    </MaskReveal>

    <Reveal delay={0.15} className="uh-details__text">
      <p className="uh-eyebrow">The UrbanHive standard</p>
      <h2 className="uh-title">WHERE EVERY DETAIL ELEVATES THE EXPERIENCE.</h2>
      <BrandCollapse items={items} />
    </Reveal>
  </section>
);

export default Details;

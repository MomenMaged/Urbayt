import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Emaill from "../Emaill/Emaill";
import { EASE, MaskReveal, Reveal, Stagger, StaggerItem } from "../components/Motion";
import SmartImage from "../components/SmartImage";
import { openExternal } from "../data/format";
import { PARTNER_FORM_URL } from "../data/site";
import "./Partner.css";

const PARTNER_TYPES = ["Homeowners", "Building owners", "Developers", "Institutional Landlords"];

const BENEFITS = [
  {
    image: "/Money.png",
    title: "Boost Your Earnings",
    text: "Unlock the full earning potential of your property with strategic hospitality management. From premium furnishing and styling to targeted guest acquisition, every aspect is designed to boost occupancy and revenue. With seamless operations, ongoing monitoring, and optimized pricing, your property becomes a steady, hassle-free income stream.",
  },
  {
    image: "/second.png",
    title: "We Handle It All",
    text: "At UrbanHive, we handle every detail of your property so you can relax and enjoy the returns. From professional furnishing and styling to guest management, bookings, and maintenance, every step is expertly managed. With continuous monitoring and seamless operations, your property is in capable hands — giving you peace of mind and a steady, hassle-free income.",
  },
  {
    image: "/first.png",
    title: "Active Management & Monitoring",
    text: "At UrbanHive, your property is always in expert hands. We actively manage every unit, from guest communications and bookings to maintenance and quality checks. Our ongoing monitoring ensures smooth operations, optimal occupancy, and maximum revenue, giving you confidence that your investment is performing at its best—24/7.",
  },
];

const STEPS = [
  { title: "Join the Hive", text: "Let UrbanHive handle your property and maximize its earning potential." },
  {
    title: "Property Assessment",
    text: "Our UrbanHive expert conducts an on-site visit to ensure your unit is ready for maximum performance in the Furnish & Rent program.",
  },
  {
    title: "Styling & Setup",
    text: "UrbanHive transforms your unit with premium furnishings and careful preparation, making it ready for guests and optimized for revenue.",
  },
  {
    title: "Enjoy Hassle-Free Income",
    text: "With your unit fully managed and guest-ready, UrbanHive ensures steady returns while you relax.",
  },
];

const Partner = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const openForm = () => openExternal(PARTNER_FORM_URL);

  return (
    <div>
      <section ref={heroRef} className="uh-partner-hero">
        <motion.div className="uh-partner-hero__media" style={{ y: imageY }}>
          <SmartImage src="/WhatsApp Image 2025-12-06 at 9.01.13 AM.jpeg" alt="An UrbanHive living room" eager />
        </motion.div>
        <div className="uh-partner-hero__overlay" />

        <motion.div
          className="uh-partner-hero__panel"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        >
          <p className="uh-eyebrow">Join our hive</p>
          <h1 className="uh-partner-hero__title">GROW WITH THE HIVE</h1>
          <p className="uh-lead">
            Developer, landlord, or investor? Let’s grow the UrbanHive experience together.
          </p>
          <button type="button" className="uh-btn uh-btn--gold" onClick={openForm}>
            Partner with UrbanHive <FaArrowRight />
          </button>
        </motion.div>
      </section>

      <section className="uh-container uh-section uh-partner-intro">
        <Reveal x={-40} y={0}>
          <h2 className="uh-title">Ready to unlock your property’s potential and join the UrbanHive?</h2>
        </Reveal>
        <Reveal x={40} y={0} delay={0.1}>
          <p className="uh-lead">
            Your unit deserves to perform at its best. UrbanHive enhances every space with refined
            furnishing and modern styling, delivering consistent income without the burden of
            management. From the first piece of furniture to the perfect guest, we handle it all.
          </p>
        </Reveal>
      </section>

      <section className="uh-partner-who">
        <div className="uh-container uh-partner-who__inner">
          <div>
            <Reveal>
              <p className="uh-eyebrow">Who we work with</p>
              <h2 className="uh-title uh-title--gold">WHO URBANHIVE COLLABORATES WITH?</h2>
              <p className="uh-lead">
                UrbanHive collaborates with a wide spectrum of property partners to create flexible,
                high-performing rental solutions:
              </p>
            </Reveal>
            <Stagger className="uh-partner-who__types" stagger={0.1}>
              {PARTNER_TYPES.map((type) => (
                <StaggerItem key={type} className="uh-partner-who__type">
                  <img src="/Home.png" alt="" aria-hidden />
                  {type}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <MaskReveal className="uh-partner-who__media">
            <SmartImage src="/Join_our_hive.jpeg" alt="A furnished UrbanHive apartment" />
          </MaskReveal>
        </div>
      </section>

      <section className="uh-container uh-section">
        <Reveal className="uh-partner-center">
          <p className="uh-eyebrow">Why partner with us</p>
          <h2 className="uh-title">Everything is handled for you, start to finish.</h2>
        </Reveal>
        <Stagger className="uh-partner-benefits" stagger={0.15}>
          {BENEFITS.map((benefit) => (
            <StaggerItem key={benefit.title} className="uh-partner-benefit">
              <SmartImage src={benefit.image} alt="" className="uh-partner-benefit__img" />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="uh-partner-steps">
        <div className="uh-container">
          <Reveal className="uh-partner-center">
            <p className="uh-eyebrow">The process</p>
            <h2 className="uh-title uh-title--light">How it works</h2>
          </Reveal>
          <Stagger className="uh-partner-steps__grid" stagger={0.15}>
            {STEPS.map((step, index) => (
              <StaggerItem key={step.title} className="uh-partner-step">
                <span className="uh-partner-step__num">0{index + 1}</span>
                <img src="/Home.png" alt="" aria-hidden className="uh-partner-step__mark" />
                <h3>
                  Step {index + 1}: {step.title}
                </h3>
                <p>{step.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="uh-partner-center uh-partner-steps__cta">
            <button type="button" className="uh-btn uh-btn--gold" onClick={openForm}>
              Partner with UrbanHive <FaArrowRight />
            </button>
          </Reveal>
        </div>
      </section>

      <Emaill />
    </div>
  );
};

export default Partner;

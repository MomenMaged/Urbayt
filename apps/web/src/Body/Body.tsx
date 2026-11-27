import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import Details from "../Details/Details";
import Caro from "../Caro/Caro";
import Emaill from "../Emaill/Emaill";
import FAQ from "../FAQ/FAQ";
import { EASE, Reveal } from "../components/Motion";
import "./Body.css";

const HEADLINE = ["STAY", "CONNECTED.", "STAY", "COMFORTABLE."];

const Body = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  // Visitors who turned on "reduce motion" see the still poster instead of the video.
  const reduceMotion = useReducedMotion();

  // Parallax: the video drifts slower than the page and the copy fades out.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const openBooking = () => {
    setBookingOpen(true);
    document.getElementById("book-now")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div>
      <section ref={heroRef} className="uh-hero">
        <motion.div className="uh-hero__media" style={{ y: videoY }}>
          {/* The video's first frame, shown instantly while the video loads. */}
          <img src="/videos/hero-living-room-poster.webp" alt="" aria-hidden className="uh-hero__poster" />
          {!reduceMotion && (
            <video
              className={`uh-hero__video ${videoReady ? "is-ready" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/videos/hero-living-room-poster.webp"
              onLoadedData={() => setVideoReady(true)}
            >
              {/* Phones get the lighter 720p file (0.7 MB), larger screens 1080p (2.3 MB). */}
              <source src="/videos/hero-living-room-720.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/videos/hero-living-room-1080.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="uh-hero__overlay" />

        <motion.div className="uh-hero__content" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            className="uh-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            Welcome to the Hive
          </motion.p>

          <h1 className="uh-hero__title" aria-label={HEADLINE.join(" ")}>
            {HEADLINE.map((word, i) => (
              <span key={i} className="uh-hero__word" aria-hidden>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.45 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="uh-hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          >
            <button type="button" className="uh-btn uh-btn--gold" onClick={openBooking}>
              Book now <FaArrowRight />
            </button>
            <button type="button" className="uh-btn uh-btn--ghost" onClick={() => navigate("/cards")}>
              Explore listings
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="uh-hero__scroll"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={() => document.getElementById("home-intro")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span />
        </motion.button>
      </section>

      <section id="home-intro" className="uh-home-intro">
        <DropDownMenu open={bookingOpen} onToggle={() => setBookingOpen((open) => !open)} />
        <div className="uh-home-intro__gallery">
          <Caro />
        </div>
      </section>

      <section className="uh-about">
        <img src="/Home.png" alt="" aria-hidden className="uh-about__mark" />
        <div className="uh-container uh-about__inner">
          <Reveal x={-40} y={0}>
            <h2 className="uh-title uh-title--gold">
              URBAN LUXURY FOR FAMILIES, COUPLES, AND SOLO TRAVELERS.
            </h2>
          </Reveal>
          <Reveal x={40} y={0} delay={0.15}>
            <p className="uh-lead">
              UrbanHive is where considered design meets heartfelt hospitality. Every element is
              shaped to make your stay simpler, cozier, and more inspiring. Our spaces bring people
              closer and transform ordinary days into cherished memories. Here, home isn’t a place
              you enter, it’s a feeling that stays with you.
            </p>
          </Reveal>
        </div>
      </section>

      <Details />
      <FAQ />
      <Emaill />
    </div>
  );
};

export default Body;

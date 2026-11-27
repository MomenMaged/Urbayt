import { Link, useNavigate } from "react-router-dom";
import { EnvironmentFilled, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaArrowRight } from "react-icons/fa";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";
import { CONTACT, NAV_ITEMS, SOCIAL_LINKS } from "../data/site";
import "./Emaill.css";

/** Site footer: contact call-to-action, contact details, navigation and socials. */
const Emaill = () => {
  const navigate = useNavigate();

  return (
    <footer className="uh-footer">
      <img src="/Home.png" alt="" aria-hidden className="uh-footer__mark" />

      <div className="uh-container">
        <Reveal className="uh-footer__cta">
          <div>
            <p className="uh-eyebrow">Get in touch</p>
            <h2 className="uh-title uh-title--light">Let’s find your next stay.</h2>
          </div>
          <button type="button" className="uh-btn uh-footer__contact" onClick={() => navigate("/contact-us")}>
            CONTACT US <FaArrowRight />
          </button>
        </Reveal>

        <Stagger className="uh-footer__grid">
          <StaggerItem className="uh-footer__brand">
            <Link to="/" aria-label="Urban Hive home">
              <img src="/Logo1.png" alt="Urban Hive" className="uh-footer__logo" />
            </Link>
            <p>Considered design meets heartfelt hospitality.</p>
            <div className="uh-footer__social">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <h3 className="uh-footer__heading">Contact</h3>
            <ul className="uh-footer__list">
              <li>
                <a href={CONTACT.phoneHref}>
                  <PhoneOutlined /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>
                  <MailOutlined /> {CONTACT.email}
                </a>
              </li>
              <li>
                <span>
                  <EnvironmentFilled /> {CONTACT.address}
                </span>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h3 className="uh-footer__heading">Explore</h3>
            <ul className="uh-footer__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <div className="uh-footer__bottom">
          <span>© {new Date().getFullYear()} UrbanHive. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Emaill;

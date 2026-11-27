import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { EASE } from "../components/Motion";
import { SOCIAL_LINKS } from "../data/site";
import "./Menu.css";

interface MenuProps {
  open: boolean;
  onClose: () => void;
  items: { to: string; label: string }[];
}

const panel: Variants = {
  closed: { clipPath: "circle(0% at calc(100% - 44px) 54px)", transition: { duration: 0.6, ease: EASE } },
  open: {
    clipPath: "circle(150% at calc(100% - 44px) 54px)",
    transition: { duration: 0.8, ease: EASE, staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const link: Variants = {
  closed: { opacity: 0, y: 30 },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Full-screen navigation for tablets and phones. */
const Menu = ({ open, onClose, items }: MenuProps) => {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="uh-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={panel}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <img src="/Home.png" alt="" aria-hidden className="uh-menu__mark" />
          <nav className="uh-menu__nav">
            {items.map((item, index) => (
              <motion.div key={item.to} variants={link}>
                <NavLink to={item.to} className="uh-menu__link" onClick={onClose}>
                  <span className="uh-menu__index">0{index + 1}</span>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div className="uh-menu__social" variants={link}>
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;

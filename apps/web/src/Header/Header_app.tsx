import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Menu from "../Menu/Menu";
import { EASE } from "../components/Motion";
import { NAV_ITEMS } from "../data/site";
import "./Header.css";

const Header_app = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(closeMenu, [location.pathname, closeMenu]);

  return (
    <>
      <motion.header
        className={`uh-header ${isScrolled ? "uh-header--small" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Link to="/" className="uh-header__logo" aria-label="Urban Hive home">
          <img src="/Logo1.png" alt="Urban Hive" />
        </Link>

        <nav className="uh-header__nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="uh-header__link">
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="uh-nav-underline"
                      className="uh-header__underline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={`uh-burger ${menuOpen ? "uh-burger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.header>

      <Menu open={menuOpen} onClose={closeMenu} items={NAV_ITEMS} />
    </>
  );
};

export default Header_app;

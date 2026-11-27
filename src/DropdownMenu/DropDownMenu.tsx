import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DownOutlined } from "@ant-design/icons";
import { FaArrowRight } from "react-icons/fa";
import { useListings } from "../hooks/usePublicData";
import { formatPrice, listingPath, openExternal } from "../data/format";
import { EASE } from "../components/Motion";
import SmartImage from "../components/SmartImage";
import type { Listing } from "../api/types";
import "./DropDownMenu.css";

interface BookNowProps {
  open: boolean;
  onToggle: () => void;
}

/** The "BOOK NOW" bar on the home page; expands into a list of the listings. */
const DropDownMenu = ({ open, onToggle }: BookNowProps) => {
  const { listings } = useListings();
  const navigate = useNavigate();

  const choose = (listing: Listing) => {
    if (listing.status === "available" && listing.bookingUrl) {
      openExternal(listing.bookingUrl);
    } else {
      navigate(listingPath(listing.slug));
    }
  };

  return (
    <div className={`uh-booknow ${open ? "uh-booknow--open" : ""}`} id="book-now">
      <button type="button" className="uh-booknow__toggle" aria-expanded={open} onClick={onToggle}>
        <span>BOOK NOW</span>
        <DownOutlined className="uh-booknow__chevron" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="uh-booknow__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.ul
              className="uh-booknow__list"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
            >
              {listings.map((listing) => {
                const comingSoon = listing.status === "coming_soon";
                const price = formatPrice(listing);
                return (
                  <motion.li
                    key={listing.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                    }}
                  >
                    <button type="button" className="uh-booknow__item" onClick={() => choose(listing)}>
                      {listing.photos[0] && (
                        <SmartImage src={listing.photos[0].url} alt="" className="uh-booknow__thumb" />
                      )}
                      <span className="uh-booknow__info">
                        <strong>{listing.title}</strong>
                        <small>
                          {comingSoon
                            ? "Coming soon"
                            : price
                              ? `From ${price} / night`
                              : listing.location ?? "Available now"}
                        </small>
                      </span>
                      <FaArrowRight className="uh-booknow__arrow" />
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownMenu;

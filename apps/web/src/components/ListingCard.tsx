import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GiBathtub } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import type { Listing } from "../api/types";
import { formatPrice, listingPath, openExternal } from "../data/format";
import SmartImage from "./SmartImage";
import "./ListingCard.css";

const MAX_CARD_PHOTOS = 5;

export default function ListingCard({ listing }: { listing: Listing }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const photos = listing.photos.slice(0, MAX_CARD_PHOTOS);
  const comingSoon = listing.status === "coming_soon";
  const price = formatPrice(listing);
  const open = () => navigate(listingPath(listing.slug));

  const step = (event: MouseEvent, delta: number) => {
    event.stopPropagation();
    setIndex((current) => (current + delta + photos.length) % photos.length);
  };

  const facts = [
    { icon: IoBedOutline, label: "Bedroom", value: listing.bedrooms },
    { icon: GiBathtub, label: "Bathroom", value: listing.bathrooms },
    { icon: FaPerson, label: "Max Guests", value: listing.maxGuests },
    { icon: HomeOutlined, label: "Area", value: listing.areaSqm && `${listing.areaSqm} SQM` },
  ].filter((fact) => fact.value !== null && fact.value !== undefined);

  return (
    <motion.article
      className="uh-card"
      onClick={open}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="uh-card__media">
        <AnimatePresence initial={false} mode="popLayout">
          {photos.length > 0 ? (
            <motion.div
              key={photos[index].id}
              className="uh-card__slide"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmartImage src={photos[index].url} alt={photos[index].alt || listing.title} />
            </motion.div>
          ) : (
            <div className="uh-card__slide uh-card__placeholder">
              <img src="/Home.png" alt="" aria-hidden />
            </div>
          )}
        </AnimatePresence>

        <span className={`uh-badge uh-card__badge ${comingSoon ? "uh-badge--soon" : "uh-badge--available"}`}>
          {comingSoon ? "Coming soon" : "Available now"}
        </span>

        {photos.length > 1 && (
          <>
            <button type="button" className="uh-card__arrow uh-card__arrow--prev" aria-label="Previous photo" onClick={(e) => step(e, -1)}>
              <LeftOutlined />
            </button>
            <button type="button" className="uh-card__arrow uh-card__arrow--next" aria-label="Next photo" onClick={(e) => step(e, 1)}>
              <RightOutlined />
            </button>
            <div className="uh-card__dots" aria-hidden>
              {photos.map((photo, i) => (
                <span key={photo.id} className={i === index ? "is-active" : ""} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="uh-card__body">
        {listing.location && <p className="uh-card__location">{listing.location}</p>}
        <h3 className="uh-card__title">{listing.title}</h3>

        {facts.length > 0 && (
          <ul className="uh-card__facts">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} title={label}>
                <Icon />
                <span>
                  {label}: {value}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="uh-card__footer">
          <div className="uh-card__price">
            {price && !comingSoon ? (
              <>
                <strong>{price}</strong> / Night
              </>
            ) : (
              <strong>{comingSoon ? "Opening soon" : "Price on request"}</strong>
            )}
          </div>

          {comingSoon ? (
            <button type="button" className="uh-btn uh-btn--primary" disabled onClick={(e) => e.stopPropagation()}>
              Coming soon!
            </button>
          ) : listing.bookingUrl ? (
            <button
              type="button"
              className="uh-btn uh-btn--primary"
              onClick={(e) => {
                e.stopPropagation();
                openExternal(listing.bookingUrl!);
              }}
            >
              Book now
            </button>
          ) : (
            <button type="button" className="uh-btn uh-btn--outline">
              Details <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { motion, useScroll, useTransform } from "framer-motion";
import { EnvironmentFilled } from "@ant-design/icons";
import { FaArrowRight, FaBath } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdBedroomParent } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsGrid3X3Gap } from "react-icons/bs";
import type { Listing } from "../../api/types";
import { useListing, useListings } from "../../hooks/usePublicData";
import { getAmenity } from "../../data/amenities";
import { formatPrice, openExternal, plural, whatsappLink } from "../../data/format";
import { EASE, MaskReveal, Reveal, Stagger, StaggerItem } from "../../components/Motion";
import SmartImage from "../../components/SmartImage";
import ListingCard from "../../components/ListingCard";
import NotFound from "../../components/NotFound";
import Emaill from "../../Emaill/Emaill";
import HouseRules from "./HouseRules";
import "./ListingPage.css";

/** Shows one listing. Pass `slug` for fixed routes like /madinaty, otherwise it's read from the URL. */
export default function ListingPage({ slug: fixedSlug }: { slug?: string }) {
  const params = useParams();
  const slug = (fixedSlug ?? params.slug ?? "").toLowerCase();
  const { listing, loading } = useListing(slug);

  useEffect(() => {
    if (listing) document.title = `${listing.title} | Urban Hive`;
    return () => {
      document.title = "Urban Hive";
    };
  }, [listing]);

  if (loading) {
    return <div className="uh-lp-hero uh-img" aria-busy="true" />;
  }

  if (!listing) {
    return <NotFound title="This space isn’t available" text="It may have moved or isn’t listed right now." />;
  }

  return <ListingView listing={listing} />;
}

function BookingCard({ listing }: { listing: Listing }) {
  const comingSoon = listing.status === "coming_soon";
  const price = formatPrice(listing);

  return (
    <div className="uh-lp-book">
      {comingSoon ? (
        <>
          <span className="uh-badge uh-badge--soon">Coming soon</span>
          <p className="uh-lp-book__note">Be the first to know when this space opens.</p>
          <a className="uh-btn uh-btn--primary uh-btn--block" href={whatsappLink(`Hello! Please let me know when ${listing.title} is available.`)} target="_blank" rel="noopener noreferrer">
            Notify me
          </a>
        </>
      ) : (
        <>
          <span className="uh-lp-book__label">STARTING PRICE</span>
          <p className="uh-lp-book__price">
            {price ? (
              <>
                {price} <small>/ NIGHT</small>
              </>
            ) : (
              "Price on request"
            )}
          </p>
          {listing.bookingUrl ? (
            <button type="button" className="uh-btn uh-btn--primary uh-btn--block" onClick={() => openExternal(listing.bookingUrl!)}>
              Book now <FaArrowRight />
            </button>
          ) : (
            <a className="uh-btn uh-btn--primary uh-btn--block" href={whatsappLink(`Hello! I'd like to book ${listing.title}.`)} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp <FaArrowRight />
            </a>
          )}
        </>
      )}
    </div>
  );
}

function ListingView({ listing }: { listing: Listing }) {
  const heroRef = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const { listings } = useListings();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [cover, overviewPhoto] = listing.photos;
  const openPhoto = (index: number) => setPreview({ open: true, index });

  const facts = [
    { icon: MdBedroomParent, label: "No. of bedrooms", value: listing.bedrooms !== null && plural(listing.bedrooms, "Bedroom") },
    { icon: FaBath, label: "No. of bathrooms", value: listing.bathrooms !== null && plural(listing.bathrooms, "Bathroom") },
    { icon: FaPerson, label: "Guests", value: listing.maxGuests !== null && `Up to ${listing.maxGuests} guests` },
    { icon: SlSizeFullscreen, label: "Size", value: listing.areaSqm !== null && `${listing.areaSqm} m²` },
  ].filter((fact) => fact.value);

  const others = listings.filter((other) => other.id !== listing.id).slice(0, 3);
  const mosaic = listing.photos.slice(0, 5);

  return (
    <div>
      {/* ------------------------------ Hero ------------------------------ */}
      <section ref={heroRef} className="uh-lp-hero">
        {cover && (
          <motion.div className="uh-lp-hero__media" style={{ scale: imageScale, y: imageY }}>
            <SmartImage src={cover.url} alt={cover.alt || listing.title} eager />
          </motion.div>
        )}
        <div className="uh-lp-hero__overlay" />

        <div className="uh-container uh-lp-hero__inner">
          <div className="uh-lp-hero__copy">
            {listing.location && (
              <motion.p
                className="uh-lp-hero__location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              >
                <EnvironmentFilled /> {listing.location}
              </motion.p>
            )}
            <motion.h1
              className="uh-lp-hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            >
              {listing.headline ?? listing.title}
            </motion.h1>
            {listing.photos.length > 0 && (
              <motion.button
                type="button"
                className="uh-btn uh-btn--ghost"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
                onClick={() => openPhoto(0)}
              >
                <BsGrid3X3Gap /> SHOW ALL PHOTOS
              </motion.button>
            )}
          </div>

          <motion.div
            className="uh-lp-hero__card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            <BookingCard listing={listing} />
          </motion.div>
        </div>
      </section>

      {/* ---------------------------- Overview ---------------------------- */}
      {(listing.overview || facts.length > 0) && (
        <section className="uh-section uh-container uh-lp-split">
          {overviewPhoto && (
            <MaskReveal className="uh-lp-split__media">
              <SmartImage src={overviewPhoto.url} alt={overviewPhoto.alt} onClick={() => openPhoto(1)} />
            </MaskReveal>
          )}
          <Reveal delay={0.1} className="uh-lp-split__text">
            <p className="uh-eyebrow">The space</p>
            <h2 className="uh-title">OVERVIEW</h2>
            {listing.overview && <p className="uh-lead">{listing.overview}</p>}
            <ul className="uh-lp-facts">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label}>
                  <span>
                    <Icon /> {label}
                  </span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* ---------------------------- Amenities --------------------------- */}
      {listing.amenities.length > 0 && (
        <section className="uh-lp-amenities">
          <div className="uh-container">
            <Reveal>
              <p className="uh-eyebrow">What this place offers</p>
              <h2 className="uh-title uh-title--light">Amenities</h2>
            </Reveal>
            <Stagger className="uh-lp-amenities__grid" stagger={0.05}>
              {listing.amenities.map((key) => {
                const { label, icon: Icon } = getAmenity(key);
                return (
                  <StaggerItem key={key} className="uh-lp-amenity">
                    <Icon />
                    <span>{label}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ----------------------------- Gallery ---------------------------- */}
      {mosaic.length > 1 && (
        <section className="uh-section uh-container">
          <Reveal className="uh-lp-gallery__head">
            <div>
              <p className="uh-eyebrow">Gallery</p>
              <h2 className="uh-title">Take a look inside</h2>
            </div>
            <button type="button" className="uh-btn uh-btn--outline" onClick={() => openPhoto(0)}>
              View all {listing.photos.length} photos
            </button>
          </Reveal>
          <Stagger className={`uh-lp-mosaic uh-lp-mosaic--${mosaic.length}`} stagger={0.1}>
            {mosaic.map((photo, index) => (
              <StaggerItem key={photo.id} className="uh-lp-mosaic__item">
                <SmartImage src={photo.url} alt={photo.alt} onClick={() => openPhoto(index)} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* ---------------------------- Location ---------------------------- */}
      {listing.locationDescription && (
        <section className="uh-container uh-lp-location">
          <Reveal className="uh-lp-location__card">
            <EnvironmentFilled className="uh-lp-location__pin" />
            <div>
              <p className="uh-eyebrow">Location</p>
              <h2 className="uh-title">{listing.location ?? "Where you’ll be"}</h2>
              <p className="uh-lead">{listing.locationDescription}</p>
            </div>
          </Reveal>
        </section>
      )}

      <HouseRules />

      {others.length > 0 && (
        <section className="uh-section uh-container">
          <Reveal>
            <p className="uh-eyebrow">Explore more</p>
            <h2 className="uh-title">You may also like</h2>
          </Reveal>
          <Stagger className="uh-card-grid" stagger={0.1}>
            {others.map((other) => (
              <StaggerItem key={other.id}>
                <ListingCard listing={other} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <Emaill />

      {/* Full-screen photo viewer */}
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          items={listing.photos.map((photo) => photo.url)}
          preview={{
            visible: preview.open,
            current: preview.index,
            onVisibleChange: (open) => setPreview((state) => ({ ...state, open })),
            onChange: (index) => setPreview((state) => ({ ...state, index })),
          }}
        />
      </div>
    </div>
  );
}

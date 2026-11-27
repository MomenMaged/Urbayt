import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ListingCard from "../components/ListingCard";
import { Reveal } from "../components/Motion";
import { useListings } from "../hooks/usePublicData";
import Emaill from "../Emaill/Emaill";
import FAQ from "../FAQ/FAQ";
import "./Cards.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "available", label: "Available now" },
  { key: "coming_soon", label: "Coming soon" },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

const Cards = () => {
  const { listings, loading } = useListings();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? listings : listings.filter((listing) => listing.status === filter)),
    [listings, filter],
  );

  return (
    <div>
      <section className="uh-container uh-listings">
        <Reveal className="uh-listings__head">
          <div>
            <p className="uh-eyebrow">Our listings</p>
            <h1 className="uh-title">Find your space in the Hive.</h1>
          </div>

          <div className="uh-filter" role="tablist" aria-label="Filter listings">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={filter === item.key}
                className={`uh-filter__item ${filter === item.key ? "is-active" : ""}`}
                onClick={() => setFilter(item.key)}
              >
                {filter === item.key && (
                  <motion.span
                    layoutId="uh-filter-pill"
                    className="uh-filter__pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="uh-filter__label">{item.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="uh-card-grid">
          {loading
            ? Array.from({ length: 3 }, (_, i) => <div key={i} className="uh-card-skeleton uh-img" />)
            : visible.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
        </motion.div>

        {!loading && visible.length === 0 && (
          <p className="uh-listings__empty">No listings here yet — check back soon.</p>
        )}
      </section>

      <FAQ />
      <Emaill />
    </div>
  );
};

export default Cards;

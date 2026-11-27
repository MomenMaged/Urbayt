import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeFilled } from "@ant-design/icons";
import { GiEntryDoor } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { EASE, Stagger, StaggerItem } from "../../components/Motion";

const HOUSE_RULES = `You'll be staying in someone's home, so please treat it with care and respect. Check-in after 2:00 PM and Checkout before 11:00 AM. Door Access will deactivate automatically at the check out time, if you need to get access after 11:00 AM, please reach out to our team. Quiet hours are 10:00 PM - 7:00 AM. No parties or events are allowed at any of our properties. Smoking is not allowed inside any of our properties. For your peace of mind, the home is equipped with smoke detectors and carbon monoxide detectors. Couples should provide proof of marriage as per local Egyptian laws. There are exterior security cameras monitoring the front door for added security.`;

const CANCELLATION = `Full refund for cancellations made within 48 hours of booking, if the check in date is at least 14 days away. 50% refund for cancellations made at least 7 days before check in. No refunds for cancellations made within 7 days of check in.`;

const GUESTS = `For Arab passport holders, couples must submit an official marriage certificate. Visitors of the opposite sex are not allowed unless they're first degree relatives.`;

const PREVIEW_LENGTH = 170;

function RuleCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > PREVIEW_LENGTH;

  return (
    <div className="uh-rule">
      <span className="uh-rule__icon">{icon}</span>
      <h3>{title}</h3>
      <AnimatePresence initial={false} mode="wait">
        <motion.p
          key={String(expanded)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {expanded || !long ? text : `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…`}
        </motion.p>
      </AnimatePresence>
      {long && (
        <button type="button" className="uh-link" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "View Less ▲" : "View More ▼"}
        </button>
      )}
    </div>
  );
}

export default function HouseRules() {
  return (
    <section className="uh-rules">
      <div className="uh-container">
        <p className="uh-eyebrow">Before you book</p>
        <h2 className="uh-title">UrbanHive Rules</h2>
        <Stagger className="uh-rules__grid" stagger={0.12}>
          <StaggerItem>
            <RuleCard icon={<MdCancel />} title="Cancellation & Changes" text={CANCELLATION} />
          </StaggerItem>
          <StaggerItem>
            <RuleCard icon={<GiEntryDoor />} title="Guest Regulations" text={GUESTS} />
          </StaggerItem>
          <StaggerItem>
            <RuleCard icon={<HomeFilled />} title="House Rules" text={HOUSE_RULES} />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

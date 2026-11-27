import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Reveal } from "./Motion";

export default function NotFound({
  title = "We couldn’t find that page",
  text = "It may have moved, or the link might be incorrect.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Reveal className="uh-container uh-not-found">
      <img src="/Home.png" alt="" aria-hidden />
      <h1 className="uh-title">{title}</h1>
      <p className="uh-lead">{text}</p>
      <Link to="/cards" className="uh-btn uh-btn--primary">
        See all listings <FaArrowRight />
      </Link>
    </Reveal>
  );
}

import { Carousel } from "antd";
import { useGallery } from "../hooks/usePublicData";
import SmartImage from "../components/SmartImage";
import { Reveal } from "../components/Motion";
import "./Caro.css";

/** Home page photo carousel. Photos are managed under "Home carousel" in the admin panel. */
const Caro = () => {
  const { photos, loading } = useGallery("home_carousel");

  if (loading) {
    return <div className="uh-caro uh-caro__frame uh-img" />;
  }
  if (photos.length === 0) return null;

  return (
    <Reveal className="uh-caro">
      <Carousel
        className="uh-caro__frame"
        effect="fade"
        autoplay
        autoplaySpeed={4500}
        speed={900}
        pauseOnHover
        dotPosition="bottom"
      >
        {photos.map((photo, index) => (
          <div key={photo.id}>
            <div className="uh-caro__slide">
              <SmartImage src={photo.url} alt={photo.alt} eager={index === 0} />
            </div>
          </div>
        ))}
      </Carousel>
    </Reveal>
  );
};

export default Caro;

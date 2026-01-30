import { Flex, Carousel, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import "./Caro.css";
import { useState } from "react";

const carouselImages = [
  {
    src: "/home_page.jpeg",
    alt: "Home Page Cover",
  },
  {
    src: "/Home_page2.jpeg",
    alt: "Madinaty Gate",
  },
  {
    src: "/Home_page3.jpeg",
    alt: "Madinaty0y Gate",
  },
  {
    src: "/Home_page4.jpeg",
    alt: "Madi;naty Gate",
  },
  {
    src: "/Home_page5.jpeg",
    alt: "Maqdinatky Gate",
  },
  {
    src: "/Home_page6.jpeg",
    alt: "Madainatqey Gate",
  },
  {
    src: "/Home_page7.jpeg",
    alt: "Madinadtyq Gate",
  },
];

const Caro = () => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Carousel
      className="custom-carousel"
      dotPosition="bottom"
     
      autoplaySpeed={2000}
    >
      {carouselImages.map((item, index) => (
        <Content key={index} style={{ padding: 0, margin: 0 }}>
          <Flex gap="middle" align="center" vertical>
            <div className="CoverImg3">
              {imageLoading && (
                <Skeleton.Image
                  active
                  className="cover-image3"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              <img
                className="cover-image3"
                alt={item.alt}
                src={item.src}
                style={{ display: imageLoading ? "none" : "block" }}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

               {/* <video
            
            className="cover-image"
            width="90%"
            autoPlay
            muted
            loop
            playsInline
            style={{ display: imageLoading? "none" : "block" , marginTop: "0%"  }}
    onLoadedData={() => setImageLoading(false)}
    onError={() => setImageLoading(false)}
    
            
          >
            <source
              src="/458700_Finance_District_3840x2160.mp4"
              type="video/mp4"
            />
          </video> */}
            </div>
          </Flex>
        </Content>
      ))}
    </Carousel>
  );
};

export default Caro;

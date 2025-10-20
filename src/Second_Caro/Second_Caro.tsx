import { Flex, Carousel, ConfigProvider } from "antd";
import "./Second_Caro.css";

const Second_Caro = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: { arrowSize: 25, arrowOffset: 40  },
        },
      }}
    >
      <Carousel
      className="custom-carousel"
        style={{
          height: "30vh",
          backgroundColor: "white",
          marginTop:'5%'
        }}
        dots={false}
        draggable
        arrows
      >
        {/* First slide */}
        <Flex
          className="carousel-slide"
          justify="center"
          align="center"
          vertical
        >
          <Flex justify="center" align="center" className="Title">
            <h1>fdlslklsdjf</h1>
          </Flex>
          <div className="Title-no">First image</div>
        </Flex>

        {/* Second slide */}
        <Flex
          className="carousel-slide"
          justify="center"
          align="center"
          vertical
        >
          <Flex align="center" justify="center" className="Title">
            <h1>jnjnjaklnfdksndkjfnkj</h1>
          </Flex>
          <div className="Title-no"  style={{marginTop:'-10px'
          }}>Second image</div>
        </Flex>
      </Carousel>
    </ConfigProvider>
  );
};

export default Second_Caro;

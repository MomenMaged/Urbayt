import { Card, Carousel, Flex, Grid } from "antd";
import "./Cards.css";
import {HomeOutlined} from "@ant-design/icons";
import Emaill from "../Emaill/Emaill";

const { useBreakpoint } = Grid;

const Cards = () => {
  const screens = useBreakpoint();

  const cards = [
    {
      Id:'1',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 1",
      price:'29,000,000',
      Availability:'Available now',


    },
     {
      Id:'2',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',


    },
     {
      Id:'3',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',


    },
     {
      Id:'4',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',


    },
     {
      Id:'5',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',


    }
  ];

  return (
    <div>
      <Flex vertical >
       <h2 style={{paddingLeft:'5rem'}}>Lists: {cards.length}</h2>
        <Flex  wrap
        align="center" vertical={!screens.lg} style={ screens.lg ? { marginLeft: "3%" , marginRight:'3%'} : {}} justify="center" gap='3%'>
          {cards.map((item) => (
         

          <Card
          id={item.Id}
            className="Card_css" 
            hoverable
            style={{ maxWidth: "350px", borderRadius: "10%" }}
            cover={
              <div className="my_special_car">
              <Carousel arrows dots={false}>
                <img
                  onClick={() => window.open("https://www.airbnb.com/")}
                  draggable={false}
                  alt="example"
                  src={item.imgSrc1}
                />
                <img
                  onClick={() => window.open("https://www.airbnb.com/")}
                  draggable={false}
                  alt="example"
                  src={item.imgSrc2}
                />
              </Carousel>
              </div>
            }
          >
            <Flex 
              vertical
              onClick={() => window.open("https://www.airbnb.com/")}>
              <div style={{ height: "100px" }}>
                <p className="card_title">{item.title}</p>
                <p className="card_title">{item.price}</p>
                <p className="available">{item.Availability}</p>
              </div>

              <Flex
                justify="space-between"
                wrap
                style={{ width: "80%", marginTop: "-25px" }}
              >
                <p className="para">
                  {" "}
                  <HomeOutlined /> Bedrooms:3
                </p>
                <p className="para">
                  <HomeOutlined /> jfnsjkd
                </p>
                <p className="para">
                  <HomeOutlined /> sdlflsdf
                </p>
                <p className="para">
                  <HomeOutlined /> sdlflsdf
                </p>
              </Flex>
            </Flex>
          </Card>
          ))}
        </Flex>
        </Flex>
        <Emaill></Emaill>
      
    </div>
  );
};

export default Cards;

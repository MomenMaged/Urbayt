import { Card, Carousel, Flex, Grid } from "antd";
import "./Cards.css";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Space from "antd";
import { Header } from "antd/es/layout/layout";

const { Meta } = Card;

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
      Id:'4',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',


    }
  ];

  return (
    <div>
       
        <Flex  wrap
        align="center" vertical={!screens.lg} style={ screens.lg ? { marginLeft: "3%" , marginRight:'3%'} : {}} justify="center" gap='3%'>
          {cards.map((item) => (
          //   <Card
          //   key={item.Id}'lwkwknf;klgsdf
          //   className="Card_css"
          //   hoverable
          //   style={{ width: 350, height: "auto" }}
          //   cover={
          //     <img
          //       draggable={false}
          //       alt="example"
          //       src="./KE_Nine_Oct23-9.webp"
          //     />
          //   }
          // >
          //   {/* <Meta className='Title2' title=" Junior Suite | Sea View | Ghazala Bay Resort & Spa" description="www.instagram.com" /> */}
          //   <h3>sdfjskdf</h3>
          // </Card>

          // <Card
          //   className="Card_css"
          //   hoverable
          //   style={{ maxWidth: "350px", borderRadius: "10%" }}
          //   cover={
          //     <Carousel arrows dots={false}>
          //       <img
          //         draggable={true}
          //         alt="example"
          //         src="./KE_Nine_Oct23-9.webp"
          //       />
          //       <img
          //         draggable={true}
          //         alt="example"
          //         src="./KE_Nine_Oct23-9.webp"
          //       />
          //     </Carousel>
          //   }
          // >
          //   <Flex vertical>
          //     <div style={{ height: "100px" }}>
          //       <p className="card_title">dkmdskfsm kjfnkwenfk wkebfkwbek</p>
          //       <p className="card_title">18,000,999 L.E</p>
          //       <p className="available">Available now</p>
          //     </div>

          //     <Flex
          //       justify="space-between"
          //       wrap
          //       style={{ width: "80%", marginTop: "-25px" }}
          //     >
          //       <p className="para">
          //         {" "}
          //         <HomeOutlined /> Bedrooms:3
          //       </p>
          //       <p className="para">
          //         <HomeOutlined /> jfnsjkd
          //       </p>
          //       <p className="para">
          //         <HomeOutlined /> sdlflsdf
          //       </p>
          //       <p className="para">
          //         <HomeOutlined /> sdlflsdf
          //       </p>
          //     </Flex>
          //   </Flex>
          // </Card>

          <Card
          id={item.Id}
            className="Card_css"
            hoverable
            style={{ maxWidth: "350px", borderRadius: "10%" }}
            cover={
              <Carousel arrows dots={false}>
                <img
                  draggable={true}
                  alt="example"
                  src={item.imgSrc1}
                />
                <img
                  draggable={true}
                  alt="example"
                  src={item.imgSrc2}
                />
              </Carousel>
            }
          >
            <Flex vertical>
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
      
    </div>
  );
};

export default Cards;

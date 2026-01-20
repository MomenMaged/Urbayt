import {  Button, Card, Carousel, ConfigProvider, Flex, Grid } from "antd";
import "./Cards.css";
import {HomeOutlined} from "@ant-design/icons";
import Emaill from "../Emaill/Emaill";
import FAQ from "../FAQ/FAQ";

import { useNavigate } from "react-router-dom";
import { GiBathtub } from "react-icons/gi";

import { FaPerson } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";




const { useBreakpoint } = Grid;

const Cards = () => {

  const navigate = useNavigate();
  const screens = useBreakpoint();

  const cards = [
    {
      Id:'1',
      imgSrc1: "/b56aae16-2d17-41b3-969f-0a1e4082d0e1.avif",
      imgSrc2: "/Bedroom_madintay.avif",
      title: "Modern Cozy Garden View @ Madinaty",
      price:'1750 EGP / Night',
      Availability:'Available now',
      Bedrooms:'2',
      Bathrooms:'1',
      Max_guests:'4',
      Area:'79 SQM'


    },
     {
      Id:'2',
      imgSrc1: "/CFC_2.jpeg",
      imgSrc2: "/CFC_3.jpeg",
      title: "Cairo Festival City",
      price:'89,000,000',
      Availability:'Not Available',
Bedrooms:'2',
      Bathrooms:'2',
      Max_guests:'4',
      Area:'140 SQM'

    },
     {
      Id:'3',
      imgSrc1: "/Sokhna_comming_soon.jpeg",
      imgSrc2: "/Sokhna_2.jpeg",
      title: "Sokhna Blumar",
      price:'89,000,000',
      Availability:'Not Available',
Bedrooms:'3',
      Bathrooms:'2',
      Max_guests:'6',
      Area:'150 SQM'

    },
     {
      Id:'4',
      imgSrc1: "/Mountain_view.jpeg",
      imgSrc2: "/Mountain_view_2.jpeg",
      title: "Mountain View - Hyde Park ",
      price:'89,000,000',
      Availability:'Not Available',
Bedrooms:'2',
      Bathrooms:'2',
      Max_guests:'4',
      Area:'145 SQM'

    },
     {
      Id:'5',
      imgSrc1: "./KE_Nine_Oct23-9.webp",
      imgSrc2: "./KE_Banafseg_Apr24-50.webp",
      title: "Title 2",
      price:'89,000,000',
      Availability:'Not Available',
Bedrooms:'2',
      Bathrooms:'1',
      Max_guests:'5',
      Area:'180 CM'

    }
  ];

  return (
     <ConfigProvider
    theme={{
      components:{
       Button:{
        defaultBg:'#133848',
         defaultHoverBg:'#CE8A39',
         ghostBg:'transparent',
         defaultActiveBg:'#CE8A39',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent',
         defaultBorderColor:'transparent',
         colorBgLayout:'black',
         defaultActiveBorderColor:'transparent',
         colorBgContainerDisabled:'#133848'
       }
      }
    }}>
    <div>
      <Flex vertical >
       {/* <h2 style={{paddingLeft:'5rem'}}> Number of Listings: {cards.length}</h2> */}
        <Flex  wrap
        align="center" vertical={!screens.lg} style={ screens.lg ? { marginLeft: "3%" , marginRight:'3%'} : {}} justify="center" gap='3%'>
          {cards.map((item) => (
         

  

          <Card
          
          id={item.Id}
            className="Card_css" 
            hoverable
            style={{ maxWidth: "350px",borderRadius: "10%" }}
            cover={
              <div className="my_special_car">
              <Carousel arrows  dots={false} >
                <img
                   onClick={() => {
    if (item.Availability !== "Not Available")  {
      navigate('/Listing');
    }
  }}
                  draggable={false}
                  alt="example"
                  src={item.imgSrc1}
                />
                <img
                  onClick={() => {
    if (item.Availability !== "Not Available")  {
      navigate('/Listing');
    }
  }}
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
             
             onClick={() => {
    if (item.Availability !== "Not Available")  {
      navigate('/Listing');
    }
  }}
        >

              <div style={{ height: "100px" }}>
                <p className="card_title" >{item.title}</p>
                <Flex align="center" justify="space-between">
                <p className={`card_title ${
        item.Availability === "Not Available" ? "blur-text" : ""
      }`}>{item.price}</p>
               <Button  disabled={item.Availability==="Not Available"} style={{color:'white'}} onClick={(e)=>{e.stopPropagation(); window.open(
        "https://www.airbnb.com/",
        "_blank",
        "noopener,noreferrer"
      ); }}>{
        item.Availability === "Not Available" ? "Coming soon!": "Book now"
      }</Button>
                </Flex>
                <p className="available">{item.Availability}</p>
              </div>

              <Flex
                justify="space-between"
                
                wrap
                style={{  marginTop: "-25px" }}
              >
                <Flex className="para" gap={3} align="center" justify="center">
                <IoBedOutline />
                <p >
                 Bedroom: {item.Bedrooms}
                </p>
                </Flex>
                <Flex className="para" gap={3} align="center" justify="center">
                <GiBathtub />
                <p >
               Bathroom: {item.Bathrooms}
                </p>
                </Flex>
                <Flex className="para" gap={3} align="center" justify="center">
                <FaPerson />
                <p >
                 Max Guests: {item.Max_guests}
                </p>
                </Flex>
                <Flex className="para" gap={3} align="center" justify="center">
               <HomeOutlined />
                <p >
                 Area: {item.Area} 
                </p>
                </Flex>
                {/* <p className="para">
                  <GiBathtub /> {" "}Bathroom: {item.Bathrooms}
                </p>
                <p className="para">
                  <FaPerson /> Max Guests: {item.Max_guests}
                </p>
                <p className="para">
                  <HomeOutlined /> Area: {item.Area}
                </p> */}
              </Flex>
            </Flex>
          </Card>
          
          ))}
        </Flex>
        </Flex>
        <FAQ></FAQ>
        <Emaill></Emaill>
      
    </div>
    </ConfigProvider>
  );
};

export default Cards;

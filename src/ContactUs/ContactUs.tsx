import {Button, ConfigProvider, Flex, Grid, Input, Select } from "antd";
import "./ContactUS.css";
import TextArea from "antd/es/input/TextArea";
import { EnvironmentFilled, FacebookFilled, InstagramFilled, MailOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import Emaill from "../Emaill/Emaill";

const { useBreakpoint } = Grid;

const optionss = [
  { label: "Reservations" },
  { label: "Leasing opportunities" },
  { label: "Press" },
  { label: "Collaborations" },
];

const ContactUs = () => {
  const screens = useBreakpoint();
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
         defaultActiveBorderColor:'transparent'
         
        }
      }
    }}>
    <div>
    
      
      <Flex vertical={!screens.lg}>
        <div className={screens.lg ? "Image5" : "Image6"}>
          <img
            className="second-image5"
            alt="cover"
            src="./contact-us-image.jpg"
          ></img>
        </div>

        <Flex
          gap={20}
          vertical
          style={{
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            backgroundColor: "White",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "#292A2B",
              fontFamily: "sans-serif",
            }}
          >
            Contact us
          </p>

          <Input size="large" placeholder="Full name"></Input>

          <Flex gap={10}>
            <Input size="large" placeholder="Email"></Input>
            <Input size="large" placeholder="Full name"></Input>
          </Flex>

          <Select size="large" placeholder="Reason" options={optionss} />

          <TextArea placeholder="Message" autoSize={{ minRows: 4 }} />

          <Button size="large" style={{color:'white'}}>
            Send message
          </Button>
        </Flex>
      </Flex>

      <Flex align="center" vertical={!screens.lg} gap={40} style={{ paddingTop:'1.25rem',paddingBottom:'1.25rem',paddingLeft:'1.25rem',paddingRight:'2rem',  marginTop:'3%' ,backgroundColor:'white' , borderRadius:'25px' }}>
        <Flex vertical={!screens.lg || !screens.md} align="center" gap={'5%'} className={ screens.lg? "fasel2" : "fasel3"} style={{width:'100%'}}>
<p style={{fontSize:'16px' , fontFamily:'sans-serif'}}> <PhoneOutlined></PhoneOutlined> 01065360600</p>
<p style={{fontSize:'16px' , fontFamily:'sans-serif'}}> <MailOutlined></MailOutlined> momen_maged@hotmail.com</p>
      <p style={{fontSize:'16px' , fontFamily:'sans-serif'}}> <EnvironmentFilled></EnvironmentFilled> Kamelizer Spaces, District 5, Sokhna Road</p>
</Flex>
<Flex gap={10}>
      <FacebookFilled style={{fontSize:'28px'}}/>
      <InstagramFilled style={{fontSize:'28px'}} />
      <WhatsAppOutlined style={{fontSize:'28px'}}></WhatsAppOutlined>
      </Flex>
      </Flex>

      <Emaill></Emaill>

      
    </div>
    </ConfigProvider>
  );
};

export default ContactUs;

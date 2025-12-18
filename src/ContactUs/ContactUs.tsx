import {Button, ConfigProvider, Flex, Grid, Input, Select } from "antd";
import "./ContactUS.css";
import TextArea from "antd/es/input/TextArea";
import { EnvironmentFilled, FacebookFilled, InstagramFilled, MailOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import Emaill from "../Emaill/Emaill";
import { useState } from "react";

const { useBreakpoint } = Grid;

const optionss = [
  { label: "Reservations" },
  { label: "Leasing opportunities" },
  { label: "Press" },
  { label: "Collaborations" },
];

const ContactUs = () => {

  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const [valuee, setValuee] = useState("");


  const hasError = touched && value.trim() === "";

  const hasErrorr = touched && valuee.trim() === "";

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
            backgroundColor: "white",
            width: "100%",
            boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.3)'
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

          <Input size="large" placeholder="Full name" value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setTouched(true)}
      status={hasError ? "error" : ""}></Input>

          <Flex gap={10}>
            <Input size="large" placeholder="Email"   onChange={(e) => setValuee(e.target.value)}
      onBlur={() => setTouched(true)}
      status={hasErrorr ? "error" : ""}></Input>
            <Input size="large" placeholder="Number (+20)"></Input>
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
<p style={{fontSize:'16px' , fontFamily:'sans-serif'}}> <MailOutlined></MailOutlined> info@urbanhiveco.com</p>
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

import { Button, ConfigProvider, Flex, Grid } from "antd";
import "./Emaill.css";
import { EnvironmentFilled, FacebookFilled, InstagramFilled, MailOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


  const { useBreakpoint } = Grid;
const Emaill = () => {

const navigate = useNavigate();

const screens = useBreakpoint();
  return (
    <ConfigProvider
    theme={{
      components:{
        Button:{
         defaultBg:'#E2CAA2',
         defaultHoverBg:'#CE8A39',
         borderColorDisabled:'transparent',
         defaultActiveBg:'#E2CAA2',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent',
      
        }
      }
    }}
    >
    <div>
    {screens.lg?
    <Flex align="center" className="footer" vertical>
            <Button onClick={()=>{navigate('/ContactUs')}} style={{color:'black'}} className="Fontt">Contact us</Button>


      <Flex align="center" vertical={!screens.lg} gap={40} style={{ width:'100%',paddingTop:'1.25rem',paddingBottom:'1.25rem',paddingLeft:'1.25rem',paddingRight:'2rem',  marginTop:'3%'  }}>
        <Flex vertical={!screens.lg || !screens.md} align="center" gap={'5%'} className={ screens.lg? "fasel2" : "fasel3"} style={{width:'100%'}}>
<p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <PhoneOutlined></PhoneOutlined> 01065360600</p>
<p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <MailOutlined></MailOutlined> info@urban-hive.co</p>
      <p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <EnvironmentFilled></EnvironmentFilled>  Mountain View iCity - New Cairo</p>
</Flex>
<Flex gap={10}>
      <FacebookFilled style={{fontSize:'28px' , color:'white'}}/>
      <InstagramFilled style={{fontSize:'28px' , color:'white'}} />
      <WhatsAppOutlined style={{fontSize:'28px' , color:'white'}}></WhatsAppOutlined>
      </Flex>
      </Flex>
      
    </Flex> : 
    
    <Flex align="center" className="footer2" vertical>
      <Button onClick={()=>{navigate('/ContactUs')}} style={{color:'black'}} className="Fontt">Contact us</Button>
      
<Flex align="center" vertical={!screens.lg} gap={40} style={{ width:'100%',paddingTop:'1.25rem',paddingBottom:'1.25rem',paddingLeft:'1.25rem',paddingRight:'2rem',  marginTop:'3%'  }}>
        <Flex vertical={!screens.lg || !screens.md} align="center" gap={'5%'} className={ screens.lg? "fasel2" : "fasel3"} style={{width:'100%'}}>
<p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <PhoneOutlined></PhoneOutlined> 01065360600</p>
<p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <MailOutlined></MailOutlined> info@urban-hive.co</p>
      <p style={{fontSize:'16px' , fontFamily:'sans-serif' , color:'white'}}> <EnvironmentFilled></EnvironmentFilled>  Mountain View iCity - New Cairo</p>
</Flex>
<Flex gap={10}>
      <FacebookFilled style={{fontSize:'28px' , color:'white'}}/>
      <InstagramFilled style={{fontSize:'28px' , color:'white'}} />
      <WhatsAppOutlined style={{fontSize:'28px' , color:'white'}}></WhatsAppOutlined>
      </Flex>
      </Flex>

    </Flex>}
    </div>
    </ConfigProvider>
  );
};

export default Emaill;

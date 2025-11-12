import { Button, ConfigProvider, Flex, Grid, Input } from "antd";
import "./Emaill.css";


  const { useBreakpoint } = Grid;
const Emaill = () => {


const screens = useBreakpoint();
  return (
    <ConfigProvider
    theme={{
      components:{
        Button:{
         defaultBg:'transparent',
         defaultHoverBg:'#f7f7f7',
         borderColorDisabled:'transparent',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent'
        }
      }
    }}
    >
    <div>
    {screens.lg?
    <Flex align="center" className="footer" vertical>
      <strong className="Fontt">Contact us</strong>
      <p style={{ color: "white" }}>Drop here you Email!</p>
      <Flex align="center" gap={"10px"} style={{ marginTop: "2%" }}>
        <Input size="large" placeholder="EMAIL ADDRESS"></Input>
        <Button  size="large" className="butto">Send</Button>
      </Flex>
    </Flex> : 
    
    <Flex align="center" className="footer2" vertical>
      <strong className="Fontt">Contact us</strong>
      <p style={{ color: "white" }}>Drop here you Email!</p>
      <Flex align="center" gap={"10px"} style={{ marginTop: "2%" }}>
        <Input size="large" placeholder="EMAIL ADDRESS"></Input>
        <Button  size="large" className="butto" >Send</Button>
      </Flex>
    </Flex>}
    </div>
    </ConfigProvider>
  );
};

export default Emaill;

import {
  ExpandOutlined,
  FacebookOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  ConfigProvider,
  theme,
  Layout,
  message,
  MenuProps,
  Dropdown,
} from "antd";
import ColorPicker, { Color } from "antd/es/color-picker";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Header_app from "./Header/Header_app";
import Menu from "./Menu/Menu";
import Body from "./Body/Body";

const App = () => {
  return (
    
     <Layout>
        
      
        <Header_app />
      <Body/>  
        
    
    </Layout>
  );
};

export default App;

import "./Body.css";
import { Flex, Grid} from "antd";
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import Details from "../Details/Details";
import Caro from "../Caro/Caro";
import Second_Caro from "../Second_Caro/Second_Caro";
import Emaill from "../Emaill/Emaill";
import FAQ from "../FAQ/FAQ";

const { useBreakpoint } = Grid;

const Body = () => {
  const screens = useBreakpoint();
  return (
  
    <div>
      <Caro></Caro>

      <Flex align="center" vertical className="space">
        <Flex align="center"  vertical className="space">
          
          <h1 className="titlee">STAY CONNECTED. STAY COMFORTABLE.</h1>
          <DropDownMenu></DropDownMenu>
        </Flex>

        <video style={{marginTop:'3%'}} className="videoo" width="90%" autoPlay muted loop playsInline>
          <source
            src="/458700_Finance_District_3840x2160.mp4"
            type="video/mp4"
          />
        </video>
        {screens.lg ? (
          <div className="spacee">
            <Flex
              align="center"
              justify="space-between"
              style={{ width: "80%", marginTop: "20vh", marginLeft: "10%" }}
            >
              <h1 style={{ width: "30%" , color:'#CE8A39' , textAlign:'center'}}>URBAN LUXURY FOR FAMILIES, COUPLES, AND SOLO TRAVELERS.</h1>
              <div style={{ width: "45%" }}>
                UrbanHive is where considered design meets heartfelt hospitality. Every element is shaped to make your stay simpler, cozier, and more inspiring. Our spaces bring people closer and transform ordinary days into cherished memories. Here, home isn’t a place you enter, it’s a feeling that stays with you.
              </div>
            </Flex>
          </div>
        ) : (
          <div className="spaceee">
            <Flex
              align="center"
              justify="space-between"
              vertical
              style={{ padding:'5%'}}
            >
              <h1 style={{color:'#CE8A39' , textAlign:'center'}}>URBAN LUXURY FOR FAMILIES, COUPLES, AND SOLO TRAVELERS.</h1>
              <div>
                UrbanHive is where considered design meets heartfelt hospitality. Every element is shaped to make your stay simpler, cozier, and more inspiring. Our spaces bring people closer and transform ordinary days into cherished memories. Here, home isn’t a place you enter, it’s a feeling that stays with you.
              </div>
            </Flex>
          </div>
        )}
      </Flex>

    {/* Video End */}

    

    <Details></Details>

    {/* <Second_Caro></Second_Caro> */}

    <FAQ></FAQ>

    <Emaill></Emaill>
    </div>
  );
};

export default Body;

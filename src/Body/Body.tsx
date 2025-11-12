import "./Body.css";
import { Flex, Grid} from "antd";
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import Details from "../Details/Details";
import Caro from "../Caro/Caro";
import Second_Caro from "../Second_Caro/Second_Caro";
import Emaill from "../Emaill/Emaill";

const { useBreakpoint } = Grid;

const Body = () => {
  const screens = useBreakpoint();
  return (
  
    <div>
      <Caro></Caro>

      <Flex align="center" vertical className="space">
        <Flex align="center"  vertical className="space">
          
          <h1 className="titlee">DIRECT BEST RATE GUARANTEED</h1>
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
              <h1 style={{ width: "20%" }}>Aparthotels made for families.</h1>
              <div style={{ width: "45%" }}>
                A place where every detail is designed to make life easier,
                warmer, and more beautiful. From curated spaces to thoughtful
                touches, we bring people together and turn simple days into
                lasting memories. At Livingville, its not about checking in and
                out, its about feeling at home, every momentZZ
              </div>
            </Flex>
          </div>
        ) : (
          <div className="spaceee">
            <Flex
              align="center"
              justify="space-between"
              vertical
              style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
            >
              <h1>Aparthotels made for families.</h1>
              <div>
                A place where every detail is designed to make life easier,
                warmer, and more beautiful. From curated spaces to thoughtful
                touches, we bring people together and turn simple days into
                lasting memories. At Livingville, its not about checking in and
                out, its about feeling at home, every moment
              </div>
            </Flex>
          </div>
        )}
      </Flex>

    {/* Video End */}

    

    <Details></Details>

    <Second_Caro></Second_Caro>

    <Emaill></Emaill>
    </div>
  );
};

export default Body;

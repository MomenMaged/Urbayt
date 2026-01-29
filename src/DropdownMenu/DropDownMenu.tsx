import type { MenuProps } from "antd";
import { Grid, Menu } from "antd";
import "./DropDownMenu.css";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];



const { useBreakpoint } = Grid;


const App: React.FC = () => {

  const screens = useBreakpoint();

const items: MenuItem[] = [
  {
    key: "1",
    label: (
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          fontSize: screens.md  ? "30px" : "20px"

          
        }}
      >
        BOOK NOW
      </span>
    ),
    children: [
      {
        key: "11",
        label: (
          <a  onClick={()=>{window.open(
                              "https://www.airbnb.com/rooms/1211501666253889491?guests=1&adults=1&s=67&unique_share_id=d087c953-20cd-4482-b835-261fb787a425",
                              "_blank",
                              "noopener,noreferrer",
                            );}}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              MADINATY
            </span>
          </a>
        ),
      },
      {
        key: "12",
        label: (
          <Link to={"/Listing"}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
             SOHKNA
            </span>
            </Link>
          
        ),
      },
      {
        key: "13",
        label: (
          <Link to={"/Listing"}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
             CAIRO FESTIVAL CITY
            </span>
            </Link>
        ),
      },
    ],
  },
];

  

  return (
    <Menu 
      mode="inline"
      selectable={false}
      style={{ backgroundColor:'transparent', width: "80vw" , borderTop: '1.7px solid black', borderBottom: '1px solid black'}}
      items={items}
    />
  );
};

export default App;
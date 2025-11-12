import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./DropDownMenu.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: (
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          fontSize: "30px",
        }}
      >
        BOOK NOW
      </span>
    ),
    children: [
      {
        key: "11",
        label: (
          <a href="https://direct-book.com/properties/ninebylivingvilledirect?locale=en&from_widget=true&referrer=canvas&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2025-10-17&checkOutDate=2025-10-18&trackPage=no">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              NINE.
            </span>
          </a>
        ),
      },
      {
        key: "12",
        label: (
          <a href="https://direct-book.com/properties/ninebylivingvilledirect?locale=en&from_widget=true&referrer=canvas&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2025-10-17&checkOutDate=2025-10-18&trackPage=no">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              NINE.
            </span>
          </a>
        ),
      },
      {
        key: "13",
        label: (
          <a href="https://direct-book.com/properties/ninebylivingvilledirect?locale=en&from_widget=true&referrer=canvas&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2025-10-17&checkOutDate=2025-10-18&trackPage=no">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              NINE.
            </span>
          </a>
        ),
      },
    ],
  },
];


const App: React.FC = () => {


  return (
    <Menu 
      mode="inline"
      selectable={false}
      style={{ backgroundColor:'transparent', width: "80vw" , borderTop: '1.7px solid black', borderBottom: '1px solid black',}}
      items={items}
    />
  );
};

export default App;

import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./DropDownMenu.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    // icon: <MailOutlined />,
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

//   interface LevelKeysProps {
//   key?: string;
//   children?: LevelKeysProps[];
// }

// const getLevelKeys = (items1: LevelKeysProps[]) => {
//   const key: Record<string, number> = {};
//   const func = (items2: LevelKeysProps[], level = 1) => {
//     items2.forEach((item) => {
//       if (item.key) {
//         key[item.key] = level;
//       }
//       if (item.children) {
//         func(item.children, level + 1);
//       }
//     });
//   };
//   func(items1);
//    return key;
// };

// const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC = () => {
  //   const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  //   const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
  //     const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
  //     // open
  //     if (currentOpenKey !== undefined) {
  //       const repeatIndex = openKeys
  //         .filter((key) => key !== currentOpenKey)
  //         .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

  //       setStateOpenKeys(
  //         openKeys
  //           // remove repeat key
  //           .filter((_, index) => index !== repeatIndex)
  //           // remove current level all child
  //           .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
  //       );
  //     } else {
  //       // close
  //       setStateOpenKeys(openKeys);
  //     }
  //   };

  return (
    <Menu 
      mode="inline"
      //   defaultSelectedKeys={['231']}
      //   openKeys={stateOpenKeys}
      //   onOpenChange={onOpenChange}
      selectable={false}
      style={{ backgroundColor:'transparent', width: "80vw" , borderTop: '1.7px solid black', borderBottom: '1px solid black',}}
      items={items}
    />
  );
};

export default App;

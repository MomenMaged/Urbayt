import{ useState } from "react";
import { ConfigProvider ,Modal, Space } from "antd";
import { createStyles} from "antd-style";
import "./Menu.css";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: "transparent",
    padding: token.paddingSM,
  },
  "my-modal-mask": {},
  "my-modal-header": {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  //   'my-modal-footer': {
  //     color: token.colorPrimary,
  //   },
  "my-modal-content": {
    border: "1px solid #333",
  },
}));

// const { useBreakpoint } = Grid;

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const { styles } = useStyle();
  // const token = useTheme();

  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    // footer: styles['my-modal-footer'],
    content: styles["my-modal-content"],
  };

  const modalStyles = {
    // header: {
    //   borderLeft: `5px solid ${token.colorPrimary}`,
    //   borderRadius: 0,
    //   paddingInlineStart: 5,
    // },
    // body: {
    //   borderRadius: 5,
    // },
    mask: {
      backdropFilter: "blur(10px)",
    },
    // footer: {
    //   borderTop: '1px solid #333',
    // },
    content: {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  };

  // const screens = useBreakpoint();

  return (
    <>
      <Space>
        
        <MenuOutlined onClick={() => toggleModal(1, true)} style={{ marginTop:'20px', fontSize:'35px', color:'#f2f2f2'}}/>
      </Space>
      <ConfigProvider
        modal={{
          classNames,
          styles: modalStyles,
        }}
      >
        <Modal
        footer={null}
        closeIcon={<CloseOutlined style={{ fontSize: 20, color: 'white' }} />}
          style={{ top: "0px"}}
          open={isModalOpen[1]}
          width={"100%"}
          height={"100%"}
          onOk={() => toggleModal(1, false)}
          onCancel={() => toggleModal(1, false)}
        >
           <div className="navigation__inner2">
             
              <Link to="./Cards" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Our Listings</a></Link>
              <Link to="./Listing" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Listings 1</a></Link>
               <Link to="./Listing_2" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Listings 2</a></Link>
                <Link to="./Listing_3" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Listings 3</a></Link>
              
              <Link to="./Partner" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Become a partner</a></Link>
              <Link to="./ContactUs" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Contact us</a></Link>
            </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}; 

export default Menu;

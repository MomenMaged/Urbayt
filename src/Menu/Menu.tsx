import{ useState } from "react";
import { Button, ConfigProvider, Flex, Grid, Modal, Space } from "antd";
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

const { useBreakpoint } = Grid;

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

  const screens = useBreakpoint();

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
          style={{ top: "20px"}}
          open={isModalOpen[1]}
          width={"100%"}
          height={"100%"}
          onOk={() => toggleModal(1, false)}
          onCancel={() => toggleModal(1, false)}
        >
          {screens.lg ?
          <Flex>
            <div
              style={{
                display: "Flex",
                padding: "130px 300px 135px 115px",
                paddingLeft: "130px",
                overflowX: "hidden",
                gap: "0rem",
              }}
            >
              <Flex vertical>
                <div>
                  <p>momen1@gmail.com</p>
                  <a
                    className="menu-panel__item"
                    style={{
                      marginBottom: "3px",
                      lineHeight: "1px",
                      fontSize: "20px",
                    }}
                  >
                    aaaa1
                  </a>
                </div>

                <div
                  style={{
                    marginBottom: "5rem",
                  }}
                >
                  <p>momen2@gmail.com</p>
                  <a
                    className="menu-panel__item"
                    style={{
                      marginBottom: "1px",
                      lineHeight: "1px",
                      fontSize: "20px",
                    }}
                  >
                    aaaa2
                  </a>
                </div>

                <div>
                  <p
                    style={{
                      width: "300px", // restrict width to ~20 characters
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    For each project the approach rests on a careful
                    understanding of the space, or the site’s.
                  </p>
                </div>
                <Button
                  size="large"
                  shape="default"
                  className="custom-hover-button"
                  style={{backgroundColor:'transparent'}}
                >
                  SEND REQUEST
                </Button>
              </Flex>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "30px",
                }}
              >
                <div>
                  <p>momen@gmail.com</p>
                  <a
                    className="menu-panel__item"
                    style={{
                      marginBottom: "1px",
                      lineHeight: "1px",
                      fontSize: "20px",
                    }}
                  >
                    aaaa
                  </a>
                </div>
              </div>
            </div>

            <div className="navigation__inner">
             
              <a className="menu-panel__item">Our listings</a>
              <a className="menu-panel__item">Listing 1</a>
              <a className="menu-panel__item">Listing 2</a>
              <a className="menu-panel__item">Listing 3</a>
              <a className="menu-panel__item">Become a Partner</a>
               <a className="menu-panel__item">Contact us</a>
            </div>
          </Flex> :  <div className="navigation__inner2">
             
              <Link to="./Cards" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Our Listings</a></Link>
              <Link to="./Listing" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Listings 1</a></Link>
              <a className="menu-panel__item2" onClick={()=>toggleModal(1,false)}>Listing 2</a>
              <a className="menu-panel__item2"onClick={()=>toggleModal(1,false)}>Listing 3</a>
              <Link to="./Partner" onClick={()=>toggleModal(1,false)}><a className="menu-panel__item2">Become a partner</a></Link>
               <a className="menu-panel__item2" onClick={()=>toggleModal(1,false)}>Contact us</a>
            </div>}
        </Modal>
      </ConfigProvider>
    </>
  );
}; 

export default Menu;

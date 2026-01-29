import { useState } from "react";
import "./Listing.css";
import { TbAirConditioning } from "react-icons/tb";

import { ConfigProvider, Flex, Grid, Modal, Skeleton } from "antd";

import Cardd from "../cardd/Cardd";
import ViewPhotos from "../ViewPhotos/ViewPhotos";
import { FaBath, FaLock, FaParking, FaTv, FaWifi } from "react-icons/fa";
import {
  MdBedroomParent,
  MdMicrowave,
  MdOutlineCleaningServices,
  MdSanitizer,
} from "react-icons/md";
import { GiTowel } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaKitchenSet, FaPerson } from "react-icons/fa6";
import { SlSizeFullscreen } from "react-icons/sl";
import { motion } from "framer-motion";

const Listing = () => {
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  console.warn({ screens });

  const [open, setOpen] = useState(false);
  // const items: CollapseProps["items"] = [

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [imageLoading, setImageLoading] = useState(true);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "white",
            defaultHoverBg: "#E2CAA2",
            borderColorDisabled: "transparent",
            defaultHoverBorderColor: "transparent",
            defaultHoverColor: "transparent",
          },
        },
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {screens.lg ? (
            <div className="background-container">
              {/* Background image */}

 {imageLoading && (<Skeleton.Image
                active
                className="background-image"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />)}

              

              <img
                src={"/Madinaty-gate-scaled.jpg"}
                alt="Background"
                className="background-image"
                style={{ display: imageLoading ? "none" : "block" }}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

              {/* Optional dark overlay */}
              <div className="background-overlay"></div>

              {/* Foreground content */}
              <div>
                <Flex align="center" justify="space-between">
                  <h1 className="background-content5">
                    MODERN COZY 2BR+1BA PANO GARDEN VIEW
                  </h1>
                  <div className="background-content1">
                    <button
                      className="classic-btn"
                      style={{ color: "white" }}
                      onClick={() => setOpen(true)}
                    >
                      SHOW ALL PHOTOS
                    </button>

                    <ViewPhotos open={open} onClose={() => setOpen(false)} />
                  </div>
                  {/* <p style={{marginRight:'-40%'}}>
          This is text and Ant Design components centered over an actual image.
          </p> */}
                  <div className="background-content0">
                    <Flex
                      align="center"
                      justify="center"
                      gap={"30px"}
                      style={{
                        backgroundColor: "White",
                        // width: "70vw",
                        width: "30vw",
                        height: "30vh",
                        borderTopLeftRadius: "10px",
                        padding: "40px",
                      }}
                    >
                      {/* <Flex vertical align="center">
                  <h3>Check-in</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex vertical align="center" className="fasel">
                  <h3>Check-out</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex vertical align="center" className="fasel">
                  <h3>Guests</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <InputNumber defaultValue={0}></InputNumber>
                  </p>
                </Flex> */}

                      <Flex vertical align="center">
                        <h3>STARTING PRICE</h3>
                        <p style={{ marginTop: "-10px" }}>1750EGP / NIGHT</p>
                      </Flex>
                      <button
                        onClick={() => {
                          window.open(
                            "https://airbnb.com/h/uurbanhive",
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="classic-btn"
                      >
                        Book now
                      </button>
                    </Flex>
                  </div>
                </Flex>
              </div>
            </div>
          ) : screens.md ? (
            <Flex vertical>
              <div className="background-container">
                {/* Background image */}

 {imageLoading && ( <Skeleton.Image
                  active
                  className="background-image"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />)}

               

                <img
                  src={"/Madinaty-gate-scaled.jpg"}
                  alt="Background"
                  className="background-image"
                  style={{ display: imageLoading ? "none" : "block" }}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />

                {/* Optional dark overlay */}
                <div className="background-overlay"></div>

                {/* Foreground content */}

                <Flex align="center" justify="space-between">
                  <h1 className="background-content5">
                    MODERN COZY 2BR+1BA PANO GARDEN VIEW
                  </h1>
                  <div className="background-content1">
                    <button
                      className="classic-btn"
                      style={{ color: "white" }}
                      onClick={() => setOpen(true)}
                    >
                      SHOW ALL PHOTOS
                    </button>

                    <ViewPhotos open={open} onClose={() => setOpen(false)} />
                  </div>
                  {/* <p style={{marginRight:'-40%'}}>
          This is text and Ant Design components centered over an actual image.
          </p> */}
                </Flex>
              </div>{" "}
              <div>
                <Flex
                  align="center"
                  justify="center"
                  vertical
                  style={{
                    backgroundColor: "White",
                    width: "100%",
                    height: "100%",
                    paddingBottom: "2%",
                  }}
                >
                  <Flex vertical align="center">
                    <h3>STARTING PRICE</h3>
                    <p style={{ marginTop: "-10px" }}>1750EGP / NIGHT</p>
                  </Flex>
                  <button
                    onClick={() => {
                      window.open(
                        "https://airbnb.com/h/uurbanhive",
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className="classic-btn"
                  >
                    Book now
                  </button>
                </Flex>
              </div>
            </Flex>
          ) : (
            <Flex vertical>
              <div className="background-container" style={{ height: "60vh" }}>
                {/* Background image */}

 {imageLoading && (<Skeleton.Image
                  active
                  className="background-image"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />)}

                

                <img
                  src={"/Madinaty-gate-scaled.jpg"}
                  alt="Background"
                  className="background-image"
                  style={{ display: imageLoading ? "none" : "block" }}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />

                {/* Optional dark overlay */}
                <div className="background-overlay"></div>

                {/* Foreground content */}

                <Flex align="center" justify="space-between">
                  <h1 className="background-content_mobile">
                    MODERN COZY 2BR+1BA PANO GARDEN VIEW
                  </h1>
                  <div className="background-content1">
                    <button
                      className="classic-btn"
                      style={{ color: "white" }}
                      onClick={() => setOpen(true)}
                    >
                      SHOW ALL PHOTOS
                    </button>

                    <ViewPhotos open={open} onClose={() => setOpen(false)} />
                  </div>
                </Flex>
              </div>{" "}
              <div>
                <Flex
                  align="center"
                  justify="center"
                  vertical
                  style={{
                    backgroundColor: "White",
                    width: "100%",
                    height: "100%",
                    padding: "5%",
                  }}
                >
                  <Flex align="center">
                    <h3 style={{ width: "90%", marginLeft: "-30%" }}>
                      Price / Night
                    </h3>
                    <p>1750EGP</p>
                  </Flex>

                  <button
                    onClick={() => {
                      window.open(
                        "https://airbnb.com/h/uurbanhive",
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    style={{ color: "white", marginTop: "5%" }}
                    className="classic-btn"
                  >
                    Book now
                  </button>
                </Flex>
              </div>
            </Flex>
          )}
        </motion.div>

        <div>
          {screens.lg ? (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Flex
                  gap={"5%"}
                  align="center"
                  justify="center"
                  style={{ width: "100%", marginTop: "20vh" }}
                >
                  <div className="Image2">

 {imageLoading && (<Skeleton.Image
                      active
                      className="second-image"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />)}

                    

                    <img
                      className="second-image"
                      alt="cover"
                      src="/Rectangle-528-1.jpg"
                      style={{ display: imageLoading ? "none" : "block" }}
                      onLoad={() => setImageLoading(false)}
                      onError={() => setImageLoading(false)}
                    ></img>
                  </div>

                  <Flex vertical style={{ width: "40%" }}>
                    <h1 style={{ width: "100%" }}>OVERVIEW</h1>
                    <p>
                      Welcome to your perfect getaway! This fully renovated
                      2-br, 1-ba home is designed for comfort, perfect for solo
                      travelers, couples, or small families. Features
                      queen-sized beds with fresh linens, and brand-new
                      furniture throughout adds a modern yet cozy touch. Wake up
                      to breathtaking panoramic garden views, and step onto your
                      balcony, the perfect spot to enjoy a brunch or sip your
                      morning coffee in peace.
                    </p>
                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <MdBedroomParent style={{ fontSize: "20px" }} />
                        <p className="logos9">No. of bedrooms</p>
                      </Flex>
                      <h4>2 Bedrooms</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <FaBath style={{ fontSize: "20px" }} />
                        <p className="logos9">No. of bathrooms</p>
                      </Flex>
                      <h4>1 Bathroom</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <FaPerson style={{ fontSize: "20px" }} />
                        <p className="logos9">Guests</p>
                      </Flex>
                      <h4>Up to 4 guests</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <SlSizeFullscreen style={{ fontSize: "20px" }} />
                        <p className="logos9">Size</p>
                      </Flex>
                      <h4>
                        <span>
                          79<sup>2</sup>
                        </span>
                      </h4>
                    </Flex>
                  </Flex>
                </Flex>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Flex
                  gap={"5%"}
                  align="center"
                  justify="center"
                  style={{ width: "100%", marginTop: "20vh" }}
                >
                  <Flex vertical style={{ width: "40%" }}>
                    <h1 style={{ width: "100%" }}>Amenities</h1>
                    <Flex wrap justify="left" gap={25}>
                      <Flex align="center" gap={5}>
                        <TbAirConditioning></TbAirConditioning>
                        <p className="logos2">Air Conditioning</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <FaParking></FaParking>
                        <p className="logos2">Free Parking</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <FaWifi />
                        <p className="logos2">WIFI</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <FaTv />
                        <p className="logos2">Smart TV</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <MdOutlineCleaningServices />
                        <p className="logos2">Weekly Cleaning</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <GiTowel />
                        <p className="logos2">Linens and Towels</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <FaLock />
                        <p className="logos2">Smart lock</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <CgSmartHomeRefrigerator />
                        <p className="logos2">Refrigerator</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <FaKitchenSet />
                        <p className="logos2">Kitchen</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <MdMicrowave />
                        <p className="logos2">Microwave</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <MdSanitizer />
                        <p className="logos2">Toiletries</p>
                      </Flex>
                    </Flex>
                  </Flex>
                  <div className="Image2">

 {imageLoading && ( <Skeleton.Image
                      active
                      className="second-image"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />)}
                    
                    

                    <img
                      className="second-image"
                      alt="cover"
                      src="/b56aae16-2d17-41b3-969f-0a1e4082d0e1.avif"
                      style={{ display: imageLoading ? "none" : "block" }}
                      onLoad={() => setImageLoading(false)}
                      onError={() => setImageLoading(false)}
                    ></img>
                  </div>
                </Flex>
              </motion.div>
            </div>
          ) : (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Flex
                  gap="5px"
                  align="center"
                  justify="space-between"
                  vertical
                  style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
                >

                  {imageLoading && (<Skeleton.Image
                    active
                    className="second-image"
                    style={{
                      width: "100%",
                      height: "50vh",
                    }}
                  /> )}
                  
                  <img
                    className="second-image"
                    alt="cover"
                    src="/Rectangle-528-1.jpg"
                    style={{ display: imageLoading ? "none" : "block" }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  ></img>
                  <Flex vertical>
                    <h1 style={{ width: "100%" }}>OVERVIEW</h1>
                    <p>
                      Welcome to your perfect getaway! This fully renovated
                      2-br, 1-ba home is designed for comfort, perfect for solo
                      travelers, couples, or small families. Features
                      queen-sized beds with fresh linens, and brand-new
                      furniture throughout adds a modern yet cozy touch. Wake up
                      to breathtaking panoramic garden views, and step onto your
                      balcony, the perfect spot to enjoy a brunch or sip your
                      morning coffee in peace.
                    </p>
                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <MdBedroomParent style={{ fontSize: "20px" }} />
                        <p className="logos9">No. of bedrooms</p>
                      </Flex>
                      <h4>2 Bedrooms</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <FaBath style={{ fontSize: "20px" }} />
                        <p className="logos9">No. of bathrooms</p>
                      </Flex>
                      <h4>1 Bathroom</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <FaPerson style={{ fontSize: "20px" }} />
                        <p className="logos9">Guests</p>
                      </Flex>
                      <h4>Up to 4 guests</h4>
                    </Flex>

                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={5}>
                        <SlSizeFullscreen style={{ fontSize: "20px" }} />
                        <p className="logos9">Size</p>
                      </Flex>
                      <h4>
                        <span>
                          24<sup>2</sup>
                        </span>
                      </h4>
                    </Flex>
                  </Flex>
                </Flex>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Flex
                  gap="5px"
                  align="center"
                  justify="space-between"
                  vertical
                  style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
                >
{imageLoading && ( <Skeleton.Image
        active
       className="second-image"

        style={{
          width: "100%",
          height:"55vh", 
                       
        }}/>)}
                 
        
                  <img
                    className="second-image"
                    alt="cover"
                    src="/b56aae16-2d17-41b3-969f-0a1e4082d0e1.avif"
 style={{ display: imageLoading ? "none" : "block" }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}

                  ></img>
                  <Flex align="start" vertical wrap>
                    <h1 style={{ width: "100%" }}>Amenities</h1>

                    <Flex align="center" gap={5}>
                      <TbAirConditioning></TbAirConditioning>
                      <p className="logos22">Air Conditioning</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaParking></FaParking>
                      <p className="logos2">Free Parking</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaWifi />
                      <p className="logos2">WIFI</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaTv />
                      <p className="logos2">Smart TV</p>
                    </Flex>
                  </Flex>
                  <button className="classic-btn" onClick={showModal}>
                    Open Modal
                  </button>
                  <Modal
                    title="Basic Modal"
                    closable={{ "aria-label": "Custom Close Button" }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Flex align="center" gap={5}>
                      <TbAirConditioning></TbAirConditioning>
                      <p className="logos22">Air Conditioning</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaParking></FaParking>
                      <p className="logos2">Free Parking</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaWifi />
                      <p className="logos2">WIFI</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaTv />
                      <p className="logos2">Smart TV</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <MdOutlineCleaningServices />
                      <p className="logos2">Weekly Cleaning</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <GiTowel />
                      <p className="logos2">Linens and Towels</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaLock />
                      <p className="logos2">Smart lock</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <CgSmartHomeRefrigerator />
                      <p className="logos2">Refrigerator</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <FaKitchenSet />
                      <p className="logos2">Kitchen</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <MdMicrowave />
                      <p className="logos2">Microwave</p>
                    </Flex>

                    <Flex align="center" gap={5}>
                      <MdSanitizer />
                      <p className="logos2">Toiletries</p>
                    </Flex>
                  </Modal>
                </Flex>
              </motion.div>
            </div>
          )}
        </div>

        <Cardd></Cardd>
      </div>
    </ConfigProvider>
  );
};

export default Listing;

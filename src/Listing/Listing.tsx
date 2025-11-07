import  { useState } from "react";
import "./Listing.css";
import {
  Button,
  
  ConfigProvider,
  DatePicker,
  
  Flex,
  Grid,
  InputNumber,
  
  Modal,
} from "antd";

import { HomeFilled } from "@ant-design/icons";
import Cardd from "../cardd/Cardd";
import ViewPhotos from "../ViewPhotos/ViewPhotos";

const Listing = () => {
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
console.warn({screens})
  
const [open, setOpen] = useState(false);
  // const items: CollapseProps["items"] = [
  //   {
  //     key: "1",
  //     label: "LIVINGVILLE NINE APARTHOTEL",
  //     children: (
  //       <p>
  //         <ul>
  //           <li>24/7 CONCIERGE </li>
  //           <li>DEDICATED ON PROPERTY SECURITY </li>
  //           <li>BUSINESS LOUNGE</li>
  //         </ul>
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: "LIVINGVILLE THE TWO FIFTY",
  //     children: (
  //       <p>
  //         <ul>
  //           <li>24/7 CONCIERGE </li>
  //           <li>DEDICATED ON PROPERTY SECURITY </li>
  //           <li>BUSINESS LOUNGE</li>
  //         </ul>
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: "This is panel header 3",
  //     children: (
  //       <p>
  //         <ul>
  //           <li>24/7 CONCIERGE </li>
  //           <li>DEDICATED ON PROPERTY SECURITY </li>
  //           <li>BUSINESS LOUNGE</li>
  //         </ul>
  //       </p>
  //     ),
  //   },
  // ];

  
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

  return (
    <ConfigProvider
    theme={{
      components:{
        Button:{
         defaultBg:'black',
         defaultHoverBg:'green',
         borderColorDisabled:'transparent',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent'
        }
      }
    }}>
    <div>
     {screens.lg ? (<div className="background-container">
        {/* Background image */}
        <img
          src={"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
          alt="Background"
          className="background-image"
        />

        {/* Optional dark overlay */}
        <div className="background-overlay"></div>

        {/* Foreground content */}
        <div>
          <Flex align="center"  justify="space-between">
            <h1 className="background-content2"> Junior Suite sea view</h1>
            <div className="background-content1">
             
             
      <Button style={{color:'white'}} onClick={() => setOpen(true)}>
        Open Image Modal
      </Button>

      <ViewPhotos open={open} onClose={() => setOpen(false)} />
    
            </div>
            {/* <p style={{marginRight:'-40%'}}>
          This is text and Ant Design components centered over an actual image.
          </p> */}
            <div className="background-content">
              <Flex
                align="center"
                justify="center"
                
                gap={"30px"}
                style={{
                  backgroundColor: "White",
                  width: "70vw",
                  height: "30vh",
                  borderTopLeftRadius: "10px",
                  padding: "40px",
                }}
              >
                <Flex vertical align="center">
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
                </Flex>

                <Flex vertical align="center" className="fasel">
                  <h3>Price/ Night + Utilities</h3>
                  <p style={{ marginTop: "-10px" }}>8,000,000</p>
                </Flex>
                <Button style={{color:'white' }} className="background-title">Book now</Button>
              </Flex>
            </div>
          </Flex>
        </div>
      </div>):(screens.md ?<Flex vertical><div className="background-container">
        {/* Background image */}
        <img
          src={"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
          alt="Background"
          className="background-image"
        />

        {/* Optional dark overlay */}
        <div className="background-overlay"></div>

        {/* Foreground content */}
        
          <Flex align="center" justify="space-between">
            <h1 className="background-content2"> Junior Suite sea view</h1>
            <div className="background-content1">
               <Button style={{color:'white'}} onClick={() => setOpen(true)}>
        Open Image Modal
      </Button>

      <ViewPhotos open={open} onClose={() => setOpen(false)} />
            </div>
            {/* <p style={{marginRight:'-40%'}}>
          This is text and Ant Design components centered over an actual image.
          </p> */}
           
          </Flex>

       
        
      </div>  <div >
              <Flex
                align="center"
                justify="center"
               
                style={{
                  backgroundColor: "White",
                  width: "100%",
                  height: "100%",
                 
                  
                }}
              >
                <Flex  vertical align="center" className="fasel">
                  <h3>Check-in</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex vertical align="center" className= "fasel" >
                  <h3>Check-out</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex vertical align="center" className='fasel'>
                  <h3 >Guests</h3>
                  <p style={{ marginTop: "-10px" }}>
                    <InputNumber defaultValue={0}></InputNumber>
                  </p>
                </Flex>

                <Flex vertical align="center" className='fasel'>
                  <h3>Price/ Night + Utilities</h3>
                  <p style={{ marginTop: "-10px" }}>8,000,000</p>
                </Flex>
                 <Button style={{color:'white' }} className="background-title">Book now</Button>
              </Flex>
            </div></Flex> :<Flex vertical><div className="background-container" style={{height:'60vh'}}>
        {/* Background image */}
        <img
          src={"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
          alt="Background"
          className="background-image"
        />

        {/* Optional dark overlay */}
        <div className="background-overlay"></div>

        {/* Foreground content */}
        
          <Flex align="center" justify="space-between">
            <h1 className="background-content2"> Junior Suite sea view</h1>
            <div className="background-content1">
              <Button style={{color:'white'}} onClick={() => setOpen(true)}>
        Open Image Modal
      </Button>

      <ViewPhotos open={open} onClose={() => setOpen(false)} />
            </div>
         
           
          </Flex>

       
        
      </div>  <div >
              <Flex
                align="center"
                justify="center"
               vertical
               
                style={{
                  backgroundColor: "White",
                  width: "100%",
                  height: "100%",
                 padding:'5%'
                  
                }}
              >
                <Flex  >
                  <h3 style={{ width:'100%',marginLeft:'-20%'}}>Check-in</h3>
                  <p style={{marginRight:'-2%'}}>
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex  >
                  <h3 style={{ width:'100%',marginLeft:'-20%'}}>Check-out</h3>
                  <p >
                    <DatePicker></DatePicker>
                  </p>
                </Flex>
                <Flex  gap={'75%'}  >
                  <h3 style={{ width:'100%',marginLeft:'-50%'}}>Guests</h3>
                  <p >
                    <InputNumber ></InputNumber>
                  </p>
                </Flex>

                <Flex   align="center">
                  <h3 style={{ width:'90%',marginLeft:'-30%'}}>Price/ Night + Utilities</h3>
                  <p >8,000,000</p>
                </Flex>
       
                <Button  style={{color:'white',marginTop:'5%'}}>Book now</Button>
              </Flex>
            </div></Flex> )}

      <div>
        {screens.lg ? (
          <div>
            <Flex
              gap={"5%"}
              align="center"
              justify="center"
              style={{ width: "100%", marginTop: "20vh" }}
            >
              <div className="Image2">
                <img
                  className="second-image"
                  alt="cover"
                  src="./KE_Nine_Oct23-9.webp"
                ></img>
              </div>

              <Flex vertical style={{ width: "40%" }}>
                <h1 style={{ width: "100%" }}>
                  ARTFUL LIVING AMENITIES AT EVERY DETAIL.
                </h1>
                <p>
                  Comfortable Room with King size bed with spacious living area.
                  Mini bar (filled by request, chargeable) tea and coffee making
                  facilities, bathrobes and slippers, LCD TV with international
                  channels, direct dial phone, 2 bathrooms with toilet, shower
                  or bathtub, hair dryer, AC, safe, tiled/marble floor,
                  balcony.Sea View.
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddd
                </p>
              </Flex>
            </Flex>

            <Flex
              gap={"5%"}
              align="center"
              justify="center"
              style={{ width: "100%", marginTop: "20vh" }}
            >
              <Flex vertical style={{ width: "40%" }}>
                <h1 style={{ width: "100%" }}>Apartment</h1>
                <Flex wrap align="center" gap={25}>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                  </p>
                  <p className="logos2">
                    <HomeFilled></HomeFilled> jjjjddddddddddddd
                  </p>
                </Flex>
                <h1 style={{ width: "100%" }}>Building</h1>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
              </Flex>
              <div className="Image2">
                <img
                  className="second-image"
                  alt="cover"
                  src="./KE_Nine_Oct23-9.webp"
                ></img>
              </div>
            </Flex>
          </div>
        ) : (
          <div>
            <Flex
              gap="5px"
              align="center"
              justify="space-between"
              vertical
              style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
            >
              <img
                className="second-image"
                alt="cover"
                src="/KE_Nine_Oct23-9.webp"
              ></img>
              <Flex vertical>
                <h1 style={{ width: "100%" }}>
                  ARTFUL LIVING AMENITIES AT EVERY DETAIL.
                </h1>
                <p>
                  Comfortable Room with King size bed with spacious living area.
                  Mini bar (filled by request, chargeable) tea and coffee making
                  facilities, bathrobes and slippers, LCD TV with international
                  channels, direct dial phone, 2 bathrooms with toilet, shower
                  or bathtub, hair dryer, AC, safe, tiled/marble floor,
                  balcony.Sea View.
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                </p>
                <p className="logos">
                  <HomeFilled></HomeFilled> jjjjdddddddddddd
                </p>
              </Flex>
            </Flex>

            <Flex
              gap="5px"
              align="center"
              justify="space-between"
              vertical
              style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
            >
              <img
                className="second-image"
                alt="cover"
                src="/KE_Nine_Oct23-9.webp"
              ></img>
              <Flex align="start" vertical wrap>
                <h1 style={{ width: "100%" }}>Amenities</h1>
                <h1>Apartment</h1>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                {/* <p className="logos2"><HomeFilled></HomeFilled> jjjjddddddddddddd</p>
             <p className="logos2"><HomeFilled></HomeFilled> jjjjdddddddddddddddd</p>
              <p className="logos2"><HomeFilled></HomeFilled> jjjjdddddddddddd</p>
              <p className="logos2"><HomeFilled></HomeFilled> jjjjdddddddddddddddddd</p>
            <p className="logos2"><HomeFilled></HomeFilled> jjjjddddddddddddd</p> */}
              </Flex>
              <Button type="primary" onClick={showModal}>
                Open Modal
              </Button>
              <Modal
                title="Basic Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjdddddddddddddddddd
                </p>
                <p className="logos2">
                  <HomeFilled></HomeFilled> jjjjddddddddddddd
                </p>
              </Modal>
              <h1>Building</h1>
              <p className="logos2">
                <HomeFilled></HomeFilled> jjjjddddddddddddd
              </p>
            </Flex>
          </div>
        )}
      </div>

      <Cardd></Cardd>
    </div>
    </ConfigProvider>

  );
};

export default Listing;

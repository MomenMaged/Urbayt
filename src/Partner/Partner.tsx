import "./Partner.css";
import { Button, Col, ConfigProvider, Flex, Grid, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import Emaill from "../Emaill/Emaill";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const { useBreakpoint } = Grid;
const navigate = useNavigate();
  const screens = useBreakpoint();
  console.warn({ screens });

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg:'#133848',
         defaultHoverBg:'#CE8A39',
         ghostBg:'transparent',
         defaultActiveBg:'black',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent',
         defaultBorderColor:'transparent',
         colorBgLayout:'black',
         defaultActiveBorderColor:'transparent'
          },
        },
      }}
    >
      <div>
        {screens.lg ? (
          <div className="background-container">
            {/* Background image */}
            <img
              src={
                "/WhatsApp Image 2025-12-06 at 9.01.13 AM.jpeg"
              }
              alt="Background"
              className="background-image"
            />

            {/* Optional dark overlay */}
            <div className="background-overlay"></div>

            {/* Foreground content */}
            <div>
              <Flex align="center" justify="space-between">
               
                <div className="background-place">
                  <Flex
                    align="center"
                    justify="center"
                    vertical
                    // gap={"30px"}
                   className="testTR"
                  >
                    <p style={{ color:'#E2CAA2', marginBottom: "2%", fontSize: "48px" }}>
                      GROW WITH THE HIVE
                    </p>
                    <h3 style={{ color:'#E2CAA2', paddingLeft: "30px", paddingRight: "30px" }}>
                     Developer, landlord, or investor? Let’s grow the UrbanHive experience together.
                    </h3>
                    <Button onClick={()=>{navigate('/ContactUs')}} style={{ color: "white" }} size="large">
                      Partner with UrbanHive
                    </Button>
                  </Flex>
                </div>
              </Flex>
            </div>
          </div>
        ) : screens.md ? (
          <Flex vertical>
            <div className="background-container">
              {/* Background image */}
              <img
                src={
                  "/WhatsApp Image 2025-12-06 at 9.01.13 AM.jpeg"
                }
                alt="Background"
                className="background-image"
              />

              {/* Optional dark overlay */}
              <div className="background-overlay"></div>

              {/* Foreground content */}

              
            </div>{" "}
            <div>
              <Flex
                align="center"
                justify="center"
                vertical
                style={{
                  backgroundColor: "White",
                  width: "100%",
                  height: "60vh",
                }}
              >
                <p style={{ marginBottom: "2%", fontSize: "48px" }}>
                 GROW WITH THE HIVE
                </p>
                <h3>
                 Developer, landlord, or investor? Let’s grow the UrbanHive experience together.
                </h3>
                <Button onClick={()=>{navigate('/ContactUs')}} style={{ color: "white" }} size="large">
                  Partner with UrbanHive
                </Button>
              </Flex>
            </div>
          </Flex>
        ) : (
          <Flex vertical>
            <div className="background-container" style={{ height: "60vh" }}>
              {/* Background image */}
              <img
                src={
                  "/WhatsApp Image 2025-12-06 at 9.01.13 AM.jpeg"
                }
                alt="Background"
                className="background-image"
              />

              {/* Optional dark overlay */}
              <div className="background-overlay"></div>

              {/* Foreground content */}

              
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
                <p style={{ marginBottom: "2%", fontSize: "48px" }}>
                  Let's Grow Together
                </p>
                <h3>
                  Are you a developer, landlord, or investor? Let's bring
                  hospitality to life — together
                </h3>
                <Button onClick={()=>{navigate('/ContactUs')}} style={{ color: "white" }} size="large">
                  Partner with UrbanHive
                </Button>
              </Flex>
            </div>
          </Flex>
        )}

        <div>
          {screens.lg ? (
            <div>
              <Flex
                align="center"
                justify="space-between"
                gap={15}
                style={{
                  paddingTop: "3rem",
                  paddingBottom: "3rem",
                  paddingLeft: "120px",
                  paddingRight: "120px",
                  backgroundColor: "#133848",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <div style={{ width: "50%" }}>
                  <p
                    style={{
                      fontSize: "48px",
                      width: "100%",
                      wordWrap: "break-word",
                      color:'#CE8A39'
                    }}
                  >
                    Ready to unlock your property’s potential and join the UrbanHive?
                  </p>
                </div>

                <p style={{ color:'white' , fontSize: "20px", width: "50%" }}>
                  Your unit deserves to perform at its best. UrbanHive enhances every space with refined furnishing and modern styling, delivering consistent income without the burden of management. From the first piece of furniture to the perfect guest, we handle it all.
                </p>
              </Flex>

              <Flex
                align="center"
                justify="space-between"
                gap={20}
                style={{
                  paddingTop: "3rem",
                  paddingBottom: "3rem",
                  paddingLeft: "120px",
                  paddingRight: "120px",
                  backgroundColor: "#133848",
                  
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <Flex vertical style={{ width: "50%" }}>
                  <p
                    style={{
                      fontSize: "48px",
                      width: "100%",
                      wordWrap: "break-word",
                      color:'#CE8A39'
                    }}
                  >
                    WHO URBANHIVE COLLABORATES WITH?
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      width: "80%",
                      wordWrap: "break-word",
                      color:'white'
                    }}
                  >
                   UrbanHive collaborates with a wide spectrum of property partners to create flexible, high-performing rental solutions:
                  </p>
                  <Row>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" , color:'white' }}
                      span={8}
                    >
                      Homeowners
                    </Col>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" , color:'white' }}
                      span={8}
                      offset={8}
                    >
                      Building owners
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "5%" }}>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" , color:'white' }}
                      span={8}
                    >
                      Developers
                    </Col>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" , color:'white' }}
                      span={8}
                      offset={8}
                    >
                      Institutional Landlords
                    </Col>
                  </Row>
                </Flex>

                <div style={{ width: "50%" }}>
                  <img
                    style={{ height: "100%", borderRadius: "20px" }}
                    className="second-image"
                    alt="cover"
                    src="/WhatsApp Image 2222025-12-18 at 3.05.45 AM.jpeg"
                  ></img>
                </div>
              </Flex>
            </div>
          ) : (
            <div>
              <Flex
                align="center"
                vertical
                justify="space-between"
                style={{
                  padding: "20px",
                  backgroundColor: "#133848",
                  width: "100%",
                  marginTop: "10%",

                }}
              >
                <div>
                  <h1 style={{ width: "100%", wordWrap: "break-word" , color:'#CE8A39' }}>
                    Ready to unlock your property’s potential and join the UrbanHive?
                  </h1>
                </div>

                <p style={{color:"white"}} > 
                 UrbanHive collaborates with a wide spectrum of property partners to create flexible, high-performing rental solutions:
                </p>
              </Flex>

              <Flex
                align="center"
                vertical
                justify="space-between"
                gap={20}
                style={{
                  backgroundColor: "#133848",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <div>
                  <Flex align="center"  vertical gap={20}>
                    <h2 style={{ paddingRight:'2%' , paddingLeft:'2%' ,wordWrap: "break-word" , color:'#CE8A39' }}>
                      WHO URBANHIVE COLLABORATES WITH?
                    </h2>
                    <p
                      style={{
                        marginTop:'-2%',
                        fontSize: "18px",
                        width: "80%",
                        wordWrap: "break-word",
                        color:'white'
                      }}
                    >
                      UrbanHive collaborates with a wide spectrum of property partners to create flexible, high-performing rental solutions:
                    </p>
                  </Flex>
                  <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <Row>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "20px" , color:'white' }}
                        span={8}
                      >
                        Homeowners
                      </Col>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "20px" , color:'white' }}
                        span={8}
                        offset={8}
                      >
                        Building owners
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "20px" , color:'white'}}
                        span={8}
                      >
                        Developers
                      </Col>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "20px" , color:'white' }}
                        span={8}
                        offset={8}
                      >
                        Institutional Landlords
                      </Col>
                    </Row>
                  </div>
                </div>

                <div style={{ width: "80%" }}>
                  <img
                    style={{ height: "100%", borderRadius: "20px" }}
                    className="second-image"
                    alt="cover"
                    src="/WhatsApp Image 2222025-12-18 at 3.05.45 AM.jpeg"
                  ></img>
                </div>
              </Flex>
            </div>
          )}
        </div>

        <div>
          {screens.lg ? (
            <Flex
              vertical
              align="center"
              style={{
                paddingTop: "4rem",
                paddingBottom: "4rem",
                paddingLeft: "60px",
                paddingRight: "60px",
                marginTop: "10%",
                backgroundColor: "white",
                
              }}
            >
              <p style={{ fontSize: "40px", fontFamily: "sans-serif" }}>
                Everything is handled for you, start to finish.
              </p>
              <Flex
                align="center"
                style={{ width: "90%" }}
                gap={30}
                justify="center"
              >
                <Flex style={{ width: "30%" }} vertical align="center">
                  <img
                    width={"100%"}
                    src="/WhatsApp Imageee 2025-12-06 at 8.30.41 AM.jpeg"
                    alt="Resort"
                  />
                  <p style={{  fontSize: "24px", fontWeight: "bold" }}>
                    Boost Your Earnings
                  </p>
                  <p style={{ fontSize: "20px" }}>
                    Unlock the full earning potential of your property with strategic hospitality management. From premium furnishing and styling to targeted guest acquisition, every aspect is designed to boost occupancy and revenue. With seamless operations, ongoing monitoring, and optimized pricing, your property becomes a steady, hassle-free income stream.
                  </p>
                </Flex>
                <Flex style={{ width: "30%" }} vertical align="center">
                  <img
                    width={"100%"}
                    src="/WhatsApp Image 2025-12-06 at 8.30.41 AM.jpeg"
                    alt="Resort"
                  />
                  <p style={{  fontSize: "24px", fontWeight: "bold" }}>
                    We Handle It All
                  </p>
                  <p style={{ fontSize: "20px"}}>
                   At UrbanHive, we handle every detail of your property so you can relax and enjoy the returns. From professional furnishing and styling to guest management, bookings, and maintenance, every step is expertly managed. With continuous monitoring and seamless operations, your property is in capable hands — giving you peace of mind and a steady, hassle-free income.
                  </p>
                </Flex>
                <Flex style={{ maxWidth: "30%" }} vertical align="center">
                  <img
                    width={"100%"}
                    src="/WhatsApp Image 2025-12-06 at 8.30.40 AM.jpeg"
                    alt="Resort"
                  />
                  <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Active Management & Monitoring
                  </p>
                  <p style={{ fontSize: "20px" }}>
                    At UrbanHive, your property is always in expert hands. We actively manage every unit, from guest communications and bookings to maintenance and quality checks. Our ongoing monitoring ensures smooth operations, optimal occupancy, and maximum revenue, giving you confidence that your investment is performing at its best—24/7.
                  </p>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <div>
              <Flex
                vertical
                align="center"
                style={{
                  paddingTop: "3rem",
                  paddingBottom: "3rem",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  marginTop: "10%",
                  backgroundColor: "#133848",
                  
                }}
              >
                <h2
                  style={{ color:'#CE8A39',fontSize:'20px' , fontFamily: "sans-serif", wordBreak: "break-word" }}
                >
                  Everything is handled for you, start to finish.
                </h2>
                <Flex
                  vertical
                  align="center"
                  style={{ width: "90%" }}
                  gap={30}
                  justify="center"
                >
                  <Flex style={{ width: "100%" }} vertical align="center">
                    <img
                      width={"40%"}
                      src="/illustrations1.svg"
                      alt="Resort"
                    />
                    <p style={{ color:'white',fontSize: "24px", fontWeight: "bold" }}>
Boost Your Earnings</p>
                    <p style={{ fontSize: "20px", color:'white' }}>
                      Unlock the full earning potential of your property with strategic hospitality management. From premium furnishing and styling to targeted guest acquisition, every aspect is designed to boost occupancy and revenue. With seamless operations, ongoing monitoring, and optimized pricing, your property becomes a steady, hassle-free income stream.
                    </p>
                  </Flex>
                  <Flex style={{ width: "100%" }} vertical align="center">
                    <img
                      width={"40%"}
                      src="/illustrations2.svg"
                      alt="Resort"
                    />
                    <p style={{  color:'white',fontSize: "24px", fontWeight: "bold" }}>We Handle It All</p>
                    <p style={{ fontSize: "20px", color:'white' }}>
                      At UrbanHive, we handle every detail of your property so you can relax and enjoy the returns. From professional furnishing and styling to guest management, bookings, and maintenance, every step is expertly managed. With continuous monitoring and seamless operations, your property is in capable hands — giving you peace of mind and a steady, hassle-free income.
                    </p>
                  </Flex>
                  <Flex style={{ maxWidth: "100%" }} vertical align="center">
                    <img
                      width={"30%"}
                      src="/illustrations3.svg"
                      alt="Resort"
                    />
                    <p style={{color:'white', fontSize: "24px", fontWeight: "bold" }}>
Active Management & Monitoring</p>
                    <p style={{ fontSize: "20px", color:'white' }}>
                      At UrbanHive, your property is always in expert hands. We actively manage every unit, from guest communications and bookings to maintenance and quality checks. Our ongoing monitoring ensures smooth operations, optimal occupancy, and maximum revenue, giving you confidence that your investment is performing at its best—24/7.
                    </p>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          )}

<div>
  
  <Flex align="center" vertical style={{paddingRight:'10%' ,paddingLeft:'10%' , marginTop:'10%',marginBottom:'10%'}}>
    <p style={{fontSize:'48px' , fontFamily:'sans-serif'}}>How it works</p>


      <Flex  justify="flex-start" align="center"  gap={'3%'} style={{overflowX:'scroll' , scrollbarWidth:'none' , width:'100%'  }}>
            
            
          
            {/* Example collapsed text section */}
            <div   style={{minWidth: screens.lg ? '300px' : '200px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 1: Join the Hive</p>
              <p style={{fontSize:'16px' , color:'#292A2B' }}>Let UrbanHive handle your property and maximize its earning potential.</p>
            </div>

          <span style={{fontSize:'20px'}}> <FaArrowRight /></span> 


             <div   style={{ minWidth: screens.lg ? '300px' : '200px', height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 2: Property Assessment</p>
              <p style={{fontSize:'16px' , color:'#292A2B'}}>Our UrbanHive expert conducts an on-site visit to ensure your unit is ready for maximum performance in the Furnish & Rent program.</p>
            </div>

             <span style={{fontSize:'20px'}}> <FaArrowRight /></span> 


            <div  style={{minWidth: screens.lg ? '300px' : '200px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 3: Styling & Setup</p>
              <p style={{fontSize:'16px' , color:'#292A2B'}}>UrbanHive transforms your unit with premium furnishings and careful preparation, making it ready for guests and optimized for revenue.</p>
            </div>

            <span style={{fontSize:'20px'}}> <FaArrowRight /></span> 


            <div    style={{ minWidth: screens.lg ? '300px' : '200px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 4: Enjoy Hassle-Free Income</p>
              <p style={{fontSize:'16px' , color:'#292A2B' }}>With your unit fully managed and guest-ready, UrbanHive ensures steady returns while you relax.</p>
            </div>
            
          
      </Flex>

  </Flex>
</div>


</div>
{/* <FAQ></FAQ> */}

<Emaill></Emaill>
      </div>
    </ConfigProvider>
  );
};

export default Partner;

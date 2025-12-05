import "./Partner.css";
import { Button, Col, ConfigProvider, Flex, Grid, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import FAQ from "../FAQ/FAQ";
import Emaill from "../Emaill/Emaill";

const Partner = () => {
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  console.warn({ screens });

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "black",
            defaultHoverBg: "green",
            borderColorDisabled: "transparent",
            defaultHoverBorderColor: "transparent",
            defaultHoverColor: "transparent",
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
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
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
                    style={{
                      backgroundColor: "#CE8A39",
                      width: "45vw",
                      height: "100%",
                      padding: "20px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                    }}
                  >
                    <p style={{ marginBottom: "2%", fontSize: "48px" }}>
                      Let's Grow Together
                    </p>
                    <h3 style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                      Are you a developer, landlord, or investor? Let's bring
                      hospitality to life — together
                    </h3>
                    <Button style={{ color: "white" }} size="large">
                      Join as a partner
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
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
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
                  Let's Grow Together
                </p>
                <h3>
                  Are you a developer, landlord, or investor? Let's bring
                  hospitality to life — together
                </h3>
                <Button style={{ color: "white" }} size="large">
                  Join as a partner
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
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
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
                <Button style={{ color: "white" }} size="large">
                  Join as a partner
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
                  backgroundColor: "white",
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
                    }}
                  >
                    Looking to maximize your property's potential?
                  </p>
                </div>

                <p style={{ fontSize: "20px", width: "50%" }}>
                  Your unit could be earning – let us help you unlock its full
                  potential. With the right furnishing and styling that we
                  offer, your property will become your steady source of income
                  minus all the hassle. From furnishing to finding the right
                  tenants, let us take care of all the details.
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
                  backgroundColor: "white",
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
                    }}
                  >
                    Who do we partner with?
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      width: "80%",
                      wordWrap: "break-word",
                    }}
                  >
                    We partner with a wide variety of building owners, unit
                    owners, and developers to offer rental solutions tailored to
                    different needs
                  </p>
                  <Row>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" }}
                      span={8}
                    >
                      Homeowners
                    </Col>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" }}
                      span={8}
                      offset={8}
                    >
                      Building owners
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "5%" }}>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" }}
                      span={8}
                    >
                      Developers
                    </Col>
                    <Col
                      style={{ fontWeight: "bold", fontSize: "24px" }}
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
                    src="/KE_Nine_Oct23-9.webp"
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
                  backgroundColor: "white",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <div>
                  <h1 style={{ width: "100%", wordWrap: "break-word" }}>
                    Looking to maximize your property's potential?
                  </h1>
                </div>

                <p>
                  Your unit could be earning – let us help you unlock its full
                  potential. With the right furnishing and styling that we
                  offer, your property will become your steady source of income
                  minus all the hassle. From furnishing to finding the right
                  tenants, let us take care of all the details.
                </p>
              </Flex>

              <Flex
                align="center"
                vertical
                justify="space-between"
                gap={20}
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  marginTop: "10%",
                }}
              >
                <div>
                  <Flex align="center" vertical gap={20}>
                    <h2 style={{ wordWrap: "break-word" }}>
                      Who do we partner with?
                    </h2>
                    <p
                      style={{
                        fontSize: "18px",
                        width: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      We partner with a wide variety of building owners, unit
                      owners, and developers to offer rental solutions tailored
                      to different needs
                    </p>
                  </Flex>
                  <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <Row>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                        span={8}
                      >
                        Homeowners
                      </Col>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                        span={8}
                        offset={8}
                      >
                        Building owners
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "5%" }}>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                        span={8}
                      >
                        Developers
                      </Col>
                      <Col
                        style={{ fontWeight: "bold", fontSize: "24px" }}
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
                    src="/KE_Nine_Oct23-9.webp"
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
                We take care of everything so you don't need to.
              </p>
              <Flex
                align="center"
                style={{ width: "90%" }}
                gap={30}
                justify="center"
              >
                <Flex style={{ width: "30%" }} vertical align="center">
                  <img
                    width={"58%"}
                    src="/illustrations1.svg"
                    alt="Resort"
                  />
                  <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Maximized Revenues
                  </p>
                  <p style={{ fontSize: "20px", color: "#707071" }}>
                    Ghazala Resort and SPA in Rixos Alamein offers a private
                    beach area and beachfront access. Guests enjoy sea views and
                    a seasonal outdoor swimming pool.
                  </p>
                </Flex>
                <Flex style={{ width: "30%" }} vertical align="center">
                  <img
                    width={"50%"}
                    src="/illustrations2.svg"
                    alt="Resort"
                  />
                  <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    All Services Covered
                  </p>
                  <p style={{ fontSize: "20px", color: "#707071" }}>
                    Ghazala Resort and SPA in Rixos Alamein offers a private
                    beach area and beachfront access. Guests enjoy sea views and
                    a seasonal outdoor swimming pool.
                  </p>
                </Flex>
                <Flex style={{ maxWidth: "30%" }} vertical align="center">
                  <img
                    width={"25%"}
                    src="/illustrations3.svg"
                    alt="Resort"
                  />
                  <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    On-going Monitoring
                  </p>
                  <p style={{ fontSize: "20px", color: "#707071" }}>
                    Ghazala Resort and SPA in Rixos Alamein offers a private
                    beach area and beachfront access. Guests enjoy sea views and
                    a seasonal outdoor swimming pool.
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
                  backgroundColor: "white",
                  
                }}
              >
                <h2
                  style={{ fontFamily: "sans-serif", wordBreak: "break-word" }}
                >
                  We take care of everything so you don't need to.
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
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      Maximized Revenues
                    </p>
                    <p style={{ fontSize: "20px", color: "#707071" }}>
                      Ghazala Resort and SPA in Rixos Alamein offers a private
                      beach area and beachfront access. Guests enjoy sea views
                      and a seasonal outdoor swimming pool.
                    </p>
                  </Flex>
                  <Flex style={{ width: "100%" }} vertical align="center">
                    <img
                      width={"40%"}
                      src="/illustrations2.svg"
                      alt="Resort"
                    />
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      All Services Covered
                    </p>
                    <p style={{ fontSize: "20px", color: "#707071" }}>
                      Ghazala Resort and SPA in Rixos Alamein offers a private
                      beach area and beachfront access. Guests enjoy sea views
                      and a seasonal outdoor swimming pool.
                    </p>
                  </Flex>
                  <Flex style={{ maxWidth: "100%" }} vertical align="center">
                    <img
                      width={"30%"}
                      src="/illustrations3.svg"
                      alt="Resort"
                    />
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      On-going Monitoring
                    </p>
                    <p style={{ fontSize: "20px", color: "#707071" }}>
                      Ghazala Resort and SPA in Rixos Alamein offers a private
                      beach area and beachfront access. Guests enjoy sea views
                      and a seasonal outdoor swimming pool.
                    </p>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          )}

<div>
  
  <Flex align="center" vertical style={{paddingRight:'10%' ,paddingLeft:'10%' , marginTop:'10%'}}>
    <p style={{fontSize:'48px' , fontFamily:'sans-serif'}}>How it works</p>

      <Flex  justify="flex-start"  gap={'3%'} style={{overflowX:'scroll' , scrollbarWidth:'none' , width:'100%'  }}>
            
            {/* Example collapsed text section */}
            <div   style={{minWidth:'300px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 1: Register your unit</p>
              <p style={{fontSize:'16px' , color:'#292A2B' }}>Leave your unit to BirdNest to unlock its full rental potential</p>
            </div>

             <div   style={{ minWidth:'300px', height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 2: Schedule an On-Site Inspection</p>
              <p style={{fontSize:'16px' , color:'#292A2B'}}>A BirdNest specialist visits your property to assess its condition and suitability for our Furnish & Rent program.</p>
            </div>

            <div  style={{minWidth:'300px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 3: Furnishing & Prepping</p>
              <p style={{fontSize:'16px' , color:'#292A2B'}}>We furnish your unit, uplift it, or start renting straight away. Every detail is carefully curated to meet our signature hospitality standards, ensuring your property is guest-ready.</p>
            </div>

            <div    style={{minWidth:'300px' , height:'460px' , paddingTop:'2.5rem' ,paddingBottom:'2.5rem' , paddingRight:'1.5rem' ,paddingLeft:'1.5rem',borderRadius:'1.5rem' , backgroundColor:'white'}}>
              <HomeFilled style={{fontSize:'30px'}} />
              <p style={{fontSize:'24px' , color:'#111212'}}>Step 4: Start earning!</p>
              <p style={{fontSize:'16px' , color:'#292A2B' }}>Your property is listed, marketed, rented, and fully managed—while you enjoy consistent, hassle-free returns.</p>
            </div>
          
      </Flex>

  </Flex>
</div>


</div>
<FAQ></FAQ>

<Emaill></Emaill>
      </div>
    </ConfigProvider>
  );
};

export default Partner;

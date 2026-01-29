import "./Body.css";
import { Flex, Grid, Skeleton } from "antd";
import DropDownMenu from "../DropdownMenu/DropDownMenu";
import Details from "../Details/Details";
import Caro from "../Caro/Caro";
import Emaill from "../Emaill/Emaill";
import FAQ from "../FAQ/FAQ";
import { motion } from "framer-motion";
import { useState } from "react";

const { useBreakpoint } = Grid;

const Body = () => {

  const screens = useBreakpoint();

  const [videoLoading, setVideoLoading] = useState(true);

  return (
    <div>
      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Caro />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Flex align="center" vertical className="space">
          <Flex align="center" vertical className="space">
            <h1 className="titlee">STAY CONNECTED. STAY COMFORTABLE.</h1>
            <DropDownMenu />
          </Flex>

{videoLoading &&
(
<Skeleton.Image
        active

        style={{
          width: "100%",
          height: "30vh",
              marginTop:'3%'   
        }}
        
      />

)}

          <video
            
            className="videoo"
            width="90%"
            autoPlay
            muted
            loop
            playsInline
            style={{ display: videoLoading ? "none" : "block" , marginTop: "3%"  }}
    onLoadedData={() => setVideoLoading(false)}
    onError={() => setVideoLoading(false)}
    
            
          >
            <source
              src="/458700_Finance_District_3840x2160.mp4"
              type="video/mp4"
            />
          </video>
          

          {screens.lg ? (
            <div className="spacee">
              <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
              <Flex
                align="center"
                justify="space-between"
                style={{ width: "80%", marginTop: "20vh", marginLeft: "10%" }}
              >
                <h1
                  style={{
                    width: "30%",
                    color: "#CE8A39",
                    textAlign: "center",
                  }}
                >
                  URBAN LUXURY FOR FAMILIES, COUPLES, AND SOLO TRAVELERS.
                </h1>
                <div style={{ width: "45%" }}>
                  UrbanHive is where considered design meets heartfelt
                  hospitality. Every element is shaped to make your stay
                  simpler, cozier, and more inspiring. Our spaces bring people
                  closer and transform ordinary days into cherished memories.
                  Here, home isn’t a place you enter, it’s a feeling that stays
                  with you.
                </div>
              </Flex>
              </motion.div>
            </div>
          ) : (
            <div className="spaceee">
               <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
              <Flex
                align="center"
                justify="space-between"
                vertical
                style={{ padding: "5%" }}
              >
                <h1 style={{ color: "#CE8A39", textAlign: "center" }}>
                  URBAN LUXURY FOR FAMILIES, COUPLES, AND SOLO TRAVELERS.
                </h1>
                <div>
                  UrbanHive is where considered design meets heartfelt
                  hospitality. Every element is shaped to make your stay simpler,
                  cozier, and more inspiring. Our spaces bring people closer and
                  transform ordinary days into cherished memories. Here, home
                  isn’t a place you enter, it’s a feeling that stays with you.
                </div>
              </Flex>
              </motion.div>

            </div>
          )}
        </Flex>

      </motion.div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <Details />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <FAQ />
      </motion.div>

      {/* Email Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <Emaill />
      </motion.div>
    </div>
  );
};

export default Body;

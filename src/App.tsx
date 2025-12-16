import {
  Layout,
} from "antd";
import Header_app from "./Header/Header_app";
import Body from "./Body/Body";
import { BrowserRouter as  Router,Route, Routes } from "react-router-dom";
import Second_Caro from "./Second_Caro/Second_Caro";
import Cards from "./Cards/Cards";
import Listing from "./Listing/Listing";
import Partner from "./Partner/Partner";
import ContactUs from "./ContactUs/ContactUs";
import WhatsAppButton from "./Whatsapp/Whatsapp";

import Coming_soon from "./Coming_soon/Coming_soon";


const App = () => {
  return (
    
     <Router>
      <Layout style={{backgroundColor:'#E2CAA2'}}>
        <Header_app  />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<Second_Caro />} />
          <Route path="/Cards" element={<Cards/>} />
          <Route path="/Listing" element={<Listing/>} />
          <Route path="/Partner" element={<Partner/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Listing_2" element={<Coming_soon/>} />
          <Route path="/Listing_3" element={<Coming_soon/>} />
          {/* <Route path="/media" element={<Media />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <WhatsAppButton />
      </Layout>
    </Router>
  );
};

export default App;

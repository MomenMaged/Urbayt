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
import Listing_2 from "./Listing_2/Listing_2";
import Listing_3 from "./Listing_3/Listing_3";


const App = () => {
  return (
    
     <Router>
      <Layout>
        <Header_app  />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<Second_Caro />} />
          <Route path="/Cards" element={<Cards/>} />
          <Route path="/Listing" element={<Listing/>} />
          <Route path="/Partner" element={<Partner/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Listing_2" element={<Listing_2/>} />
          <Route path="/Listing_3" element={<Listing_3/>} />
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

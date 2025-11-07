import {
  Layout,
} from "antd";
import Header_app from "./Header/Header_app";
import Body from "./Body/Body";
import { BrowserRouter as  Router,Route, Routes } from "react-router-dom";
import Second_Caro from "./Second_Caro/Second_Caro";
import Cards from "./Cards/Cards";
import Listing from "./Listing/Listing";


const App = () => {
  return (
    
     <Router>
      <Layout>
        <Header_app />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<Second_Caro />} />
          <Route path="/Cards" element={<Cards/>} />
          <Route path="/Listing" element={<Listing/>} />
          
          {/* <Route path="/media" element={<Media />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

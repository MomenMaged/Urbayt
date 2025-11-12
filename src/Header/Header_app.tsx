import { ExpandOutlined} from '@ant-design/icons'
import {  Grid } from 'antd'
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react'
import './Header.css'
import Menu from '../Menu/Menu';
import { Link , useLocation } from 'react-router-dom';


const { useBreakpoint } = Grid;


const Header_app = () => {

  const location = useLocation();
const currentPath = location.pathname;

  const screens = useBreakpoint(); // returns an object with current breakpoints

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // if scrolled more than 50px
    
console.log('clicked')    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   
    <Header  className={isScrolled ? 'header header--small' : 'header'} >
    <Link to="./"><ExpandOutlined  style={{  display:'block', fontSize:'50px', color:'white'}}/></Link>
     {screens.lg&& !isScrolled ?
    <div style={{display:'flex', marginLeft:'auto'}}>
    
    
    
     <Link to="./Cards"><p className={`menu__item ${currentPath === '/Cards' ? 'menu__item--active' : ''}`}> Our listings</p></Link>
    <Link to="./Listing"><p className={`menu__item ${currentPath === '/Listing' ? 'menu__item--active' : ''}`} >Listing 1</p></Link>
    <Link to="./Listing_2"><p className={`menu__item ${currentPath === '/Listing_2' ? 'menu__item--active' : ''}`} >Listing 2</p></Link>
   <Link to="./Listing_3"><p className={`menu__item ${currentPath === '/Listing_3' ? 'menu__item--active' : ''}`} >Listing 3</p></Link>
    <Link to="./Partner"><p className={`menu__item ${currentPath === '/Partner' ? 'menu__item--active' : ''}`} >Become a partner</p></Link>
   <Link to="./ContactUs"><p className={`menu__item ${currentPath === '/ContactUs' ? 'menu__item--active' : ''}`} >Contact us</p></Link>
    </div> 
    : <div style={{display:'Flex',marginLeft:'auto'}}><Menu></Menu></div>
}
    </Header>

  
  )
}

export default Header_app

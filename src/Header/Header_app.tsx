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
    <Link to="./"><img 
    src={'/Logo1.png'}
    alt="Urban Hive Logo"
    className={isScrolled ? 'logo--small' : 'logo--large'}
  /></Link> 
     {screens.lg&& !isScrolled ?
    <div style={{display:'flex', marginLeft:'auto'}}>
    
    
    
     <Link to="./cards"><p className={`menu__item ${currentPath === '/Cards' ? 'menu__item--active' : ''}`}> OUR LISTINGS</p></Link>
    <Link to="./madinaty"><p className={`menu__item ${currentPath === '/Listing' ? 'menu__item--active' : ''}`} >MADINATY</p></Link>
   <Link to="./sokhna"><p className={`menu__item ${currentPath === '/Listing_3' ? 'menu__item--active' : ''}`} >SOKHNA</p></Link>
    <Link to="./cfc"><p className={`menu__item ${currentPath === '/Listing_2' ? 'menu__item--active' : ''}`} >CAIRO FESTIVAL CITY</p></Link>
    <Link to="./partner"><p className={`menu__item ${currentPath === '/Partner' ? 'menu__item--active' : ''}`} >JOIN OUR HIVE</p></Link>
   <Link to="./contact-us"><p className={`menu__item ${currentPath === '/ContactUs' ? 'menu__item--active' : ''}`} >CONTACT US</p></Link>
    </div> 
    : <div style={{display:'Flex',marginLeft:'auto'}}><Menu></Menu></div>
}
    </Header>

  
  )
}

export default Header_app

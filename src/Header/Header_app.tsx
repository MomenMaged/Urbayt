import { ExpandOutlined} from '@ant-design/icons'
import {  Grid } from 'antd'
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react'
import './Header.css'
import Menu from '../Menu/Menu';
import { Link , useLocation } from 'react-router-dom';
// const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//   message.info('Click on left button.');
//   console.log('click left button', e);
// };

// const handleMenuClick: MenuProps['onClick'] = (e) => {
//   message.info('Click on menu item.');
//   console.log('click', e);
// };



// const items: MenuProps['items'] = [
//   {
//     label: '1st menu item',
//     key: '1',
   
//   },
//   {
//     label: '2nd menu item',
//     key: '2',
    
//   },
//   {
//     label: '3rd menu item',
//     key: '3',
    
//     danger: true,
//   },
//   {
//     label: '4rd menu item',
//     key: '4',
    
//     danger: true,
//     disabled: true,
//   },
// ];

// const menuProps = {
//   items,
//   onClick: handleMenuClick,
// };

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   
    <Header  className={isScrolled ? 'header header--small' : 'header'} >
    <Link to="./"><ExpandOutlined  style={{ fontSize:'50px', color:'white' , marginTop:'50%'}}/></Link>
     {screens.lg&& !isScrolled ?
    <div style={{display:'flex', marginLeft:'auto'}}>
    {/* <Dropdown.Button  style={{paddingTop:'25px',}} menu={menuProps}>
    <p className='menu__item'>Projects</p>
    </Dropdown.Button> */}
    
    
     <Link to="./Cards"><p className={`menu__item ${currentPath === '/Cards' ? 'menu__item--active' : ''}`}> Our listings</p></Link>
    <p className='menu__item' >Listing 1</p>
    <p className='menu__item'>Listing 2</p>
    <p className='menu__item'>Listing 3</p>
    <p className='menu__item'>Become a partner</p>
   <p className='menu__item'>Contact us</p>
    </div> 
    : <div style={{display:'Flex',marginLeft:'auto'}}><Menu></Menu></div>
}
    </Header>

  // <MenuOutlined style={{ fontSize:'35px', color:'#f2f2f2'}}/>
  )
}

export default Header_app

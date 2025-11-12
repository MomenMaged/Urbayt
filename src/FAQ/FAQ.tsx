import { Button, Collapse, CollapseProps, Flex, Grid } from 'antd'
import './FAQ.css'
import { useState } from 'react';


const { useBreakpoint } = Grid;
const FAQ = () => {

    const screens = useBreakpoint();

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'LIVINGVILLE NINE APARTHOTEL',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '2',
    label: 'LIVINGVILLE THE TWO FIFTY',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '4',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '5',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
   {
    key: '6',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '7',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '8',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
   {
    key: '9',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
   {
    key: '10',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '11',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
   {
    key: '12',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '13',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '14',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '15',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '16',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
   {
    key: '17',
    label: 'This is panel header 3',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
];

const [showAll, setShowAll] = useState(false);
const visibleItems = showAll ? items : items.slice(0, 4);

const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div>
     {screens.lg ? (
          <div style={{marginTop:'10%' , marginBottom:'10%'}} >
           
              
              
          <Flex align='center'  vertical  >
              <h1 >FAQS</h1>
              <Collapse style={{  width:'80%',backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large'  items={visibleItems} onChange={onChange} />
           <Button type="primary"
              style={{ marginTop: '16px' }}
              onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show all'}</Button>
           </Flex>

            
          </div>
        ) : (
          <div style={{marginTop:'10%' , marginBottom:'10%'}} >
           
              
              
          <Flex align='center'  vertical  >
              <h1 >FAQS</h1>
              <Collapse style={{  width:'80%',backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large'  items={visibleItems} onChange={onChange} />
           <Button type="primary"
              style={{ marginTop: '16px' }}
              onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show all'}</Button>
           </Flex>

            
          </div>
        )}
        </div>
  )
}

export default FAQ
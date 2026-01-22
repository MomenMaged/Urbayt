import { Button, Collapse, CollapseProps, ConfigProvider, Flex, Grid } from 'antd'
import './FAQ.css'
import { useState } from 'react';
const { useBreakpoint } = Grid;
const FAQ = () => {

    const screens = useBreakpoint();

const items: CollapseProps['items'] = [
  
  
  {
    key: '2',
    label: 'Can I stay with my fiancé/Boyfriend/Girlfriend?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Following Egyptian law, if any of the couple holds an Arab passport, a marriage certificate is required.</li>
        <li>If either person is Egyptian or Arab, they must submit an official marriage proof — “Orfi” or unofficial documents are not accepted.</li>
        <li>Non-Arab passport holders may stay together without the need for a marriage certificate.</li>
      </ul>
    ),
  },

  {
    key: '8',
    label: 'Is WIFI internet available and reliable?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Yes, WiFi is available at all spaces.</li>
        <li>We frequently test connections to ensure reliability.</li>
      </ul>
    ),
  },
  
  {
    key: '5',
    label: 'What amenities are provided?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Cooking essentials and toiletries.</li>
        <li>Hotel-grade necessities (sugar, tea, coffee, tissue paper).</li>
        <li>Cleaning once per week.</li>
      </ul>
    ),
  },
  
  

  {
    key: '16',
    label: 'What is your cancellation policy?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Full refund if cancelled within 48 hours of booking and check-in is at least 14 days away.</li>
        <li>50% refund if cancelled at least 7 days before check-in.</li>
        <li>No refund for cancellations within 7 days of check-in.</li>
      </ul>
    ),
  },
  {
    key: '19',
    label: 'Are visits allowed?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>For Arab guests, visitors are allowed only if of the same gender.</li>
        <li>Mixed-gender visitors must be 1st or 2nd degree relatives.</li>
        <li>Otherwise, meetings must take place in public areas.</li>
      </ul>
    ),
  },
];



const [showAll, setShowAll] = useState(false);
const visibleItems = showAll ? items : items.slice(0, 4);

const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <ConfigProvider
    theme={{
      components:{
        Button:{
         defaultBg:'#133848',
         defaultHoverBg:'#CE8A39',
         ghostBg:'transparent',
         defaultActiveBg:'#CE8A39',
         defaultHoverBorderColor:'transparent',
         defaultHoverColor:'transparent',
         defaultBorderColor:'transparent',
         colorBgLayout:'black',
         defaultActiveBorderColor:'transparent'
         
        }
      }
    }}>
    <div>
     {screens.lg ? (
          <div style={{marginTop:'10%' , marginBottom:'10%'}} >
           
              
              
          <Flex align='center'  vertical  >
              <h1 >FAQS</h1>
              <Collapse style={{width:'80%',backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large'  items={visibleItems} onChange={onChange} />
           <Button 
              style={{ color:'white',marginTop: '16px' }}
              onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show all'}</Button>
           </Flex>

            
          </div>
        ) : (
          <div style={{marginTop:'10%' , marginBottom:'10%'}} >
           
              
              
          <Flex align='center'  vertical  >
              <h1 >FAQS</h1>
              <Collapse style={{ width:'80%',backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large'  items={visibleItems} onChange={onChange} />
           <Button 
              style={{ marginTop: '16px' , color:'white' }}
              onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show all'}</Button>
           </Flex>

            
          </div>
        )}
        </div>
        </ConfigProvider>
  )
}

export default FAQ
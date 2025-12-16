import { Button, Collapse, CollapseProps, ConfigProvider, Flex, Grid } from 'antd'
import './FAQ.css'
import { useState } from 'react';
const { useBreakpoint } = Grid;
const FAQ = () => {

    const screens = useBreakpoint();

const items: CollapseProps['items'] = [
  {
    key: '1',
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
    key: '2',
    label: 'Are visits allowed?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>For Arab guests, visitors are allowed only if of the same gender.</li>
        <li>Mixed-gender visitors must be 1st or 2nd degree relatives.</li>
        <li>Otherwise, meetings must take place in public areas.</li>
      </ul>
    ),
  },
  {
    key: '3',
    label: 'Do you allow pets?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>It depends on each Nest policy.</li>
      </ul>
    ),
  },
  {
    key: '4',
    label: 'Is there any kind of discounts?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>It depends on the duration — we offer daily rates, weekly, and monthly discounts.</li>
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
    key: '6',
    label: 'Can I see the space before confirming the reservation?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>We provide up-to-date real photos.</li>
        <li>If you still want to visit the space, contact us to schedule an appointment (if the unit is available).</li>
      </ul>
    ),
  },
  {
    key: '7',
    label: 'Where are your spaces located?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>District locations are viewable on our platform.</li>
        <li>The exact location is sent after confirming the reservation.</li>
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
    key: '9',
    label: 'How can I make/confirm a reservation?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>You can submit a booking request or make an instant booking by paying the full amount.</li>
        <li>You may also contact us via phone or WhatsApp.</li>
      </ul>
    ),
  },
  {
    key: '10',
    label: 'Are there any extra charges or fees?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>There is an extra cleaning fee for additional cleanings (more than once per week).</li>
        <li>An insurance deposit is required at check-in and refunded after inspection.</li>
      </ul>
    ),
  },
  {
    key: '11',
    label: 'When and how do I pay?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>
          For long-term rentals (30+ nights), booking is through birdnestlife.com. Payment includes 1 month in advance +
          1 month refundable insurance, then monthly payments.
        </li>
        <li>To confirm any booking, payment must be settled at least 5 days before check-in.</li>
        <li>We accept debit and credit cards only — no cash on arrival.</li>
      </ul>
    ),
  },
  {
    key: '12',
    label: 'What if booked through a third party?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>If you booked through a third party and need to cancel, please contact them directly.</li>
        <li>The third-party’s cancellation policy will apply.</li>
      </ul>
    ),
  },
  {
    key: '13',
    label: 'How do I extend my booking?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>You can contact our reservations team to extend—subject to availability.</li>
      </ul>
    ),
  },
  {
    key: '14',
    label: 'Where are your buildings?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>New Cairo</li>
        <li>Sheikh Zayed</li>
        <li>North Coast</li>
      </ul>
    ),
  },
  {
    key: '15',
    label: 'Is the deposit refundable?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Refund depends on the cancellation policy of each Nest.</li>
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
    key: '17',
    label: 'Why are the prices different from the website?',
    children: (
      <ul style={{borderBottom: '1.1px solid black' , paddingBottom:'2%'}}>
        <li>Website prices apply to long-term stays only.</li>
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
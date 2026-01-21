import { useState } from 'react';
import "./Cardd.css";
import { Flex, Grid } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import Emaill from '../Emaill/Emaill';
import { MdCancel } from 'react-icons/md';
import { GiEntryDoor } from 'react-icons/gi';
import { motion } from 'framer-motion';

const { useBreakpoint } = Grid;

const Cardd = () => {
  const screens = useBreakpoint();
  const [isExpanded, setIsExpanded] = useState(false); // <-- State for collapse toggle
  const [isExpand, setIsExpand] = useState(false); // <-- State for collapse toggle

const titless = [
    {
      Id:'1',
      feature:'Facilities',
      DescriptionT:'Madinaty’s well-designed and detailed masterplan was the result of a collaborative effort between three top U.S. design firms: HHCP, SWA, and SASKI.  The outcome has been an international standards modern city spanning over an area of 8000 Feddans, providing a contemporary lifestyle for 700k inhabitants in 120k housing units. Standing out as the beacon of modern cities, symbolized by our majestically-imposing main gate that makes Madinaty a piece of art.',
image2:"./984655a5-fdd4-43a6-bfc4-9d1bfe633e65.avif"

    },
{

  Id:'2',
  feature:'Exceptional Features',
  DescriptionT:'Wake up to breathtaking panoramic garden views, and step onto your private balcony, the perfect spot to enjoy a leisurely brunch or sip your morning coffee in peace. The bathroom is fully updated, featuring sleek finishes and all the essentials for a refreshing start to your day.For your peace of mind, the home is equipped with smoke detectors and carbon monoxide detectors, as well as exterior security cameras monitoring the front door for added security. Also Wifi internet included with a speed up to 100mbs.',
image2:'/2fc9e959-70bf-4f95-9b53-2873eb5ad1f2.avif'
},
{
  Id:'3',
  feature:'Location',
  DescriptionT:"Madinaty Compound in Egypt is strategically situated in New Cairo, on the Cairo - Suez Road; and thanks to this prime location, the project is: 2 km from the entrance of Shorouk City, A 10-minute drive from Heliopolis, 20 minutes from Downtown Cairo and Easily accessible through Ring Road.",
image2:'/f40f1e58-9dc9-467b-bbaf-8a1e1ce0919c.avif'
}
]

  const longText = (`
    You'll be staying in someone's home, so please treat it with care and respect. Check-in after 2:00 PM and Checkout before 11:00 AM
Door Access will deactivate automatically at the check out time, if you need to get access after 11:00 AM, please reach out to our team. Quiet hours are 10:00 PM - 7:00 AM. No parties or events are allowed at any of our properties. Smoking is not allowed inside any of our properties. For your peace of mind, the home is equipped with smoke detectors and carbon monoxide detectors. Couples should provide proof of marriage as per local Egyptian laws. There are exterior security cameras monitoring the front door for added security.
  `);

  const Cancel=(
  <><Flex vertical align='center' ><span style={{fontWeight:'bold'}}>Cancellation Policy</span> <p>Full refund for cancellations made within 48 hours of booking, if the check in date is at least 14 days away.
50% refund for cancellations made at least 7 days before check in.
No refunds for cancellations made within 7 days of check in.</p> </Flex>
             </>);

             const CancelPreview = (
  <p>
<strong>Cancellation Policy:</strong> Full refund for cancellations made within 48 hours of booking, if the check in date is at least 14 days away.
50% refund for cancellations made at least 7 days before check in...
  </p>
);

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
    <div>
      {/* --- Top Cards --- */}
      <div style={{ marginTop: '10%', marginBottom: '10%', paddingLeft: '13%', paddingRight: '13%' }}>
        <Flex  gap={'10%'} justify='center' vertical={!screens.lg}>
          {titless.map((i) => (
            <Flex vertical align='center' >
              <img className={ screens.lg ?'Imagee':'imagee2'} src={i.image2} alt="Resort" />
              <p style={{fontWeight:'bold'}}>{i.feature}</p>
              <p>{i.DescriptionT}</p>
            </Flex>
          ))}
        </Flex>
      </div>
          
      {/* --- Nest Rules --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div style={{ marginBottom: '10%', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '10%', padding: '5%' }}>
          <h1 style={{ marginBottom: '40px' }}>UrbanHive Rules</h1>
          <Flex gap={'10%'} justify='center' vertical={!screens.lg} align='space-between'>
            
            {/* Example collapsed text section  */}
           <Flex vertical style={{width:'100%'}}>
              <MdCancel style={{fontSize:'20px'}} />
              <h2>Cancellation & Changes</h2>
              
              {/* Collapse Section */}
              <p >
                {isExpand ? Cancel : CancelPreview}
              </p>

              <button
                onClick={() => setIsExpand(!isExpand)}
                className='ViewMore'
              >
                {isExpand ? 'View Less ▲' : 'View More ▼'}
              </button>
            </Flex>

            <Flex vertical>
             <GiEntryDoor style={{fontSize:'20px'}} />
              <h2>Guest Regulations</h2>
              <p style={{paddingTop:'2%'}}>For Arab passport holders, couples must submit an official marriage certificate. Visitors of the opposite sex are not allowed unless they're first degree relatives. </p>
            </Flex>

            <Flex  vertical>
              
              <HomeFilled style={{fontSize:'20px'}} />
              <h2>House Rules</h2>
              
              {/* Collapse Section */}
              <p >
                {isExpanded ? longText : `${longText.substring(0, 250)}...`}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
               className='ViewMore'
              >
                {isExpanded ? 'View Less ▲' : 'View More ▼'}
              </button>
            </Flex>
          </Flex>
        </div>
      </div>
      </motion.div>

      <Emaill />
    </div>
    </motion.div>
  );
};

export default Cardd;

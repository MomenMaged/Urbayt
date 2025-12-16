import { useState } from 'react';
import "./Cardd.css";
import { Flex, Grid } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import Emaill from '../Emaill/Emaill';
import { MdCancel } from 'react-icons/md';
import { GiEntryDoor } from 'react-icons/gi';

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


    },
{

  Id:'2',
  feature:'Exceptional Features',
  DescriptionT:'Wake up to breathtaking panoramic garden views, and step onto your private balcony, the perfect spot to enjoy a leisurely brunch or sip your morning coffee in peace. The bathroom is fully updated, featuring sleek finishes and all the essentials for a refreshing start to your day.For your peace of mind, the home is equipped with smoke detectors and carbon monoxide detectors, as well as exterior security cameras monitoring the front door for added security. Also Wifi internet included with a speed up to 100mbs.',

},
{
  Id:'3',
  feature:'Location',
  DescriptionT:"Madinaty Compound in Egypt is strategically situated in New Cairo, on the Cairo - Suez Road; and thanks to this prime location, the project is: 2 km from the entrance of Shorouk City, A 10-minute drive from Heliopolis, 20 minutes from Downtown Cairo and Easily accessible through Ring Road."
}
]

  const longText = (`
    Check In & Check Out Procedure: Check in at 15:00 and Check Out is 12:00 midday.
    You must return your key card at check out. Your key card will deactivate at midday
    on your departure day. If you require a late checkout please reactivate your card
    before midday with the Reception. Please check availability and prices with our
    Reception Team 1 day prior to departure. Phone – All rooms are supplied with phones
    – to call another room please dial 5 followed by the room number – this is free of
    charge. To call an outside line please dial 9 followed by the number – this is with
    charge. Laundry Service – All rooms are provided with laundry bag and price list –
    price is per item. Services with Extra Charge Premium Imported All kind of alcohol
    and imported beverages, Speciality Restaurants, beach cabanas, room service (24 hours),
    tennis courses & courts as well as lightning, beauty center, hairdresser, phone,
    laundry service, mini market, shops, rental cars, Shisha Lounge, babysitting, stroller
    for babies. The Hotel Management does not accept any responsibility for the loss of
    personal items, valuable or money which is left in the room or public areas. Please
    keep your belongings in the safe box provided in your room. All inclusive drinks are
    available from 11.00am to 11.00pm. Liqours and Spirits are not served in the
    Mediterrenean and Peoples Restaurant. Please contact with our Guest Relation Team
    if you have any allergies or special dietary requirements. Our Guest Relation Desk
    is situated in the Reception area. Beach towels are available at the towel huts located
    at the pool and beach. You can exchange the towel anytime, one towel per guest.
    Please do not make any cash payment for any extra charge service, please sign your
    check and pay your bill one day before or during check-out. For any assistance during
    your stay please contact your Guest Relation Team situated.
  `);

  const Cancel=(
  <><Flex vertical align='center' ><span style={{fontWeight:'bold'}}>Cancellation Policy</span> <p>Full refund for cancellations made within 48 hours of booking, if the check in date is at least 14 days away.
50% refund for cancellations made at least 7 days before check in.
No refunds for cancellations made within 7 days of check in.</p> <span style={{fontWeight:'bold'}}>Late check-out policy
</span> <p>Late check out requests are subject to availability.
check out between 11:00 AM till 15:00 PM on the same day of departure, guests will be charged 25% of the daily rate published on our website.
Check out between 15:00 PM till 18:00 PM on the same day of departure, guests will be charged 50% of the daily rate published on our website.
Check out after 18:00 PM on the same day of departure, guests will be charged full day charges of the daily rate published on our website.</p></Flex>
             </>);

             const CancelPreview = (
  <p>
<strong>Cancellation Policy:</strong> Full refund for cancellations made within 48 hours of booking, if the check in date is at least 14 days away.
50% refund for cancellations made at least 7 days before check in...
  </p>
);

  return (
    
    <div>
      {/* --- Top Cards --- */}
      <div style={{ marginTop: '10%', marginBottom: '10%', paddingLeft: '13%', paddingRight: '13%' }}>
        <Flex  gap={'10%'} justify='center' vertical={!screens.lg}>
          {titless.map((i) => (
            <Flex vertical align='center' >
              <img className={ screens.lg ?'Imagee':'imagee2'} src="/KE_Banafseg_Apr24-50.webp" alt="Resort" />
              <p style={{fontWeight:'bold'}}>{i.feature}</p>
              <p>{i.DescriptionT}</p>
            </Flex>
          ))}
        </Flex>
      </div>
          
      {/* --- Nest Rules --- */}
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

      <Emaill />
    </div>
  );
};

export default Cardd;

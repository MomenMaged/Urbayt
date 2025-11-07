import { useState } from 'react';
import "./Cardd.css";
import { Flex, Grid } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import Emaill from '../Emaill/Emaill';

const { useBreakpoint } = Grid;

const Cardd = () => {
  const screens = useBreakpoint();
  const [isExpanded, setIsExpanded] = useState(false); // <-- State for collapse toggle

  const longText = `
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
  `;

  return (
    <div>
      {/* --- Top Cards --- */}
      <div style={{ marginTop: '10%', marginBottom: '10%', paddingLeft: '13%', paddingRight: '13%' }}>
        <Flex align='center' gap={'10%'} justify='center' vertical={!screens.lg}>
          {[1, 2, 3].map((i) => (
            <Flex vertical align='center' key={i}>
              <img className={ screens.lg ?'Imagee':'imagee2'} src="/KE_Banafseg_Apr24-50.webp" alt="Resort" />
              <p>hello{i}</p>
              <p>Ghazala Resort and SPA in Rixos Alamein offers a private beach area and beachfront access. Guests enjoy sea views and a seasonal outdoor swimming pool.</p>
            </Flex>
          ))}
        </Flex>
      </div>
          
      {/* --- Nest Rules --- */}
      <div style={{ marginBottom: '10%', backgroundColor: 'white' }}>
        <div style={{ marginBottom: '10%', padding: '5%' }}>
          <h1 style={{ marginBottom: '40px' }}>Nest rules</h1>
          <Flex align='center' gap={'10%'} justify='center' vertical={!screens.lg}>
            
            {/* Example collapsed text section */}
            <Flex vertical>
              <HomeFilled />
              <h2>Cancellation & Changes</h2>
              <p>Ghazala Resort and SPA in Rixos Alamein offers a private beach area and beachfront access. Guests enjoy sea views and a seasonal outdoor swimming pool.</p>
            </Flex>

            <Flex vertical>
              <HomeFilled />
              <h2>Cancellation & Changes</h2>
              <p>Ghazala Resort and SPA in Rixos Alamein offers a private beach area and beachfront access. Guests enjoy sea views and a seasonal outdoor swimming pool.</p>
            </Flex>

            <Flex vertical>
              <HomeFilled />
              <h2>Check In & Check Out Procedure</h2>
              
              {/* Collapse Section */}
              <p >
                {isExpanded ? longText : `${longText.substring(0, 250)}...`}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#1890ff',
                  cursor: 'pointer',
                  padding: 2,
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
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

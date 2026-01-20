import { Collapse, CollapseProps, ConfigProvider, Flex, Grid } from 'antd'
import './Details.css'


const { useBreakpoint } = Grid;
const Details = () => {

    const screens = useBreakpoint();

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '2BR APARTHOTEL | MADINATY',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '2',
    label: '3BR POOL/SEA VIEW | BLUMAR',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
  {
    key: '3',
    label: '2BR GARDEN VIEW | CFC',
    children: <p><ul><li>24/7 CONCIERGE </li>
    <li>DEDICATED ON PROPERTY SECURITY </li>
    <li>BUSINESS LOUNGE</li></ul></p>,
  },
];

const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
     <ConfigProvider
    theme={{
      components:{
        Collapse:{
         

        }
      }
    }}>
    <div>
     {screens.lg ? (
          <div >
            <Flex gap={'10%'}
              align="center"
              justify="space-between"
              style={{ width: "80%", marginTop: "20vh", marginLeft: "10%" }}
            >
              <div className="Image">
              <img
                className="second-image"
                alt="cover"
                src="/Details.jpeg"
              ></img>
            </div>
              
<Flex vertical  style={{width:'40%'}}>
              <h1 style={{width:'100%'}}>WHERE EVERY DETAIL ELEVATES THE EXPERIENCE.</h1>
              <Collapse style={{  backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large' items={items} onChange={onChange} />
           </Flex>
            </Flex>
          </div>
        ) : (
          <div >
            <Flex
            gap='5px'
              align="center"
              justify="space-between"
              vertical
              style={{ width: "80%", marginLeft: "10%", marginTop: "10vh"  }}
            >
              <img
                className="second-image"
                alt="cover"
                src="/Details.jpeg"
              ></img>
              <Flex vertical >
                 <h1 style={{width:'100%'}}>WHERE EVERY DETAIL ELEVATES THE EXPERIENCE.</h1>
              <Collapse style={{  backgroundColor:'transparent', borderTop: '1.7px solid black'}} ghost expandIconPosition='end' size='large' items={items} onChange={onChange} />
           </Flex>
            </Flex>
          </div>
        )}
        </div>
        </ConfigProvider>
  )
}

export default Details
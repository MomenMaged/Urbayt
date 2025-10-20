import { Collapse, CollapseProps, Flex, Grid } from 'antd'
import './Details.css'


const { useBreakpoint } = Grid;
const Details = () => {

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
];

const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
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
                src="./KE_Nine_Oct23-9.webp"
              ></img>
            </div>
              
<Flex vertical  style={{width:'40%'}}>
              <h1 style={{width:'100%'}}>ARTFUL LIVING AMENITIES  AT EVERY DETAIL.</h1>
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
              style={{ width: "80%", marginLeft: "10%", marginTop: "10vh" }}
            >
              <img
                className="second-image"
                alt="cover"
                src="/KE_Nine_Oct23-9.webp"
              ></img>
              <Flex vertical >
                 <h1 style={{width:'100%'}}>ARTFUL LIVING AMENITIES  AT EVERY DETAIL.</h1>
              <Collapse style={{  backgroundColor:'transparent', borderTop: '1.7px solid black'}} expandIconPosition='end' size='large' items={items} onChange={onChange} />
           </Flex>
            </Flex>
          </div>
        )}
        </div>
  )
}

export default Details
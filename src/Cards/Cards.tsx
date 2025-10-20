import { Card, Flex, Grid } from 'antd';
import './Cards.css'

const { Meta } = Card;

const { useBreakpoint } = Grid;

const Cards = () => {

const screens = useBreakpoint();

  return ( 
    <div>
    { screens.lg ? (<Flex align='center' style={{marginLeft:'3%'}} gap={'5%'}>
  <Card className='Card_css'
    hoverable
    style={{ width: 350 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  <Card className='Card_css'
    hoverable
    style={{ width: 350 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  <Card className='Card_css'
    hoverable
    style={{ width: 350 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  </Flex> ) : 
  
  (<Flex align='center' vertical>
  
  <Flex align='center' gap={'5%'}  justify='space-between'>
  <Card className='Card_css'
    hoverable
    style={{ width: 160 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  <Card className='Card_css'
    hoverable
    style={{ width: 160 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  </Flex>
   <Card className='Card_css'
    hoverable
    style={{ width: '250px'}}
    
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
 </Flex>
   ) 
  }
  </div>
  )
}

export default Cards
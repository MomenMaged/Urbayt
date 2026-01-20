import { Flex , Carousel } from 'antd'
import { Content } from 'antd/es/layout/layout'
import './Caro.css'

const Caro = () => {
  return (
          <Carousel
        className="custom-carousel"
        dotPosition="bottom"
        autoplay
        autoplaySpeed={2000}       
      >
        <Content style={{ padding: 0, margin: 0 }}>
          <Flex gap={"middle"} align="center" vertical>
            <div className="CoverImg">
              <img
                className="cover-image"
                alt="cover"
                src="/home_page.jpeg"
              ></img>
            </div>
            
          </Flex>
        </Content>
        <Content style={{ padding: 0, margin: 0 }}>
          <Flex gap={"middle"} align="center" vertical>
            <div className="CoverImg">
              <img
                className="cover-image"
                alt="cover"
                src="/Madinaty-gate-scaled.jpg"
              ></img>
            </div>
           
          </Flex>
        </Content>
      </Carousel>
  )
}

export default Caro
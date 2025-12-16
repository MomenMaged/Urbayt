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
                src="/KE_Nine_Oct23-9.webp"
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
                src="/KE_Banafseg_Apr24-50.webp"
              ></img>
            </div>
           
          </Flex>
        </Content>
      </Carousel>
  )
}

export default Caro
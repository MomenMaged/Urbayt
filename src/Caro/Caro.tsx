import { Flex , Carousel } from 'antd'
import { Content } from 'antd/es/layout/layout'
import './Caro.css'
import React from 'react'

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
                src="./src/assets/KE_Nine_Oct23-9.webp"
              ></img>
            </div>
            <div>First image</div>
          </Flex>
        </Content>
        <Content style={{ padding: 0, margin: 0 }}>
          <Flex gap={"middle"} align="center" vertical>
            <div className="CoverImg">
              <img
                className="cover-image"
                alt="cover"
                src="./src/assets/KE_Banafseg_Apr24-50.webp"
              ></img>
            </div>
            <div>Second image</div>
          </Flex>
        </Content>
      </Carousel>
  )
}

export default Caro
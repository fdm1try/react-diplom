import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import SpinnerImage from '../../assets/img/loader.png';
import BannerImage from '../../assets/img/banner.jpg';
import LogoImage from '../../assets/img/header-logo.png';


export interface IMainTemplate {
  children?: React.ReactNode;
}

const preloadAssets = () => {
  for (const image of [SpinnerImage, BannerImage, LogoImage]) {
    const img = new Image();
    img.src = image;
  }
}

export const MainTemplate: React.FC<IMainTemplate> = ({ children }) => {

  useEffect(() => {
    preloadAssets();
  }, [])

  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}

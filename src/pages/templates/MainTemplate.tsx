import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export interface IMainTemplate {
  children?: React.ReactNode;
}

export const MainTemplate: React.FC<IMainTemplate> = ({ children }) => {
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

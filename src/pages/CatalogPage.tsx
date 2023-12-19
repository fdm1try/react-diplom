import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { CatalogWidget } from '../components/CatalogWidget';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

export const CatalogPage = () => {
  const location = useLocation();
  const catalogWidgetRef = React.createRef<HTMLElement>();

  useEffect(() => {
    if (location.state?.searchQuery) {
      setTimeout(() => catalogWidgetRef.current?.scrollIntoView(), 200);
    }
  }, [location.state]);  

  return (
    <>
      <Header />
      <main className='container'>
        <Row>
          <Col>
            <Banner />
            <CatalogWidget ref={catalogWidgetRef} withSearch={true} searchQuery={location.state?.searchQuery || undefined} />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  )
}

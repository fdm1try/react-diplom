import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Contacts } from './Contacts';
import { Copyright } from './Copyright';
import { Information } from './Information';
import { Payment } from './Payment';

export const Footer = () => {
  return (
    <footer className='container bg-light footer'>
      <Row>
        <Col>
          <Information />
        </Col>
        <Col>
          <Payment />
          <Copyright />
        </Col>
        <Col className='text-right'>
          <Contacts />
        </Col>
      </Row>
    </footer>
  )
}

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TCatalogItem, CatalogItem, TCatalogItemViewType } from './CatalogItem';

export interface ICatalogList {
  items: Array<TCatalogItem>;
  view: TCatalogItemViewType;
}

export const CatalogList: React.FC<ICatalogList> = (props) => {
  return (
    <Row>
      {props.items.map((item) => (
        <Col key={`item-${item.id}`} xs={4}>
          <CatalogItem view={props.view} item={item} />
        </Col>
      ))}
    </Row>
  )
}

import './CatalogItem.css';
import { CardView } from './CardView';
import { DetailsView } from './DetailsView';

export type TCatalogItem = {
  id: number;
  category: number;
  title: string;
  images: Array<string>;
  price: number;
}

export type TCatalogItemSize = { 
  size: string;
  available: boolean;
}

export type TCatalogItemDetails = TCatalogItem & {
  sku: string;
  color: string;
  reason: string;
  season: string;
  manufacturer: string;
  material: string;
  sizes: Array<TCatalogItemSize>;
}

export type TCatalogItemViewType = 'card' | 'detailed';


export interface ICatalogItem {
  item: TCatalogItem|TCatalogItemDetails;
  view: TCatalogItemViewType;
}

export const CatalogItem: React.FC<ICatalogItem> = ({item, view}) => {
  switch (view) {
    case 'card': return <CardView item={item} />
    case 'detailed': 
      return <DetailsView item={item as TCatalogItemDetails} />
  }
}

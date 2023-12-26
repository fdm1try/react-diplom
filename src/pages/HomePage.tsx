import { TopSalesWidget } from '../components/TopSalesWidget';
import { CatalogWidget } from '../components/CatalogWidget';
import { WithBanner } from './templates';

export const HomePage = () => {
  return (
    <WithBanner>
      <TopSalesWidget />
      <CatalogWidget />
    </WithBanner>
  )
}

import { useTopSalesQuery } from '../../redux/api';
import { CatalogList } from '../Catalog/CatalogList';

export const TopSalesWidget = () => {
  const { data, isLoading, isFetching } = useTopSalesQuery(null);

  if (!data) return <></>;

  return (
    <section className='top-sales'>
      <h2 className='text-center'>Хиты продаж!</h2>
      <CatalogList view='card' items={data} />
    </section>
  )
}

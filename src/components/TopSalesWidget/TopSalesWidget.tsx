import { Error } from '../Error';
import { useTopSalesQuery } from '../../redux/api';
import { CatalogList } from '../Catalog/CatalogList';
import { Loader } from '../Loader';
import { TCatalogItem } from '../Catalog/CatalogItem';

export const TopSalesWidget = () => {
  const { data, isLoading, isFetching, refetch, error } = useTopSalesQuery(null);
  const errorMessage = 'Не удалось получить данные с сервера.';

  const errorDetails = () => {
    if (!error || !('status' in error) || !error.data) return;
    return `HTTP code ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return (
    <section className='top-sales'>
      <h2 className='text-center'>Хиты продаж!</h2>
      { (isLoading || isFetching) && <Loader /> }
      { !(isLoading || isFetching || error) && <CatalogList view='card' items={data as Array<TCatalogItem>} /> }
      { !(isLoading || isFetching) &&error && (
        <Error variant='inline' details={errorDetails()} message={errorMessage} onRetry={refetch} />
      ) }
    </section>
  )
}

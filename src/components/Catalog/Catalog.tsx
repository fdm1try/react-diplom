import { useCatalogFilter } from '../../hooks';
import { Error } from '../Error';
import { Loader } from '../Loader';
import { CatalogList } from './CatalogList';

export type TCatalogFilter = {
  categoryId?: number;
  searchQuery?: string;
}

export interface ICatalog {
  filter?: TCatalogFilter;
}

export const Catalog: React.FC<ICatalog> = (props) => {
  const { items, hasMoreItems, loadMoreItems, isLoading, error, refetch } = useCatalogFilter({ ...props.filter });

  const errorMessage = 'Не удалось получить данные с сервера.';
  const errorDetails = () => {
    if (!error || !('status' in error) || !error.data) return;
    return `HTTP code ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return (
    <>
      <CatalogList view='card' items={items} />
      { isLoading && !error && <Loader /> }
      <div className='text-center'>
        { hasMoreItems && !isLoading && !error && (
          <button className='btn btn-outline-primary' onClick={loadMoreItems}>Загрузить ещё</button>
        )}
        { !isLoading && error && (
          <Error variant='inline' details={errorDetails()} message={errorMessage} onRetry={refetch} />
        )}
        { !hasMoreItems && (
          <p>Показаны все товары по вашему запросу.</p>
        )}
      </div>
    </>
  )
}

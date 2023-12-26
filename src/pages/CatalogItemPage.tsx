import { useParams } from 'react-router-dom';
import { useItemQuery } from '../redux/api';
import { CatalogItem } from '../components/Catalog/CatalogItem';
import { Error } from '../components/Error';
import { Loader } from '../components/Loader';
import { WithBanner } from './templates';

export const CatalogItemPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isFetching, refetch } = useItemQuery(Number(id));

  const errorDetails = () => {
    if (!error || !('status' in error) || !error.data) return;
    return `HTTP code ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return (
    <WithBanner>
      { (isLoading || isFetching) && (
        <>
          <br />
          <Loader/> 
          <br />
        </>
      )}
      { !(isFetching || isLoading) && error && (
        <Error message='Не удалось получить данные с сервера' details={errorDetails()} onRetry={refetch} />
      )}
      { !(isLoading || isFetching) && !error && data && <CatalogItem view={'detailed'} item={data} /> }
    </WithBanner>
  )
}

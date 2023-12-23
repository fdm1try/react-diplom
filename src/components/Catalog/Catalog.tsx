import { useCatalogFilter } from '../../hooks';
import { CatalogList } from './CatalogList';

export type TCatalogFilter = {
  categoryId?: number;
  searchQuery?: string;
}

export interface ICatalog {
  filter?: TCatalogFilter;
}

export const Catalog: React.FC<ICatalog> = (props) => {
  const { items, hasMoreItems, loadMoreItems, isLoading } = useCatalogFilter({ ...props.filter });
  return (
    <>
      <CatalogList view='card' items={items} />
      <div className='text-center'>
        { hasMoreItems && (
          <button className='btn btn-outline-primary' disabled={isLoading } onClick={loadMoreItems}>Загрузить ещё</button>
        )}
      </div>
    </>
  )
}

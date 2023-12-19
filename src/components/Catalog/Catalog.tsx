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
      <CatalogList items={items} />
      { hasMoreItems && (
        <button disabled={isLoading } onClick={loadMoreItems}>Еще</button>
      )}
    </>
  )
}

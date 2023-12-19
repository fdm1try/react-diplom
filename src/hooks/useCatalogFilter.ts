import { useState, useEffect, useRef } from 'react';
import { useItemsQuery, IRequestItemList } from '../redux/api';
import { TCatalogItem } from '../components/Catalog/CatalogItem';

const CATALOG_ITEMS_PER_PAGE = 6;

export interface IProps {
  searchQuery?: string;
  categoryId?: number;
}

export const useCatalogFilter = (props: IProps) => {
  const prevProps = useRef<IProps>({...props});

  const isPropsChanged = () => {
    const prev: IProps = prevProps.current;
    if (!prev || prev.searchQuery !== props.searchQuery || prev.categoryId !== props.categoryId) return true;
    return false;
  }

  const [queryParams, setQueryParams] = useState<IRequestItemList>({q: props.searchQuery, categoryId: props.categoryId});
  const [items, setItems] = useState<Array<TCatalogItem>>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const { data, isLoading, isFetching, error } = useItemsQuery(queryParams);

  useEffect(() => {
    if (!isPropsChanged()) return;
    prevProps.current = props;
    setItems([]);
    setHasMoreItems(true);
    setQueryParams({ q: props.searchQuery, offset: 0, categoryId: props.categoryId});
  }, [props]);

  useEffect(() => {
    setItems([]);
  }, []);

  useEffect(() => {
    if (!data) return;
    if (data.length < CATALOG_ITEMS_PER_PAGE) setHasMoreItems(false);
    setItems((state) => [...state, ...data]);
  }, [data])

  const loadMoreItems = () => {
    if (!hasMoreItems) return;
    setQueryParams((state) => ({...state, offset: (state.offset || 0) + CATALOG_ITEMS_PER_PAGE}));
  }

  return { items, isLoading: isLoading || isFetching, error, hasMoreItems, loadMoreItems};
}

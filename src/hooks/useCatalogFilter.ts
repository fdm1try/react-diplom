/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useItemsMutation } from '../redux/api';
import { TCatalogItem } from '../components/Catalog/CatalogItem';

const CATALOG_ITEMS_PER_PAGE = 6;

export interface IProps {
  searchQuery?: string;
  categoryId?: number;
}

type TItemsState = {
  items: Array<TCatalogItem>;
  hasMoreItems: boolean;
}

const initialItemsState = { items: [], hasMoreItems: true };

export const useCatalogFilter = (props: IProps) => {
  const prevProps = useRef<IProps>({...props});
  const [itemsState, setItemsState] = useState<TItemsState>(initialItemsState);
  const [fetchItems, { data, isLoading, error }] = useItemsMutation();
  const request = useRef<{abort: () => void}>();

  const isPropsChanged = () => {
    const prev: IProps = prevProps.current;
    return !prev || prev.searchQuery !== props.searchQuery || prev.categoryId !== props.categoryId;
  }

  const fetchLatest = (offset: number = itemsState.items.length) => {
    if (isLoading) request.current?.abort();
    request.current = fetchItems({ q: props.searchQuery, categoryId: props.categoryId, offset });
  }

  useEffect(() => {
    if (!isLoading && !itemsState.items.length) fetchLatest(0);
    return () => {
      request.current?.abort();
      setItemsState(initialItemsState);
    }
  }, []);

  useEffect(() => {
    if (!isPropsChanged()) return;
    prevProps.current = props;
    setItemsState(initialItemsState);
    fetchLatest(0);
  }, [props]);  

  

  useEffect(() => {
    if (!data) return;
    const ids = itemsState.items.map((item) => item.id);
    const newItems = data.filter((item) => !ids.includes(item.id))
    setItemsState((state) => ({ items: [...state.items, ...newItems], hasMoreItems: data.length >= CATALOG_ITEMS_PER_PAGE}));
  }, [data])

  const loadMoreItems = () => {
    if (!itemsState.hasMoreItems) return;
    fetchLatest(itemsState.items.length);
  }

  const refetch = () => fetchLatest();

  return { items: itemsState.items, isLoading, error, hasMoreItems: itemsState.hasMoreItems, loadMoreItems, refetch };
}

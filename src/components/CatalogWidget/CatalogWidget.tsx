/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Catalog } from '../Catalog';
import { CatalogCategories, TCatalogCategory, defaultCategory } from '../Catalog/CatalogCategories';
import { Search } from '../Search';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setFilter } from '../../redux/slices/CatalogFilterSlice';

export interface ICatalogWidget {
  withSearch?: boolean;
}

export const CatalogWidget: React.FC<ICatalogWidget> = (props) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.catalogFilter);
  const timeoutHandler = useRef<number>();

  const catalogRef = useRef<HTMLElement>(null);
  
  const handleCategoryChange = (category: TCatalogCategory) => {
    const id = category.id === defaultCategory.id ? undefined : category.id;
    dispatch(setFilter({...filter, categoryId: id }));
  }

  const handleSearchQueryChange = (value: string) => {
    if (timeoutHandler.current) clearTimeout(timeoutHandler.current);
    timeoutHandler.current = setTimeout(() => dispatch(setFilter({...filter, searchQuery: value || undefined})), 500);
  }

  useEffect(() => {
    if (!props.withSearch && filter.searchQuery)
      dispatch(setFilter({ ...filter, searchQuery: undefined }));
  }, []);

  useEffect(() => {
    if (props.withSearch && filter.searchQuery) setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [filter.searchQuery]);

  return (
    <section ref={catalogRef} className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      <CatalogCategories categoryId={filter.categoryId} onCategoryChange={handleCategoryChange} />
      { props.withSearch && (
        <Search className='catalog-search-form' value={filter.searchQuery} 
          onChange={handleSearchQueryChange}/>
      )}
      <Catalog filter={filter} />
    </section>
  )
}

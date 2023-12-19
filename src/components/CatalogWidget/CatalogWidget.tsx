/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useState } from 'react';
import { Catalog, TCatalogFilter } from '../Catalog';
import { CatalogCategories, TCatalogCategory, defaultCategory } from '../Catalog/CatalogCategories';
import { Search } from '../Search';
import { useStateWithDelay } from '../../hooks';

export interface ICatalogWidget {
  withSearch?: boolean;
  searchQuery?: string;
}

export const CatalogWidget = forwardRef<HTMLElement, ICatalogWidget>((props: ICatalogWidget, ref) => {
  const [filter, setFilter] = useState<TCatalogFilter>({ searchQuery: props.withSearch && props.searchQuery || undefined });
  const [searchQuery, setSearchQuery] = useStateWithDelay<string|undefined>(500, filter.searchQuery);
  
  const handleCategoryChange = (category: TCatalogCategory) => {
    const id = category.id === defaultCategory.id ? undefined : category.id;
    setFilter((state) => ({...state, categoryId: id}));
  }

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  }

  useEffect(() => {
    setFilter((state) => ({...state, searchQuery}))
  }, [searchQuery]);

  useEffect(() => {
    const query = props.withSearch && props.searchQuery || undefined;
    setSearchQuery(query, true);
  }, [props]);
  

  return (
    <section ref={ref} className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      <CatalogCategories onCategoryChange={handleCategoryChange} />
      { props.withSearch && (
        <Search className='catalog-search-form' value={searchQuery} 
          onChange={handleSearchQueryChange}/>
      )}
      <Catalog filter={filter} />
    </section>
  )
});

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useCategoriesQuery } from '../../redux/api';

export type TCatalogCategory = {
  id: number;
  title: string;
}

export interface ICatalogCategories {
  onCategoryChange?: (category: TCatalogCategory) => void;
}

export const defaultCategory = { id: -1, title: 'Все'};

export const CatalogCategories: React.FC<ICatalogCategories> = (props) => {
  const { data, error, refetch } = useCategoriesQuery(null);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [categories, setCategories] = useState<Array<TCatalogCategory>>([defaultCategory]);

  useEffect(() => {
    refetch();
  }, [error]);

  const categoryLinkClassName = (id: number) => {
    return `nav-link ${id === currentId ? 'active' : ''}`;
  }

  const handleCategoryLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLAnchorElement)) return;
    const id = Number(e.target.dataset.id);
    if (!id) return;
    setCurrentId(id);
    if (!props.onCategoryChange) return;
    const current = categories.find((item) => item.id === id);
    if (!current) throw new Error(`Category with id ${id} not exists in categories list`);
    props.onCategoryChange(current);
  }

  useEffect(() => {
    if (!data) return;
    setCategories([defaultCategory, ...data]);
  }, [data])

  
  return (
    <ul className='catalog-categories nav justify-content-center'>
      {categories.map((category) => (
        <li key={category.id} className='nav-item'>
          <a data-id={category.id} onClick={handleCategoryLinkClick}
            className={categoryLinkClassName(category.id)} href='#'
          >
            {category.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

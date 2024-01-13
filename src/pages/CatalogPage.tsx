/* eslint-disable react-hooks/exhaustive-deps */
import { CatalogWidget } from '../components/CatalogWidget';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { WithBanner } from './templates';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setFilter } from '../redux/slices/CatalogFilterSlice';

export const CatalogPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const catalogFilter = useAppSelector((state) => state.catalogFilter);

  useEffect(() => {
    if (location.state?.searchQuery) {
      dispatch(setFilter({...catalogFilter, searchQuery: location.state.searchQuery}));
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);  

  return (
    <WithBanner>
      <CatalogWidget withSearch={true} />
    </WithBanner>
  )
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCatalogItem, TCatalogItemDetails } from '../components/Catalog/CatalogItem';
import { TCatalogCategory } from '../components/Catalog/CatalogCategories';

export type TResponseItemList = Array<TCatalogItem>;

export type TResponseCategoryList = Array<TCatalogCategory>;

export interface IRequestItemList {
  offset?: number;
  categoryId?: number;
  q?: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  }),
  endpoints: (build) => ({
    topSales: build.query<TResponseItemList, unknown>({
      query: () => ({ url: 'top-sales' }),
    }),
    categories: build.query<TResponseCategoryList, unknown>({
      query: () => ({ url: 'categories' }),
    }),
    items: build.query<TResponseItemList, IRequestItemList>({
      query: ({offset, categoryId, q}) => {
        const params = new URLSearchParams();
        if (offset) params.append('offset', offset.toString());
        if (categoryId) params.append('categoryId', categoryId.toString());
        if (q) params.append('q', q);
        return { url: `items?${params}` }
      },
    }),    
    item: build.query<TCatalogItemDetails, number>({
      query: (id) => ({ url: `items/${id}` }),
    }),
  })
})

export const { useTopSalesQuery, useCategoriesQuery, useItemsQuery, useItemQuery } = api;
export default api.reducer;
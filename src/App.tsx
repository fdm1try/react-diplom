import './App.css'
import { Routes, Route } from 'react-router-dom';
import { HomePage, CatalogPage, AboutPage, ContactsPage, CatalogItemPage, NotFoundPage, CartPage } from './pages';
import { useCartStateSync } from './hooks';


function App() {
  useCartStateSync();
  
  return (
    <Routes>
      <Route path='/' index Component={HomePage} />
      <Route path='/catalog' Component={CatalogPage} />
      <Route path='/about' Component={AboutPage} />
      <Route path='/contacts' Component={ContactsPage} />
      <Route path='/catalog/:id' Component={CatalogItemPage} />
      <Route path='/cart' Component={CartPage} />
      <Route path='*' Component={NotFoundPage} />
    </Routes>
  )
}

export default App

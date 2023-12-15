import './App.css'
import { Routes, Route } from 'react-router-dom';
import { HomePage, CatalogPage, AboutPage, ContactsPage, CatalogItemPage, NotFoundPage } from './pages';


function App() {

  return (
    <Routes>
      <Route path='/' index Component={HomePage} />
      <Route path='/catalog.html' Component={CatalogPage} />
      <Route path='/about.html' Component={AboutPage} />
      <Route path='/contacts.html' Component={ContactsPage} />
      <Route path='/catalog/:id.html' Component={CatalogItemPage} />
      <Route path='*' Component={NotFoundPage} />
    </Routes>
  )
}

export default App


import './App.css';
import CategoryPage from './pages/CategoryPage';
import DogsPage from './pages/DogsPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import DogPage from './pages/DogPage';
import ProductPage from './pages/ProductPage';
import { AppProvider } from './AppContex';
import AboutPage from './pages/AboutPage';

function App() {



  return (
    <AppProvider>
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/category" element={<CategoryPage></CategoryPage>}></Route>
    <Route path="/category/dogs/:breed" element={<DogsPage></DogsPage>}></Route>
    <Route path="/Products" element={<ProductsPage/>}></Route>
    <Route path="/Products/product/:productid" element={<ProductPage></ProductPage>}></Route>
    <Route path="/dog/:id" element={<DogPage/>}></Route>
    <Route path="/about" element={<AboutPage />}></Route>
    </Routes>

    </BrowserRouter>
     
    </div>

      </AppProvider>
  );
}

export default App;

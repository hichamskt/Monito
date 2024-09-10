
import './App.css';
import CategoryPage from './pages/CategoryPage';
import DogsPage from './pages/DogsPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import DogPage from './pages/DogPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/category" element={<CategoryPage></CategoryPage>}></Route>
    <Route path="/category/dogs" element={<DogsPage></DogsPage>}></Route>
    <Route path="/Products" element={<ProductsPage/>}></Route>
    <Route path="/dog" element={<DogPage/>}></Route>
    </Routes>

    </BrowserRouter>
     
    </div>
  );
}

export default App;


import './App.css';
import CategoryPage from './pages/CategoryPage';
import DogsPage from './pages/DogsPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/category" element={<CategoryPage></CategoryPage>}></Route>
    <Route path="/category/dogs" element={<DogsPage></DogsPage>}></Route>
    </Routes>

    </BrowserRouter>
     
    </div>
  );
}

export default App;

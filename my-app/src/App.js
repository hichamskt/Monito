
import './App.css';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/category" element={<CategoryPage></CategoryPage>}></Route>
    </Routes>

    </BrowserRouter>
     
    </div>
  );
}

export default App;

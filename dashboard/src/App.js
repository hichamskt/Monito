import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Pages/Root"
import DashBoard from './Pages/DashBoard';
import DogsPage from './Pages/DogsPage';
import AddDogForm from './Components/AddDogForm/AddDogForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[{
      path:"/dashboard",
      element:<DashBoard></DashBoard>
    },
  {
   path:"/dogs" ,
   element:<DogsPage/>,
  }]
  },
]);

function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;

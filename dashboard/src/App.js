import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Pages/Root"
import DashBoard from './Pages/DashBoard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[{
      path:"/dashboard",
      element:<DashBoard></DashBoard>
    },
  {
    
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

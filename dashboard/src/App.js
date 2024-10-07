import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import DashBoard from "./Pages/DashBoard";
import DogsPage from "./Pages/DogsPage";
import AddDogForm from "./Components/AddDogForm/AddDogForm";
import ProductsPage from "./Pages/ProductsPage";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import RessetPassword from "./Pages/RessetPassword";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgetpassword", element: <ForgetPasswordPage /> },
  { path: "/resetpassword", element: <RessetPassword /> },

  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard></DashBoard>,
      },
      {
        path: "/dogs",
        element: <DogsPage />,
      },
      {
        path: "/Products",
        element: <ProductsPage />,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
    ],
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

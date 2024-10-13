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
import PrivateRoute from "./auth/PrivateRoute";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgetpassword", element: <ForgetPasswordPage /> },
  { path: "/:userId/resetpassword", element: <RessetPassword /> },
  

  {
    path: "/",
    element: <PrivateRoute element={<Root />} />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute element={<DashBoard/>} />,
      },
      {
        path: "/dogs",
        element: <PrivateRoute element={<DogsPage />} /> ,
      },
      {
        path: "/Products",
        element:   <PrivateRoute element={<ProductsPage />} />,
      },
      {
        path: "/orders",
        element: <PrivateRoute element={<Orders></Orders>} /> ,
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

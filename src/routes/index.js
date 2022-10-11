import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import Nav from "../page/Home/Nav";
import Users from "../page/Home/Users";
import Categories from "../page/Home/Categories";
import Ad from "../page/Home/Ad";
import { Navigate } from "react-router-dom";
import AddAds from "../page/Home/Ad/AddAds";
import AddCategory from "../page/Home/Categories/AddCategory";
import UpdatePsw from "../page/Home/Users/UpdatePsw";
import CommodityMessage from '../page/Home/CommodityMessage';
import AddCommodity from '../page/Home/CommodityMessage/AddCommodity'

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/nav",
        element: <Nav />,
      },
      {
        path: "/home/users",
        element: <Users />,
      },
     {
      path:"/home/updatepsw/:id",
      element:<UpdatePsw/>
     },
      {
        path: "/home/categories",
        element: <Categories />,
      },
      {
        path: "/home/categories/addcategory",
        element: <AddCategory />,
      },
      {
        path: "/home/ad",
        element: <Ad />,
      },

      {
        path: "/home/ad/add",
        element: <AddAds />,
      },
      {
        path:"/home/commodityMessage",
        element:<CommodityMessage/>
      },
      {

        path:"/home/commodityMessage/addCommodity",
        element:<AddCommodity/>
      }
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];

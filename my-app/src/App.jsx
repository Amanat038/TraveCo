import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginSignup from "./components/Login";
import Packagesinfo from "./components/Packagesinfo";
import Package from "./components/Packages";
import Admin from "./components/Admin";
import AboutUs from "./components/AboutUs";
import SearchPage from "./components/SearchPage";
import Hometourdisplay from "./components/Hometourdisplay";
import Payment from "./components/PaymentFrom";
import HotelViewPage from "./components/HotelViewPage";
import ProtectedRoute from "./components/protectedRoute";

const isAdmin = () => {
   
   const token = localStorage.getItem("token"); 
   if (token) {
      const user = JSON.parse(atob(token.split(".")[1])); 
      return user.role === "admin"; 
   }
   return false;
};

const appRouter = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
      children: [
         {
            path: "/packageinfo/:id",
            element: <Packagesinfo />,
         },
         {
            path: "/",
            element: <Hometourdisplay />,
         },
         {
            path: "/admin",

            element: <Admin />
         },
         {
            path: "/about",
            element: <AboutUs />,
         },
         {
            path: "/tour",
            element: <Package />,
         },
         {
            path: "/search",
            element: <SearchPage />,
         },
         {
            path: "payment",
            element: <Payment />,
         },
         {
            path: "hotelView/:id",
            element: <HotelViewPage />,
         },
      ],
   },
   {
      path: "/login",
      element: <LoginSignup />,
   },
]);

function App() {
   return <RouterProvider router={appRouter} />;
}

export default App;

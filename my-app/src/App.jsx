import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginSignup from "./components/Login";
import Packagesinfo from "./components/Packagesinfo";
import Package from "./components/Packages";
import Admin from "./components/Admin";


const appRouter = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
      children:[
        {
          path: "/packageinfo/:id",
          element: <Packagesinfo />,
       },{
        path: "/",
          element: <Package/>,
       },{
         path: "/admin",
         element: <Admin />,
      },
      ]
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

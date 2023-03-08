import UserPage from "../pages/userpage";
import PageLogin from "../pages/loginpage";
import Reset from "../pages/resetpage";
import UpdateProfile from "../pages/updateprofilepage";
// import PageCashier from "../pages/pagecashier";
// import PageAddProducts from "../pages/pageaddproduct";
// import ChartComponent from "../components/chart";
// import PageRegister from "../components/register_cashier";
// import PageEdit from "../pages/pageeditproduct";
// import PageEditProduct from "../components/edit_product_per_unit";
// import PageTransaction from "../pages/pagetransaction";

const routes = [
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/userpage",
    element: <UserPage />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />,
  },
  //   {
  //     path: "/",
  //     element: <ProtectedPage needLogin={true}></ProtectedPage>,
  //   },
];

export default routes;

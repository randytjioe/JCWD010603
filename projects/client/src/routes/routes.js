import HomePage from "../pages/homepage";
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
import Dashboard from "../pages/dashboard";
import LoginAdmin from "../pages/login_admin";
import AdminSetting from "../pages/adminSetting";
import ProtectedPage from "./protected";
import Page404 from "../pages/page404";

const routes = [
  {
    path: "/userlogin",
    element: (
      <ProtectedPage>
        <PageLogin />
      </ProtectedPage>
    ),
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/userpage",
    element: (
      <ProtectedPage needLogin={true}>
        <UserPage />
      </ProtectedPage>
    ),
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage needLogin={true}>
        <UserPage />
      </ProtectedPage>
    ),
  },
  {
    path: "/reset",
    element: (
      <ProtectedPage needLogin={true}>
        <Reset />
      </ProtectedPage>
    ),
  },

  {
    path: "/update-profile",
    element: (
      <ProtectedPage needLogin={true}>
        <UpdateProfile />
      </ProtectedPage>
    ),
  },
  {
    path: "/page_not_found",
    element: <Page404 />,
  },
];

export default routes;

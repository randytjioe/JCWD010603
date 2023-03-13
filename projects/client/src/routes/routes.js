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

const routes = [
  {
<<<<<<< Updated upstream
    path: "/login",
<<<<<<< Updated upstream
    element: <PageLogin />,
=======
    element: (
      <ProtectedPage guestOnly={true}>
        <PageLogin />
      </ProtectedPage>
    ),
=======
    path: "/userlogin",
    element: <PageLogin />,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
    path: "/admin",
    element: <Dashboard/>,
=======
  {
<<<<<<< Updated upstream
    path: "/dashboard",
    element: (
      <ProtectedPage needLogin={true}>
        <Dashboard />
      </ProtectedPage>
    ),
>>>>>>> Stashed changes
  },
  {
    path: "/admin_login",
    element: <LoginAdmin/>,
  },
  {
    path: "/admin_setting",
<<<<<<< Updated upstream
    element: <AdminSetting/>,
  }
=======
    element: (
      <ProtectedPage needLogin={true}>
        <AdminSetting />
      </ProtectedPage>
    ),
  },
  {
    path: '/page_not_found',
    element: <Page404 />
  },
  
=======
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/admin_login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin_setting",
    element: <AdminSetting />,
  },
>>>>>>> Stashed changes
  //   {
  //     path: "/",
  //     element: <ProtectedPage needLogin={true}></ProtectedPage>,
  //   },
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
];

export default routes;

import UserPage from "../pages/userpage";
import PageLogin from "../pages/loginpage";
import Reset from "../pages/resetpage";
import UpdateProfile from "../pages/updateprofilepage";
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
    path: "/admin",
    element: <Dashboard/>,

  {

  {

    path: "/dashboard",
    element: (
      <ProtectedPage needLogin={true}>
        <Dashboard />
      </ProtectedPage>
    ),
  },
  {
    path: "/admin_login",
    element: (
      <ProtectedPage guestOnly={true}>
        <LoginAdmin />
      </ProtectedPage>
    ),
  },
  {
    path: "/admin_setting",
    element: <AdminSetting/>,
  }
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

];

export default routes;

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
    path: "/login",
    element: (
      <ProtectedPage guestOnly={true}>
        <PageLogin />
      </ProtectedPage>
    ),
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
  
];

export default routes;

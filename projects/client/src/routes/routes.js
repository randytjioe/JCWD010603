import HomePage from "../pages/homepage";
import UserPage from "../pages/userpage";
import PageLogin from "../pages/loginpage";
import Reset from "../pages/resetpage";
import UpdateProfile from "../pages/updateprofilepage";
import Dashboard from "../pages/dashboard";
import LoginAdmin from "../pages/login_admin";
import AdminSetting from "../pages/adminSetting";
import ProtectedPage from "./protected";
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
  {
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
  //   {
  //     path: "/",
  //     element: <ProtectedPage needLogin={true}></ProtectedPage>,
  //   },
];

export default routes;

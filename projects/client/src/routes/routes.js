import HomePage from "../pages/homepage";
import UserPage from "../pages/userpage";
import PageLogin from "../pages/loginpage";
import Reset from "../pages/resetpage";
import UpdateProfile from "../pages/updateprofilepage";
import Dashboard from "../pages/dashboard";
import LoginAdmin from "../pages/login_admin";
import AdminSetting from "../pages/adminSetting";
import ProtectedPage from "./protected";
import Page404 from "../pages/page404";
import AdminCategory from "../pages/adminCategory";

import AdressPage from "../pages/updateadress_page";
import ListAddressPage from "../pages/listaddress_page";
import AddAddressPage from "../pages/addadress_page";
const routes = [
  {
    path: "/userlogin",
    element: (
      <ProtectedPage guestOnly={true}>
        <PageLogin />
      </ProtectedPage>
    ),
  },
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  {

    path: "/userpage",
    element: <UserPage />,
  },
  {

    path: "/register",
    element: <RegisterPage />,
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
    path: "/update-address/:id",
    element: (
      <ProtectedPage needLogin={true}>
        <AdressPage />
      </ProtectedPage>
    ),
  },
  {
    path: "/add-address",
    element: (
      <ProtectedPage needLogin={true}>
        <AddAddressPage />
      </ProtectedPage>
    ),
  },
  {
    path: "/list-address",
    element: (
      <ProtectedPage needLogin={true}>
        <ListAddressPage />
      </ProtectedPage>
    ),
  },
  {
    path: "/reset",
    element: <Reset />,
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
    path: "/admin_login",
    element: (
      <ProtectedPage guestOnly={true}>
        <LoginAdmin />
      </ProtectedPage>
    ),
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
    path: "/admin_setting",
    element: (
      <ProtectedPage>
        <AdminSetting />
      </ProtectedPage>
    ),
  },
  {
    path: '/admin_category',
    element: <AdminCategory />
  },
  {
    path: '*',
    element: <Page404 />
  },
];

export default routes;

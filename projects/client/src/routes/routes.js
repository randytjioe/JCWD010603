import HomePage from "../pages/homepage";
import UserPage from "../pages/userpage";
import PageLogin from "../pages/loginpage";
import Reset from "../pages/resetpage";
import UpdateProfile from "../pages/updateprofilepage";
import Dashboard from "../pages/dashboard";
import LoginAdmin from "../pages/login_admin";
import AdminSetting from "../pages/adminSetting";
import ProtectedPage from "./protected";
import ProtectedPageUser from "./protected_user";
import Page404 from "../pages/page404";
import AdminCategory from "../pages/adminCategory";
import ListProdukUser from "../pages/listproduct_pageuser";
import RegisterPage from "../pages/register_user";
import AdressPage from "../pages/updateadress_page";
import ListAddressPage from "../pages/listaddress_page";
import ListProduk from "../pages/listproduct_page";
import AddAddressPage from "../pages/addadress_page";
import VerifyEmail from "../pages/verify_email.jsx";
import ResetPassReqPage from "../pages/reset_password_request";
import ResetPassSetPage from "../pages/reset_password_set";
// import AddProductPage from "../pages/addproduct";


const routes = [
  {
    path: "/userlogin",
    element: (
      <ProtectedPageUser userGuest={true}>
        <PageLogin />
      </ProtectedPageUser>
    ),
  },
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  // {
  //   path: "/add-product",
  //   element: <AddProductPage />,
  // },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <ResetPassReqPage />,
  },
  {
    path: "/setup-password",
    element: <ResetPassSetPage />,
  },
  {
    path: "/userpage",
    element: (
      <ProtectedPageUser userLogin={true}>
        <UserPage />
      </ProtectedPageUser>
    ),
  },
  {
    path: "/update-address/:id",
    element: (
      <ProtectedPageUser userLogin={true}>
        <AdressPage />
      </ProtectedPageUser>
    ),
  },
  {
    path: "/add-address/:UserId",
    element: (
      <ProtectedPageUser userLogin={true}>
        <AddAddressPage />
      </ProtectedPageUser>
    ),
  },
  {
    path: "/list-address",
    element: (
      <ProtectedPageUser userLogin={true}>
        <ListAddressPage />
      </ProtectedPageUser>
    ),
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/list-product",
    element: <ListProduk />,
  },
  {
    path: "/product-list-user",
    element: <ListProdukUser />,
  },
  {
    path: "/update-profile",
    element: (
      <ProtectedPageUser userLogin={true}>
        <UpdateProfile />
      </ProtectedPageUser>
    ),
  },
  {
    path: "/admin_login",
    element: (
      <ProtectedPage adminGuest={true}>
        <LoginAdmin />
      </ProtectedPage>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage adminLogin={true} adminGuest={false}>
        <Dashboard />
      </ProtectedPage>
    ),
  },
  {
    path: "/admin_setting",
    element: (
      <ProtectedPage adminLogin={true} adminGuest={false} superAdmin={true}>
        <AdminSetting />
      </ProtectedPage>
    ),
  },
  {
    path: "/admin_category",
    element: (
      <ProtectedPage adminLogin={true} adminGuest={false}>
        <AdminCategory />
      </ProtectedPage>
    ),
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

export default routes;

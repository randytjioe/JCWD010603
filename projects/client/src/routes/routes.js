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
import ListProdukUser from "../pages/listproduct_pageuser";
import RegisterPage from "../pages/register_user";
import AdressPage from "../pages/updateadress_page";
import ListAddressPage from "../pages/listaddress_page";
import ListProduk from "../pages/listproduct_page";
import AddAddressPage from "../pages/addadress_page";
import VerifiedEmail from "../pages/email_verifications/verified_email.jsx";
import EmailVerified from "../pages/email_verifications/email_hasbeen_verified.jsx";
import VerifyUser from "../pages/email_verifications/user_not_found.jsx";
import ResetPassReqPage from "../pages/reset_password_request";
import ResetPassSetPage from "../pages/reset_password_set";

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
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    path: "/add-address/:UserId",
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
    path: "/verify_email",
    element: <VerifiedEmail />,
  },
  {
    path: "/email_verified",
    element: <EmailVerified />,
  },
  {
    path: "/email_verified",
    element: <EmailVerified />,
  },
  {
    path: "/user_notfound",
    element: <VerifyUser />,
  },

  {
    path: "/admin_category",
    element: <AdminCategory />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

export default routes;

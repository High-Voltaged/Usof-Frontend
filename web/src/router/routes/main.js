import { Routes, Route } from "react-router-dom";
import { mainRoutes } from "~/consts/routes";
import {
  ResetPassword,
  ForgotPassword,
  LandingPage,
  Login,
  Register,
  NotFound,
} from "~/pages";

const MainRoutes = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path={mainRoutes.login} element={<Login />} />
      <Route path={mainRoutes.register} element={<Register />} />
      <Route path={mainRoutes.resetPassword} element={<ResetPassword />} />
      <Route path={mainRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;

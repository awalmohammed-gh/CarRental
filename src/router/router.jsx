import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SystemLayout from "../layout/SystemLayout";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarsDetails from "../pages/CarsDetails";
import Contact from "../pages/Contact";
import About from "../pages/About";
import MemberShipPlans from "../pages/MemberShipPlans";
import AdminSystemLayout from "../layout/adminLayout/AdminSystemLayout";
import Overview from "../Admin/AdminPages/Overview";
import AddCars from "../Admin/AdminPages/AddCars";
import ListCars from "../Admin/AdminPages/ListCars";
import Users from "../Admin/AdminPages/Users";
import Dealers from "../Admin/AdminPages/Dealers";
import Subscriptions from "../Admin/AdminPages/Subscriptions";
import AdminLogin from "../Admin/AdminPages/AdminLogin";
import LoginForm from "../pages/LoginForm";
import OverviewOrders from "../Admin/AdminPages/Orders";
import Orders from "../Admin/AdminPages/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Customer routes */}
      <Route path="/" element={<SystemLayout />}>
        <Route index element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars-details/:id" element={<CarsDetails />} />
        <Route path="plans" element={<MemberShipPlans />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Customer login */}
      <Route path="/login" element={<LoginForm />} />

      {/* Admin Login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Routes */}

      <Route path="/admin" element={<AdminSystemLayout />}>
        <Route index element={<Overview />} />
        <Route path="add-cars" element={<AddCars />} />
        <Route path="list-cars" element={<ListCars />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="dealers" element={<Dealers />} />
        <Route path="subscription" element={<Subscriptions />} />
      </Route>
    </>,
  ),
);

export default router;

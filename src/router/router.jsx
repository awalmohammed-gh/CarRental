import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import SystemLayout from "../layout/SystemLayout";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarsDetails from "../pages/CarsDetails";
import Contact from "../pages/Contact";
import About from "../pages/About";
import MemberShipPlans from "../pages/MemberShipPlans";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<SystemLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="cars" element={<Cars/>}/>
        <Route path="cars-details/:id" element={<CarsDetails/>}/>
        <Route path="plans" element={<MemberShipPlans/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="about" element={<About/>}/>
    </Route>
))

export default router;
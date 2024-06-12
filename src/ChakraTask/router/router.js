import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SaleOrders from "../Pages/SaleOrder";
import RootLayout from "./Layout/RootLayout";
import RegisterPage from "../Pages/RegisterPage";



export const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<LoginPage/>}></Route>
            <Route path='saleOrder' element={<SaleOrders/>}></Route>
            <Route path='registerPage' element={<RegisterPage/>}></Route>
        </Route>
    )
)
import { lazy } from "react";
import routePath from "../constants/routePath";
import MainLayout from "../layouts/main-layout";
const Home = lazy(() => import("../pages/Home/index.jsx"));
const Product = lazy(() => import("../pages/Product"));

const AppRoute = [
    {path: routePath.home, page: Home, layout: MainLayout},
    {path: routePath.product, page: Product, layout: MainLayout},


]

export default AppRoute;
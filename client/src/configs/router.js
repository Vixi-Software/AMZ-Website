import { lazy } from "react";
import routePath from "../constants/routePath";
import MainLayout from "../layouts/main-layout";
import ProductLayout from "../layouts/product-layout";
import AdminLayout from "../layouts/admin-layout";
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/Product"));
const Admin = lazy(() => import("@/pages/Admin"));
const AppRoute = [
    {path: routePath.home, page: Home, layout: MainLayout},
    {path: routePath.product, page: Product, layout: ProductLayout},
    {path: routePath.admin, page: Admin, layout: AdminLayout},
]

export default AppRoute;
import { lazy } from "react";
import routePath from "../constants/routePath";
import MainLayout from "../layouts/main-layout";
import ProductLayout from "../layouts/product-layout";
import AdminLayout from "../layouts/admin-layout";
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/Product"));
const Admin = lazy(() => import("@/pages/Admin"));
const ProductAdmin = lazy(() => import("@/pages/Admin/Product"));
const AdminPost = lazy(() => import("@/pages/Admin/Post"));
const PostForm = lazy(() => import("@/pages/Admin/Post/PostForm"));
const AppRoute = [
    {path: routePath.home, page: Home, layout: MainLayout},
    {path: routePath.product, page: Product, layout: ProductLayout},
    {path: routePath.admin, page: Admin, layout: AdminLayout},
    {path: routePath.adminProduct, page: ProductAdmin, layout: AdminLayout},
    {path: routePath.adminPost, page: AdminPost, layout: AdminLayout},
    {path: routePath.adminPostAdd, page: PostForm, layout: AdminLayout},
    {path: routePath.adminPostEdit, page: PostForm, layout: AdminLayout},
]

export default AppRoute;
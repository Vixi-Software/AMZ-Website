import { lazy } from "react";
import routePath from "../constants/routePath";
import MainLayout from "../layouts/main-layout";
import ProductLayout from "../layouts/product-layout";
import AdminLayout from "@/layouts/admin-layout";
import BlogPage from "@/pages/admin/post";
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/Product"));
const ProductsPage = lazy(() => import("@/pages/admin/product"));
const PostEditor = lazy(() => import("@/pages/admin/post/PostEditor"));
const AppRoute = [
    {path: routePath.home, page: Home, layout: MainLayout},
    {path: routePath.product, page: Product, layout: ProductLayout},
    {path: routePath.adminPost, page: BlogPage, layout: AdminLayout},
    {path: routePath.adminProduct, page: ProductsPage, layout: AdminLayout},
    {path: routePath.adminPostEditor, page: PostEditor, layout: AdminLayout},

]

export default AppRoute;
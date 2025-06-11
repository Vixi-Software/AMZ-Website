import { lazy } from "react";
import routePath from "../constants/routePath";
import MainLayout from "../layouts/main-layout";
import ProductLayout from "../layouts/product-layout";
import AdminLayout from "../layouts/admin-layout";
import BasicLayout from "../layouts/basic-layout";

const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/Product"));
const Admin = lazy(() => import("@/pages/Admin"));
const ProductAdmin = lazy(() => import("@/pages/Admin/Product"));
const AdminPost = lazy(() => import("@/pages/Admin/Post"));
const EditPost = lazy(() => import("@/pages/Admin/Post/EditPost"));
const AddPost = lazy(() => import("@/pages/Admin/Post/AddPost"));
const AddProduct = lazy(() => import("@/pages/Admin/Product/AddProduct"));
const EditProduct = lazy(() => import("@/pages/Admin/Product/EditProduct"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Exchange = lazy(() => import("@/pages/Exchange"));
const Sale = lazy(() => import("@/pages/Sale"));

const AppRoute = [
    { path: routePath.home, page: Home, layout: MainLayout },
    { path: routePath.product, page: Product, layout: ProductLayout },
    // { path: routePath.admin, page: Admin, layout: AdminLayout },
    { path: routePath.admin, page: ProductAdmin, layout: AdminLayout },
    { path: routePath.adminPost, page: AdminPost, layout: AdminLayout },
    { path: routePath.adminPostEdit, page: EditPost, layout: AdminLayout },
    { path: routePath.adminPostAdd, page: AddPost, layout: AdminLayout },
    { path: routePath.adminProductAdd, page: AddProduct, layout: AdminLayout },
    { path: routePath.adminProductEdit, page: EditProduct, layout: AdminLayout },
    { path: routePath.productDetail, page: ProductDetail, layout: BasicLayout },
    { path: routePath.exchange, page: Exchange, layout: BasicLayout },
    { path: routePath.sale, page: Sale, layout: BasicLayout }, 
];

export default AppRoute;
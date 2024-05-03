import ProductDetail from "../pages/ProductDetail";
import ProductMovement from "../pages/ProductMovement";
import Products from "../pages/Products";
import ProductEdition from "../pages/ProductEdition"
import ProductAdd from "../pages/ProductAdd";
import ReposicionProductos from "../pages/ProductReposition";
const routes = [
{
    path: "/",
    exact: true,
    component: Products
},
{
    path: "/Movements",
    exact: true,
    component: ProductMovement
},
{
    path: "/Detail",
    exact: true,
    component: ProductDetail
},
{
    path: "/Edit",
    exact: true,
    component: ProductEdition
},
{
    path: "/New",
    exact: true,
    component: ProductAdd
},
{
    path: "/Reposition",
    exact: true,
    component: ReposicionProductos
},
]

export default routes;
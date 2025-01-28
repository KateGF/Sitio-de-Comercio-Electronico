import type { Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { ProductListComponent } from "./pages/product-list/product-list.component"
import { CartComponent } from "./pages/cart/cart.component"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { ProductDetailsComponent } from "./components/product-detail/product-detail.component"

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "category/:id", component: ProductListComponent },
  { path: "**", redirectTo: "" },
]


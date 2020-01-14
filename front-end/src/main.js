import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import OpinionsInAdminPanel from './components/OpinionsInAdminPanel'
import OpinionsInUserPanel from './components/OpinionsInUserPanel'
import OpinionsInProductPage from './components/OpinionsInProductPage'

import { ValidationProvider,ValidationObserver } from 'vee-validate';
import { required, min, max, email} from 'vee-validate/dist/rules';
import UserServices from './services/user.service'
import store from './store/';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StarRating from 'vue-star-rating'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);



import VueCurrencyInput from 'vue-currency-input'
import ShoppingCart from './components/ShoppingCart'
import OrderSummary from './components/OrderSummary'
import AddProduct from "./components/AddProduct";
import Home from './components/Home'
import AdminPanel from './components/AdminPanel'
import WarehouseSupplyForm from './components/WarehouseSupplyForm';
import StockAmounts from './components/StockAmounts';

import Categories from './components/Categories.vue'
import Products from './components/Products.vue'
import Product from './components/Product.vue'
import AddCategory from "./components/AddCategory";
import DeleteCategory from "./components/DeleteCategory";
import DeleteProduct from './components/DeleteProduct'
import { extend } from 'vee-validate';
import ProductsOverview from "./components/ProductsOverview";


extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This is not a email'
});

extend('min', {
  ...min,
  message: 'Field too short'
});
extend('max', {
  ...max,
  message: 'Field too long'
});

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('star-rating', StarRating);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth.status.loggedIn) {
    next()
    return
  }
  next('/')
}
const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.status.loggedIn) {
    next()
    return
  }
  next('/login')
}
const ifHavePrivilege =(to,from,next)=>
{
   if (store.state.auth.status.loggedIn) {
        UserServices.getUserPrivileges().then(
          response =>{



          let ifHas = false;
          for(let i =0;i<response.data.length;i++)
          {

            if(response.data[i].authority == to.meta.requiredPrivilege)
              {

                    ifHas =true;
                    break;
              }
  }


if(ifHas){
  next()
}
else
{
next('/')
}}
)
  }
  else
  next('/')
}
const pluginOptions = {
  globalOptions: { currency: 'PLN' }
}

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueCurrencyInput, pluginOptions)

Vue.config.productionTip = false;

export const bus = new Vue();

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,

    },
    {
      path: '/opinions/admin',
      component: OpinionsInAdminPanel
    },
    {
      path: '/opinions/user',
      component: OpinionsInUserPanel
    },
    {
      path: '/opinions/product',
      component: OpinionsInProductPage
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      component: Register,

    },
    {
      path:'/profile',
      component: Profile,

    },
    {
      path: '/shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/orderSummary',
      component: OrderSummary
    },
    {
      path: '/addProduct',
      component: AddProduct
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: AdminPanel,
      beforeEnter: ifHavePrivilege,
      meta: {
        requiredPrivilege: 'ADMIN_PRIVILEGE'
      },
    },
    {
      path: '/warehouseSupplyForm',
      component: WarehouseSupplyForm
    },
    {
      path: '/StockAmounts',
      component: StockAmounts
    },
  { path: '/product', name: 'product', component: Product },
  { path: '/products', name: 'products', component: Products },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/addCategory', name: 'addCategory', component: AddCategory},
  { path: '/addProduct', name: 'addProduct', component: AddProduct },
  { path: '/deleteCategory', name: 'deleteCategory', component: DeleteCategory },
  { path: '/deleteProduct', name: 'deleteProduct', component: DeleteProduct },
    { path: '/overview', name: 'overview', component: ProductsOverview }
  ]
})

router.beforeEach((to, from, next) => {
  if (!ifAuthenticated) next('/login')
  else next()
})
new Vue({
  router,
  store,
    data: () => ({
    value: '',
    email:''
  }),
  render: h => h(App),
}).$mount('#app')


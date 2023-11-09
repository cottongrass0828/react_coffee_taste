import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import Dashboard from './pages/admin/Dashboard'
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home'
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Checkout from './pages/Checkout'
import Success from './pages/front/Success';
import AdminArticles from './pages/admin/AdminArticles';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FrontLayout />} >
          <Route path='' element={<Home />} ></Route>
          <Route path='products' element={<Products />} ></Route>
          <Route path='product/:id' element={<ProductDetail />} ></Route>
          <Route path='success/:orderid' element={<Success />} ></Route>
        </Route>
        <Route path='/checkout' element={<Checkout />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/admin' element={<Dashboard />} >
          <Route path='products' element={<AdminProducts />} ></Route>
          <Route path='articles' element={<AdminArticles />} ></Route>
          {/* <Route path='coupons' element={<AdminCoupons />} ></Route> */}
          <Route path='orders' element={<AdminOrders />} ></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;

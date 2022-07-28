import Header from "../header/Header";
import React from "react";
import { Routes, Route} from "react-router-dom";
import { PureComponent } from "react";
import ProductList from "../../pages/ProductList";
import Cart from "../../pages/Cart";
import NotFoundPage from "../../pages/NotFoundPage";
import ProductPage from "../../pages/ProductPage";


class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
    }
 }
  render(){
    return (
    <div className="container">
       
        <Routes>
          <Route path="/" element={<Header />}> 
            <Route index  element={<ProductList  />} />
            <Route path="/:id" element={ <ProductPage />} />
            <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );}
}

export default App;

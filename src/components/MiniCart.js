import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { changeProductQuantity, decreaseProductQuantity, deleteProduct } from "../store/cart";
import plus from "../images/plus-square.png";
import minus from "../images/minus-square.png";
import "./MiniCart.css";
import ShowAttributesInCart from "../other-components-and-functions/ShowAttributesInCart";


class MiniCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.getCurrentPrice = this.getCurrentPrice.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.decreaseDeleteProduct = this.decreaseDeleteProduct.bind(this);
    }
    getCurrentPrice(props) { 
        let currentProductPrice;
        props.map((item) => {
            if (item.currency.symbol === this.props.currency) {
                currentProductPrice = item.amount;
                return currentProductPrice;
            } else { return null; }
        })
        return currentProductPrice;
    }
    getTotalPrice() {
        let total = 0;
        this.props.cartProducts.map((product, index) => {
            return total = product.prices.filter(el => el.currency.symbol === this.props.currency).reduce((total, item) => total + (item.amount * product.productQuantity), total)
        });
        return total;
    }
    decreaseDeleteProduct(index) {
        this.props.cartProducts[index].productQuantity > 1 ? this.props.dispatch(decreaseProductQuantity(index)) : this.props.dispatch(deleteProduct(index));
    }
    render() {
        if (this.props.cartQuantity !== 0) {
            return (<>
                <div className="shop-cart">
                    <div className="my-bag-block">
                        <p className="my-bag">My bag,  </p> <div className="bag-items">{`  ${this.props.cartQuantity} items`}</div>
                    </div>
                    {this.props.cartProducts.map((product, index) => {
                        return (
                    <div className="mini-product-block" key={`minicart prod-bl${index}`}>
                        <div className="block-1" key={`minicart b-l-1 ${index}`}>
                                    <div className="block-1-brand-name" key={`minicart brname ${index}`}>{product.brand} <br key={index } /> {product.name}</div>
                            <div className="minicart-price"key={`minicart price ${index}`}>{ this.props.currency}{this.getCurrentPrice(product.prices)}</div>
                        <ShowAttributesInCart view="minicart" key={`attr element${index}`} product={ product} productIndex={index}/>  
                        </div>
                             
                        <div className="block-2" key={`minicart bl-2 ${index}`}>
                            <div className="minicart-btn-wrapper" key={`minicart wr ${index}`}>
                                <img className="minicart-btn-image" src={plus} alt="logo" key={`minicart btn-pl ${index}`} onClick={()=>this.props.dispatch(changeProductQuantity(index))}/>
                                <p className="minicart-counter" onClick={() => { }}key={`minicart counter ${index}`}>{ product.productQuantity}</p>
                                <img className="minicart-btn-image" src={minus} alt="logo" key={`minicart btn-m ${index}`} onClick={()=>{this.decreaseDeleteProduct(index)}}/>
                            </div>
                            <img src={product.gallery[0]} className="minicart-image" key={`minicart img ${index}`} alt="logo"></img>
                        </div>
                    </div> 
                    )
                    })}
                    <div className="total-block">
                        <div className="text-left">Total:</div>
                        <div className="text-right">{ this.props.currency}{ this.getTotalPrice().toFixed(2)}</div>
                    </div>
                    <div className="minicart-buttons">
                        <Link to="cart" className="link-view-bag"><p>view bag</p></Link>
                        <button className="btn-checkout">check out</button>
                    </div>
                    </div>
                </>
        
            );
        }else {return null}
    } 
}
function mapStateToProps(state) {
    return {
        currency: state.currency.currency,
        cartProducts: state.cart.products,
        cartQuantity: state.cart.quantity,
    }
}
export default connect(mapStateToProps)(MiniCart);
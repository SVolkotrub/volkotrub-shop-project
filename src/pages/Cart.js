import { PureComponent } from "react";
import { connect } from 'react-redux';
import plus from "../images/plus-square.png";
import minus from "../images/minus-square.png";
import { changeProductQuantity, decreaseProductQuantity, deleteProduct } from "../store/cart";
import "./Cart.css";
import "./ProductPage.css";
import Slider from "../other-components-and-functions/Slider";
import ShowAttributesInCart from "../other-components-and-functions/ShowAttributesInCart";


class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  
           
        };
        this.getCurrentPrice = this.getCurrentPrice.bind(this);
        this.decreaseDeleteProduct = this.decreaseDeleteProduct.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }
    getCurrentPrice(props) { 
        let current;
        props.map((item) => {
            if (item.currency.symbol === this.props.currency) {
                current = item.amount;
                return current;
            } else { return null; }
        })
        return current;
    }
    getTotalPrice() {
        let total = 0;
        this.props.cartProducts.map((product) => {
            return total = product.prices.filter(el => el.currency.symbol === this.props.currency).reduce((total, item) => total + (item.amount * product.productQuantity), total)
        });
        return total;
    }
    decreaseDeleteProduct(index) {
        this.props.cartProducts[index].productQuantity > 1 ? this.props.dispatch(decreaseProductQuantity(index)) : this.props.dispatch(deleteProduct(index));
    }
    render() {
        if(this.props.cartQuantity !== 0)
        {
            return (
            <>
            <div className="cart-header">CART</div>          
                {this.props.cartProducts.map((product, index) => {
                return (
                    <div className="cart-product-block" key={`${index} product`}>
                        <div className="part-1" key={`${index} product part 1`}>
                            <div className="cart-brand" key={`${product.brand}_${index}`}>{product.brand }</div>
                            <div className="cart-name" key={`${product.name}_${index}`}>{product.name}</div>
                            <div className="cart-price" key={`price_${index}`}>{ this.props.currency}{this.getCurrentPrice(product.prices)}</div>
                            
                            <ShowAttributesInCart view="cart" key={`attr element${index}`} product={ product} productIndex={index} />
                        </div>
                        <div className="part-2" key={`${index} product part 2`}>
                            <div className="btn-wrapper" key={`${index} wrapper`}>
                                <img className="btn-image" src={plus} alt="logo" key={`${index} plus img`} onClick={()=>this.props.dispatch(changeProductQuantity(index))} />
                                <p className="counter" key={`${index} counter`}>{ product.productQuantity}</p>
                                <img className="btn-image" src={minus} alt="logo" key={`${index} minus-img`} onClick={()=>this.decreaseDeleteProduct(index)} /> 
                            </div>
                             <div className="slider-container"key={`${index} slider container`} >
                                <Slider data={product.gallery} productIndex={index} key={`${index} slider`} />
                            </div>
                        </div>
                    </div>
                        )
                })}
                <div className="order-description">
                    <div className="order-column-1">
                        <p className="order-text">Tax 21%:</p>
                        <p className="order-text">Quantity:</p>
                        <p className="order-text">Total:</p>
                    </div>
                    <div className="order-column-2">
                     <p className="order-quantity">{ this.props.currency}{Math.round(this.getTotalPrice() * 0.21)}</p>
                            <p className="order-quantity">{ this.props.cartQuantity}</p>
                            <p className="order-quantity">{this.props.currency}{ this.getTotalPrice().toFixed(2)}</p>
                    </div>
                </div>
                <button type="submit" className="order-btn"><p> order</p></button>
                    
            </>
            )
        } else {
           return  <p>Your cart is empty...</p>
        }
    }
}
function mapStateToProps(state) {
    return {
        currency: state.currency.currency,
        cartProducts: state.cart.products,
        cartQuantity: state.cart.quantity,
    }
}
export default connect(mapStateToProps)(Cart);

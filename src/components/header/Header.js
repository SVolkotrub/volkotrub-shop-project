import { PureComponent } from "react";
import { Outlet } from "react-router-dom";
import { connect } from 'react-redux';
import MiniCart from "../MiniCart";
import Categories from "../Categories";
import CurrencyList from "../../other-components-and-functions/CurrencyList";
import logo from "./logo-shop.png";
import cartIcon from "./bag-empty.png";
import currencyBtn from "./vector.png";
import styled from 'styled-components';
import "./Header.css";
import { showCurrencyList } from "../../store/currency";

const ModalShadow = styled.div`
 position: fixed;
  top:80px;
  left:0;
  height: 100%;
  width: 100%;
  background: rgba(57, 55, 72, 0.22);
  z-index: 1;
`;
const Modal = styled.div`
 position: fixed;
  top:80px;
  left:0;
  height: 100%;
  width: 100%;
  background: transparent;
  z-index: 1;
`;
class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currencyOpen: false,
            cartOpen: false,
            currency: null,
        }
    }
    
    render() {   
        return (
            <>
                {this.state.cartOpen && (
                        <ModalShadow onClick={() => this.setState({ cartOpen: !this.state.cartOpen })} />)}
                {this.props.currencyOpen && (
                        // <Modal onClick={() => this.setState({ currencyOpen: !this.state.currencyOpen })} />)}
                    <Modal onClick={() => this.props.dispatch(showCurrencyList(!this.props.currencyOpen))} />)}
                <div className="navbar-container">   
                <div className="navbar-row">
                    <div className="navbar-menu"> 
                        <Categories  />
                    </div>  
                    <div> 
                        <img className="navbar-icon" src={logo} alt="logo" /> 
                    </div>
                    <div className="navbar-right">    
                            {/* <div className="currency-icon" onClick={() => this.setState({ currencyOpen: !this.state.currencyOpen })}> {this.props.currency}<img className="currency-vector" src={currencyBtn} alt="currency" /></div> */}
                            <div className="currency-icon" onClick={() => this.props.dispatch(showCurrencyList(!this.props.currencyOpen))}> {this.props.currency }<img className="currency-vector" src={currencyBtn} alt="currency"  /></div>
                        {this.props.currencyOpen && (<div className="currency-popup"><CurrencyList /></div>)}       
                        <img className="cart-icon" src={cartIcon} alt="cart-logo" onClick={() => this.setState({ cartOpen: !this.state.cartOpen })}  /> 
                            {this.state.cartOpen && this.props.cartQuantity > 0 && (<MiniCart />)}
                            {this.props.cartQuantity > 0 && (<p className="cart-quantity">{this.props.cartQuantity }</p>)}
                    </div>
                </div>
                </div>
                <main className="container-main">
                <Outlet />
                </main>
                
                </> 
                );
    }
};
function mapStateToProps(state) {
    return {
        currency: state.currency.currency,
        currencyOpen: state.currency.currencyOpen,
        cartQuantity: state.cart.quantity,
    }
};
export default connect(mapStateToProps)(Header);
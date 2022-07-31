import { PureComponent } from "react";
import { connect } from 'react-redux';
import { updateAttributeIndex } from "../store/cart";
import styled from "styled-components";
import "../components/MiniCart.css";

const FilterColor = styled.div`
width: ${props => props.view === "cart" ? `32px` : `16px`};
height: ${props => props.view === "cart" ? `32px` : `16px`};
cursor: pointer;
${props => props.color === '#FFFFFF' ? `background-color: ${props.color}; outline-offset: -1px; outline: 1px solid black` : `background-color: ${props.color}`  };
${props => props.selected ? `outline-offset: 1px; outline: 1px solid #5ECE7B` : `none`};
`; 
const TextItem = styled.p`
margin-top: ${props => props.view === "cart" ? `13px` : `0px`};
`;
class ShowAttributesInCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  
            selectedAttributes: this.props.product.selectedAttributes,
            productIndex: this.props.productIndex,
            attributeStyle: this.props.view === "cart" ? ["attribute-item-selected", "attribute-item"] : ["minicart-attribute-item-selected", "minicart-attribute-item"],
           };
        this.colorSelect = this.colorSelect.bind(this);
        this.updateAttribute = this.updateAttribute.bind(this);
        
    }
     colorSelect(indexAttribute, index) {
         if (this.props.cartProducts[this.state.productIndex].selectedAttributes[indexAttribute][1] === index) { 
            return true;
        } else { return false; }
    }
    updateAttribute(indexAttribute, index) {
        const temp = {productIndex: this.props.productIndex, indexAttribute, index}
        this.props.dispatch(updateAttributeIndex(temp));
    }
    componentDidUpdate(props, state) {
     if (JSON.stringify(this.state.selectedAttributes) !== JSON.stringify(this.props.cartProducts[this.state.productIndex].selectedAttributes)) {
        this.setState({ selectedAttributes: this.props.cartProducts[this.state.productIndex].selectedAttributes });
    }
  }
    render() {
        
        const {  productIndex, attributeStyle} = this.state;
            return (
            <>
                 {this.props.cartProducts[productIndex].attributes.map((obj, indexAttribute) => {
                     if (obj.type !== "swatch") {
                        return (
                            <>
                                <p key={`${indexAttribute}_${obj.name} cart`} className= {this.props.view === "cart" ? "attribute-name" : "minicart-attribute-name"}>{obj.name}:</p>
                                <div key={`itemContainer_${indexAttribute}`} className="cart-item-container" >
                                    {obj.items.map((item, index) => {
                                        return (
                                            <div key={`${index}_${item} cart`} className={ this.props.cartProducts[productIndex].selectedAttributes[indexAttribute][1] === index ? attributeStyle[0] : attributeStyle[1] }
                                                onClick={() => {this.updateAttribute(indexAttribute, index)  }}> <TextItem view={this.props.view}>{item.value}</TextItem> </div>
                                        );
                                    })}
                                </div>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <p key={indexAttribute} className={this.props.view === "cart"? "attribute-name" : "minicart-attribute-name"}>{obj.name}:</p>
                                <div key={`colorContainer_${indexAttribute}`} className="cart-attribute-color-container">
                                    {obj.items.map((item, index) => {
                                        return (
                                            <FilterColor view={this.props.view === "cart" ? "cart" : "minicart" } key={index} color={item.value} selected={this.colorSelect(indexAttribute,index)} onClick={() => { this.updateAttribute(indexAttribute, index) }} />
                                        );
                                    })}
                                </div>
                            </>
                        )
                    }
                })
                }
            </>
            )
        // return null;
        
    }
}
function mapStateToProps(state) {
    return {
        currency: state.currency.currency,
        cartProducts: state.cart.products,
        cartQuantity: state.cart.quantity,
    }
}
export default connect(mapStateToProps)(ShowAttributesInCart);
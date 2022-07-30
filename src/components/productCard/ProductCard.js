import { PureComponent} from "react";
import styled from "styled-components";
import icon from "./button-icon-empty-cart.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addProductToCart, changeProductQuantity } from "../../store/cart";

const ProductCardStyle = styled.div`
  flex: 1;
  order: 0;
  flex-grow: 0;
  background: #FFFFFF;
  padding: 16px;
  width: 386px;
  position: relative;
  &:hover {
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;
const Text = styled.p`
  position: absolute;
  left: 25.42%;
  right: 25.71%;
  top: 150px;
  display: ${props => props.inStock ? `none` : `block`};
  font-weight: 400;
  font-size: 24px;
  line-height: 160%;
  color: #8D8F9A;
`;
const Button = styled.button`
  display:  none;
  background: #5ECE7B;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  justify-content: center;
  ${props => props.inStock ? ` opacity: 1 `: `display: none !important; opacity: 0` } ;

${ProductCardStyle}:hover & {
  display: block;
  position: absolute;
  top: 320px;
  left: 300px;
  cursor: pointer;  
}
`;
const ImageContainer = styled.div`
  width: 354px;
  height: 330px;

`;
const Image = styled.img`
  max-height: 100%;
  width: auto;
  position: relative;
  ${props => props.inStock ? `opacity: 1` : `opacity: 0.5`}
`;

const Title = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
  color: ${props => props.inStock? `#1D1F22` : `#8D8F9A` } ;
  margin: 24px 0 0 0;
`;
const Price = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
  color: ${props => props.inStock? `#1D1F22` : `#8D8F9A` } ;
`;
class ProductCard extends PureComponent{
constructor(props) {
        super(props);
        
        this.state = {
            product: this.props.product,
            inStock: this.props.product.inStock,
            currency: this.props.currency,
            amount: null,
      };
  this.getPrice = this.getPrice.bind(this);
  this.addToCart = this.addToCart.bind(this);
    }
    getPrice() {
        this.state.product.prices.map((item) => {
            if (item.currency.symbol === this.state.currency) {
                return this.setState({ amount: item.amount });
            } else { return null; }
        })
    }
    
    componentDidUpdate(props, state) {
     if (this.state.currency !== this.props.currency) {
       this.setState({ currency: this.props.currency });
       this.getPrice();
    }
  }
  addToCart(product) {
    let price = this.state.amount;
    const selectedAttributes = [];
    const attributeNames = product.attributes.map((obj) => { return obj.name });
    for (let i = 0; i < attributeNames.length; i++){
      selectedAttributes.push([attributeNames[i], 0]);
    }
    let duplicatesTemp = 0;
        if (this.props.cartProducts.length !== 0) {
            for (let i = 0; i < this.props.cartProducts.length; i++){
                if (product.id === this.props.cartProducts[i].id && JSON.stringify(this.props.cartProducts[i].selectedAttributes) === JSON.stringify(selectedAttributes)) {
                    duplicatesTemp = 1;
                    this.props.dispatch(changeProductQuantity(i));
                break;
            }}        
    }
    if (duplicatesTemp === 0)
    {this.props.dispatch(addProductToCart({ ...product, selectedAttributes , productQuantity:1, price }));}
    }
    render() {
        const { product, inStock,amount } = this.state;
        this.getPrice();
        return (
            <ProductCardStyle key={product.id} >
                <ImageContainer><Image inStock={inStock} src={product.gallery[0]} alt=" product" /></ImageContainer>
                <Text inStock={inStock}>OUT OF STOCK</Text>
                <Title inStock={inStock}>{product.brand} {product.name}</Title>
                <Price inStock={inStock}>{this.props.currency} {amount}</Price>
                <Link
                style={{ position: "absolute", inset: 0 }}
                    to={`${product.id}`} ></Link>
                <Button inStock={inStock} onClick={()=> this.addToCart(product) }> <img src={icon} alt="icon" onClick={()=> null} /></Button>
            </ProductCardStyle>
        )
    }
  
}
function mapStateToProps(state) {
  return {
    currency: state.currency.currency,
    cartProducts: state.cart.products,
  }
};
export default connect(mapStateToProps)(ProductCard);
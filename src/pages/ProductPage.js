
import { PureComponent } from "react";
import { useParams } from "react-router-dom";
import { Interweave } from 'interweave';
import getProductById from "../other-components-and-functions/getProductById";
import styled from "styled-components";
import { connect } from 'react-redux';
import "./ProductPage.css";
import { addProductToCart,changeProductQuantity } from "../store/cart";

const TextOutOfStock = styled.div`
    text-transform: uppercase;
    position: absolute;
    left: 25.42%;
    right: 25.71%;
    top: 200px;
    display:  block;
    font-weight: 400;
    font-size: 36px;
    line-height: 160%;
    color: #8D8F9A;
`;

const FilterColor = styled.div`
    width: 32px;
    height: 32px;
    cursor: pointer;
    ${props => props.color === '#FFFFFF' ? `background-color: ${props.color}; outline-offset: -1px; outline: 1px solid black` : `background-color: ${props.color}`  };
    ${props => props.selected ? `outline-offset: 1px; outline: 1px solid #5ECE7B` : `none`};
    
`;

function withParams(Component) {
 return props => <Component {...props} params={useParams()} />;
}

class ProductPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            loading: false,
            error: null,
            currency: this.props.currency,
            prices: [],
            gallery: [],
            attributes: [],
            amount: null,
            toggleImage: 0,
            colorFlag: false,
            selectedColor: 0, 
        };
        this.getPrice = this.getPrice.bind(this);
        this.colorSelect = this.colorSelect.bind(this);
        this.addToCart = this.addToCart.bind(this);
    } 
    getPrice() { 
        this.state.prices.map((item) => {
            if (item.currency.symbol === this.props.currency) {
                return this.setState({ amount: item.amount});
            } else { return null; }
        })
    }
    async fetchData(props) {
        let productRequest = await getProductById(this.props.params);
        this.setState({ prices: productRequest.prices });
        this.getPrice();
        return  this.setState({ product: productRequest, gallery: productRequest.gallery, attributes: productRequest.attributes, loading: false });
    }
    componentDidMount() {
        let { id } = this.props.params;
        console.log(id);
        this.setState({ loading: true });
        this.fetchData(id);
    }
    componentDidUpdate(props, state) {
     if (this.state.currency !== this.props.currency) {
        this.setState({ currency: this.props.currency });
        this.getPrice();
    }
  }
    colorSelect(attributeNameIndex, index) {
        if (this.state.selectedColor === index) {
            this.setState({ [attributeNameIndex]: index })
            return true;
        } else { return false; }
    }
    addToCart = (product) => {
        const keysState = Object.entries(this.state);
        const attributeNames = this.state.attributes.map((obj) => { return obj.name });
        const selectedAttributes = [];
        for (let i = 0; i < attributeNames.length; i++){
            for (let j = 0; j < keysState.length; j++){
                if (attributeNames[i] === keysState[j][0]) {
                    const temp = this.state[attributeNames[i]];
                    selectedAttributes.push([attributeNames[i], temp ]);
                }
                }
        }
        let price = this.state.amount;
        let duplicates = 0;
        if (this.props.cartProducts.length !== 0) {
            for (let i = 0; i < this.props.cartProducts.length; i++){
                if (product.id === this.props.cartProducts[i].id && JSON.stringify(this.props.cartProducts[i].selectedAttributes) === JSON.stringify(selectedAttributes)) {
                    duplicates = 1;
                    this.props.dispatch(changeProductQuantity(i));
                break;
            }}
            
        }
        if (duplicates === 0) {
            this.props.dispatch(addProductToCart({ ...product, selectedAttributes, productQuantity: 1, price }));
        }
    }
    render() {
        const { product, loading, error, amount, gallery,toggleImage, attributes } = this.state;
        if (error) {
            return <p>Something went wrong</p>;
        }
        if (loading) {
            return <p>Loading ...</p>;
        }
        if (product !== null && amount !== null) {
            return (                
                <div className="product-container">
                    <div className="small-image-wrapper">
                        {gallery.map((img, index) => {
                            return <div key={`container_${index}`} className="small-image-container">
                                <img className="small-image" src={img} key={`img_${index}`} alt="prod" onClick={() => { this.setState({ toggleImage: index })}} /> </div>                           
                        })}
                    </div> 
                    <div className="big-image-container">
                        <img className="big-image" src={gallery[toggleImage]} alt="" />
                        {!product.inStock && <TextOutOfStock >Out of Stock</TextOutOfStock>}
                    </div>
                    <div className="content-block">
                        <p className="brand">{product.brand}</p>
                        <p className="name">{product.name}</p>
                        {attributes.map((obj, indexAttribute) => {
                            let attributeNameIndex = obj.name;
                            // this.setState({  [attributeNameIndex]: this.state[attributeNameIndex]});
                            // if(this.state[attributeNameIndex] === undefined) {this.setState({ [attributeNameIndex]: 0})}
                            let temp = this.state[attributeNameIndex];
                            temp === undefined ? this.setState({ [attributeNameIndex]: 0}) : this.setState({  [attributeNameIndex]: temp});
                            
                            if (obj.type !== "swatch") {
                                return (
                                    <div key={`swatch_ ${indexAttribute}`}>
                                        <div key={`${indexAttribute}_${obj.name}`} className="attribute-name">{obj.name}:</div>
                                        <div key={`itemContainer_${indexAttribute}`} className="attribute-item-container">
                                            {obj.items.map((item, index) => {
                                                
                                                return (
                                                    <div key={`${index}_attribute${item} `} className={this.state[attributeNameIndex] === index ? "attribute-item-selected" : "attribute-item"} 
                                                        onClick={() => { this.setState({ [attributeNameIndex]: index }) }}>
                                                        <p key={`${index}_item value${item.value}`}>{item.value}</p></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                <div key={indexAttribute}>
                                        <div key={`${indexAttribute}_color`} className="attribute-name">{obj.name}:</div>
                                        <div key={`colorContainer_${indexAttribute}`}  className="attribute-color-container">
                                            {obj.items.map((item, index) => {   
                                                return (
                                                    <FilterColor key={`index color ${index}`} color={ item.value} selected={this.colorSelect(attributeNameIndex, index)} onClick={()=>{this.setState({ selectedColor: index})}} />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        })}                        
                        <p className="attribute-name">Price:</p>
                        <p className="price">{this.props.currency} {amount }</p>
                        {product.inStock && (<button  className="button-style" onClick={()=> this.addToCart(product) }>Add to cart</button>)}
                        <div className="description"><Interweave content={product.description} /></div>
                    </div>
                </div>
            );
        } else {
            return "Loading...";
        }
    }
}
function mapStateToProps(state) {
  return {
      currency: state.currency.currency, 
      cartProducts: state.cart.products,
  }
};
export default connect(mapStateToProps)(withParams(ProductPage));

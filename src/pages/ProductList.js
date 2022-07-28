
import { PureComponent} from "react";
import getProductsByCategory from "../other-components-and-functions/getProductsByCategory";
import ProductCard from "../components/productCard/ProductCard";
import { connect } from 'react-redux';
import "./ProductList.css";

class ProductList extends PureComponent { 
    constructor(props) {
        super(props);
        
      this.state = {
        products: [],
        loading: false,
        error: null,
        category: this.props.category,
      };    
      
  }
  async fetchData(props) {
    let productsRequest = await getProductsByCategory(props);
    return  this.setState({ products: productsRequest, loading: false });
}
  componentDidMount() {
    this.setState({ loading: true });
    this.fetchData(this.state.category);
  }         
  componentDidUpdate(props, state) {
     if (this.state.category !== this.props.category) {
       this.setState({ category: this.props.category });
       this.fetchData(this.props.category);
    }
  }

render() {
  const { products, loading, error } = this.state;
  
    if (error) {
      return <p>Something went wrong</p>;
    }

    if (loading) {
      return <p>Loading ...</p>;
    }
    if(products !== null )
    {
      return (
      <>
          <div className="product-list-header">{this.props.category }</div>
      <div className="product-list-container">
            {products.map(product =>
              <ProductCard product={product} key={product.id} />
        )}
          </div>
          </>
    );
    } else {      
      return "Loading...";
    }
  }
  
};
function mapStateToProps(state) {
  return {
    category: state.category.category
  }
};

export default connect(mapStateToProps)(ProductList);


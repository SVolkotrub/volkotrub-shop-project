import { PureComponent } from "react";
import { connect } from 'react-redux';
import { updateCurrency, fetchCurrency } from "../store/currency";
import "../components/header/Header.css";

class CurrencyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            currencies: null,
            currency: this.props.currency,
            loading: false,
        }
    }
    async fetchData() {
        let response = await this.props.dispatch(fetchCurrency());
        console.log("from component");
        console.log(response.payload);
        return this.setState({ currencies: response.payload, loading: false });

    }
    componentDidMount() {
        this.setState({ loading: true });
        this.fetchData();        
    }
    onSelectItem = (index, item) => {
        this.setState({ activeItem: index, currency: item.symbol });
        this.props.dispatch(updateCurrency(item.symbol));
    };
    render() {
        const { currencies, loading } = this.state;
         if (loading) {
      return <p>Loading ...</p>;
    }
        if (currencies !== null) {
            return (
                <div >
                    {currencies.map((item, index) => (
                        <div className={this.state.activeItem === index ? "currency-selected" : "currencies"}
                            onClick={() => this.onSelectItem(index, item)}
                            key={index}><span className="symbol-label">{item.symbol} {item.label}</span>  </div>))}
                
            </div>
        )
        } else { return "Loading..." }
    }
}
function mapStateToProps(state) {
    return {
        currency: state.currency.currency,
        currencies: state.currency.currencies,
    }
};
export default connect(mapStateToProps)(CurrencyList);
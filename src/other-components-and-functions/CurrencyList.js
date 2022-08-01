import { PureComponent } from "react";
import { connect } from 'react-redux';
import { updateCurrency, fetchCurrency } from "../store/currency";
import "../components/header/Header.css";

class CurrencyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            currencies: null,
            currency: this.props.currency,
            loading: false,
        }
    }
    async fetchData() {
        let response = await this.props.dispatch(fetchCurrency());
        return this.setState({ currencies: response.payload, loading: false });

    }
    componentDidMount() {
        this.setState({ loading: true });
        this.fetchData();        
    }
    onSelectItem = (index, item) => {
        this.setState({ activeItem: index, currency: item.symbol });
        this.props.dispatch(updateCurrency({currency: item.symbol, activeItem: index, currencyOpen: false}));
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
        activeItem: state.currency.activeItem,
        currencies: state.currency.currencies,
    }
};
export default connect(mapStateToProps)(CurrencyList);
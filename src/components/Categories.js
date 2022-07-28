import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import styled from "styled-components";
import "./header/Header.css";
import { updateCategory } from "../store/categorySlice";

const StyledLink = styled(Link)`
    text-decoration: "none";
    color: "black";
`;
class Categories extends PureComponent {
    

    state = { activeItem: 0, category: this.props.category };
    onSelectItem = (index, name) => {
        this.setState({ activeItem: index, category: name});
        this.props.dispatch(updateCategory(name));
    };
    render() {
        const items = ["all", "tech", "clothes"];
        return (
            <div className="categories">
                    {items.map((name, index) => (
                        <StyledLink to="/" className={this.state.activeItem === index ? "active" : ""}                    
                            onClick={() => this.onSelectItem(index, name)}
                            key={`${name}_${index}`}>{name}</StyledLink>))}
            </div>
        )
    }
}
function mapStateToProps(state) {
  return {category: state.category.category}
};
export default connect(mapStateToProps)(Categories);
 

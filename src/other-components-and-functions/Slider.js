import { PureComponent } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import vector from "../images/vector-white.png";

const Arrow = styled.div`
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.73);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 248px;
    left: ${props => props.direction === "left" && "128px"};
    right: ${props => props.direction === "right" && "16px"};
    margin: auto;
    cursor: pointer;
    z-index: 2;
`;
const ArrowImage = styled.img`
    transform: ${props => props.direction === "right" && "rotate(-180deg)"};
`;
const Wrapper = styled.div`
    display: flex;
     transition: all 1s ease;
    transform: translateX(${props => props.slideIndex * -200}px);
 `;
const Image = styled.img`
     margin: 0;
     width: 200px;
     height: 288px;
     object-fit: cover;
 `;
class Slider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            slideIndex: 0,
            productIndex: this.props.productIndex,
            gallery: this.props.data,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (direction) => {
        if (direction === "left") {
            let temp = this.state.slideIndex - 1;
            this.state.slideIndex > 0 ? this.setState({slideIndex: temp}) : this.setState({slideIndex: 0})
        } else {
            let temp = this.state.slideIndex + 1;
            this.state.slideIndex < this.state.gallery.length-1 ? this.setState({slideIndex: temp}) : this.setState({slideIndex: 0})
        }
    };
    componentDidUpdate(props, state) {
        if (JSON.stringify(this.props.cartProducts[this.state.productIndex].gallery) !== JSON.stringify(this.state.gallery)) {
            this.setState({ slideIndex: 0, gallery: this.props.cartProducts[this.state.productIndex].gallery});
         }
    
  }
    render() {
        const { slideIndex, gallery } = this.state;
       
        return (
          <> 
             {gallery.length > 1 && (<><Arrow direction="left" onClick={() => this.handleClick("left")}> <ArrowImage direction="left" src={ vector} alt='logo'></ArrowImage> </Arrow>
             <Arrow direction="right" onClick={()=>this.handleClick("right")}><ArrowImage direction="right" src={ vector} alt='logo'></ArrowImage></Arrow></>)}  
                <Wrapper slideIndex={slideIndex} >   
                    {gallery.map((img, index) => {
                    return <Image src={img} alt="logo" key={index}></Image>
                })}       
             </Wrapper>
             
         </>
        );
    }
}
function mapStateToProps(state) {
    return {
        cartProducts: state.cart.products,
    }
}
export default connect(mapStateToProps)(Slider);

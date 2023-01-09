import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
     super(props);
     this.state = {
          name: "",
          email: "",
          phone: "",
          address: "",
          showCheckout: false,
       };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          ProductsInCart: this.props.cartItems,
       };
    this.props.createOrder(order);
  };
  render() {
    const {ProductsInCart} = this.props;
    return (
      <div>
        {ProductsInCart.length === 0 ? (
            <div className="cart cart-header">Please Add Products In The Cart</div>
        ) : (
            <div className="cart cart-header">
             You have added {ProductsInCart.length} products in the cart{" "}
           </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {ProductsInCart.map((item) => (
                <li key={item._id}>
                  <div>
                     <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                       {formatCurrency(item.price)} x {item.count}{" "}
                       <button className="button"
                         onClick={() => this.props.removeFromCart(item)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {ProductsInCart.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                       ProductsInCart.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary">Proceed To Pay</button>
                </div>
              </div>
              {this.state.showCheckout && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                      <label>Name</label>
                        <input
                          name="name"
                          type="text"required
                          onChange={this.handleInput}>
                        </input>
                      </li>
                      <li>
                      <label>Email</label>
                        <input
                          name="email"
                          type="text"required
                          onChange={this.handleInput}>
                        </input>
                      </li>
                      <li>
                      <label>Phone</label>
                        <input
                          name="phone"
                          type="number"required
                          onChange={this.handleInput}>
                        </input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"required
                          onChange={this.handleInput}>
                        </input>
                      </li>
                      <li>
                        <button className="button primary" 
                        type="submit"> Checkout </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
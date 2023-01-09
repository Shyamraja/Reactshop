import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
    constructor() {
      super();
      this.state = {
         products: data.products,
         ProductsInCart: localStorage.getItem("ProductsInCart")
         ? JSON.parse(localStorage.getItem("ProductsInCart"))
         : [],
         size: "",
         sortPrice: "",
      };
    }   
    addToCart = (product) => {
      const ProductsInCart = this.state.ProductsInCart.slice();
      let alreadyInCart = false;
      ProductsInCart.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if(!alreadyInCart) {
        ProductsInCart.push({...product, count: 1 });
      }
      this.setState({ ProductsInCart });
      localStorage.setItem("ProductsInCart", JSON.stringify(this.state.ProductsInCart));
    };
    removeFromCart = (product) => {
      const ProductsInCart = this.state.ProductsInCart.slice();
      this.setState({
        ProductsInCart: ProductsInCart.filter((x) => x._id !== product._id),
      });
      localStorage.setItem(
        "ProductsInCart", 
        JSON.stringify(ProductsInCart.filter((x) => x._id !== product._id))
        );
    };
    sortingPriceOfProducts = (event) => {
      const sort = event.target.value;
      console.log(event.target.value);
      this.setState((state) => ({
         sortPrice: sort,
         products: this.state.products
          .slice()
          .sort((a, b) =>
            sort === "lowestToHighest"
              ? a.price > b.price
                ? 1
                : -1
               : sort === "highestToLowest"
              ? a.price < b.price
                ? 1
                : -1
               : a._id < b._id
              ? 1
              : -1
          ),
       }));
    };
    filteringSizeOfProducts = (event) => {
      console.log(event.target.value);
      if (event.target.value === "") {
        this.setState({ size: event.target.value, products: data.products });
      } else {
        this.setState({
           size: event.target.value,
           products: data.products.filter(
             (product) => product.availableSizes.indexOf(event.target.value) >= 0
           ),
         });
       }
     };
     createOrder = (order) => {
       alert("Save Order for" + order.name);
     };
    render() {
      return (
        <div className="grid-container">
          <header>
            <a href="/">WELCOME TO OUR EXPRESS SHOP</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                   count={this.state.products.length}
                   size={this.state.size}
                   sortPrice={this.state.sort}
                   filterProductsSize={this.filteringSizeOfProducts}
                   sortProductsPrice={this.sortingPriceOfProducts}>
                </Filter>
                <Products 
                   products={this.state.products} 
                   addToCart={this.addToCart}>
                </Products>
              </div>
              <div className="sidebar">
                  <Cart 
                    ProductsInCart={this.state.ProductsInCart} 
                    removeFromCart={this.removeFromCart}
                    createOrder={this.createOrder}
                  />
              </div>
           </div>
          </main>
          <footer>All right is reserved.</footer>
        </div>
      );
    }
 }
export default App;
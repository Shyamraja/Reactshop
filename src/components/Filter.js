import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filterProduct-price">
          Price Category{" "}
          <select value={this.props.sortPrice} onChange={this.props.sortProductsPrice}>
            <option>Latest Products</option>
            <option value="lowestToHighest">Low To High Price</option>
            <option value="highestToLowest">High To Low Price</option>
          </select>
        </div>
        <div className="filterProduct-size">
          Size Category{" "}
          <select value={this.props.size} onChange={this.props.filterProductsSize}>
            <option value="">All Products</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
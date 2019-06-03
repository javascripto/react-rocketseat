import React, { Component } from 'react';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    products : []
  }

  componentDidMount() {
    this.loadProducts();
    window.componente = this;
  }

  loadProducts = async () => {
    const response = await api.get('/products');
    this.setState({ products: response.data.docs })
  }

  render() {
    return (
      <div className="product-list">
        {this.state.products.map(product => 
          <h2 key={product._id}>{product.title}</h2>
        )}
      </div>
    )
  }
}

// Para usar métodos no componente sem fazer bind no construtor,
// basta usar arrow functions nos metodos da classe desde que 
// esses métodos não sejam extendidos da classe Component

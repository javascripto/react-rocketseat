import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    page: 1,
    products : [],
    productInfo: {}
  }

  componentDidMount() {
    this.loadProducts();
    window.componente = this;
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  }

  nextPage = () => {
    const { page, productInfo } = this.state;
    if ( page === productInfo.pages) return;
    this.loadProducts(page +1);
  }

  prevPage = () => {
    const { page } = this.state;
    if ( page === 1) return;
    this.loadProducts(page -1);
  }

  render() {
    const { products, page, productInfo: { pages } } = this.state;
    const [ disablePrev, disableNext ] = [ page === 1, page === pages ];

    return (
      <div className="product-list">
        { products.map(product => 
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        )}
        <div className="actions">
          <button disabled={disablePrev} onClick={this.prevPage}>Anterior</button>
          <button disabled={disableNext} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    )
  }
}

// Para usar métodos no componente sem fazer bind no construtor,
// basta usar arrow functions nos metodos da classe desde que 
// esses métodos não sejam extendidos da classe Component

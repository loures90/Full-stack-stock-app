import React from 'react'
import { GetProducts } from '../Services/products'
import { BASE_URL } from '../Constantes/url'
import Product from '../Components/Product/Product'

const Home = () => {
  const products = GetProducts([], `${BASE_URL}/product`)
  return (<div>
    <div> <h1>Stock de Produtos</h1></div>
    <div>
      {!products && <div>...Loading</div>}

      {products && products[0] && products.map(product => (<Product key={product.id} product={product} />))}
    </div>
  </div>)
}
export default Home
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GetProducts } from '../../Services/products'
import { BASE_URL } from '../../Constantes/url'
import Product from '../../Components/Product/Product'
import Filter from '../../Components/Filter/Filter'
import { goToProductPage } from '../../Router/Coordinator'

const Home = (props) => {
  const [products, setProducts] = GetProducts([], `${BASE_URL}/product`)
  const navigate = useNavigate()

  return (<div>
    <div> <h1>Stock de Produtos</h1></div>
    <button onClick={() => goToProductPage(navigate)}>Criar novo produto</button>
    <Filter setProducts={setProducts}/>
    <div>
      {!products && <div>...Loading</div>}
      {products && products[0] && products.map(product => (<Product key={product.id} product={product} setProducts={setProducts} productToUpdate={props.productToUpdate} setProductToUpdate={props.setProductToUpdate}/>))}
    </div>
  </div>)
}
export default Home
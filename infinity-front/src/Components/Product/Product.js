import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DeleteProduct } from '../../Services/products'
import { BASE_URL } from '../../Constantes/url'
import { goToUpdateProductPage } from '../../Router/Coordinator'

const Product = (props) => {
  const navigate = useNavigate()
  const product = props.product
  const deleteProduct = (id) => {
    DeleteProduct(id)
    axios.get(`${BASE_URL}/product`)
      .then((res) => {
        props.setProducts(res.data)
      })
      .catch((err) => console.error())
  }
  const updateProduct = (product) => {
    props.setProductToUpdate(product)
    goToUpdateProductPage(navigate)
  }
  return (
    <div key={product.id}>
      <div>
        {product.name}
      </div>
      <div>
        {product.quantity}
      </div>
      <div>
        {product.price}
      </div>
      <div>
        {product.barcode}
      </div>
      <div>
        <button onClick={() => updateProduct(product)}>atualizar</button>
        <button onClick={() => deleteProduct(product.id)}>apagar</button>
      </div>
    </div>)
}
export default Product
import React from 'react'
import { DeleteProduct, UpdateProduct } from '../../Services/products'

const Product = (props) => {
  const product = props.product
  const deleteProduct = (id) => {DeleteProduct(id)}
  const updateProduct = (product) => {UpdateProduct(product)}
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
        <button onClick={()=>updateProduct(product.id, product)}>atualizar</button>
        <button onClick={()=>deleteProduct(product.id)}>apagar</button>
      </div>
    </div>)
}
export default Product
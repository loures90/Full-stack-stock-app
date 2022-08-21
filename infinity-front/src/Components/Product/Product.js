import React from 'react'

const Product = (props) => {
  const product = props.product
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
        <button>atualizar</button>
        <button>apagar</button>
      </div>
    </div>)
}
export default Product
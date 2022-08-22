import React from 'react'
import CreateProduct from '../../Components/ProductCreation/ProductCreation'

const UpdateProductPage = (props) => {
  return (<CreateProduct productToUpdate={props.productToUpdate} setProductToUpdate={props.setProductToUpdate}/>)
}
export default UpdateProductPage
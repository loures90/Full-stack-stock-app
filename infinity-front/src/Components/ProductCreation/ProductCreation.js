import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import { goToHomePage } from '../../Router/Coordinator'
import { CreateProduct } from '../../Services/products'

const ProductCreation = () => {
  const [message, setMessage] = useState(0)
  const navigate = useNavigate()
  const [form, onChange, clearFields] = useForm({
    name: "",
    quantity: "",
    price: "",
    barcode: ""
  })

  const create = () => {
    const body = {
      name: form.name,
      quantity: form.quantity,
      price: form.price,
      barcode: form.barcode
    }
    CreateProduct(body, clearFields, setMessage)
  }
  return (<div>
    <h3>Create Product</h3>
    <button onClick={() => goToHomePage(navigate)}>Lista de Produtos</button>

    <div>
      <label>Nome</label>
      <input onChange={onChange} value={form.name} type="text" id="name" name="name"></input>
    </div>
    <div>
      <label >Quantidade</label>
      <input onChange={onChange} value={form.quantity} type="text" id="quantity" name="quantity"></input>
    </div>
    <div>
      <label >Preço</label>
      <input onChange={onChange} value={form.price} type="text" id="price" name="price"></input>
    </div>
    <div>
      <label >Código de barras</label>
      <input onChange={onChange} value={form.barcode} type="text" id="barcode" name="barcode"></input>
    </div>
    <div>
      <button onClick={() => create()}>Novo Produto</button>
    </div>
    {message === 'ok' && <p>Produto salvo com sucesso</p>}
    {message === 'wrong' && <p>Produto não salvo corretamente</p>}
  </div>)
}
export default ProductCreation
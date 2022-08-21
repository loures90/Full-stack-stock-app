import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../Constantes/url'
import useForm from '../../Hooks/useForm'

const Filter = (props) => {
  const [form, onChange, clearFields] = useForm({
    name: "",
    quantity: "",
    maxQuantity: "",
    minQuantity: "",
    price: "",
    maxPrice: "",
    minPrice: "",
  })

  const filterName = () => {
    axios.get(`${BASE_URL}/product?eq=true&name=${form.name}`)
      .then((res) => {
        props.setProducts(res.data)
      })
      .catch((err) => console.error())
    clearFields()
  }

  const filterQuantity = () => {
    let queryUrl = 'quantity=true&'
    queryUrl += form.minQuantity ? `gt=${form.minQuantity}` : ''
    queryUrl += form.minQuantity && form.maxQuantity ? `&` : ''
    queryUrl += form.maxQuantity ? `lt=${form.maxQuantity}` : ''

    axios.get(`${BASE_URL}/product?${queryUrl}`)
      .then((res) => {
        props.setProducts(res.data)
      })
      .catch((err) => console.error())
    clearFields()
  }

  const filterPrice = () => {
    let queryUrl = 'price=true&'
    queryUrl += form.minPrice ? `gt=${form.minPrice}` : ''
    queryUrl += form.minPrice && form.maxPrice ? `&` : ''
    queryUrl += form.maxPrice ? `lt=${form.maxPrice}` : ''

    axios.get(`${BASE_URL}/product?${queryUrl}`)
      .then((res) => {
        props.setProducts(res.data)
      })
      .catch((err) => console.error())
    clearFields()
  }

  return (<div>
    <h3>Filtros</h3>
    <div>
      <label>Nome</label>
      <input onChange={onChange} value={form.name} type="text" id="name" name="name"></input>
      <button onClick={() => filterName()}>filtrar</button>
    </div>
    <div>
      <div >Quantidade</div>
      <label >Min</label>
      <input onChange={onChange} value={form.minQuantity} type="text" id="minQuantity" name="minQuantity"></input>
      <label >Max</label>
      <input onChange={onChange} value={form.maxQuantity} type="text" id="maxQuantity" name="maxQuantity"></input>
      <button onClick={() => filterQuantity()}>Filtrar</button>
    </div>
    <div>
      <div >Quantidade</div>
      <label >Min</label>
      <input onChange={onChange} value={form.minPrice} type="text" id="minPrice" name="minPrice"></input>
      <label >Max</label>
      <input onChange={onChange} value={form.maxPrice} type="text" id="maxPrice" name="maxPrice"></input>
      <button onClick={() => filterPrice()}>Filtrar</button>
    </div>
  </div>)
}
export default Filter
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../Constantes/url'

export const GetProducts = (initialState, url) => {
  const [data, setData] = useState(initialState)
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error())
  }, [url])
  return [data, setData]
}

export const CreateProduct = (body, clearFields, setMessage) => {
  axios.post(`${BASE_URL}/product`, body)
    .then(()=>{
      clearFields()
      setMessage('ok')
    })
    .catch(() => {
      setMessage('wrong')
    })
}


export const UpdateProduct = (id, body) => {
  body = { ...body, name: 'new_product' }
  delete body.id
  axios.put(`${BASE_URL}/product/${id}`, body)
    .then(()=>{
      GetProducts([], `${BASE_URL}/product`)
    })
    .catch(console.error())
}


export const DeleteProduct = (id) => {
  axios.delete(`${BASE_URL}/product/${id}`)
    .then(() => {
      GetProducts([], `${BASE_URL}/product`)
    })
    .catch(console.error())
}


export const GetOneProduct = (initialState, url) => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error())
  }, [url])
  return data
}
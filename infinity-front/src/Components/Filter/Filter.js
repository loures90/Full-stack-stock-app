import axios from 'axios'
import React from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { BASE_URL } from '../../Constantes/url'
import useForm from '../../Hooks/useForm'
import { Container } from '@mui/system'

const Filter = (props) => {
  const [message, setMessage] = ('')
  const [form, onChange] = useForm({
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
        setMessage('')
      })
      .catch((err) => setMessage('error'))
  }

  const filterQuantity = () => {
    let queryUrl = 'quantity=true&'
    queryUrl += form.minQuantity ? `gt=${form.minQuantity}` : ''
    queryUrl += form.minQuantity && form.maxQuantity ? `&` : ''
    queryUrl += form.maxQuantity ? `lt=${form.maxQuantity}` : ''

    axios.get(`${BASE_URL}/product?${queryUrl}`)
      .then((res) => {
        props.setProducts(res.data)
        setMessage('')
      })
      .catch((err) => setMessage('error'))
  }

  const filterPrice = () => {
    let queryUrl = 'price=true&'
    queryUrl += form.minPrice ? `gt=${form.minPrice}` : ''
    queryUrl += form.minPrice && form.maxPrice ? `&` : ''
    queryUrl += form.maxPrice ? `lt=${form.maxPrice}` : ''

    axios.get(`${BASE_URL}/product?${queryUrl}`)
      .then((res) => {
        props.setProducts(res.data)
        setMessage('')
      })
      .catch((err) => setMessage('error'))
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Nome"
            helperText="Nome do produto"
            fullWidth
            onChange={onChange} value={form.name} type="text" id="name" name="name"
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" align="center" onClick={() => filterName()}>filtrar</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Min"
            helperText="Quantidade mínima"
            onChange={onChange} value={form.minQuantity} type="text" id="minQuantity" name="minQuantity"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Max"
            helperText="Quantidade máxima"
            onChange={onChange} value={form.maxQuantity} type="text" id="maxQuantity" name="maxQuantity"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" align="center" onClick={() => filterQuantity()}>filtrar</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Min"
            helperText="Preço mínimo"
            onChange={onChange} value={form.minPrice} type="text" id="minPrice" name="minPrice"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Max"
            helperText="Preço máxima"
            onChange={onChange} value={form.maxPrice} type="text" id="maxPrice" name="maxPrice"
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" align="center" onClick={() => filterPrice()}>filtrar</Button>
        </Grid>
      {message === 'error' &&  <Typography align="center" color="error">Filtragem incorreta</Typography>}
      </Grid>

    </Container>)
}
export default Filter
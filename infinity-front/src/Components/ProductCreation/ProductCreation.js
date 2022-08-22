import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Grid, TextField } from '@mui/material'


import useForm from '../../Hooks/useForm'
import { goToHomePage } from '../../Router/Coordinator'
import { CreateProduct, UpdateProduct } from '../../Services/products'

const ProductCreation = (props) => {
  const [message, setMessage] = useState(0)
  const navigate = useNavigate()
  const [form, onChange, clearFields] = useForm({
    name: props.productToUpdate ? props.productToUpdate.name : "",
    quantity: props.productToUpdate ? props.productToUpdate.quantity : "",
    price: props.productToUpdate ? props.productToUpdate.price : "",
    barcode: props.productToUpdate ? props.productToUpdate.barcode : ""
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

  const update = () => {
    const body = {
      name: form.name,
      quantity: form.quantity,
      price: form.price,
      barcode: form.barcode
    }
    UpdateProduct(props.productToUpdate.id, body, setMessage)
  }
  return (
    <Container>
      {!props.productToUpdate && <Typography sx={{ pt: 2 }} variant="h3" align="center" color="textPrimary" gutterBottom>Criar Produto</Typography>}
      {props.productToUpdate && <Typography sx={{ pt: 2 }} variant="h3" align="center" color="textPrimary" gutterBottom>Atualizar Produto</Typography>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            helperText="Nome do produto"
            fullWidth
            onChange={onChange} value={form.name} type="text" id="name" name="name"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Quantidade"
            helperText="Quantidade no Estoque"
            fullWidth
            onChange={onChange} value={form.quantity} type="text" id="quantity" name="quantity"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Preço"
            helperText="Preço do produto"
            fullWidth
            onChange={onChange} value={form.price} type="text" id="price" name="price"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Código de barras"
            helperText="Código de barras"
            fullWidth
            onChange={onChange} value={form.barcode} type="text" id="barcode" name="barcode"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={6}>
          {!props.productToUpdate && <Button variant="contained" onClick={() => create()}>Novo Produto</Button>}
          {props.productToUpdate && <Button variant="contained" onClick={() => update()}>Atualizar Produto</Button>}
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => {
            props.setProductToUpdate && props.setProductToUpdate({})
            goToHomePage(navigate)
          }}>Lista de Produtos</Button>
        </Grid>
      </Grid>

      {message === 'ok' && <p>Produto salvo com sucesso</p>}
      {message === 'wrong' && <p>Produto não salvo corretamente</p>}
    </Container>)
}
export default ProductCreation
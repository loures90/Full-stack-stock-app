import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Grid, CardContent, Typography, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Produto: {product.name}
          </Typography>
          <Typography variant="h7">
            Preço: {product.price}
          </Typography>
          <Typography>
            Quantidade: {product.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" align="center" onClick={() => updateProduct(product)}>atualizar</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} align="center" color="error" onClick={() => deleteProduct(product.id)}>apagar</Button>
        </CardActions>
      </Card>
    </Grid>)
}
export default Product
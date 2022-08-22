import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Grid, Typography } from '@mui/material'

import { GetProducts } from '../../Services/products'
import { BASE_URL } from '../../Constantes/url'
import Product from '../../Components/Product/Product'
import Filter from '../../Components/Filter/Filter'
import { goToProductPage } from '../../Router/Coordinator'
import axios from 'axios'


const Home = (props) => {
  const [products, setProducts] = GetProducts([], `${BASE_URL}/product`)
  const navigate = useNavigate()

  const clearFilter = () => {
    axios.get(`${BASE_URL}/product`)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => console.error())
  }

  return (<Container maxWidth="sm">
    <Typography variant="h3" align="center" color="textPrimary" gutterBottom>Estoque de Produtos</Typography>

    <Filter setProducts={setProducts} />

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button variant="contained" align="center" onClick={() => goToProductPage(navigate)}>Novo produto</Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" align="center" onClick={() => clearFilter()}>Limpar pesquisa</Button>
      </Grid>
    </Grid>
    <div>
      {!products && <Typography variant="h2" align="center" color="textPrimary">...Loading</Typography>}

      {products && products[0] &&
        products.map(product => (
          <Product
            key={product.id}
            product={product}
            setProducts={setProducts}
            productToUpdate={props.productToUpdate}
            setProductToUpdate={props.setProductToUpdate}
          />))}
    </div>
    {products && !products.length && <Typography sx={{ mt: 2 }} align="center" color="textPrimary">Nenhum produto para esta seleção</Typography>}

  </Container>)
}
export default Home
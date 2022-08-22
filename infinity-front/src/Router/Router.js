import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../Pages/Home/Home'
import ProductPage from '../Pages/ProductPage/ProductPage'
import UpdateProductPage from '../Pages/UpdateProductPage/UpdateProductPage'

const Router = (props) => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home productToUpdate={props.productToUpdate} setProductToUpdate={props.setProductToUpdate}/>} />
                    <Route path="/new-product" element={<ProductPage />} />
                    <Route path="/update-product" element={<UpdateProductPage productToUpdate={props.productToUpdate} setProductToUpdate={props.setProductToUpdate}/>} />
                </Routes>
        </BrowserRouter>
    )
}
export default Router
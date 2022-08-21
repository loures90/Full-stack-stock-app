import axios from 'axios'
import { useEffect, useState } from 'react'

export const GetProducts = (initialState, url) =>{
  const [data, setData] = useState(initialState)

  useEffect(()=>{
    axios.get(url)
    .then((res)=> {
      setData(res.data)
    })
    .catch((err)=> console.error())
  }, [url])
  return data
}

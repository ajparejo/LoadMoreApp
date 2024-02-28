import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);
      const results = await response.json();
      if(results && results.products && results.products.length){
        setProducts((prevData) => [...prevData, ...results.products])
        setLoading(false);
      }

      console.log(results)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if(products && products.length === 100){
      setDisabled(true)
    }
  }, [products]);

  if(loading){
    return (
      <div className='loadScreen'>
        Loadind...<span className='load'/>
      </div>
    )
  }

  return (
    <>
      <div className='container'>
        <div className='products-container'>
          <div className='products'>
            {
              products && products.length ?
              products.map((index) => (
                <div className='card' key={index.id}>
                  <img src={index.thumbnail} alt={index.title}/>
                  <p>{index.title}</p>
                </div>
              ))
              : null
            }
          </div>
        </div>
        <div className='buttonContainer'>
          <button disabled={disabled} onClick={() => setCount(count + 1)}>Load More...</button>
        </div>
      </div>
    </>
  )
}

export default App

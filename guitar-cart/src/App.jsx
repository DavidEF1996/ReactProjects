import { useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './db'

function App() {
  const [data] = useState(db)
  const [cart, setCart] = useState(getLocalStorage())

  useEffect(() => {
    saveLocalStorage()
  }, [cart])

  function addCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

    if (itemExists >= 0) {
      setCart(cart.map(gui => (
        (gui.id === item.id) ? { ...gui, quantity: gui.quantity + 1 }
          : gui
      )))
    } else {
      const newItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }


  function cleanCart() {
    setCart([])
  }

  function incrementar(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }


  function decrementar(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function eliminarElemento(id) {
    const deleteElement = cart.filter(item => item.id !== id)
    setCart(deleteElement)
  }

  function saveLocalStorage() {
    localStorage.setItem("dataLocal", JSON.stringify(cart));
  }

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem("dataLocal"))||[]
  }

  return (
    <>
      <Header
        cart={cart}
        cleanCart={cleanCart}
        incrementar={incrementar}
        decrementar={decrementar}
        eliminarElemento={eliminarElemento}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>


        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addCart={addCart}

            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App


import { db } from '../db'
import { useEffect, useState } from 'react'
import { useMemo } from "react"

export const useCart =()=>{

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


       const isEmpty = useMemo(() => cart.length === 0, [cart])
       const cartTotal = useMemo(() => cart.reduce((acumulador, item) => acumulador + (item.quantity * item.price), 0), [cart])


      return {
        data,
        cart,
        addCart,
        cleanCart,
        incrementar,
        decrementar,
        eliminarElemento,
        isEmpty,
        cartTotal
      }
    
}
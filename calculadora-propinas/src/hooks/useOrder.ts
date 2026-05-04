import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder(){

    const [order, setOrder] = useState<OrderItem[]>([])


    const addItem =(item:MenuItem)=>{
        const indice = order.findIndex(itemF => itemF.id===item.id)

        if(indice!==-1 ){
             const updateOrder:OrderItem[] = order.map(ordenItem=> 
                ordenItem.id===item.id ? {...ordenItem, quantity:ordenItem.quantity+1}
                : ordenItem
             )
        setOrder(updateOrder)
        }else{
        const newItem:OrderItem = {...item, quantity:1}
        setOrder([...order, newItem])
        }
    


    }
   console.log(order)

    return {
            order,
            addItem

    }
}
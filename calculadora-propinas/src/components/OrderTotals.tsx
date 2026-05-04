import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps ={
    order:OrderItem[],
    propina:number,
    saveOrder: () => void
}

export default function OrderTotals({order,propina,saveOrder}:OrderTotalsProps) {
  
    const subtotal= useMemo(()=> order.reduce((acu, item )=> acu + (item.price*item.quantity),0),[order])
  
    const propinasT= useMemo(()=>subtotal*propina,[subtotal, propina])

    const totalPagar = useMemo(()=>subtotal+propinasT,[subtotal, propinasT])

    return (
    <div className="space-y-3">
      <h3 className="font-black text-2xl mt-4">
        Totales y Propinas
      </h3>
      <p>
          Subtotal:  {formatCurrency(subtotal)}
      </p>
      <p>
        Propina: {formatCurrency(propinasT)}
      </p>
         <p>
        Total: {formatCurrency(totalPagar)}
      </p>

<button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
disabled={totalPagar===0 }
onClick={saveOrder}>
    Guardar Orden
</button>
    </div>
  )
}

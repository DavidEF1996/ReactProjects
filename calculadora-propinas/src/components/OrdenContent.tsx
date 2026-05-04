import { formatCurrency } from "../helpers"
import type { MenuItem, OrderItem } from "../types"

type OrderContentProps = {
    order: OrderItem[],
    deleteOrder: (id:MenuItem['id']) => void

}


export default function OrdenContent({ order, deleteOrder }: OrderContentProps) {
    return (
        <div>
            {
                order.length === 0 ?
                    <p className="text-center">
                        No hay items
                    </p>
                    : (order.map(item => (
                        <div

                            key={item.id} className=" flex justify-between items-center border-t border-gray-300 last-of-type:border-b py-5">
                            <div>
                                <p className="text-lg">{item.name} - {formatCurrency(item.price)} </p>
                                <p className="font-black">Cantidad: {item.quantity} -  {formatCurrency(item.price * item.quantity)}</p>
                            </div>

                            <button 
                            onClick={()=>deleteOrder(item.id)}
                            className="bg-red-600 h-8 w-8 rounded-full text-white font-black">
                                X
                            </button>
                        </div>

                    )))
            }
        </div>
    )
}

import type { OrderItem } from "../types"

type OrderContentProps = {
    order: OrderItem[]

}


export default function OrdenContent({ order }: OrderContentProps) {
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
                                <p className="text-lg">{item.name} - {item.price} </p>
                                <p className="font-black">Cantidad: {item.quantity} -  {item.price * item.quantity}</p>
                            </div>

                            <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black">
                                X
                            </button>
                        </div>

                    )))
            }
        </div>
    )
}

import { menuItems } from "./db/db"
import Item from "./components/Item"
import useOrder from "./hooks/useOrder"
import OrdenContent from "./components/OrdenContent"
import OrderTotals from "./components/OrderTotals"
import OrderPropinas from "./components/OrderPropinas"

function App() {

  const {order,addItem, deleteOrder,propina, setPropina, saveOrder} = useOrder()

  return (
    <>
     <header className="bg-teal-300 py-4 mb-4">
     <h1 className="text-center text-5xl font-bold ">Calculadora de Consumos</h1>
    </header>

    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 mb-4">
      <div className="p-5">
          <h2 className="text-3xl font-bold ">Productos</h2>

          <div className="space-y-2 mt-8">
          {menuItems.map(currentItem=>(
            <Item 
            addItem={addItem}
            key={currentItem.id}
            item={currentItem}
            />
          ))}
          </div>


      </div>


      <div className="p-5 border rounded-2xl border-gray-300">
         <h2 className="text-3xl font-bold ">Consumos</h2>
        <div  className="space-y-2 mt-8">
           <OrdenContent 
          order={order}
          deleteOrder={deleteOrder}
         />
        </div>
               <div>
          <OrderPropinas 
          setPropina={setPropina}
          propina={propina}
          />
        </div>
        <div>
          <OrderTotals 
          order={order}
          propina={propina}
          saveOrder={saveOrder}
          />
        </div>
     
      </div>
    </div>
    </>
   
  )
}

export default App

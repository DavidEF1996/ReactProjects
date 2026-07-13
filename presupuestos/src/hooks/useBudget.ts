import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

// Da acceso al estado global y evita usar el contexto fuera de su provider.
export const useBudget =()=>{
      const context = useContext(BudgetContext)
      if(!context){
        throw new Error('Context must be used withing a budgetprovider')
      }
      return context
}

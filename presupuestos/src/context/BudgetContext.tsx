import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}


// Expone el estado del presupuesto y el dispatch al resto de componentes.
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Mantiene un único reducer compartido para toda la aplicación.
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Suma los gastos nuevamente solo cuando cambia la lista.
    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expenses)=> expenses.amount+total,0),[state.expenses])

    // Resta lo gastado al presupuesto para conocer el dinero disponible.
    const remainingBudget = state.budget - totalExpenses
    return (

        < BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>

    )
}

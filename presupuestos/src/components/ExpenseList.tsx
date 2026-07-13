import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'

export default function ExpenseList() {
    const { state } = useBudget()

    // Aplica la categoría seleccionada; sin filtro se muestran todos los gastos.
    const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses

    // Permite mostrar un mensaje en lugar de una lista vacía.
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
    
  return (
   <div className="mt-10 rounded-2xl bg-white p-10 shadow-lg">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> : (
                <>
                    <p className="mb-8 text-4xl font-black text-slate-700">Listado de Gastos.</p>
                    {filteredExpenses.map( expense => (
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
  )
}

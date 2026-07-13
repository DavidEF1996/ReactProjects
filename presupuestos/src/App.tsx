import { useEffect, useMemo } from 'react'
import BudgetForm from './components/BudgetForm'
import { useBudget } from './hooks/useBudget'
import BudgetTracker from './components/BudgetTracker'
import ExpenseModal from './components/ExpenseModal'
import ExpenseList from './components/ExpenseList'
import FilterByCategory from './components/FilterByCategory'

function App() {


  const { state } = useBudget()

  // Decide si se muestra el formulario inicial o el contenido de la aplicación.
  const isValidBudget = useMemo(() => state.budget > 0, [state])

  // Guarda el presupuesto cada vez que cambia para conservarlo al recargar.
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
  }, [state.budget])

  // Conserva la lista completa cada vez que se crea, edita o elimina un gasto.
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.expenses])

  return (
    <div className='min-h-screen bg-slate-100 pb-24'>
      <header className='bg-blue-600 py-8 max-h-72'>
        <h1 className='text-white text-4xl font-black text-center uppercase'>Planificador de gastos</h1>
      </header>

      <div className='mx-auto mt-10 max-w-3xl px-5'>

        {
          isValidBudget ?
            <div className='rounded-2xl bg-white p-10 shadow-lg'>
              <BudgetTracker />
            </div>
            :
            <div className='rounded-2xl bg-white p-10 shadow-lg'>
              <BudgetForm />
            </div>
        }

        {
          isValidBudget && (
            <>
              <FilterByCategory />
              <main className='py-10'>
                <ExpenseList />
              </main>
              <ExpenseModal />
            </>
          )
        }

      </div>

    </div>
  )
}

export default App

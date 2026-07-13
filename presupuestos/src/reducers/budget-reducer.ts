import type { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'set-current-category', payload: { id: Category['id'] } }



export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id']
    currentCategory: Category['id']
}

// Recupera el último presupuesto guardado cuando inicia la aplicación.
const localStorageInitialBudget = () => {
    const budgetStorage = localStorage.getItem('budget') ?? localStorage.getItem('bu9dget')
    return budgetStorage ? +budgetStorage : 0
}

type StoredExpense = Omit<Expense, 'date'> & {
    date: string | null | [string | null, string | null]
}

// Recupera los gastos y convierte las fechas de texto nuevamente en objetos Date.
const localStorageInitialExpenses = (): Expense[] => {
    const expensesStorage = localStorage.getItem('expenses')
    if (!expensesStorage) return []

    try {
        const storedExpenses = JSON.parse(expensesStorage) as StoredExpense[]
        if (!Array.isArray(storedExpenses)) return []

        return storedExpenses.map(expense => ({
            ...expense,
            date: Array.isArray(expense.date)
                ? expense.date.map(date => date ? new Date(date) : null) as Expense['date']
                : expense.date ? new Date(expense.date) : null
        }))
    } catch {
        return []
    }
}

export const initialState: BudgetState = {
    budget: localStorageInitialBudget(),
    modal: false,
    expenses: localStorageInitialExpenses(),
    editingId:'',
    currentCategory: ''

}


// Convierte el borrador del formulario en un gasto con ID único.
const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    // Guarda el presupuesto definido en la pantalla inicial.
    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    // Abre el modal en modo creación y descarta una edición anterior.
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true,
            editingId: ''
        }
    }

    // Cierra el modal y limpia el gasto que estaba siendo editado.
    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    // Añade el gasto nuevo a la lista y cierra el formulario.
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    // Conserva todos los gastos excepto el que coincide con el ID recibido.
    if(action.type === 'remove-expense'){
        return  {
            ...state,
            expenses: state.expenses.filter(e=>e.id!==action.payload.id)
        }
    }

    // Marca un gasto para editarlo y abre el modal con sus datos.
    if(action.type==='get-expense-by-id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    // Sustituye el gasto editado y conserva los demás sin cambios.
    if(action.type==='update-expense'){
        return{
            ...state,
            expenses: state.expenses.map(exp=> exp.id===action.payload.expense.id?action.payload.expense:exp),
            modal:false,
            editingId:''
        }
    }

    // Devuelve la aplicación a su estado inicial de presupuesto y gastos.
    if(action.type==='reset-app'){
        return {
            ...state,
            budget:0,
            expenses:[]
        }
    }

    // Guarda la categoría que utilizará ExpenseList para filtrar.
    if (action.type === 'set-current-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }
    // Si la acción no coincide con ninguna conocida, mantiene el estado actual.
    return state
}

import { useEffect, useState } from 'react';
import { categories } from '../data/data'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import type { DraftExpense, Value } from '../types';
import { useBudget } from '../hooks/useBudget';




export default function ExpenseForm() {

    const { state, dispatch } = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        category: '',
        expenseName: '',
        date: new Date()
    })

    // Si hay un gasto seleccionado, carga sus datos dentro del formulario.
    useEffect(() => {
        if (!state.editingId) return

        const expenseToEdit = state.expenses.find(
            expense => expense.id === state.editingId
        )

        if (expenseToEdit) {
            const { id: _id, ...draftExpense } = expenseToEdit
            setExpense(draftExpense)
        }
    }, [state.editingId, state.expenses])


    // Actualiza el campo que cambió; el monto se convierte de texto a número.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;

        setExpense({
            ...expense,
            [name]: name === 'amount' ? +value : value
        })
    }

    // Guarda la fecha elegida por el DatePicker.
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    // Crea un gasto nuevo o actualiza el seleccionado según editingId.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                payload: { expense: { ...expense, id: state.editingId } }
            })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }


        // Deja el formulario limpio para la próxima vez que se abra.
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }


    return (
        <div>
            <form action="" className='space-y-5' onSubmit={handleSubmit}>
                <legend className='text-center text-2xl font-black border-b-4 border-blue-500 py-2 uppercase'>
                    {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
                </legend>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="expenseName" className='text-xl'>Nombre gasto:</label>
                    <input
                        type="text"
                        id='expenseName'
                        name='expenseName'
                        className='bg-slate-100 p-2'
                        placeholder='Añade el gasto'
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="amount" className='text-xl'>Cantidad:</label>
                    <input
                        type="number"
                        id='amount'
                        name='amount'
                        className='bg-slate-100 p-2'
                        placeholder='Añade la cantidad'
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </div>


                <div className='flex flex-col gap-2'>
                    <label htmlFor="category" className='text-xl'>Categoría:</label>
                    <select
                        id='category'
                        name='category'
                        className='bg-slate-100 p-2'
                        value={expense.category}
                        onChange={handleChange}
                    >
                        <option value="">--Seleccione--</option>
                        {
                            categories.map(items => (
                                <option key={items.id} value={items.id}>
                                    {items.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="w-full">
                    <DatePicker
                        onChange={handleChangeDate}
                        value={expense.date}
                        className="w-full bg-slate-100 p-2 border-0"
                    />
                </div>

                <div className='w-full'>
                    <input
                        type="submit"
                        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
                        className='w-full text-white bg-blue-600 p-2 uppercase cursor-pointer rounded-lg font-bold'
                    />
                </div>

            </form>
        </div>
    )
}

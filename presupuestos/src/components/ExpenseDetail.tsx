import { useMemo } from 'react'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { categories } from '../data/data'
import type { Expense } from '../types'
import { formatDate } from '../helpers'
import AmountDisplay from './AmountDisplay'
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailProps = {
    expense : Expense
}


export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const {dispatch} = useBudget()

    // Busca los datos de la categoría para mostrar su nombre e icono.
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category)!, [expense.category])

    // Acción que aparece al deslizar y abre el gasto en modo edición.
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={()=>dispatch({type:'get-expense-by-id', payload: {id:expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    // Acción destructiva que elimina el gasto seleccionado.
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                 onClick={()=>dispatch({type:'remove-expense', payload:{id:expense.id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )


    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="flex w-full items-center gap-5 border-b border-slate-200 py-6">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-black uppercase tracking-wide text-slate-500">{categoryInfo.name}</p>
                        <p className="text-3xl text-slate-800">{expense.expenseName}</p>
                        <p className="text-base text-slate-500">{ formatDate( expense.date!.toString() )}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>  
            </SwipeableListItem>
        </SwipeableList>
    )
}

import { useBudget } from "../hooks/useBudget";
import BudgetValue from "./BudgetValue";


// Agrupa el resumen del presupuesto, lo disponible y lo gastado.
export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    // Calcula cuánto del presupuesto se ha usado y redondea el resultado.
    const percentageSpent = Math.round((totalExpenses / state.budget) * 100)

    // El aro llega como máximo a 100%, aunque los gastos superen el presupuesto.
    const progress = Math.min(Math.max(percentageSpent, 0), 100)
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const progressOffset = circumference - (progress / 100) * circumference


    return (
        <div className='grid items-center gap-10 md:grid-cols-2'>

            <div
                className="relative mx-auto h-64 w-64"
                role="progressbar"
                aria-label="Porcentaje del presupuesto gastado"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${percentageSpent}% gastado`}
            >
                <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#0d8bf2"
                        strokeWidth="20"
                        strokeLinecap="butt"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        className="transition-all duration-500 ease-out"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-blue-500">
                        {percentageSpent}%
                    </span>
                    <span className="mt-1 text-sm font-bold uppercase text-slate-500">
                        Gastado
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button className="w-full text-white bg-pink-600 rounded-lg font-black p-2"
                    onClick={()=> dispatch({type:'reset-app'})}
                >
                    RESETEAR APP
                </button>

                <BudgetValue
                    label={"Presupuesto"}
                    budgetValue={state.budget}
                />
                <BudgetValue
                    label={"Disponible"}
                    budgetValue={remainingBudget}
                />

                <BudgetValue
                    label={"Gastado"}
                    budgetValue={totalExpenses}
                />
            </div>
        </div>
    )
}

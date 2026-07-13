import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch}=useBudget()

    // Desactiva el envío mientras el presupuesto no sea un número mayor que cero.
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    // Mantiene sincronizado el campo numérico con el estado local.
    const handleBudget = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    // Envía el presupuesto al reducer para guardarlo en el estado global.
    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'add-budget', payload:{budget}})
    }


    return (
        <form  className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">

                <label htmlFor="bugdet" className="text-4xl font-bold text-blue-600 text-center">
                    Definir presupuesto
                </label>

                <input type="number"
                    id="budget"
                    name="budget"
                    placeholder="Definir presupuesto"
                    className="w-full bg-white border border-gray-200 p-2"
                    value={budget}
                    onChange={handleBudget}
                />
            </div>

            <input type="submit"
                value='Definir presupuesto'
                disabled={isValid}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            />
        </form>
    )
}

export default BudgetForm

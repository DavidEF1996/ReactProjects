import { formatCurrency } from "../helpers"

type BudgetValueProps = {
    label: string,
    budgetValue: number
}


// Presenta uno de los valores del resumen con formato de moneda.
export default function BudgetValue({ label, budgetValue }: BudgetValueProps) {



    return (
        <p className="font-bold text-blue-600 text-2xl">
            {label}:{' '}<span className="text-black font-black">{formatCurrency(budgetValue)}</span>

        </p>
    )
}

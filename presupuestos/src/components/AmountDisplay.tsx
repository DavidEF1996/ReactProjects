import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

// Muestra una cantidad con formato de moneda y una etiqueta opcional.
export default function AmountDisplay({label, amount} : AmountDisplayProps)  {
  return (
    <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{formatCurrency( amount )}</span>
    </p>
  )
}

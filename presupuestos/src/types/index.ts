// Forma completa de un gasto que ya fue guardado.
export type Expense ={
    id:string,
    amount: number,
    expenseName: string,
    category: string,
    date: Value
}

// Gasto todavía sin ID, usado mientras se llena el formulario.
export type DraftExpense = Omit<Expense, 'id'>

// Valores que puede entregar el selector de fecha.
type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Información necesaria para identificar y mostrar una categoría.
export type Category  ={
    id:string,
    name:string,
    icon:string
}

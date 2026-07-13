// Convierte un número en una cantidad legible con símbolo de moneda.
export function formatCurrency (amount: number){
    return new Intl.NumberFormat('en-US',{style:'currency', currency:'USD'}).format(amount)
}


// Convierte la fecha guardada en un texto largo en español.
export function formatDate(dateStr: string) : string {
    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}

const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type OrderPropinasProps ={
    setPropina: React.Dispatch<React.SetStateAction<number>>,
    propina: number
}


export default function OrderPropinas({ setPropina, propina}:OrderPropinasProps) {
    return (
        <div>

            <h3 className="font-black text-2xl mt-4">Propinas</h3>
            <form >

                {
                    tipOptions.map(item => (
                        <div key={item.id} className="flex gap-2.5">
                            <label htmlFor={item.id}>{item.label}</label>
                            <input type="radio"
                                id={item.id}
                                value={item.value}
                                name="item" 
                                checked={propina === item.value}
                                onChange={e => setPropina(+e.target.value)}
                                />
                        </div>

                    ))
                }

            </form>
        </div>
    )
}

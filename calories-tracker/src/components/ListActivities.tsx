import { useMemo } from 'react'
import type { Activity } from '../types'
import { categories } from '../data/data'
import type { ActivityActions } from '../reducer/activity-reducer'


type ActivityListProps = {
    activities: Activity[],
    dispatch: React.Dispatch<ActivityActions>
}

export default function ListActivities({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(()=> (category: Activity['category'])=>categories.map(cat=> cat.id === category? cat.name : ''),[activities])

    return (
        <div>
            <h2 className='text-4xl text-center font-bold text-slate-600 text-center'>COMIDA Y ACTIVIDADES</h2>

            {
                activities.length>0?
                activities.map(ext => (
                    <div 
                    key={ext.id}
                    className='bg-gray-100 px-5 py-10 mt-5 flex justify-between'>

                        <div className='space-y-2 relative'>

                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${ext.category===1?'bg-lime-500': 'bg-orange-500'}`}>
                                {categoryName(ext.category)}
                            </p>
                            <p className='text-2xl font-bold pt-5'>
                                {ext.activity}
                            </p>
                            <p className='text-4xl text-lime-500 font-black'>
                                {ext.calories} {''}
                                <span>Calorias</span>
                            </p>

                        </div>

                        <div className='flex justify-between gap-2 '>
                            <button className="text-green-500 px-4 py-2 rounded-md transition-all hover:shadow-lg hover:-translate-y-1"
                            onClick={()=> dispatch({type:'set-activeId', payload:{id:ext.id}})}>
                                Editar
                            </button>

                            <button className="text-red-600 px-4 py-2 rounded-md transition-all hover:shadow-lg hover:-translate-y-1"
                            onClick={()=> dispatch({type:'delete-activity', payload:{id:ext.id}})}>
                                Eliminar
                            </button>

                        </div>


                    </div>
                ))
                :
                <h2 className='text-4xl w-full text-center mt-16 font-bold' >Aún no se han agregado comida ni actividades</h2>
            }
        </div>
    )
}

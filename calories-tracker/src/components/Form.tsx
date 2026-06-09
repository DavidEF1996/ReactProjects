import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ChangeEvent,Dispatch,SubmitEvent } from 'react'
import { categories } from '../data/data'
import type { Activity } from '../types'
import type { ActivityActions, ActivityState } from '../reducer/activity-reducer'

type FormProps ={
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const DEFAULT_VALUES:Activity = {
    id:uuidv4(),
    category: 1,
    activity: '',
    calories: 0
}

export default function Form({dispatch, state}:FormProps) {


    const [activitySelect, setActivitySelect] = useState<Activity>(DEFAULT_VALUES)

    useEffect(()=>{
        if(state.activeId){
            const selectActivity = state.activities.filter(act=> act.id===state.activeId)[0]
            setActivitySelect(selectActivity)
        }
    },[state.activeId])

    const handleEvent = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivitySelect({
            ...activitySelect,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }


    const validateFields = ()=>{
        const {activity, calories} = activitySelect
        return activity.trim()!=='' && calories>0
    }

    const handleSubmit = (e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'save-activity', payload: {newActivity:activitySelect}})
        setActivitySelect({
            ...DEFAULT_VALUES,
            id:uuidv4()
        })
    }

    return (

        <form action="" className='space-y-5 bg-white p-10 shadow rounded-lg'
        onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="category" className='font-bold'>Categoria</label>
                <select
                    className='border border-slate-300 p-2 rounded-lg w-full bg-white'
                    name=""
                    id="category"
                    value={activitySelect.category}
                    onChange={handleEvent}>

                    {
                        categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="activity" className='font-bold'>Actividad</label>
                <input type="text" id="activity"
                    className='border border-slate-300 p-2 rounded-lg'
                    placeholder='Ej: Comida, Jugo, Ejercicio'
                    value={activitySelect.activity}
                    onChange={handleEvent} />
            </div>


            <div className='grid grid-cols-1 gap-3'>
                <label htmlFor="calories" className='font-bold'>Calorias</label>
                <input type="number" id="calories"
                    className='border border-slate-300 p-2 rounded-lg'
                    placeholder='Calorias. ej. 300'
                    value={activitySelect.calories}
                    onChange={handleEvent} />
            </div>

          
            <input type="submit"
                className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
                value={activitySelect.category==1?'Guardar Comida':'Guardar Ejercicio'}
                disabled={!validateFields()}
            />
        </form>
    )
}

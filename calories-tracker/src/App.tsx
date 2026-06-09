import Form from "./components/Form"
import { useEffect, useReducer } from "react"
import { activityReducer, initialState, type ActivityState } from "./reducer/activity-reducer"
import ListActivities from "./components/ListActivities"

const localStorageActivities = (): ActivityState => {
  const activitiesStorage = localStorage.getItem('activities')
  if (!activitiesStorage) return initialState

  const parsedActivities = JSON.parse(activitiesStorage)

  if (Array.isArray(parsedActivities)) {
    return {
      activities: parsedActivities,
      activeId: ''
    }
  }

  return parsedActivities
}

function App() {


  const [state, dispatch]= useReducer(activityReducer, initialState, localStorageActivities)

  const {activities}=state
  const caloriesConsumed = activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)
  const caloriesBurned = activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)
  const caloriesDifference = caloriesConsumed - caloriesBurned

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state))
  }, [state])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto bg-lime-600 flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">CONTADOR DE CALORIAS</h1>
        </div>
      </header>


      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-black py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-white uppercase">
            Resumen de Calorias
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 text-white sm:grid-cols-3">
            <div className="text-center">
              <p className="text-5xl font-black">{caloriesConsumed}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em]">Consumidas</p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-black">{caloriesBurned}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em]">Quemadas</p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-black">{caloriesDifference}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em]">Diferencia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl bg-white">
       <ListActivities 
       activities={activities}
         dispatch={dispatch}
       />
      </section>
    </>
  )
}

export default App

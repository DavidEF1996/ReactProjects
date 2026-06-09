import type { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload :{newActivity:Activity}}|
    { type: 'set-activeId', payload :{id:Activity['id']}}|
    { type: 'delete-activity', payload :{id:Activity['id']}}



export type ActivityState = {

    activities:Activity[],
    activeId: Activity['id']
}

export const initialState ={

    activities:[],
    activeId: ''

}


export const activityReducer = (
    state: ActivityState= initialState,
    action: ActivityActions
)=>{
    if (action.type==='save-activity'){
        return saveActivity(state, action.payload.newActivity)
    }

    if (action.type==='set-activeId'){
        return setActiveId(state, action.payload.id)
    }

    if (action.type==='delete-activity'){
        return deleteActivity(state, action.payload.id)
    }

    return state
}


const saveActivity = (state: ActivityState, newActivity: Activity) => {
    const updatedActivity = state.activeId
        ? state.activities.map(act => act.id === state.activeId ? newActivity : act)
        : [...state.activities, newActivity]

    return {
        ...state,
        activities: updatedActivity,
        activeId:''
    }
}

const setActiveId = (state: ActivityState, id: Activity['id']) => {
    return {
        ...state,
        activeId: id
    }
}

const deleteActivity = (state: ActivityState, id: Activity['id']) => {
    return {
        ...state,
        activities: state.activities.filter(act => act.id !== id)
    }
}

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type { DraftPatient, Patient } from '../types';
import {v4 as uuidv4} from 'uuid'

type PatientState = {
    patients: Patient[],
    activeId:Patient['id']
    addPatient: (data:DraftPatient)=> void
    deletePatient:(id:Patient['id'])=> void
    getActiveId:(id:Patient['id'])=>void
    updatePatient:(data:DraftPatient)=> void
}

const createPatient = (patient:DraftPatient):Patient=>{
    return {...patient, id: uuidv4()}
}


const deleteAndReturnNewList =(state:PatientState, id:string):Patient[]=>{
    return state.patients.filter(patient => patient.id !== id)
}

const updateAndReturnNewList = (state:PatientState, updatePatient:DraftPatient):Patient[]=>{
    return state.patients.map(element=> element.id===state.activeId?{id:state.activeId,...updatePatient}:element)
}

export const usePatientStore = create<PatientState>()(persist((set)=>({
    patients:[],
    activeId:'',
    addPatient:(data)=>{
        set((state)=>({
            patients:[...state.patients, createPatient(data)]
        }))
    },
    deletePatient: (id)=>{
        set((state)=>({
            patients:deleteAndReturnNewList(state, id)
        }))
    },
    getActiveId:(id)=>{
        set(()=>({
            activeId:id
        }))
    },
    updatePatient:(patient:DraftPatient)=>{
        set((state)=>({
            patients:updateAndReturnNewList(state, patient),
            activeId:''
        }))

    }
}), {
    name: 'patient-storage',
    partialize: (state) => ({ patients: state.patients })
}))

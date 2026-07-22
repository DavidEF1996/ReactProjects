import { toast } from 'react-toastify'
import { usePatientStore } from '../store/store'
import type { Patient } from '../types'
import PatientItemDetails from './PatientItemDetails'

type PatientDetailsProps = {
    patient: Patient
}
export default function PatientDetails({ patient }: PatientDetailsProps) {

    const { deletePatient, getActiveId } = usePatientStore()


    const handleClick = () => {
        deletePatient(patient.id)
        toast.success('Paciente eliminado correctamente')

    }

    return (
        <div className='mx-5 my-5 px-5 py-5 bg-white shadow-md rounded-xl'>
            <PatientItemDetails label="ID" value={patient.id} />
            <PatientItemDetails label="Paciente" value={patient.name} />
            <PatientItemDetails label="Propietario" value={patient.caretaker} />
            <PatientItemDetails label="correo" value={patient.email} />
            <PatientItemDetails label="Fecha de Alta" value={patient.date} />
            <PatientItemDetails label="Sintomas" value={patient.symptoms} />

            <div className='flex justify-between mt-4'>
                <button className='bg-red-500 px-4 py-2 font-bold text-white rounded-lg w-50' type='button' onClick={handleClick}>Eliminar</button>
                <button className='bg-indigo-600 px-4 py-2 font-bold text-white rounded-lg w-50' onClick={() => getActiveId(patient.id)}>Editar</button>

            </div>
        </div>
    )
}

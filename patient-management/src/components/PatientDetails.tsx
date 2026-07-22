import type { Patient } from '../types'
import PatientItemDetails from './PatientItemDetails'

type PatientDetailsProps = {
    patient: Patient
}
export default function PatientDetails({ patient }: PatientDetailsProps) {
    return (
        <div className='mx-5 my-5 px-5 py-5 bg-white shadow-md rounded-xl'>
            <PatientItemDetails label="ID" value={patient.id} />
            <PatientItemDetails label="Paciente" value={patient.name} />
            <PatientItemDetails label="Propietario" value={patient.caretaker} />
            <PatientItemDetails label="correo" value={patient.email} />
            <PatientItemDetails label="Fecha de Alta" value={patient.date.toString()} />
            <PatientItemDetails label="Sintomas" value={patient.symptoms} />

        </div>
    )
}

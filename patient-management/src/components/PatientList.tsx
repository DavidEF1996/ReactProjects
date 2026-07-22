import { usePatientStore } from "../store/store"
import PatientDetails from "./PatientDetails"



export default function PatientList() {

    const { patients } = usePatientStore()

    return (
        <div className="md:w-1/2 lg:h-3/5 md:h-screen  ">
            {
                patients.length > 0 ? (
                    <>
                        <h2 className="text-center font-black text-3xl">Listado de Pacientes</h2>
                        <p className="text-xl mt-5 mb-10 text-center">Administra tus {''}
                            <span className="text-indigo-600 font-bold">Pacientes y citas</span>
                        </p>


                        <div className="max-h-80 overflow-y-auto pr-2 md:max-h-[60vh]">
                            {patients.map(pati => (
                                <PatientDetails
                                    key={pati.id}
                                    patient={pati}
                                />
                            ))}
                        </div>

                    </>
                ) : (
                    <>
                        <>
                            <h2 className="text-center font-black text-3xl">No hay pacientes</h2>
                            <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes {''}
                                <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
                            </p>
                        </>
                    </>
                )
            }
        </div>
    )
}

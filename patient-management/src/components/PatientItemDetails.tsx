type PatientItemDetailsProps = {

    label: string,
    value: string
}


export default function PatientItemDetails({ label, value }: PatientItemDetailsProps) {
    return (

        <p className="font-bold text-gray-700 uppercase mb-3">{label}:{''}
            <span className="font-normal normal-case">{value}</span>
        </p>


    )
}

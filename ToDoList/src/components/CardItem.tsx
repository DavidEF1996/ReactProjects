import { useState } from "react"
import type { TaskType } from "../types/task"
import { FaEdit } from "react-icons/fa";

type CardItemProps = {
    task: TaskType,
    setTareaArrastrada: React.Dispatch<React.SetStateAction<number | null>>
    updateTaskDescription: (id: number, description: string) => void
}

export default function CardItem({ task, setTareaArrastrada, updateTaskDescription }: CardItemProps) {
    const stateStyles = {
        new: {
            text: "Nueva",
            color: "text-green-500",
            dot: "bg-green-500",
        },
        process: {
            text: "Activa",
            color: "text-blue-500",
            dot: "bg-blue-500",
        },
        finished: {
            text: "Finalizada",
            color: "text-gray-500",
            dot: "bg-gray-500",
        },
    } as const

    const currentState = stateStyles[task.state]
    const [isEditing, setIsEditing] = useState(false)
    const [descriptionDraft, setDescriptionDraft] = useState(task.description)

    const handleSaveDescription = () => {
        updateTaskDescription(task.id, descriptionDraft)
        setIsEditing(false)
    }

    return (
        <div draggable={!isEditing}
            onDragStart={() => setTareaArrastrada(task.id)}
            className="rounded-xl bg-yellow-100 p-4 shadow-md"
        >
            <div className="flex flex-col justify-start items-start gap-2 mb-5">
                <h2 className="font-black">Tarea: <span className="font-normal">{task.title}</span></h2>
                <div className="w-full flex flex-col items-start gap-1">
                    <h2 className="font-black">
                        Description: <span className="font-normal text-sm text-gray-700">{task.description || "Sin descripcion"}</span>
                    </h2>
                    {isEditing ? (
                        <input
                            autoFocus
                            type="text"
                            value={descriptionDraft}
                            onChange={(e) => setDescriptionDraft(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSaveDescription()
                                }
                            }}
                            className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 outline-none focus:border-blue-500"
                        />
                    ) : null}
                </div>
            </div>


            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => {
                        setDescriptionDraft(task.description)
                        setIsEditing(true)
                    }}
                    className="text-blue-500 text-xl cursor-pointer"
                >
                    <FaEdit />
                </button>
                <p className={`flex items-center gap-2 text-sm ${currentState.color}`}>
                    <span className={`h-2 w-2 rounded-full ${currentState.dot}`}></span>
                    {currentState.text}
                </p>
            </div>
        </div>
    )
}

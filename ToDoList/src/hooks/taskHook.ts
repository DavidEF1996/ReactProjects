import { useState } from "react"
import type { TaskType } from "../types/task"

export default function useTaskHook() {

    const [task, setTask] = useState("")

    const [tareasRender, setTareas] = useState<TaskType[]>([])
    const [tareaArrastrada, setTareaArrastrada] = useState<number | null>(null)

    const addTask = (tarea: TaskType) => {
        setTareas([...tareasRender, tarea])
    }


    const moveTask = (id: number | null, state: TaskType["state"]) => {
        if (id === null) return

        setTareas(
            tareasRender.map(item =>
                item.id === id
                    ? { ...item, state: state }
                    : item
            )
        )
    }

    const updateTaskDescription = (id: number, description: string) => {
        setTareas(
            tareasRender.map(item =>
                item.id === id
                    ? { ...item, description }
                    : item
            )
        )
    }

    return {

        task,
        addTask,
        setTask,
        tareasRender,
        tareaArrastrada,
        setTareaArrastrada,
        moveTask,
        updateTaskDescription


    }
}

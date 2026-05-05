import type { TaskType } from "../types/task"
import CardComponent from "./CardContainer"

type MainProps = {
    task: string,
    addTask: (tarea: TaskType) => void,
    setTask: React.Dispatch<React.SetStateAction<string>>,
    tareasRender: TaskType[],
    tareaArrastrada: number | null,
    setTareaArrastrada: React.Dispatch<React.SetStateAction<number | null>>,
    moveTask: (id: number | null, state: TaskType["state"]) => void,
    updateTaskDescription: (id: number, description: string) => void
}

export default function Main({ task, addTask, setTask, tareasRender, tareaArrastrada, setTareaArrastrada, moveTask, updateTaskDescription }: MainProps) {



    return (

        <main className="bg-white p-7 sm:mb-6" >

            <div className="grid gap-3 sm:h-14 sm:grid-cols-[3fr_1fr] sm:items-center">
                <div>
                    <input
                        type="text"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        placeholder="Qué te gustaría hacer?"
                        className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <button
                        onClick={() => addTask({ id: Date.now(), title: task, description: "", state: "new" })}
                        className="w-full bg-black p-3 uppercase text-white font-bold rounded-md ">Guardar</button>
                </div>
            </div >


            <CardComponent
                tareasRender={tareasRender}
                tareaArrastrada={tareaArrastrada}
                setTareaArrastrada={setTareaArrastrada}
                moveTask={moveTask}
                updateTaskDescription={updateTaskDescription}
            />




        </main>
    )
}

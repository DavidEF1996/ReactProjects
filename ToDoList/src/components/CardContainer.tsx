import type { TaskType } from "../types/task"
import CardItem from "./CardItem"

type CardComponentProps = {
    tareasRender: TaskType[],
    tareaArrastrada: number | null,
    setTareaArrastrada: React.Dispatch<React.SetStateAction<number | null>>
    moveTask: (id: number | null, state: TaskType["state"]) => void,
    updateTaskDescription: (id: number, description: string) => void
}

export default function CardComponent({ tareasRender, tareaArrastrada, setTareaArrastrada, moveTask, updateTaskDescription }: CardComponentProps) {
    return (


        <div>

            <div className="mt-7 grid gap-6 p-3 text-center sm:grid-cols-[1fr_1fr_1fr] sm:gap-3">

                <div className="min-h-36 rounded-xl bg-gray-50 p-3"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                        moveTask(tareaArrastrada, "new")
                        setTareaArrastrada(null)
                    }}>
                    <h4 className="mb-4">Nueva</h4>

                    {
                        tareasRender.map(item =>
                            item.state === "new" ?
                                (
                                    <div key={item.id} className="p-1.5">
                                        <CardItem
                                            task={item}
                                            setTareaArrastrada={setTareaArrastrada}
                                            updateTaskDescription={updateTaskDescription}
                                        />
                                    </div>

                                ) : null
                        )
                    }
                </div>
                <div
                    className="min-h-36 rounded-xl bg-gray-50 p-3"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                        moveTask(tareaArrastrada, "process")
                        setTareaArrastrada(null)
                    }}
                >
                    <h4 className="mb-4">Activa</h4>
                    {
                        tareasRender.map(item =>
                            item.state === "process" ?
                                (
                                    <div key={item.id} className="p-1.5">
                                        <CardItem
                                            task={item}
                                            setTareaArrastrada={setTareaArrastrada}
                                            updateTaskDescription={updateTaskDescription}
                                        />
                                    </div>

                                ) : null
                        )
                    }
                </div>
                <div
                    className="min-h-36 rounded-xl bg-gray-50 p-3"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                        moveTask(tareaArrastrada, "finished")
                        setTareaArrastrada(null)
                    }}
                >

                    <h4 className="mb-4">Finalizada</h4>
                    {
                        tareasRender.map(item =>
                            item.state === "finished" ?
                                (
                                    <div key={item.id} className="p-1.5">
                                        <CardItem
                                            task={item}
                                            setTareaArrastrada={setTareaArrastrada}
                                            updateTaskDescription={updateTaskDescription}
                                        />
                                    </div>

                                ) : null
                        )
                    }
                </div>

            </div>
        </div>






    )
}

import Header from "./components/Header"
import Main from "./components/Main"
import useTaskHook from "./hooks/taskHook";


function App() {

  const { task, addTask, setTask, tareasRender, tareaArrastrada, setTareaArrastrada, moveTask, updateTaskDescription } = useTaskHook();
  return (
    <>
      <Header />

      <Main
        task={task}
        addTask={addTask}
        setTask={setTask}
        tareasRender={tareasRender}
        tareaArrastrada={tareaArrastrada}
        setTareaArrastrada={setTareaArrastrada}
        moveTask={moveTask}
        updateTaskDescription={updateTaskDescription}
      />

      <footer>


      </footer>
    </>
  )
}

export default App

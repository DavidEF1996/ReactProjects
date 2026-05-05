
import { FaCheckSquare } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
export default function Header() {
  return (
    <header className="bg-white p-7 rounded-t-lg mt-3.5">
        <div className="flex justify-between items-center">
               <div className="flex items-center gap-5">
          <FaCheckSquare className="text-blue-300 text-7xl" />
          <div>
            <h1 className="font-black text-4xl">Mis Tareas</h1>
            <h3 className="text-sm font-light">Organiza tu día y logra más</h3>
          </div>
        </div>

        <FaSun className="text-yellow-400 text-3xl drop-shadow-lg"/>

        </div>
        <div className="border-gray-200 border-b mt-3.5"></div>

      </header>
  )
}

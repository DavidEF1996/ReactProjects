import { categories } from '../data/data'
import { useBudget } from '../hooks/useBudget'

// Cambia la categoría usada para filtrar el listado de gastos.
export default function FilterByCategory() {
    const { state, dispatch } = useBudget()

    return (
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <label
                    htmlFor="filter-category"
                    className="text-2xl font-semibold text-slate-700"
                >
                    Filtrar Gastos
                </label>

                <select
                    id="filter-category"
                    value={state.currentCategory}
                    onChange={(e) =>
                        dispatch({
                            type: 'set-current-category',
                            payload: { id: e.target.value },
                        })
                    }
                    className="w-full rounded-xl bg-slate-100 p-3 text-lg text-slate-700 outline-none"
                >
                    <option value="">-- Todas las Categorias --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

# Planificador de gastos

Aplicación creada con React, TypeScript y Vite para definir un presupuesto, registrar gastos, editarlos, eliminarlos y filtrarlos por categoría. También calcula el dinero gastado y disponible, muestra un progreso circular y conserva la información en `localStorage`.

## Funcionalidades

- Definir y conservar un presupuesto.
- Registrar gastos con nombre, cantidad, categoría y fecha.
- Editar y eliminar gastos mediante acciones deslizables.
- Filtrar los gastos por categoría.
- Calcular presupuesto disponible y total gastado.
- Mostrar el porcentaje gastado en un gráfico circular dinámico.
- Guardar el presupuesto y los gastos en `localStorage`.
- Restablecer la aplicación.

## Tecnologías utilizadas

- React 19.
- TypeScript.
- Vite.
- Tailwind CSS.
- Headless UI para el modal.
- Heroicons para el botón flotante.
- React Date Picker y React Calendar para las fechas.
- React Swipeable List para editar y eliminar deslizando.
- UUID para generar identificadores únicos.

## 1. Crear el proyecto

Primero se crea un proyecto de React con TypeScript usando Vite:

```bash
npm create vite@latest presupuestos -- --template react-ts
```

Después se entra en la carpeta del proyecto:

```bash
cd presupuestos
```

Se instalan las dependencias iniciales:

```bash
npm install
```

Para comprobar que el proyecto funciona:

```bash
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173`.

## 2. Instalar las dependencias

Las librerías utilizadas por la aplicación se pueden instalar con:

```bash
npm install @headlessui/react @heroicons/react react-date-picker react-calendar react-swipeable-list uuid
```

Tailwind CSS y su integración con Vite se instalan con:

```bash
npm install tailwindcss @tailwindcss/vite
```

En `vite.config.ts` se importa el plugin de Tailwind y se añade a `plugins`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

En `src/index.css` se carga Tailwind:

```css
@import "tailwindcss";
```

Este proyecto también carga allí los estilos de la lista deslizable. Se usa una ruta relativa porque la versión actual de Vite no resuelve correctamente el subpath de estilos de esa librería:

```css
@import "../node_modules/react-swipeable-list/dist/styles.css";
```

## 3. Preparar la estructura de carpetas

Dentro de `src` se organiza el proyecto así:

```text
src/
├── components/
│   ├── AmountDisplay.tsx
│   ├── BudgetForm.tsx
│   ├── BudgetTracker.tsx
│   ├── BudgetValue.tsx
│   ├── ExpenseDetail.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   ├── ExpenseModal.tsx
│   └── FilterByCategory.tsx
├── context/
│   └── BudgetContext.tsx
├── data/
│   └── data.ts
├── helpers/
│   └── index.ts
├── hooks/
│   └── useBudget.ts
├── reducers/
│   └── budget-reducer.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
```

Los iconos de las categorías se guardan en `public` para acceder a ellos desde rutas como `/icono_comida.svg`.

## 4. Crear los tipos

El primer archivo de la lógica es `src/types/index.ts`. Se crean los tipos antes que los componentes para que todo el proyecto comparta la misma forma de los datos.

1. `Value` representa la fecha entregada por el selector.
2. `Expense` representa un gasto guardado y contiene un `id`.
3. `DraftExpense` representa el formulario antes de crear el ID.
4. `Category` describe cada categoría disponible.

La diferencia importante es que `DraftExpense` todavía no tiene identificador:

```ts
export type DraftExpense = Omit<Expense, 'id'>
```

## 5. Crear los datos de las categorías

En `src/data/data.ts` se crea el arreglo `categories`. Cada elemento contiene:

- `id`: valor que se guarda en el gasto.
- `name`: nombre mostrado al usuario.
- `icon`: parte final del nombre del SVG guardado en `public`.

Este catálogo se reutiliza en el formulario, el filtro y el detalle del gasto.

## 6. Crear los helpers

En `src/helpers/index.ts` se crean primero las funciones independientes:

- `formatCurrency`: convierte un número a moneda.
- `formatDate`: convierte la fecha guardada a un texto en español.

Se crean temprano porque después serán utilizadas por varios componentes.

## 7. Crear el reducer y el estado global

El siguiente paso es `src/reducers/budget-reducer.ts`. Su construcción puede seguir este orden:

1. Definir `BudgetActions`, que enumera todas las acciones permitidas.
2. Definir `BudgetState`, que describe el estado global.
3. Crear las funciones que leen presupuesto y gastos desde `localStorage`.
4. Crear `initialState` con los valores recuperados.
5. Crear `createExpense`, que agrega un UUID al borrador.
6. Crear `budgetReducer`, que recibe el estado y una acción y devuelve un estado nuevo.

Las acciones se agregan progresivamente:

1. `add-budget`: guarda el presupuesto.
2. `show-modal` y `hide-modal`: controlan el modal.
3. `add-expense`: crea un gasto.
4. `remove-expense`: elimina por ID.
5. `get-expense-by-id`: selecciona el gasto que se editará.
6. `update-expense`: sustituye el gasto editado.
7. `reset-app`: limpia presupuesto y gastos.
8. `set-current-category`: cambia el filtro.

El reducer nunca modifica directamente el estado anterior. Siempre devuelve un objeto o arreglo nuevo usando el operador `...`.

## 8. Crear el contexto

En `src/context/BudgetContext.tsx` se conecta el reducer con React:

1. Se define `BudgetContextProps` con `state`, `dispatch` y los cálculos compartidos.
2. Se crea `BudgetContext`.
3. Se crea `BudgetProvider`.
4. Dentro del provider se ejecuta `useReducer`.
5. Se calcula `totalExpenses` sumando los montos.
6. Se calcula `remainingBudget` restando los gastos al presupuesto.
7. Se comparten esos valores mediante `BudgetContext.Provider`.

El total se memoriza para volver a calcularse únicamente cuando cambia la lista:

```ts
const totalExpenses = useMemo(
  () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
  [state.expenses]
)
```

## 9. Crear el hook personalizado

En `src/hooks/useBudget.ts` se crea `useBudget`. Este hook evita repetir `useContext(BudgetContext)` en cada componente y permite obtener:

```ts
const { state, dispatch, totalExpenses, remainingBudget } = useBudget()
```

También muestra un error claro si algún componente intenta usar el contexto fuera de `BudgetProvider`.

## 10. Conectar el provider en main.tsx

En `src/main.tsx`, `App` se envuelve con `BudgetProvider`:

```tsx
<BudgetProvider>
  <App />
</BudgetProvider>
```

Desde ese momento todos los componentes descendientes pueden usar `useBudget`.

## 11. Crear el formulario del presupuesto

En `src/components/BudgetForm.tsx` se construye el primer flujo visible:

1. Crear un estado local para el campo `budget`.
2. Calcular `isValid` para impedir valores vacíos, inválidos o menores que uno.
3. Crear `handleBudget` para sincronizar el input.
4. Crear `handleSubmit` para enviar `add-budget`.
5. Renderizar el formulario y desactivar el botón cuando sea inválido.

Dentro de los componentes se mantiene este orden para facilitar la lectura:

```text
contexto y estado local
→ valores calculados
→ efectos
→ handlers
→ return con JSX
```

## 12. Crear los componentes de valores

Después se crean componentes pequeños y reutilizables:

- `BudgetValue.tsx` muestra presupuesto, disponible o gastado.
- `AmountDisplay.tsx` muestra el monto de un gasto.

Ambos usan `formatCurrency`, por lo que el formato queda centralizado.

## 13. Crear el resumen del presupuesto

En `src/components/BudgetTracker.tsx` se obtiene desde el contexto:

- El presupuesto.
- El total gastado.
- El presupuesto restante.
- `dispatch` para restablecer la aplicación.

Luego se calcula el porcentaje gastado:

```ts
const percentageSpent = Math.round((totalExpenses / state.budget) * 100)
```

El gráfico se crea con dos círculos SVG. El primero es el fondo gris y el segundo usa `strokeDashoffset` para representar el porcentaje. El valor visual se limita entre 0 y 100, aunque el texto puede mostrar que el presupuesto fue superado.

Finalmente se muestran los tres `BudgetValue` y el botón que envía `reset-app`.

## 14. Crear el formulario de gastos

En `src/components/ExpenseForm.tsx` se construye el formulario en este orden:

1. Obtener `state` y `dispatch`.
2. Crear el estado local `expense` con los campos vacíos.
3. Usar `useEffect` para precargar un gasto cuando existe `editingId`.
4. Crear `handleChange` para nombre, monto y categoría.
5. Crear `handleChangeDate` para la fecha.
6. Crear `handleSubmit`.
7. Si existe `editingId`, enviar `update-expense`; si no, enviar `add-expense`.
8. Limpiar el formulario después de guardar.

Los estilos propios de las fechas se importan en este componente:

```ts
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
```

## 15. Crear el modal

En `src/components/ExpenseModal.tsx` se usa Headless UI:

1. El botón flotante envía `show-modal`.
2. `Transition` consulta `state.modal` para mostrarse u ocultarse.
3. `Dialog` envía `hide-modal` cuando el usuario cierra el panel.
4. `DialogPanel` contiene `ExpenseForm`.

El panel usa `overflow-visible` para que el calendario desplegable no quede recortado.

## 16. Crear el detalle deslizable

En `src/components/ExpenseDetail.tsx` se representa un gasto:

1. Se busca la información de su categoría.
2. `leadingActions` muestra la opción de actualizar.
3. Al actualizar se envía `get-expense-by-id`, se guarda el ID y se abre el modal.
4. `trailingActions` muestra la opción de eliminar.
5. Al eliminar se envía `remove-expense`.
6. Se muestran icono, categoría, nombre, fecha y cantidad.

`react-swipeable-list` aplica una animación destructiva antes de ejecutar la eliminación. Por eso sus estilos globales son necesarios.

## 17. Crear el listado y el filtro

En `src/components/ExpenseList.tsx`:

1. Se obtiene la lista global.
2. Si hay una categoría seleccionada, se filtran los gastos.
3. Se calcula si el resultado está vacío.
4. Se recorre el arreglo y se crea un `ExpenseDetail` por gasto.
5. Se usa `expense.id` como `key` para que React identifique cada fila.

En `src/components/FilterByCategory.tsx`:

1. Se muestran las categorías en un `select`.
2. Cada cambio envía `set-current-category`.
3. Una cadena vacía representa “todas las categorías”.

## 18. Integrar todo en App.tsx

`src/App.tsx` termina conectando las pantallas:

1. Obtiene el estado global.
2. Calcula si existe un presupuesto válido.
3. Guarda el presupuesto en `localStorage` cuando cambia.
4. Guarda los gastos en `localStorage` cuando cambia la lista.
5. Sin presupuesto muestra `BudgetForm`.
6. Con presupuesto muestra `BudgetTracker`, `FilterByCategory`, `ExpenseList` y `ExpenseModal`.

El guardado de gastos usa JSON:

```ts
localStorage.setItem('expenses', JSON.stringify(state.expenses))
```

Cuando la aplicación inicia, el reducer recupera ese JSON y convierte las fechas de texto nuevamente en objetos `Date`.

## 19. Orden recomendado dentro de cada archivo

Este proyecto no utiliza clases; utiliza componentes funcionales. Para que todos los archivos se puedan leer de arriba hacia abajo, se mantiene el siguiente orden:

1. Imports.
2. Tipos de props.
3. Declaración del componente o función.
4. Lectura del contexto.
5. Estados locales.
6. Valores derivados con `useMemo` o cálculos normales.
7. Efectos con `useEffect`.
8. Handlers de eventos.
9. Retorno JSX.
10. Exportación, cuando no se exporta en la declaración.

En el reducer el orden es:

1. Tipos de acciones y estado.
2. Funciones de carga inicial.
3. Estado inicial.
4. Funciones auxiliares.
5. Reducer y casos de acciones.

## 20. Probar el proyecto

Arrancar el servidor de desarrollo:

```bash
npm run dev
```

Comprobar TypeScript y generar la versión de producción:

```bash
npm run build
```

Ejecutar el analizador de código:

```bash
npm run lint
```

Previsualizar la compilación de producción:

```bash
npm run preview
```

## 21. Recorrido para probar todas las funciones

1. Definir un presupuesto mayor que cero.
2. Abrir el modal con el botón `+`.
3. Registrar un gasto y comprobar que cambian el gráfico y los totales.
4. Recargar el navegador y confirmar que el gasto permanece.
5. Deslizar un gasto hacia un lado y actualizar sus datos.
6. Deslizarlo hacia el otro lado y eliminarlo.
7. Crear gastos de categorías diferentes y probar el filtro.
8. Gastar más que el presupuesto para revisar el porcentaje superior a 100%.
9. Pulsar “Resetear app” y confirmar que presupuesto y gastos se limpian.

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Revisión de TypeScript y compilación
npm run lint     # Análisis estático
npm run preview  # Vista previa de producción
```

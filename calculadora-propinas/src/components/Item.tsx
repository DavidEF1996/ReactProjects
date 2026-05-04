
import type { MenuItem } from '../types'

type MenuItemProps = {
    item:MenuItem,
    addItem: (item:MenuItem) => void
}

export default function Item({item, addItem}:MenuItemProps) {
  return (
    <button
     onClick={()=>addItem(item)}
    className='border-2 rounded-2xl w-full border-teal-300 p-3 flex justify-between hover:bg-teal-100 '>
      <p>{item.name}</p>
      <p className='font-bold'>${item.price}</p>
    </button>
  )
}

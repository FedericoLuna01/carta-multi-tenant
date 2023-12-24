import { useSortable } from "@dnd-kit/sortable"
import { Category } from "@prisma/client"
import { CSS } from '@dnd-kit/utilities'

const SortableItem = ({ category }: {category: Category}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-md shadow-md border-input border-2 my-2"
    >
      {category.name}
    </div>
  )
}

export default SortableItem
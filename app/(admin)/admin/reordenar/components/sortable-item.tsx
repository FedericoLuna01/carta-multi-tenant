import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

const SortableItem = ({ item, children }: {item: any, children: React.ReactNode}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: '100%',
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn('', {
        'bg-white p-4 rounded-md shadow-md border-input border-2 my-2 flex items-center w-full': true,
        ' opacity-40': isDragging,
      })}
    >
      {children}
    </div>
  )
}

export default SortableItem
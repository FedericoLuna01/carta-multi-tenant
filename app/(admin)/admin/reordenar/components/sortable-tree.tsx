'use client'

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import SortableItem from "./sortable-item"
import { Category } from "@prisma/client"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface SortableGridProps {
  data: any
}

const SortableGrid: React.FC<SortableGridProps> = ({ data }) => {
  const [sortableData, setSortableData] = useState(data)

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    const oldIndex = sortableData.findIndex((category: Category) => category.id === active.id)
    const newIndex = sortableData.findIndex((category: Category) => category.id === over.id)
    const newOrder = arrayMove(sortableData, oldIndex, newIndex)
    setSortableData(newOrder)
  }

  const id = useId()

  const handleSave = async () => {
    try {
      const sortedData = sortableData.map((category: Category, index: number) => {
        category.sort = index + 1
        return category
      })
      console.log(sortedData)
      const res = await axios.patch('/api/reorder', {
        categories: sortedData
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        id={id}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={data}
        >
          {
            sortableData.map((category: Category) => (
              <SortableItem
                key={category.id}
                category={category}
              />
            ))
          }
        </SortableContext>
      </DndContext>
      <Button
        onClick={handleSave}
      >
        Guardar
      </Button>
    </div>
  )
}

export default SortableGrid
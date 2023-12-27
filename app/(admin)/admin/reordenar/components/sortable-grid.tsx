'use client'

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core"
import { useId, useState } from "react"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import axios from "axios"
import toast from "react-hot-toast"

import { CategoryWithSubcategories, SubcategoryWithProducts } from "@/types/types"
import { Category, Product, Subcategory } from "@prisma/client"
import { Button } from "@/components/ui/button"
import SortableItem from "./sortable-item"

// TODO: Hacer esto para arreglar los otros tipados
interface SortableGridProps {
  data: CategoryWithSubcategories[]
}

const SortableGrid: React.FC<SortableGridProps> = ({ data }) => {
  const [sortableData, setSortableData] = useState(data)
  const [activeId, setActiveId] = useState(null)

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    const oldIndex = sortableData.findIndex((category: Category) => category.id === active.id)
    const newIndex = sortableData.findIndex((category: Category) => category.id === over.id)
    const newOrder = arrayMove(sortableData, oldIndex, newIndex)

    setSortableData(newOrder)
  }

  const handleDragEndSubcategories = (event: any, index: number) => {
    const { active, over } = event
    const oldIndex = sortableData[index].subcategories.findIndex((subcategory: Subcategory) => subcategory.id === active.id)
    const newIndex = sortableData[index].subcategories.findIndex((subcategory: Subcategory) => subcategory.id === over.id)
    const newOrder = arrayMove(sortableData[index].subcategories, oldIndex, newIndex)

    setSortableData(sortableData => {
      const newCategories = [...sortableData]
      newCategories[index].subcategories = newOrder
      return newCategories
    })

  }

  const handleDragEndProducts = (event: any, indexSubcategory: number, indexCategory: number) => {
    const { active, over } = event
    const oldIndex = sortableData[indexCategory].subcategories[indexSubcategory].products.findIndex((product: Product) => product.id === active.id)
    const newIndex = sortableData[indexCategory].subcategories[indexSubcategory].products.findIndex((product: Product) => product.id === over.id)
    const newOrder = arrayMove(sortableData[indexCategory].subcategories[indexSubcategory].products, oldIndex, newIndex)

    setSortableData(sortableData => {
      const newCategories = [...sortableData]
      newCategories[indexCategory].subcategories[indexSubcategory].products = newOrder
      return newCategories
    })
  }
  const id = useId()

  const handleSave = async () => {
    try {
      const sortedData = sortableData.map((category: CategoryWithSubcategories, index: number) => {
        category.subcategories = category.subcategories.map((subcategory: SubcategoryWithProducts, index: number) => {
          subcategory.products = subcategory.products.map((product: Product, index: number) => {
            product.sort = index + 1
            return product
          })
          subcategory.sort = index + 1
          return subcategory
        })
        category.sort = index + 1
        return category
      })
      try {
        await axios.patch('/api/reorder', {
          categories: sortedData
        })
        toast.success('Se ha guardado el orden correctamente')
      } catch (error) {
        toast.error('Ha ocurrido un error al guardar el orden')
      }
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
          items={sortableData}
        >
          {
            sortableData.map((category, indexCategory) => {
              return (
                <SortableItem
                  key={category.id}
                  item={category}
                >
                  <div
                    className="mr-8"
                  >
                    {category.name}
                  </div>
                  <div
                    className="w-full"
                  >
                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEndSubcategories(event, indexCategory)}
                      id={id}
                    >
                      <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={category.subcategories}
                      >
                        {
                          category.subcategories.map((subcategory, indexSubcategory) => (
                            <SortableItem
                              key={subcategory.id}
                              item={subcategory}
                            >
                              <div
                                className="mr-8"
                              >
                                {subcategory.name}
                              </div>
                              <div
                                className="w-full"
                              >
                                <DndContext
                                  collisionDetection={closestCenter}
                                  onDragEnd={(event) => handleDragEndProducts(event, indexSubcategory, indexCategory)}
                                  id={id}
                                >
                                  <SortableContext
                                    strategy={verticalListSortingStrategy}
                                    items={subcategory.products}
                                  >
                                    {
                                      subcategory.products.map((product) => (
                                        <SortableItem
                                          key={product.id}
                                          item={product}
                                        >
                                          {product.name}
                                        </SortableItem>
                                      ))
                                    }
                                  </SortableContext>
                                </DndContext>
                              </div>
                            </SortableItem>
                          ))
                        }
                      </SortableContext>
                    </DndContext>
                  </div>
                </SortableItem>
              )
            })
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
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
import Spinner from "@/components/ui/spinner"

interface SortableGridProps {
  data: CategoryWithSubcategories[]
}

const SortableGrid: React.FC<SortableGridProps> = ({ data }) => {
  const [sortableData, setSortableData] = useState(data)
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const  handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  }

  const id = useId()

  const handleSave = async () => {
    try {
      setLoading(true)
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

      await axios.patch('/api/reorder', {
        categories: sortedData
      })

      toast.success('Se ha guardado el orden correctamente')
    } catch (error) {
      toast.error('Ha ocurrido un error al guardar el orden')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
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
                      onDragStart={handleDragStart}
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
                                  onDragStart={handleDragStart}
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
                      <DragOverlay>
                        {activeId ? (
                          <Item sortableData={sortableData} activeId={activeId} />
                        ): null}
                      </DragOverlay>
                    </DndContext>
                  </div>
                </SortableItem>
              )
            })
          }
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Item sortableData={sortableData} activeId={activeId} />
          ): null}
        </DragOverlay>
      </DndContext>
      <div
        className="flex flex-row items-center"
      >
        <Button
          onClick={handleSave}
          disabled={loading}
        >
          Guardar
        </Button>
        {
          loading && (
            <Spinner className='ml-2 w-8 h-8' />
          )
        }
      </div>
    </div>
  )
}

const Item = ({ activeId, sortableData }: { activeId: string, sortableData: CategoryWithSubcategories[] }) => {
  const getName = (id: string) => {
    const category = sortableData.find((category: Category) => category.id === id)

    if(!category) {
      const subcategory = sortableData
        .map((category: CategoryWithSubcategories) => category.subcategories
          .find((subcategory: Subcategory) => subcategory.id === id))
        .filter((subcategory: SubcategoryWithProducts | undefined): subcategory is SubcategoryWithProducts => subcategory !== undefined)[0];
      return subcategory?.name
    }

    return category.name
  }

  return (
    <div
      key={activeId}
      className="h-full bg-white p-4 rounded-md shadow-md border-input border-2 my-2 flex items-center w-full"
    >
      {getName(activeId)}
    </div>
  )
}

export default SortableGrid
"use client"

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"
import React from "react"

const BreadcrumbBar = () => {
  const path = usePathname()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          path.split("/").filter(Boolean).map((item, index, arr) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="capitalize">
                  {index !== arr.length - 1 ? (
                    <BreadcrumbLink href={`/${arr.slice(0, index + 1).join("/")}`}>{item}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {
                  index !== arr.length - 1 && <BreadcrumbSeparator />
                }
              </React.Fragment>
            )
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbBar
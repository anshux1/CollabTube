"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const Breadcrumbs = () => {
  const pathname = usePathname()
  console.log(pathname)
  const pathArray = pathname
    .replace(/^\/app\//, "")
    .split("/")
    .filter((path) => path !== "")
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathArray.map((path, index) => {
          // Capitalize and format the path for display
          const formattedPath = path
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())

          // Construct the href for the breadcrumb link
          const href = `/${pathArray.slice(0, index + 1).join("/")}`

          // Check if this is the last item in the path
          const isLast = index === pathArray.length - 1

          console.log("isLast", isLast)
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formattedPath}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

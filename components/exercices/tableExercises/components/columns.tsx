"use client"

import {ColumnDef} from "@tanstack/react-table"

import {Badge} from "@/components/ui/badge"
import {labels} from "../data/data"
import {Exercises} from "../data/schema"
import {DataTableColumnHeader} from "./data-table-column-header"
import {DataTableRowActions} from "./data-table-row-actions"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Exercises>[] = [
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulté" />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("difficulty")}</Badge>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titre" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.title)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "theme",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thème" />
    ),
  cell: ({ row }) => <Badge  variant="outline">{row.getValue("theme")}</Badge>,
    enableSorting: true,
  },
  {
    accessorKey: "lastScore",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dernier score" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("lastScore")}/15</div>,
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey:'id',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" />
    ),
    cell: ({ row }) => (
        <Button variant="green_ghost">
          {row.getValue("nbQuestions")}
          <Link href={"/training/activity/"+row.getValue("id") }>
            Start
          </Link>
        </Button>
    ),
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row}) => <DataTableRowActions row={row} />,
  },
]

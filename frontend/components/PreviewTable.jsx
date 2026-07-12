"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function PreviewTable({ previewData }) {
  if (!previewData || previewData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">CSV Preview</h2>

        <div className="text-gray-500">
          Upload a CSV to preview data.
        </div>
      </div>
    );
  }

  const columns = Object.keys(previewData[0]).map((key) => ({
    accessorKey: key,
    header: key,
  }));

  const table = useReactTable({
    data: previewData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-semibold mb-4">
        CSV Preview
      </h2>

      <div className="overflow-auto max-h-[500px] border rounded-lg">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 bg-gray-100 z-10">

            {table.getHeaderGroups().map((headerGroup) => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <th
                    key={header.id}
                    className="border px-4 py-3 text-left whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>

                ))}

              </tr>

            ))}

          </thead>

          <tbody>

            {table.getRowModel().rows.map((row) => (

              <tr
                key={row.id}
                className="hover:bg-gray-50"
              >

                {row.getVisibleCells().map((cell) => (

                  <td
                    key={cell.id}
                    className="border px-4 py-2 whitespace-nowrap"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-4 text-gray-600">

        Total Rows: {previewData.length}

      </div>

    </div>
  );
}
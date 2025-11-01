"use client";
import React from 'react';

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

type Props = {
  data: any[];
  columns: Column[];
  renderRow: (item: any) => React.ReactNode;
};

export default function Table({ data, columns, renderRow }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`text-left p-4 font-medium text-gray-600 ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
}
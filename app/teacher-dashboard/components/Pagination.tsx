"use client";
import React from 'react';

type Props = {
  page: number;
  count: number;
  itemsPerPage?: number;
};

export default function Pagination({ page, count, itemsPerPage = 10 }: Props) {
  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">
        Showing {Math.min((page - 1) * itemsPerPage + 1, count)} to{' '}
        {Math.min(page * itemsPerPage, count)} of {count} results
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
          onClick={() => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('page', String(page - 1));
            window.location.search = searchParams.toString();
          }}
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
          onClick={() => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('page', String(page + 1));
            window.location.search = searchParams.toString();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
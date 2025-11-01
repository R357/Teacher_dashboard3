"use client";
import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

type Props = {
  table: string;
  type: 'create' | 'update' | 'delete';
  data?: any;
  id?: string;
};

export default function FormContainer({ table, type, data, id }: Props) {
  const handleAction = () => {
    if (type === 'create') {
      alert('Create new ' + table);
    } else if (type === 'update') {
      alert('Update ' + table + ' with id: ' + data?.id);
    } else if (type === 'delete') {
      alert('Delete ' + table + ' with id: ' + id);
    }
  };

  if (type === 'create') {
    return (
      <button
        onClick={handleAction}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Plus size={16} />
        Add New
      </button>
    );
  }

  if (type === 'update') {
    return (
      <button
        onClick={handleAction}
        className="p-2 hover:bg-gray-100 rounded-full"
        title="Edit"
      >
        <Pencil size={16} className="text-blue-500" />
      </button>
    );
  }

  if (type === 'delete') {
    return (
      <button
        onClick={handleAction}
        className="p-2 hover:bg-gray-100 rounded-full"
        title="Delete"
      >
        <Trash2 size={16} className="text-red-500" />
      </button>
    );
  }

  return null;
}
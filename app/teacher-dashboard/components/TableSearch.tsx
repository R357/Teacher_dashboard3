"use client";
import React from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function TableSearch({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}
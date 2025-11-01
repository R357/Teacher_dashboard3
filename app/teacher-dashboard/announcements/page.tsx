"use client";
import React from 'react';
import Navbar from '../navbar';
import TableSearch from '../components/TableSearch';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import FormContainer from '../components/FormContainer';

const ITEM_PER_PAGE = 10; // Items per page for pagination

// Mock data for announcements
const mockAnnouncements = [
  {
    id: "1",
    title: "School Holiday Notice",
    content: "School will be closed on Monday for a public holiday.",
    date: new Date("2024-01-15"),
    class: { name: "Grade 10A" },
    author: {
      name: "Admin User",
      role: "admin"
    }
  },
  {
    id: "2", 
    title: "Parent-Teacher Meeting",
    content: "Parent-teacher meetings are scheduled for next week.",
    date: new Date("2024-01-14"),
    class: { name: "All Classes" },
    author: {
      name: "Admin User",
      role: "admin"
    }
  },
  {
    id: "3",
    title: "Math Quiz Next Week",
    content: "There will be a math quiz covering chapters 1-3 next Wednesday.",
    date: new Date("2024-01-16"),
    class: { name: "Grade 10A" },
    author: {
      name: "John Smith",
      role: "teacher"
    }
  },
  {
    id: "4",
    title: "Science Project Deadline Extended",
    content: "The deadline for the science project has been extended to next Friday.",
    date: new Date("2024-01-13"),
    class: { name: "Grade 11B" },
    author: {
      name: "Sarah Wilson",
      role: "teacher"
    }
  }
];

type AnnouncementList = typeof mockAnnouncements[0];

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // In a real app, you'd get this from your auth system
  const currentUser = {
    name: "Sarah Wilson",
    role: "teacher" // or "admin"
  };
  
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Posted By",
      accessor: "author",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];
  
  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {item.author.name}
        <span className="ml-1 text-xs text-gray-500">({item.author.role})</span>
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(currentUser.role === "admin" || currentUser.name === item.author.name) && (
            <>
              <FormContainer table="announcement" type="update" data={item} />
              <FormContainer table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // Mock pagination
  const page = parseInt(searchParams.page || "1");
  const total = mockAnnouncements.length;
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  const start = (page - 1) * ITEM_PER_PAGE;
  const end = start + ITEM_PER_PAGE;
  const announcements = mockAnnouncements.slice(start, end);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="fixed inset-0 -z-10 bg-fixed"
        style={{
          backgroundImage:
            "radial-gradient( circle at 20% 20%, rgba(59,130,246,0.10), transparent 40% ), radial-gradient( circle at 80% 30%, rgba(6,182,212,0.08), transparent 45% ), radial-gradient( circle at 40% 80%, rgba(99,102,241,0.08), transparent 45% )",
          backgroundColor: '#f8fafc',
        }}
      />
      <Navbar />
      <div className="p-6 mt-20"> {/* Added mt-20 for navbar spacing */}
        <div className="max-w-7xl mx-auto bg-slate-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
            {/* Both admin and teachers can create announcements */}
            <FormContainer table="announcement" type="create" />
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <TableSearch />
            </div>

            <Table data={announcements} columns={columns} renderRow={renderRow} />

            <div className="p-4 border-t border-gray-200">
              <Pagination page={page} count={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementListPage;
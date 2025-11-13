import type { Student } from '../types/studentType';
import { deleteStudent } from '../api/studentApi';
import { useState } from 'react';
import LoadingSpinner from './loadingSpinner';
interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error: string;
}

export default function StudentList({ students, onEdit, onDelete, loading, error }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    setDeletingId(id);
    try {
      await deleteStudent(id);
      onDelete(id);
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };


  if (loading) return <div className="text-center py-8"><LoadingSpinner/></div>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (students.length === 0) return <p className="text-gray-500 text-center">No students yet.</p>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{s.age}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{s.grade}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => onEdit(s)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  disabled={deletingId === s._id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deletingId === s._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
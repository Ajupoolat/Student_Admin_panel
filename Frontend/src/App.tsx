import { useEffect, useState } from 'react';
import StudentForm from './components/studentForm';
import StudentList from './components/studentList';
import { getAllStudents } from './api/studentApi';
import type { Student } from './types/studentType';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  },[]);

  const handleStudentSaved = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Admin Panel</h1>

        <StudentForm
          editingStudent={editingStudent}
          onStudentSaved={handleStudentSaved}
          onCancelEdit={handleCancelEdit}
        />

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
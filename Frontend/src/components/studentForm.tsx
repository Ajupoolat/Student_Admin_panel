import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../api/studentApi';
import type { Student } from '../types/studentType';

interface Props {
  editingStudent?: Student | null;
  onStudentSaved: () => void;
  onCancelEdit?: () => void;
}

const StudentForm: React.FC<Props> = ({ editingStudent, onStudentSaved, onCancelEdit }) => {
  const [form, setForm] = useState({ name: '', age: '', grade: '' });
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    grade: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Sync form when editing
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        age: String(editingStudent.age),
        grade: editingStudent.grade,
      });
    } else {
      setForm({ name: '', age: '', grade: '' });
    }
    setErrors({ name: '', age: '', grade: '' });
    setSubmitError('');
  }, [editingStudent]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (!/^[A-Za-z\s]+$/.test(value)) return 'Name can only contain letters and spaces.';
        return '';

      case 'age':
        if (!value) return 'Age is required.';
        const ageNum = Number(value);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 25) return 'Age must be between 1 and 25.';
        return '';

      case 'grade':
        if (!value.trim()) return 'Grade is required.';
        if (!/^[A-F]$/.test(value)) return 'Grade must be A, B, C, D, or F.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    // Filter input
    let filteredValue = value;
    if (field === 'name') {
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');

    }
    if (field === 'age') {
      filteredValue = value.replace(/\D/g, '');
    }
    if (field === 'grade') {
      filteredValue = value.toUpperCase().slice(0, 1);
      if (!/^[A-F]?$/.test(filteredValue)) return;
    }

    setForm((prev) => ({ ...prev, [field]: filteredValue }));

    // Validate on change
    const error = validateField(field, filteredValue);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validate all fields
    const nameError = validateField('name', form.name);
    const ageError = validateField('age', form.age);
    const gradeError = validateField('grade', form.grade);

    if (nameError || ageError || gradeError) {
      setErrors({ name: nameError, age: ageError, grade: gradeError });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        age: Number(form.age),
        grade: form.grade.trim(),
      };

      if (editingStudent) {
        await updateStudent(editingStudent._id, payload);
      } else {
        await createStudent(payload);
      }

      onStudentSaved();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingStudent ? 'Edit Student' : 'Add New Student'}
      </h2>

      {submitError && <p className="text-red-600 font-medium mb-3">{submitError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Name"
            className={`border p-2 rounded w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Age (1–25)"
            className={`border p-2 rounded w-full ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            value={form.age}
            onChange={(e) => handleChange('age', e.target.value)}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Grade */}
        <div>
          <input
            type="text"
            placeholder="Grade (A–F)"
            className={`border p-2 rounded w-full ${errors.grade ? 'border-red-500' : 'border-gray-300'}`}
            value={form.grade}
            onChange={(e) => handleChange('grade', e.target.value)}
            maxLength={1}
          />
          {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
        </button>

        {editingStudent && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
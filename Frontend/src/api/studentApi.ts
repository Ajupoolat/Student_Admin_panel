import axios from "axios";
import type{ Student } from "../types/studentType";

const API_URL_ = 'http://localhost:5000/api/students'




export const getAllStudents = async (): Promise<Student[]> => {
  const { data } = await axios.get<Student[]>(API_URL_, { withCredentials: true });
  if (!data) throw new Error("Failed to fetch students");
  return data;
};

export const createStudent = async (data: Omit<Student, "_id">): Promise<Student> => {
  const { data: student } = await axios.post<Student>(API_URL_, data, { withCredentials: true });
  return student;
};

export const updateStudent = async (id: string, data: Partial<Student>): Promise<Student> => {
  const { data: student } = await axios.put<Student>(`${API_URL_}/${id}`, data);
  return student;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_}/${id}`);
};
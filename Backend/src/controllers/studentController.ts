import StudentService from "../services/studentServices";
import { Request, Response } from "express";
import { IStudent } from "../models/studentModel";

export class StudentController {
  constructor(private studentService: StudentService) {}

  getAllStudents = async (req: Request, res: Response) => {
    try {
      const students = await this.studentService.getAllStudents();
      console.log(students);
      res.status(200).json(students);
    } catch (error) {
      console.error("Failed fetching students", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const data: Partial<IStudent> = req.body;
      const newStudent = await this.studentService.createStudent(data);
      res.status(201).json({ message: "Student created", student: newStudent });
    } catch (error) {
      console.error("Failed to create student:", error);
      res.status(500).json({ message: "Error creating student" });
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.studentService.deleteStudent(id);

      if (!deleted)
        return res.status(404).json({ message: "Student not found" });
      res.json({ message: "Student deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student" });
    }
  };

  updateStudent = async(req:Request,res:Response) =>{
    try {
    const { id } = req.params;
    const updated = await this.studentService.updateStudent(id,req.body)
    if (!updated) return res.status(404).json({ message: "Student not found" });
      res.status(200).json({ message: "Student Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
  }
}

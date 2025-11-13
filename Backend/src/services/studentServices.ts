import studentModel, { IStudent } from "../models/studentModel";

// the basic class for student managment

export default class StudentService {
  async getAllStudents(): Promise<IStudent[]> {
    return await studentModel.find();
  }

  async createStudent(data: Partial<IStudent>): Promise<IStudent> {
    return await studentModel.create(data);
  }

  async deleteStudent(id:string):Promise<IStudent|null>{
    return await studentModel.findByIdAndDelete(id)
  }

  async updateStudent(id:string,data:Partial<IStudent>):Promise<IStudent|null>{
    return await studentModel.findByIdAndUpdate(id,data,{new:true})
  }
}

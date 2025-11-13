import { StudentController } from "../controllers/studentController";
import StudentService from "../services/studentServices";

export class StudentInjection {
  private  static studentService : StudentService = new StudentService;
  private static studentController : StudentController = new StudentController(StudentInjection.studentService);

  public static getStudentController():StudentController{
    return StudentInjection.studentController;
  }
}
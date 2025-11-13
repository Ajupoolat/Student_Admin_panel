import { Router } from "express";
import { StudentInjection } from "../DI/dependencyInjecter";
const router = Router();

const studentControl = StudentInjection.getStudentController();

router
  .get("/", studentControl.getAllStudents)
  .post("/", studentControl.createStudent)
  .put('/:id',studentControl.updateStudent)
  .delete('/:id',studentControl.deleteStudent)


export default router;

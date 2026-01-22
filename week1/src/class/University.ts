import type IStudent from "../types/IStudent.ts";

export default class University {
    students: IStudent[] = [];

    constructor(students: IStudent[] = []) {
        this.students = students;
    }

    enrolStudent(student: IStudent) {
        this.students.push(student);
    }

    findStudentById(id: string | number): IStudent | null {
        return this.students.find(student => student.id === id) ?? null;
    }
}
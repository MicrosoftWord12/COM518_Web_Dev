import type IStudent from "./types/IStudent.ts";
import printStudent from "./functions/printStudent.ts";
import Undergraduate from "./class/Undergraduate.ts";
import EveningStudent from "./class/EveningStudent.ts";
import University from "./class/University.ts";

const studentWithoutEmail: IStudent = {
    id: 1,
    name: "John Doe",
    course: "Computer Science",
}

const studentWithEmail: IStudent = {
    id: 2,
    name: "Jane Smith",
    course: "Mathematics",
    email: "Yurr"
}

printStudent(studentWithoutEmail)
console.log("-----");
printStudent(studentWithEmail)

const undergrad1 = new Undergraduate(1, "Alice Johnson", "Engineering", "yurr");
const undergrad2 = new Undergraduate(3, "Alice Johnson", "Engineering", "email");

const eveningStu1 = new EveningStudent(4, "Bob Brown", "Business");
const eveningStu2 = new EveningStudent(5, "Charlie Green", "Arts", "email");

const uni = new University();
uni.enrolStudent(undergrad1);
uni.enrolStudent(undergrad2);

uni.enrolStudent(eveningStu1);
uni.enrolStudent(eveningStu2);

const foundStudent = uni.findStudentById(3);
if (foundStudent) {
    console.log("Found Student:", foundStudent.toString());
}

const notFoundStudent = uni.findStudentById(999);
console.log("Searching for non-existent student ID 999:", notFoundStudent);

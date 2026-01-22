import type IStudent from "../types/IStudent.ts";

export default function (student: IStudent): void {
    console.log(`Student ID: ${student.id}`);
    console.log(`Name: ${student.name}`);
    console.log(`Course: ${student.course}`);

    if (!student.email) {
        console.log(`No Email Provided`);
        return
    }

    console.log(`Email: ${student.email}`);
};
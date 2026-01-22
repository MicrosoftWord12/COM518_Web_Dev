import type IStudent from "../types/IStudent.ts";

export default class implements IStudent {
    id: string | number;
    name: string;
    course: string;
    email?: string;

    constructor(id: string | number, name: string, course: string, email?: string) {
        this.id = id;
        this.name = name;
        this.course = course;
        if (email) {
            this.email = email;
        }
    }

    toString() { 
        return `ID: ${this.id}, Name: ${this.name}, Course: ${this.course}, Email: ${this.email ?? "N/A"}`;
    }
}
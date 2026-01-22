import type IStudent from "../types/IStudent.ts";

export default class implements IStudent {
    id: string | number;
    name: string;
    course: string;
    email?: string;
    modules: string[] = [];

    constructor(id: string | number, name: string, course: string, email?: string, modules: string[] = []) {
        this.id = id;
        this.name = name;
        this.course = course;
        if (email) {
            this.email = email;
        }
        this.modules = modules;
    }

    addModule(module: string) {
        this.modules.push(module);
    }

    toString() { 
        return `Name: ${this.name}, Course: ${this.course}, Modules: ${this.modules.join(", ")}, Email: ${this.email ?? "N/A"}`;
    }
}
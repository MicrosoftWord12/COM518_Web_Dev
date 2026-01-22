function gradeCalculator(grade: number) {
    if (grade <= 100 && grade >= 70) {
        return "A";
    } else if (grade <= 69 && grade >= 60) {
        return "B";
    } else if (grade <= 59 && grade >= 50) {
        return "C";
    } else if (grade <= 49 && grade >= 40) {
        return "D";
    } else if (grade <= 39 && grade >= 0) {
        return "F";
    }else {
        return "Invalid Grade"
    }
}

console.log("Grade Calculator");
console.log("----------------");
const number = 122
const grade = gradeCalculator(number);
console.log(`The grade for ${number} is ${grade}`);
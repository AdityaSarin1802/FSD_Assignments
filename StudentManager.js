//Create a custom EventEmitter named StudentManager. 
// It should emit studentAdded, studentRemoved, and studentUpdated. 
// Write listeners for each event and explain when each listener executes.

const fs = require("fs")
const EventEmitter = require("events")

class StudentManager extends EventEmitter {

    addStudent(student) {
        let students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        )
        students.push(student)

        fs.writeFileSync(
            "students.json",
            JSON.stringify(students)
        );

        this.emit("studentAdded", student)
    }

    removeStudent(id) {
        let students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        )

        let student = students.find(s => s.id === id)

        if (student) {
            students = students.filter(s => s.id !== id)

            fs.writeFileSync(
                "students.json",
                JSON.stringify(students)
            )

            this.emit("studentRemoved", student)
        }
    }

    updateStudent(id, updatedData) {
        let students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        )

        let student = students.find(s => s.id === id)

        if (student) {
            Object.assign(student, updatedData)

            fs.writeFileSync(
                "students.json",
                JSON.stringify(students, null, 2)
            )

            this.emit("studentUpdated", student)
        }
    }
}

const manager = new StudentManager();

manager.on("studentAdded", (student) => {
    console.log("Student Added:", student);
});

manager.on("studentRemoved", (student) => {
    console.log("Student Removed:", student);
});

manager.on("studentUpdated", (student) => {
    console.log("Student Updated:", student);
});
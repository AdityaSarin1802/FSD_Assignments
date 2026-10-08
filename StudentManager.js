//Create a custom EventEmitter named StudentManager. 
// It should emit studentAdded, studentRemoved, and studentUpdated. 
// Write listeners for each event and explain when each listener executes.

const fs = require("fs")
const EventEmitter = require("events")

class StudentManager extends EventEmitter {
    constructor() {
        super()
        this.file = "students.json"
        fs.writeFileSync(this.file, "[]")
    }

    getStudents() {
        return JSON.parse(fs.readFileSync(this.file, "utf8"))
    }

    saveStudents(students) {
        fs.writeFileSync(
            this.file,
            JSON.stringify(students, null)
        );
    }

    addStudent(student) {
        const students = this.getStudents()

        students.push(student)
        this.saveStudents(students)

        this.emit("studentAdded", student)
    }

    removeStudent(id) {
        const students = this.getStudents()

        const student = students.find(s => s.id === id)

        if (student) {
            const updatedStudents = students.filter(s => s.id !== id)
            this.saveStudents(updatedStudents)

            this.emit("studentRemoved", student)
        }
    }

    updateStudent(id, updatedData) {
        const students = this.getStudents()

        const student = students.find(s => s.id === id)

        if (student) {
            Object.assign(student, updatedData)
            this.saveStudents(students)

            this.emit("studentUpdated", student)
        }
    }
}


// Create StudentManager
const manager = new StudentManager();


// Listeners
manager.on("studentAdded", (student) => {
    console.log("Student Added:", student);
});

manager.on("studentRemoved", (student) => {
    console.log("Student Removed:", student);
});

manager.on("studentUpdated", (student) => {
    console.log("Student Updated:", student);
});

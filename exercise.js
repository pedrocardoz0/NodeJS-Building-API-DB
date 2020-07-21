const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("MongoDB Conected ..."))
    .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
    tags: [Array],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const courses = await Course
        .find()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: "backend" })
    console.log(courses)
}

getCourses()
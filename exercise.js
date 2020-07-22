const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("MongoDB Conected ..."))
    .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    return await Course
        .find({ tags: "backend", isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    
}

async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run();
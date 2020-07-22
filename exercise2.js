const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("MongoDB Connected ..."))
  .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([ {tags: 'frontend'}, {tags: 'backend'} ])
        .sort({ price: -1 })
        .select("name author price");
}

async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run();
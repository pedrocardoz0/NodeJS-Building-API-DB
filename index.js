const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "SQL Course",
    author: "pEdro",
    tags: ["SQL", "database"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course
    .find({ author: "Pedro", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count()
  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: "Pedro Cardozo",
      isPublished: false
    }
  });
  console.log(result)
}

updateCourse('5f15c50e63498b43e8cbcb60')

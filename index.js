const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    //name: "SQL Course",
    author: "Pedro Cardozo",
    tags: ["SQL", "database"],
    isPublished: true,
  });
  try {
    const result = await course.save();
    console.log(result);
    
  } catch (ex) {
    console.log(ex.message)
  }
}

async function getCourses() {
  const courses = await Course
    .find({ author: "Pedro", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count()
  console.log(courses);
}

async function updateCourseQuery(id) {
  const course = await Course.findById(id)
  if (!course) return;

  course.set({
    isPublished: true,
    author: 'Another Author'
  });

  const result = await course.save();
  console.log(result)
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

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id })
  console.log(result)
}

createCourse()

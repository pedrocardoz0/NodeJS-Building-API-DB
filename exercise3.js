const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("MongoDB is Connected ..."))
  .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([
        { name: /.*by*./i},
        { price: { $gte: 15 } }
    ])
    .sort({price: -1})
    .select("name author price");
}

async function updateCourse(id) {
  //Query First
  const course = await Course.findById(id);
  if(!course) return;
  course.isPublished = true;
  course.author = 'Another Author';

  const result = await course.save();
  console.log(result)
}

updateCourse("5a68fdc3615eda645bc6bdec")

// async function run() {
//   const courses = await updateCourse();
//   console.log(courses);
// }
// run();

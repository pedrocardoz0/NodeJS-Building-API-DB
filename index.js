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
    name: "React Course",
    author: "Pedro",
    tags: ["react", "front-end"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course
    /**
     * eq (equal)
     * ne (not equal)
     * gt (grather than)
     * gte (grathen then or equal to)
     * lt (less then)
     * lte (less then or equal to)
     * in 
     * nin (not in)
     */
    //.find({ author: "Pedro", isPublished: true })
    //.find({ $price: { $gt: 10, $lte: 20 } })
    .find({ $price: { $in: [10, 20, 30] } })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

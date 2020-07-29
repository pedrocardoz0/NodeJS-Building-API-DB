const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.error("Error ", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: 'A course should hava at least on tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Cardozo",
    tags: ["front-end"],
    isPublished: true,
    price: 15.7,
    category: "web",
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for(field in ex.errors)
      console.log(ex.errors[field]);
  }
}

async function getCourses() {
  const courses = await Course.find({ author: "Pedro", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

async function getCoursesById(id) {
  const course = await Course.find({ _id: id })
    .limit(10)
    .select({ name: 1, tags:1, price: 1, author: 1 })
    .sort({ name: 1 });
  console.log(course);
}

async function updateCourseQuery(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.set({
    isPublished: true,
    author: "Another Author",
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Pedro Cardozo",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

getCoursesById('5f21aa1774bd773478274f15');

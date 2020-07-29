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
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Cardozo",
    // tags: ["Angular", "Web"],
    isPublished: true,
    price: 15,
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

createCourse();

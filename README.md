# Mongo DB Fundamentals

### Connect The DataBase

#### To we first connect our database we have to firstly import mongoose, we are going to connect the database with mongoose.

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.error("Error ", err));
```

#### In connect statement we have passed the path from the database, that's located at the localhost/playground, at that point you could see that we had insert mongodb intead of https or http, the reason is becasue we are dealing with database.

#### If everything is ok it simply throw the message connected to mongoDB, in oposite the error message.

---

### Schema

```javascript
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
```

#### The schema is to define the shape of our documents inside the database.

#### Colection is like an table in relational database, a documents is like an row.

#### To define a schema we have to use mongoose, we only pass the type of the varibles that we want.

---

### Model

#### To "Create a class" we need to complie the schema in a model.

```javascript
const Course = mongoose.model("Course", courseSchema);
```

#### In the first parameter we insert the name of our class and the second the schema. Now we are able to create instances from that class.

```javascript
const course = new Course({
  name: "React Course",
  author: "Pedro",
  tags: ["react", "front-end"],
  isPublished: true,
});
```
#### Now we have created the instace from the class, and then we can simply pass the object with the all values defined in the schema. The idea from MongoDB is to create the object and store that in a database.

---
### Save the data in the database


#### When we are going to save something inside the database the function is asyncrounous. *course.save()*

```javascript
const result = await course.save();
```

#### In the result we are receiving something from the promise that is returned from the function *course.save()*

```javascript
async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Pedro",
    tags: ["react", "front-end"],
    isPublished: true,
  }); // Object that will be stored

  const result = await course.save(); // Saving
  console.log(result);
}

createCourse(); // Execute
```

---
### Querying Documents

#### In querying we retrive the values from the database

```javascript
async function getCourses() {
  const courses = await Course
    .find() // If we do that we will see all the values inside the database
  console.log(courses);
}
```

#### Filtering

```javascript
async function getCourses() {
  const courses = await Course
    .find({ author: "Pedro", isPublished: true }) // Filter example
    .limit(10) // Limit number of documents
    .sort({ name: -1 }) //Descending -1 Ascending 1
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
```

### Filtering Complex Comparison

```javascript

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
```

#### In some cases we would like to use some operators like equal, less then, grather then, in or not in. At this point when we are filtering something we want to filter some informations, it's totaly possible but we need to define inside the *find()* method the object and the operators that we want.

### Filtering Complex Logical

#### If we want to add logical operators like or and we should follow this example below.

```javascript
async function getCourses() {
  const courses = await Course
    //.or([])
    //.and([])
    .find()
    .or([ { author: "Pedro" }, { isPublished: true } ])
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
```

#### We need to define the array because inside of that we are going to pass objects that will receive the opration or the statement for filtering

---

### Regular Expression

#### If you want to filter some users that are like pedro, Pedro, PEDRO, PedRo and so on we have to use regular expressions for that.

```javascript
async function getCourses() {
  const courses = await Course
    .find({ author: /.*Pedro.*/i })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
```

### Couting Documents

```javascript
async function getCourses() {
  const courses = await Course
    .find({ author: "Pedro", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count() // Count the quantity of documents that are related to that find property
  console.log(courses);
}
```

---

## Exercises tips

#### There are some tips to we check. First you can see that the result was returned as an const and then we need to create another asycronous function to run the aplication result.

```javascript
async function getCourses() {
    return await Course
        .find({ tags: "backend", isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    
}
```
```javascript
async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run();
```

#### You can see that we have created another async function that will receive the the result from the await operation inside the Course model.

---

## Updating Documentes - Query First

#### In this section we have learned about query first approach

```javascript
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
```

#### At the first line we pass the id as an parameter, sooner we define the course varible that will return a promise with the course itself, using the method *findById()*.

#### If the couse doesn't exist it return and then the function stop, instead of that we use the method *set({})* and the fields that we want to update.

#### Then we wait for the result, *course.save()* returns a promise, and when it's finished we show in the console the result of that promise.

---

## Updating Documentes - Update First

```javascript
async function updateCourse(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: "Pedro Cardozo",
      isPublished: false
    }
  });
  console.log(result)
}
```

---

## Remove Documents

```javascript
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id })
  console.log(result)
}
```
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
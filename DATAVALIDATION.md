# Data Validation

### Validation

#### In some cases we want to validade properly our information, take a look at this example above.

```javascript
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
```

#### If you see we have passed for the name statement the required tag, it will be required when we are going to add something new inside our document.

```javascript
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
```

#### In this example we ommited the name field, above we can check that we defined try catch statement we await for the resut and then we store and display that in the console. If an exception occures as expected in our example an error message will be displayed.
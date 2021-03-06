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


----

### Built-In Validators

#### Some of the the tecniques to validade our input inside the database is to use the built-in validators, take a look.

```javascript
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
  },
  author: String,
  tags: [String],
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
```

#### We have some property like minlength and max, an intreting topic about validations is that the process of validation happens in mongoose not in the database itself, if you would like to validade something you will do that with mongoose not in the database.


#### If you noiteced inside price we passed an function to *required* field, that means that we will only pass this field if the field *isPublished* is true.

----

### Custom Validators

```javascript
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
      validator: function (v) {
        return v && v.length > 0;
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
```

#### Inside tags we have defined the type of array we define the custom validation inside the validator property, it will only return the value if it exists and the legth is higher then zero.

----

### Async Validator

```javascript
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
```

#### Inside tag we have created our own function, in this case we have created an Asyncronous function that will have a delay of 4 seconds.

----

### Validation Errors

#### Sometimes we want to see all the errors that happens in our code, so we can simply do this.

```javascript
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
```
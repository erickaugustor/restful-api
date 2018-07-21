const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Could not connect do MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/ 
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag',
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 200,
    required: function() {
      return this.isPublished;
    }
  }
});

const Course = mongoose.model('courses', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'Angular Course',
    author: 'Erick',
    tags: ['Angular', 'Frontend'],
    isPublished: true,
  });

  try {
    await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  // Comparasion Query
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // Loginal Operator
  // or
  // and

  // Pagination
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    // .find({ author: /^Er/ })   -> Starts with
    // .find({ author: /ck$/i })  -> Ends with
    // .find({ author: /.*ic*./}) -> Contains

    // .find()
    // .or([{author: 'Erick'}, { isPublished: true }])
    // .and([])

    .find({ author: 'Erick', isPublished: true })

    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .skipe((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: -1 })
    // .count();
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourse (id) {
  // Aproach: Query first
  // findById()
  // Modify its properties
  // save()

  const couese = await Course.findById(id);
  if(!course) return;
  course.isPublished = true;
  course.author = 'Another Author';

  const result = await course.save();
  console.log(result);
}

async function updateDifCourse(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Erick',
      isPublished: false,
    }
  });

  console.log(result);
}

async function updateFindCourse(id) {
  const result = await Course.findByIdAndUpdate({ _id: id }, {
    $set: {
      author: 'Erick',
      isPublished: false,
    }
  }, { new: true });

  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  //  const result = await Course.findByIdAndRemove(id);
  
  console.log(result);
}


// updateCourse('5b39473147da1a3be835bf4a');
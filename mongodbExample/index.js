const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Could not connect do MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('courses', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'Angular Course',
    author: 'Erick',
    tags: ['Angular', 'Frontend'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
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

getCourses();

const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const a = Promise.reject(new Error('reason for rejection...'));
a.catch(err => console.log(err));

// Parallel Promises

const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async operation 1...');
    resolve(1);
  }, 1000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve(2);
  }, 3000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 3...');
    reject(new Error('Something failed'));
  }, 3000);
});

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));

Promise.all([p1, p2, p3])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));
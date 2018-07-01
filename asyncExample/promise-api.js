
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const a = Promise.reject(new Error('reason for rejection...'));
a.catch(err => console.log(err));
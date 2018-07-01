const p = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...

  setTimeout(() => {
    resolve(1); // peding => resolved, fulfilled
  }, 2000);
  // reject(new Error('message')); // pending => rejected 
});

p
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message));
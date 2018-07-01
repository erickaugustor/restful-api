
// Callback
const getUser = (id, callback) => {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'erickaugustor' });
  }, 2000);
};

const getRepositores = (username, callback) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['rep1', 'rep2', 'rep3']);
  }, 2000);
};

// Promise
const getUserPromise = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'erickaugustor' });
    }, 2000);
  });
}

const getRepositoresPromise = username => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['rep1', 'rep2', 'rep3']);
    }, 2000);
  });
};

// Console

console.log('Before');

// Callbacks
/*
getUser(1, user => {
  console.log('User', user);

  // Get the repositories
  getRepositores(user.gitHubUsername, repos => {
    console.log('Repos', repos);
  });
});
*/

// Promise
getUserPromise(1)
  .then(user => getRepositoresPromise(user.gitHubUsername))
  .then(repos => console.log(repos))
;

console.log('After');


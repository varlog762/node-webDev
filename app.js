const fs = require('fs');

// const fileData = fs.readFileSync('./test.txt', 'utf-8');

// console.log(fileData);

// fs.readFile('./test.txt', 'utf-8', (err, data) => {
//   fs.mkdir('./files', err => {
//     if (!err) {
//       fs.writeFile('./files/new-test.txt', data, err => {
//         err ? console.log(err) : null;
//       });
//     }
//   });
// });

fs.readFile('./test.txt', 'utf-8', (err, data) => {
  //Don't use sync node.js methods!!!!!!
  fs.mkdirSync('./files', () => {});
  //Don't use sync node.js methods!!!!!!
  fs.writeFileSync('./files/new-test.txt', data, err => {
    err ? console.log(err) : null;
  });
});

setTimeout(() => {
  if (fs.existsSync('./files/new-test.txt')) {
    fs.unlink('./files/new-test.txt', () => {});
  }
}, 4000);

setTimeout(() => {
  if (fs.existsSync('./files')) {
    fs.rmdir('./files', () => {});
  }
}, 6000);

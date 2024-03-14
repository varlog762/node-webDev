const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./docs/text.txt');
const writeStream = fs.createWriteStream('./docs/new-text.txt');
const compressStream = zlib.createGzip();
const decompresStream = zlib.createUnzip();

// readStream.on('data', chunk => {
//   writeStream.write('\n---CHUNK START---\n');
//   writeStream.write(chunk);
//   writeStream.write('\n---END CHUNK---\n');
// });

const errorHandle = () => {
  console.log('Error');
  readStream.destroy();
  writeStream.end('Finished with error...');
};

readStream
  .on('error', errorHandle)
  .pipe(compressStream)
  .pipe(decompresStream)
  .pipe(writeStream)
  .on('error', errorHandle);

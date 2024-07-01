const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://youtu.be/9SdmwQPblBI?si=bcwhNkIf4tDKQlc-'; // Your video URL
const outputFilePath = path.resolve(__dirname, 'video.mp4');

console.log(`Starting download from the ${videoUrl}`);

ytdl(videoUrl, { format: 'mp4' })
  .on('info', (info) => {
    console.log(`Downloading: ${info.videoDetails.title}`);
    console.log(`Duration: ${info.videoDetails.lengthSeconds} seconds`);
  })
  .on('progress', (chunkLength, downloaded, total) => {
    const percent = ((downloaded / total) * 100).toFixed(2);
    console.log(`Progress: ${percent}% (${downloaded}/${total})`);
  })
  .on('end', () => {
    console.log('Download completed!');
  })
  .on('error', (err) => {
    console.error('Download failed:', err);
  })
  .pipe(fs.createWriteStream(outputFilePath));

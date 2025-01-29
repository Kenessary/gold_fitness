const sharp = require("sharp");
const fs = require("fs");

// Function to resize and compress image
async function resizeAndCompressImage(inputFilePath, outputFilePath) {
  await sharp(inputFilePath)
    .resize({ width: 300 }) // Resize image to width of 300 pixels
    .jpeg({ quality: 80 }) // Compress image to JPEG format with 80% quality
    .toFile(outputFilePath);
}

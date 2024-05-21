const sharp = require('sharp');

const WORKING_IMAGE = {
  url: 'https://utfs.io/f/644f2559-ae65-4b70-a073-85d2923ed0e9-1xd3ua.jpeg',
  originalDimensions: {
    width: 3024,
    height: 4032,
  },
};

const BUGGED_IMAGE = {
  url: 'https://utfs.io/f/ce384dab-dd57-4fef-83f4-8a92caef413d-1xd4jf.jpeg',
  originalDimensions: {
    width: 3024,
    height: 4032,
  },
};

const fetchImageAndGetMetadata = async (image, isBugged) => {
  const res = await fetch(image.url);
  const buffer = await res.arrayBuffer();
  const imageMetadata = await sharp(buffer).rotate().keepExif().metadata();
  const { width, height } = imageMetadata;

  console.log({
    bugged: isBugged,
    originalDimensions: image.originalDimensions,
    sharp: {
      width,
      height,
    },
  });
};

fetchImageAndGetMetadata(WORKING_IMAGE, false);
fetchImageAndGetMetadata(BUGGED_IMAGE, true);

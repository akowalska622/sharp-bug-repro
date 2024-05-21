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

const fetchImageAndGetMetadata = async (image) => {
  const res = await fetch(image.url);
  const buffer = await res.arrayBuffer();
  const imageMetadata = await sharp(buffer).rotate().keepExif().metadata();
  const sharpDimensions = {
    width: imageMetadata.width,
    height: imageMetadata.height,
  };
  const { originalDimensions } = image;

  const isBugged =
    originalDimensions.width !== sharpDimensions.width ||
    originalDimensions.height !== sharpDimensions.height;

  console.log({
    isBugged,
    originalDimensions,
    sharpDimensions,
  });
};

fetchImageAndGetMetadata(WORKING_IMAGE);
fetchImageAndGetMetadata(BUGGED_IMAGE);

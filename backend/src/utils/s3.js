const AWS = require('aws-sdk');

// Initialize S3 only if credentials are available
let s3;
let BUCKET_NAME;

try {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_ACCESS_KEY_ID !== 'dummy') {
    s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'ap-south-1'
    });
    BUCKET_NAME = process.env.S3_BUCKET_NAME || 'kisan-andolan-media';
    console.log('AWS S3 configured successfully');
  } else {
    console.log('AWS credentials not configured - file uploads will use local storage');
  }
} catch (error) {
  console.error('AWS S3 initialization error:', error.message);
}

const uploadToS3 = async (buffer, key, contentType) => {
  if (!s3) {
    // Fallback: return mock response if S3 not configured
    console.log('S3 not configured, using local storage fallback for:', key);
    return {
      Location: `https://placeholder-url/${key}`,
      Key: key,
      Bucket: BUCKET_NAME || 'local'
    };
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read'
  };

  return s3.upload(params).promise();
};

const getSignedUrl = async (key, contentType, expiresIn = 300) => {
  if (!s3) {
    return `https://placeholder-url/${key}`;
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: expiresIn,
    ContentType: contentType,
    ACL: 'public-read'
  };

  return s3.getSignedUrlPromise('putObject', params);
};

const deleteFromS3 = async (key) => {
  if (!s3) {
    return { DeleteMarker: true };
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key
  };

  return s3.deleteObject(params).promise();
};

module.exports = { uploadToS3, getSignedUrl, deleteFromS3 };

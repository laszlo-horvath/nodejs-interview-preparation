// Secure Password Hashing (Medium-Advanced)

// Exercise: Build a user authentication module in Node.js
// that securely hashes passwords (bcrypt style) without external dependencies.

// Focus: Security best practices, cryptographic hashing, Node.js built-in crypto.

// Goal: Demonstrate awareness of secure coding practices.

const { createHash } = require('node:crypto');
const HASH_ALGORITHM = 'md5';

const hashValue = (valueToHash) => {
  console.log('original: ', valueToHash);

  const hashObject = createHash(HASH_ALGORITHM);
  const hashObjectWithData = hashObject.update(valueToHash);

  const hashedValue = hashObjectWithData.digest('hex');
  console.log('hash: ', hashedValue);
};

hashValue('myRandomString');
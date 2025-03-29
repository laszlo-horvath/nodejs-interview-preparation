// Implement a Simple Rate Limiter (Medium)

// Exercise: Create an in-memory rate limiter that allows X requests per minute per user/IP.

// Focus: Node.js timers (setTimeout, setInterval), in-memory state handling.

// Goal: Get comfortable managing state and concurrency in a Node.js environment.

const { hostname: getHostname } = require('node:os');
const { lookup: dnsLookup } = require('node:dns');
const { promisify } = require('node:util');

const dnsLookupPromise = promisify(dnsLookup);

const ipMapRequestCounter = {};

const getIpAddress = async () => {
  const hostname = getHostname();
  const dns = await dnsLookupPromise(hostname, { family: 4 });
  const { address } = dns;
  return address;
};

const rateLimiter = async () => {
  try {
    const address = await getIpAddress();
    console.log('--- - address:', address);

    if (address && ipMapRequestCounter[address] === undefined) {
      ipMapRequestCounter[address] = 0;
    }
  } catch (error) {
    console.error(`Unable to look up DNS. `, error);
  }
};

rateLimiter();

const REQUEST_LIMIT = 5;
const TIMEFRAME = 10 * 1_000; // 10 seconds

const resetRateLimit = () => {
  setInterval(async () => {
    console.log('RESET')

    const ipAddress = await getIpAddress();
    ipMapRequestCounter[ipAddress] = 0;
  }, TIMEFRAME);
};
resetRateLimit();

const fireRequests = async () => {
  const ipAddress = await getIpAddress();

  const shouldBeRateLimited = ipMapRequestCounter[ipAddress] > REQUEST_LIMIT;
  if (shouldBeRateLimited) {
    console.warn('❌ Rate limited.')
  } else {
    console.log('✅ All good.')

    ipMapRequestCounter[ipAddress]++;
  }

  console.log('--- Cache:', ipMapRequestCounter);
};

setInterval(fireRequests, 1000);

fireRequests();
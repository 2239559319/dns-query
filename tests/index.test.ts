// import { createSocket } from 'dgram';

// const DNSPORT = 53;
// const DNSIP = '192.168.0.1'

// const client = createSocket('udp4');

// client.on('message', (msg, info) => {
//   console.log(msg);
// });

// const rawHex = `3e b4 01 00 00 01 00 00 00 00 00 00 03 73 63 75 03 65 64 75 02 63 6e 00 00 01 00 01`
//  .split(' ').map(v => Number.parseInt(v, 16));
// const data = Buffer.from(rawHex);

// client.send(data, DNSPORT, DNSIP);

// console.log();

// describe("test response", () => {

// });

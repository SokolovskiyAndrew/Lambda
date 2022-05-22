import express from 'express';

export function ipAddressToNumber(inIpAddress: string): number {
  const yNum = 256;
  const xNum = Math.pow(yNum, 2);
  const wNum = Math.pow(yNum, 3);
  const [w, x, y, z] = inIpAddress.split('.');

  return wNum * +w + xNum * +x + yNum * +y + +z;
}

export function getIpAddress(inRequest: express.Request): string {
  const lIpAddress = inRequest.headers['x-forwarded-for'] || inRequest.socket.remoteAddress || '';

  switch (typeof lIpAddress) {
    case 'string':
      return lIpAddress.split(',')[0].trim();
    case 'object':
      return lIpAddress[0];
  }
}

import express from 'express';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { getIpAddress, inRange, ipAddressToNumber } from '../shared';

const app = express();
const IP_LOCATION_DB_PATH = `${__dirname}/assets/IP2LOCATION-LITE-DB1.CSV`;

export const ipLocationRequest = () => {
  const server = app.get('/', async (req, res) => {
    try {
      const lIpAddress = getIpAddress(req);
      const lLocation: string | null = await findLocationByIp(lIpAddress, IP_LOCATION_DB_PATH);

      if (lLocation) {
        res.status(200).send(`${lLocation} - ${lIpAddress}`);
      } else {
        res.status(404).send('Location was not found');
      }
    } catch (e) {
      res.status(500).send('Something went wrong. Please, try again later');
    }
  });

  server.listen(80, () => {
    console.log('Server is running...');
  });
};

const findLocationByIp = (inIpAddress: string, inFilePath: string): Promise<string | null> => {
  return new Promise((inResolve) => {
    const lReadStream = createReadStream(inFilePath, { encoding: 'utf-8' });
    const lReadLine = createInterface({ input: lReadStream });
    let lFoundLocation: string | null = null;

    lReadLine.on('line', (inLine: string) => {
      const [start, end, , countryName] = inLine.replace(/"/g, '').split(',');

      if (inRange(ipAddressToNumber(inIpAddress), Number(start), Number(end))) {
        lFoundLocation = countryName;
      }
    });

    lReadLine.on('close', () => inResolve(lFoundLocation));
  });
};

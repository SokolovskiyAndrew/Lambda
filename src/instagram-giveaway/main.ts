import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const { getHashTable } = require('../shared/utility-funtions');
import { Dictionary } from '../shared/types/utility.type';

const DIR_PATH_200K = `${__dirname}/assets/200k`;
const DIR_PATH_2MIL = `${__dirname}/assets/2million`;

function getFileContent(dirName: string, fileName: string): Promise<string[]> {
    return new Promise((resolve) => {
        fs.readFile(`${dirName}/${fileName}`, 'utf-8', (err: ErrnoException | null, content: string) => {
            if (err) {
                console.warn('file access error', err);
            }

            resolve(content.split('\r\n'));
        });
    });
}

function userNameOccurrences(dirName: string, fileName: string, uniqueNamesHash: Dictionary): Promise<void> {
    return new Promise((resolve) => {
        const cache: Dictionary = {};
        const inStream = fs.createReadStream(`${dirName}/${fileName}`, { encoding: 'utf-8' });
        const outStream = stream.Writable;
        const readLine = readline.createInterface(inStream, outStream);

        readLine.on('line', (line: string) => {
            if (!cache[line]) {
                uniqueNamesHash[line] = uniqueNamesHash[line] += 1;
                cache[line] = 1;
            }
        });

        readLine.on('close', () => {
            resolve();
        });
    });
}

function processGiveAwayResults(): void {
    const start = new Date();

    fs.readdir(DIR_PATH_2MIL, async (err: ErrnoException | null, innerFiles: string[]) => {
        if (err) {
            console.log('Access folder error', err);
        }
        const allFilesContent = [];

        for (const fileName of innerFiles) {
            const fileContent: string[] = await getFileContent(DIR_PATH_2MIL, fileName);
            allFilesContent.push(...fileContent);
        }

        const uniqueHash: Dictionary = getHashTable(allFilesContent);

        for (const fileName of innerFiles) {
            await userNameOccurrences(DIR_PATH_2MIL, fileName, uniqueHash);
        }

        uniqueValues(uniqueHash);
        existInAllFiles(uniqueHash);
        existInAtLeastTen(uniqueHash);

        const finish = new Date();
        // @ts-ignore
        console.log('It took:', (finish - start) / 1000);
    });
}

function uniqueValues(userNamesHash: Dictionary): void {
    const uniqueUserNames = Object.keys(userNamesHash);
    console.log('Unique User Names', uniqueUserNames.length);
    // unique user names = 129240
}

function existInAllFiles(userNamesHash: Dictionary): void {
    const userNameInEveryFile = Object.keys(userNamesHash).filter((key) => userNamesHash[key] === 20);
    console.log('User Names In Every File', userNameInEveryFile.length);
    // twenty result = 441
}

function existInAtLeastTen(userNamesHash: Dictionary): void {
    const userNameInMoreThanHalfFiles = Object.keys(userNamesHash).filter((key) => userNamesHash[key] >= 10);
    console.log('User Names In A Half Of Files', userNameInMoreThanHalfFiles.length);
    // result  73245
}

const instagramGiveaway = {
    processGiveAwayResults
};

module.exports = instagramGiveaway;

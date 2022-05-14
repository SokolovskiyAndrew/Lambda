const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const { getHashTable } = require('../shared/utility-funtions');

const DIR_PATH_200K = `${__dirname}/assets/200k`;
const DIR_PATH_2MIL = `${__dirname}/assets/2million`;

function getFileContent (dirName, fileName) {
    return new Promise((resolve) => {
        fs.readFile(`${dirName}/${fileName}`, 'utf-8', ((err, content) => {
            if(err) {
                console.warn('file access error',err);
            }

            resolve(content.split('\n'))
        }))
    })
}

function userNameOccurrences(dirName, fileName, uniqueNamesHash) {
    return new Promise((resolve) => {
        const cache = {};
        const inStream = fs.createReadStream(`${dirName}/${fileName}`, { encoding: 'utf-8'});
        const outStream = stream.Writable;
        const readLine = readline.createInterface(inStream, outStream);

        readLine.on('line', (line) => {
            if(!cache[line]) {
                uniqueNamesHash[line] = uniqueNamesHash[line] += 1;
                cache[line] = line;
            }
        })

        readLine.on('close', () => {
            resolve();
        })
    })
}

function processGiveAwayResults() {
    const start = new Date();

    fs.readdir(DIR_PATH_2MIL, async (err, innerFiles) => {
        if(err) {
            console.log('Access folder error', err);
        }
        const allFilesContent = [];

        for(const fileName of innerFiles) {
            const fileContent = await getFileContent(DIR_PATH_2MIL, fileName);
            allFilesContent.push(...fileContent);
        }

        const uniqueHash = getHashTable(allFilesContent);

        for (const fileName of innerFiles) {
            await userNameOccurrences(DIR_PATH_2MIL, fileName, uniqueHash);
        }

        uniqueValues(uniqueHash);
        existInAllFiles(uniqueHash);
        existInAtLeastTen(uniqueHash);

        const finish = new Date();
        console.log('It took:', (finish - start) / 1000);
    })
}

function uniqueValues(userNamesHash) {
    const uniqueUserNames = Object.keys(userNamesHash);
    console.log('Unique User Names',uniqueUserNames.length);
    // unique user names = 129240
}

function existInAllFiles(userNamesHash) {
    const userNameInEveryFile = Object.keys(userNamesHash).filter((key) => userNamesHash[key] === 20);
    console.log('User Names In Every File',userNameInEveryFile.length);
    // twenty result = 441
}

function existInAtLeastTen(userNamesHash) {
    const userNameInMoreThanHalfFiles = Object.keys(userNamesHash).filter((key) => userNamesHash[key] >= 10);
    console.log('User Names In A Half Of Files',userNameInMoreThanHalfFiles.length);
    // result  73245
}

const instagramGiveaway = {
    processGiveAwayResults
}

module.exports = instagramGiveaway;

function getHashTable(inArray) {
    return inArray.reduce((inHash, currentEl) => {
        inHash[currentEl] = 0;
        return inHash;
    }, {})
}

const utilityFunctions = {
    getHashTable
}

module.exports = utilityFunctions;

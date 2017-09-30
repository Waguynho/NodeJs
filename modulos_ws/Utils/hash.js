const crypto = require('crypto');

function  createHash(data){

    const hash = crypto.createHash('sha256');

    hash.update(data);

    return hash.digest('base64');
}

module.exports = {
    createHash: createHash
}
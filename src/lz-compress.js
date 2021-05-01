const lz = require('lz-string');

const altAlpha = ':;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz';

function compress(sourceContent) {
	return lz._compress(sourceContent, 6 /* bits */, a => altAlpha.charAt(a));
}

module.exports = compress;
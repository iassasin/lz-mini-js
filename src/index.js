const compress = require('./lz-compress');
const path = require('path');
const fs = require('fs').promises;
const uglifyjs = require('uglify-js');

/**
 * Generate self-decompressable script
 * @param {string} sourceContent script to compress
 * @param {boolean} minifyOutput minify on-fly-decompressor script. True by default
 */
async function compressify(sourceContent, minifyOutput = true) {
	let decompressFunc = (await fs.readFile(path.join(__dirname, '..', 'src', 'lz-decompress.js'))).toString();
	let compressedJsContent = `eval(${decompressFunc}('${compress(sourceContent)}'))`;

	return minifyOutput ? minify(compressedJsContent) : compressedJsContent;
}

function minify(content) {
	let result = uglifyjs.minify(content, {
		compress: {
			unsafe: true,
		},
	});

	if (result.error) {
		throw result.error;
	}

	return result.code;
}

module.exports = compressify;
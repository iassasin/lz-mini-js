const compress = require('../src/lz-compress');
const path = require('path');
const fs = require('fs').promises;

(async () => {
	let sourceScript = path.join(__dirname, '..', 'node_modules', 'terser', 'dist', 'bundle.min.js');

	let origScript = (await fs.readFile(sourceScript)).toString();
	let decompressFunc = (await fs.readFile(path.join(__dirname, '..', 'src', 'lz-decompress.js'))).toString();
	decompressFunc = eval(`(${decompressFunc})`);

	let compressedOrig = compress(origScript);
	let decompressedScript = decompressFunc(compressedOrig);

	console.log(origScript == decompressedScript);
})();
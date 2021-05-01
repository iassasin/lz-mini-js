const compressify = require('../');
const fs = require('fs').promises;

(async () => {
	let sourceScript = process.argv[2];
	let targetScript = process.argv[3];

	if (!sourceScript || !targetScript) {
		console.log(`Usage: lz-js <sourceScript> <targetScript>`);
		return;
	}

	console.log(sourceScript, '=>', targetScript);

	let origScript = (await fs.readFile(sourceScript)).toString();
	let compressedScript = await compressify(origScript);

	console.log(`Write ${compressedScript.length}, original = ${origScript.length} (${Math.floor(compressedScript.length / origScript.length * 100)}%)`);

	await fs.writeFile(targetScript, compressedScript);
})();

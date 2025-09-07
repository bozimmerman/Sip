const fs = require('fs');

const jsPath = 'js/siplet.js';  // Adjust path if siplet.js is in a subfolder
const pkgPath = 'package.json';

const jsContent = fs.readFileSync(jsPath, 'utf8');

const majorRegex = /VERSION_MAJOR:\s*['"]([\d.]+)['"]/;
const minorRegex = /VERSION_MINOR:\s*['"]([\d.]+)['"]/;

const majorMatch = jsContent.match(majorRegex);
const minorMatch = jsContent.match(minorRegex);

if (!majorMatch || !minorMatch) {
	console.error('Error: Could not extract versions from siplet.js');
	process.exit(1);
}

const major = majorMatch[1];
const minor = minorMatch[1];
const fullVersion = `${major}.${minor}`;  // Outputs "3.2.1" based on your example

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = fullVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');  // Preserve formatting

console.log(`Updated package.json version to ${fullVersion}`);
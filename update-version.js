const fs = require('fs');

const jsPath = 'js/config.js';  // Adjust path if siplet.js is in a subfolder
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

var variation = 'a';
if (process.argv.length > 2)
	variation =  process.argv[2];
var appName = 'Sip MUD Client';
var pkgAppName = 'Sip';
if (variation === 'b')
{
	appName = 'Sip of CoffeeMud';
	pkgAppName = 'SipOfCoffeemud';
}
else 
if (variation !== 'a')
{
	console.error('Error: Invalid variation argument. Must be "a" or "b".');
	process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = fullVersion;

if(variation === 'b')
	pkg.description = "Sip of CoffeeMud - A MUD client optimized for CoffeeMud";
else
	pkg.description = "Sip - A MUD Client!";
pkg.name = pkgAppName;
pkg.build.productName = appName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');  // Preserve formatting

console.log(`Updated package.json version to ${fullVersion}`);

var variation = 'a';
if (process.argv.length > 2)
	variation =  process.argv[2];

const nameRegex = /NAME:\s*window\.isElectron\?'([^']+?)':'Siplet',/;
var newJsContent = jsContent.replace(nameRegex, "NAME: window.isElectron?'"+appName+"':'Siplet',");
const cmRegex = /COFFEE_MUD:\s*(true|false),/;
newJsContent = newJsContent.replace(cmRegex, `COFFEE_MUD: ${variation === 'b' ? 'true' : 'false'},`);
fs.writeFileSync(jsPath, newJsContent);
console.log(`Updated Siplet.NAME to '${appName}'`);


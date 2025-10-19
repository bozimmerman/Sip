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
// a: windows/mac Sip,
// b: windows/map Sip Of CoffeeMud
// c: linux Sip
// d: linux Sip of CoffeeMud
var cmOnlyFlag = (variation === 'b') ? 'true' : 'false';
var productName = 'Sip MUD Client';
var topName = 'Sip';
var artifactName = 'Sip';
var displayName = 'Sip MUD Client';
var description = 'Sip -a MUD Client!'
if(variation === 'a')
{}
else
if(variation === 'b')
{
	productName = 'Sip of CoffeeMud';
	displayName = 'Sip of CoffeeMud';
	topName = 'SipOfCoffeemud';
	artifactName = 'SipOfCoffeeMud'
	description = "Sip of CoffeeMud - A MUD client optimized for CoffeeMud";
}
else 
if(variation === 'c')
{
	productName = 'sip-mud-client';
	displayName = 'Sip MUD Client';
	topName = 'sip-mud-client';
	artifactName = 'Sip'
}
else 
if(variation === 'd')
{
	productName = 'sip-of-coffeemud';
	displayName = 'Sip of CoffeeMud';
	topName = 'sip-of-coffeemud';
	artifactName = 'SipOfCoffeeMud'
	description = "Sip of CoffeeMud - A MUD client optimized for CoffeeMud";
}
else 
{
	console.error('Error: Invalid variation argument. Must be a, b, c or d.');
	process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = fullVersion;
pkg.description = description;
pkg.name = topName;
pkg.build.productName = productName;
pkg.build.linux.executeableName = productName;
pkg.build.linux.artifactName = pkg.build.linux.artifactName.replace('${name}', artifactName);
pkg.build.linux.desktop.entry.Comment = description;
pkg.build.linux.desktop.entry.Name = displayName;
  
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');  // Preserve formatting

console.log(`Updated package.json version to ${fullVersion}`);

const nameRegex = /NAME:\s*window\.isElectron\?'([^']+?)':'Siplet',/;
var newJsContent = jsContent.replace(nameRegex, "NAME: window.isElectron?'"+displayName+"':'Siplet',");
const cmRegex = /COFFEE_MUD:\s*(true|false),/;
newJsContent = newJsContent.replace(cmRegex, `COFFEE_MUD: ${cmOnlyFlag},`);
fs.writeFileSync(jsPath, newJsContent);
console.log(`Updated Siplet.NAME to '${productName}'`);


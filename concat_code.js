const fs = require('fs');
const path = require('path');

function getFiles(dir, exts, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        getFiles(fullPath, exts, fileList);
      }
    } else {
      if (exts.includes(path.extname(file))) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const srcFiles = getFiles('c:/Users/M/Desktop/store-locator/src', ['.ts', '.tsx']);
const sqlFiles = getFiles('c:/Users/M/Desktop/store-locator/supabase', ['.sql']);

let output = '';
for (const file of [...srcFiles, ...sqlFiles]) {
  output += `\n\n================================================================================\n`;
  output += `FILE: ${file}\n`;
  output += `================================================================================\n\n`;
  output += fs.readFileSync(file, 'utf8');
}

fs.writeFileSync('c:/Users/M/Desktop/store-locator/all_project_code.txt', output);
console.log(`Successfully concatenated ${srcFiles.length + sqlFiles.length} files into all_project_code.txt`);

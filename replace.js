const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname); // ili zameni sa svojom putanjom ako treba

// Funkcija za obradu jednog fajla
function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  const newHtml = html.replace(/<a([^>]+?)href="#([^"]+)"([^>]*)>/g, (match, before, anchor, after) => {
    return `<a${before}data-scroll-to="${anchor}"${after}>`;
  });

  if (newHtml !== html) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`Processed: ${filePath}`);
  }
}

// Učitaj fajlove iz foldera
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('Greška pri čitanju direktorijuma:', err);
    return;
  }

  files.filter(f => f.endsWith('.html')).forEach(file => {
    const filePath = path.join(dirPath, file);
    processFile(filePath);
  });
});
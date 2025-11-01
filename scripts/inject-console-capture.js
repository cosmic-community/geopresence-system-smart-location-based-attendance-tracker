const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', '.next', 'server', 'app');
const scriptPath = '/dashboard-console-capture.js';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(scriptPath)) {
      return;
    }
    
    const headMatch = content.match(/<head[^>]*>/i);
    if (headMatch) {
      const injection = `${headMatch[0]}<script src="${scriptPath}"></script>`;
      content = content.replace(headMatch[0], injection);
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        injectScript(filePath);
      }
    });
  } catch (error) {
    console.log('Build output directory not found - this is normal for first build');
  }
}

if (fs.existsSync(outDir)) {
  walkDir(outDir);
}
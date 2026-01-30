// This script updates the 'Last updated' date in src/assets/terms.md to today's date.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'public', 'terms.md');
const today = new Date();
const formatted = today.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

let content = fs.readFileSync(filePath, 'utf8');
const updated = content.replace(
  /(_Last updated: )(.*?)(_)/i,
  `$1${formatted}$3`
);
fs.writeFileSync(filePath, updated, 'utf8');
console.log(`Updated Terms last updated date to: ${formatted}`);

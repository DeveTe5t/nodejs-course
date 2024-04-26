
const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');

// const wordCount = content.split(' ').length;

const words = content.split(' ');

const wordCount1 = words.filter(word => word.toLowerCase() === 'react').length;

const wordCount2 = words.filter(word => word.toLowerCase().includes('react')).length;

const wordReactCount = content.match(/react/gi ?? []).length;

console.log('Words count total:', words.length);
console.log('Words React count form 1:', wordCount1);
console.log('Words React count form 2:', wordCount2);
console.log('Words React count form 3:', wordReactCount);

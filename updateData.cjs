const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.js', 'utf8');
content = content.replace(/description: '([^']+)' \}/g, "description: '$1', quiz: { question: 'What is a key takeaway from this topic?', options: ['Understanding the core concepts', 'Ignoring best practices', 'Memorizing without logic'], correctAnswer: 0 } }");
fs.writeFileSync('src/data/mockData.js', content);

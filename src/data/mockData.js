export const DOMAINS = [
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Build modern, responsive, and dynamic websites and web applications.',
    color: '#3b82f6', // blue
    keywords: ['website', 'html', 'css', 'react', 'frontend', 'backend', 'fullstack']
  },
  {
    id: 'data',
    title: 'Data Analytics',
    description: 'Turn raw data into actionable insights and visual stories.',
    color: '#10b981', // green
    keywords: ['data', 'python', 'sql', 'analytics', 'statistics', 'dashboard', 'excel']
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning',
    description: 'Create intelligent systems that learn and adapt from data.',
    color: '#8b5cf6', // purple
    keywords: ['ai', 'ml', 'machine learning', 'neural', 'deep learning', 'model']
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    description: 'Protect systems, networks, and programs from digital attacks.',
    color: '#ef4444', // red
    keywords: ['security', 'hack', 'protect', 'network', 'cyber']
  },
  {
    id: 'mobiledev', // Make sure this is unique
    title: 'Mobile Development',
    description: 'Build native and cross-platform apps for iOS and Android.',
    color: '#f59e0b', // A nice amber/orange color
    keywords: ['mobile', 'app', 'ios', 'android', 'react native', 'flutter']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Master both frontend and backend to build complete, scalable web applications.',
    color: '#06b6d4', // cyan
    keywords: ['fullstack', 'frontend', 'backend', 'react', 'node', 'database', 'end-to-end']
  },
  {
    id: 'datascience',
    title: 'Data Science',
    description: 'Extract insights from complex data using advanced statistics, algorithms, and machine learning.',
    color: '#0ea5e9', // sky blue
    keywords: ['data science', 'python', 'machine learning', 'analytics', 'statistics', 'predictive']
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Design intuitive, user-centric interfaces and seamless digital experiences.',
    color: '#ec4899', // pink
    keywords: ['ui', 'ux', 'design', 'figma', 'interface', 'user experience', 'prototype']
  }
];

const defaultQuiz = { 
  question: 'What is a key takeaway from this topic?', 
  options: ['Understanding the core concepts', 'Ignoring best practices', 'Memorizing without logic'], 
  correctAnswer: 0 
};

export const ROADMAPS = {
  webdev: [
    { id: 'wd1', title: 'Internet Fundamentals', description: 'How the web works, HTTP, DNS.', videoId: 'BBFrm-QU8ZE', quiz: defaultQuiz },
    { id: 'wd2', title: 'HTML & CSS Basics', description: 'Structure and styling of web pages.', videoId: 'mU6anWqZJcc', quiz: defaultQuiz },
    { id: 'wd3', title: 'JavaScript Essentials', description: 'Programming logic, DOM manipulation.', videoId: 'W6NZfCO5SIk', quiz: defaultQuiz },
    { id: 'wd4', title: 'React.js', description: 'Building UI components and state management.', videoId: 'bMknfKXIFA8', quiz: defaultQuiz },
    { id: 'wd5', title: 'Backend (Node.js/Express)', description: 'Creating APIs and server logic.', videoId: 'Oe421EPjeBE', quiz: defaultQuiz },
    { id: 'wd6', title: 'Database (MongoDB/SQL)', description: 'Storing and retrieving data.', videoId: 'HXV3zeQKqGY', quiz: defaultQuiz }
  ],
  data: [
    { id: 'da1', title: 'Excel & Spreadsheets', description: 'Basic data manipulation and formulas.', videoId: 'Vl0H-qTclOg', quiz: defaultQuiz },
    { id: 'da2', title: 'SQL Fundamentals', description: 'Querying databases.', videoId: 'HXV3zeQKqGY', quiz: defaultQuiz },
    { id: 'da3', title: 'Python for Data', description: 'Pandas, NumPy basics.', videoId: 'rfscVS0vtbw', quiz: defaultQuiz },
    { id: 'da4', title: 'Data Visualization', description: 'Tableau, PowerBI, or Matplotlib.', videoId: 'Oq511H2m3o4', quiz: defaultQuiz },
    { id: 'da5', title: 'Basic Statistics', description: 'Probability, distributions, hypothesis testing.', videoId: 'xxpc-HPKN28', quiz: defaultQuiz }
  ],
  aiml: [
    { id: 'ai1', title: 'Python Programming', description: 'Core language concepts.', videoId: 'rfscVS0vtbw', quiz: defaultQuiz },
    { id: 'ai2', title: 'Linear Algebra & Calculus', description: 'Math foundations for ML.', videoId: 'fNk_zzaMoSs', quiz: defaultQuiz },
    { id: 'ai3', title: 'Machine Learning Basics', description: 'Scikit-learn, regressions, classifications.', videoId: 'GwIoAwCOGcg', quiz: defaultQuiz },
    { id: 'ai4', title: 'Deep Learning', description: 'Neural networks, PyTorch/TensorFlow.', videoId: 'aircAruvnKk', quiz: defaultQuiz },
    { id: 'ai5', title: 'NLP or Computer Vision', description: 'Specialized application areas.', videoId: 'CMrHM8a3hqw', quiz: defaultQuiz }
  ],
  cyber: [
    { id: 'cy1', title: 'Networking Concepts', description: 'TCP/IP, OSI model.', videoId: 'qiQR5rTSshw', quiz: defaultQuiz },
    { id: 'cy2', title: 'Linux Basics', description: 'Command line, permissions.', videoId: 'v_1yAMHIs1c', quiz: defaultQuiz },
    { id: 'cy3', title: 'Security Fundamentals', description: 'Cryptography, threat models.', videoId: 'inWWhr5tnEA', quiz: defaultQuiz },
    { id: 'cy4', title: 'Ethical Hacking', description: 'Penetration testing basics.', videoId: '3Kq1MIfTWCE', quiz: defaultQuiz },
    { id: 'cy5', title: 'Incident Response', description: 'Handling breaches and logs.', videoId: 'z5nc9Kcw7pY', quiz: defaultQuiz }
  ],
  mobiledev: [
    { id: 'md1', title: 'Programming Basics', description: 'Learn JavaScript, Dart, or Swift depending on your path.', videoId: 'jpuMWVlEd54', quiz: defaultQuiz },
    { id: 'md2', title: 'UI Layouts', description: 'Understand how to position elements on a mobile screen.', videoId: '2EHh5fmi9FM', quiz: defaultQuiz },
    { id: 'md3', title: 'State Management', description: 'Handling app data efficiently.', videoId: '7q2zD9GntmY', quiz: defaultQuiz },
    { id: 'md4', title: 'APIs & Data Fetching', description: 'Connecting your app to a backend server.', videoId: 'Z1RJmh_OqeA', quiz: defaultQuiz },
    { id: 'md5', title: 'App Store Deployment', description: 'Publishing your finished app to users.', videoId: 'lZ_b4hWqSGY', quiz: defaultQuiz }
  ],
  fullstack: [
    { id: 'fs1', title: 'Frontend Fundamentals', description: 'HTML, CSS, JavaScript basics.', videoId: 'mU6anWqZJcc', quiz: defaultQuiz },
    { id: 'fs2', title: 'Frontend Frameworks', description: 'React, Vue, or Angular state management.', videoId: 'bMknfKXIFA8', quiz: defaultQuiz },
    { id: 'fs3', title: 'Backend APIs', description: 'Node.js, Express, or Django to serve data.', videoId: 'Oe421EPjeBE', quiz: defaultQuiz },
    { id: 'fs4', title: 'Databases', description: 'SQL (PostgreSQL) and NoSQL (MongoDB).', videoId: 'HXV3zeQKqGY', quiz: defaultQuiz },
    { id: 'fs5', title: 'DevOps & Deployment', description: 'Docker, CI/CD, AWS or Vercel.', videoId: 'hQcFE0RD0cQ', quiz: defaultQuiz }
  ],
  datascience: [
    { id: 'ds1', title: 'Programming & Math', description: 'Python, Linear Algebra, and Calculus.', videoId: 'rfscVS0vtbw', quiz: defaultQuiz },
    { id: 'ds2', title: 'Data Wrangling', description: 'Cleaning and preparing data using Pandas.', videoId: 'vmEHCJofslg', quiz: defaultQuiz },
    { id: 'ds3', title: 'Exploratory Data Analysis', description: 'Visualizations and uncovering trends.', videoId: 'Oq511H2m3o4', quiz: defaultQuiz },
    { id: 'ds4', title: 'Machine Learning', description: 'Supervised and unsupervised models.', videoId: 'GwIoAwCOGcg', quiz: defaultQuiz },
    { id: 'ds5', title: 'Deep Learning & Big Data', description: 'Neural networks, PySpark, model deployment.', videoId: 'aircAruvnKk', quiz: defaultQuiz }
  ],
  uiux: [
    { id: 'ux1', title: 'Design Principles', description: 'Color theory, typography, spacing.', videoId: 'YqQx75OPRa0', quiz: defaultQuiz },
    { id: 'ux2', title: 'User Research', description: 'Personas, user journeys, wireframing.', videoId: '1Vs8HE-p0y4', quiz: defaultQuiz },
    { id: 'ux3', title: 'UI Tools', description: 'Mastering Figma or Adobe XD.', videoId: 'c9Wg6Cb_YlU', quiz: defaultQuiz },
    { id: 'ux4', title: 'Prototyping', description: 'Creating interactive mockups and animations.', videoId: 'dOezC2t-xIs', quiz: defaultQuiz },
    { id: 'ux5', title: 'Usability Testing', description: 'Testing with real users and iterating.', videoId: 'eRzZkZ40KZY', quiz: defaultQuiz }
  ]
};

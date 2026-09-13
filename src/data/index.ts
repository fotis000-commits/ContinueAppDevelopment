export interface Student {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  interests: string[];
  skills: string[];
  skillLevels: Record<string, 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>;
  goals: string[];
  credits: number;
  lessonsCompleted: number;
  challengesCompleted: number;
  missions: string[];
  teamRole: string;
  bio: string;
  subjects: string[];
  availability: 'Full-time' | 'Part-time' | 'Weekends';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  objectives: string[];
  content: string;
  activity: string;
  miniChallenge: string;
  relatedSkills: string[];
  relatedSubjects: string[];
  nextLessons: string[];
  teacher: string;
  type: 'private' | 'group';
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  questions: number;
  skillsAwarded: string[];
  description: string;
  completed?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  problem: string;
  background: string;
  objectives: string[];
  requiredSkills: string[];
  teamSize: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Open' | 'Recruiting' | 'In Progress' | 'Completed';
  relatedSubjects: string[];
  deliverables: string[];
  milestones: string[];
  category: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  skills: string[];
  missionId: string;
  roles: Record<string, string>;
  progress: number;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  teamId: string;
  missionId: string;
  problem: string;
  solution: string;
  progress: number;
  milestones: { title: string; completed: boolean }[];
  skillsUsed: string[];
  status: 'Planning' | 'Recruiting' | 'In Progress' | 'Testing' | 'Completed';
  result?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  creditsRequired: number;
  category: string;
  available: boolean;
  expiresIn?: string;
}

export interface SkillEvidence {
  skillName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  evidenceType: string;
  description: string;
  date: string;
  source: string;
}

export interface Notification {
  id: string;
  type: 'mission' | 'lesson' | 'challenge' | 'team' | 'credits' | 'passport' | 'match';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const STUDENTS: Student[] = [
  {
    id: 's1', name: 'Foteini Karageorgou', country: 'Greece', flag: '🇬🇷',
    avatar: 'FK', interests: ['Mathematics', 'Philosophy', 'Music'], credits: 285,
    skills: ['Critical Thinking', 'Mathematics', 'Research', 'Public Speaking'],
    skillLevels: { 'Critical Thinking': 'Advanced', 'Mathematics': 'Expert', 'Research': 'Intermediate', 'Public Speaking': 'Beginner' },
    goals: ['Win Math Olympiad', 'Learn piano', 'Start a tutoring project'],
    lessonsCompleted: 14, challengesCompleted: 8, missions: ['m1', 'm3'],
    teamRole: 'Analyst', bio: 'Passionate about mathematics and philosophy. Looking for creative teammates.', subjects: ['Mathematics', 'Philosophy', 'Music'], availability: 'Part-time'
  },
  {
    id: 's2', name: 'Kenji Tanaka', country: 'Japan', flag: '🇯🇵',
    avatar: 'KT', interests: ['Programming', 'AI', 'Robotics'], credits: 520,
    skills: ['Programming', 'Data Analysis', 'Problem Solving', 'Teamwork'],
    skillLevels: { 'Programming': 'Expert', 'Data Analysis': 'Advanced', 'Problem Solving': 'Advanced', 'Teamwork': 'Intermediate' },
    goals: ['Build a real AI product', 'Learn machine learning', 'Join a startup'],
    lessonsCompleted: 32, challengesCompleted: 21, missions: ['m2', 'm4'],
    teamRole: 'Developer', bio: 'Junior developer building things that matter. Loves robotics and AI.', subjects: ['Computer Science', 'Mathematics', 'Physics'], availability: 'Full-time'
  },
  {
    id: 's3', name: 'Amara Diallo', country: 'Senegal', flag: '🇸🇳',
    avatar: 'AD', interests: ['Entrepreneurship', 'Sustainability', 'Design'], credits: 390,
    skills: ['Entrepreneurship', 'Communication', 'Design', 'Leadership'],
    skillLevels: { 'Entrepreneurship': 'Advanced', 'Communication': 'Expert', 'Design': 'Intermediate', 'Leadership': 'Advanced' },
    goals: ['Launch a social enterprise', 'Learn UI/UX', 'Build community projects'],
    lessonsCompleted: 22, challengesCompleted: 15, missions: ['m1', 'm5'],
    teamRole: 'Leader', bio: 'Building sustainable solutions for communities in West Africa and beyond.', subjects: ['Business', 'Environmental Science', 'Art'], availability: 'Part-time'
  },
  {
    id: 's4', name: 'Lucas Hoffmann', country: 'Germany', flag: '🇩🇪',
    avatar: 'LH', interests: ['Engineering', 'Renewable Energy', 'Music'], credits: 178,
    skills: ['Problem Solving', 'Physics', 'Mathematics', 'Adaptability'],
    skillLevels: { 'Problem Solving': 'Advanced', 'Physics': 'Expert', 'Mathematics': 'Advanced', 'Adaptability': 'Intermediate' },
    goals: ['Study engineering', 'Build a wind turbine project', 'Improve leadership'],
    lessonsCompleted: 9, challengesCompleted: 6, missions: ['m2'],
    teamRole: 'Engineer', bio: 'Physics enthusiast working on renewable energy models.', subjects: ['Physics', 'Mathematics', 'Environmental Science'], availability: 'Weekends'
  },
  {
    id: 's5', name: 'Sofia Nascimento', country: 'Brazil', flag: '🇧🇷',
    avatar: 'SN', interests: ['Storytelling', 'Photography', 'Social Impact'], credits: 445,
    skills: ['Storytelling', 'Photography', 'Writing', 'Communication'],
    skillLevels: { 'Storytelling': 'Expert', 'Photography': 'Advanced', 'Writing': 'Advanced', 'Communication': 'Expert' },
    goals: ['Become a documentary filmmaker', 'Tell stories of underrepresented communities', 'Write a book'],
    lessonsCompleted: 28, challengesCompleted: 11, missions: ['m3', 'm5'],
    teamRole: 'Communicator', bio: 'Storyteller from São Paulo capturing voices that need to be heard.', subjects: ['Literature', 'Media & Communication', 'Geography'], availability: 'Part-time'
  },
  {
    id: 's6', name: 'Priya Sharma', country: 'India', flag: '🇮🇳',
    avatar: 'PS', interests: ['Web Development', 'Education', 'Public Speaking'], credits: 610,
    skills: ['Web Development', 'Programming', 'Public Speaking', 'Leadership'],
    skillLevels: { 'Web Development': 'Expert', 'Programming': 'Advanced', 'Public Speaking': 'Advanced', 'Leadership': 'Intermediate' },
    goals: ['Build an ed-tech platform', 'Teach coding to rural students', 'Master React'],
    lessonsCompleted: 41, challengesCompleted: 27, missions: ['m4', 'm6'],
    teamRole: 'Developer', bio: 'Full-stack student developer. Passionate about making education accessible.', subjects: ['Computer Science', 'Mathematics', 'English'], availability: 'Full-time'
  },
  {
    id: 's7', name: 'Elias Bergström', country: 'Sweden', flag: '🇸🇪',
    avatar: 'EB', interests: ['Data Analysis', 'Economics', 'Chess'], credits: 302,
    skills: ['Data Analysis', 'Critical Thinking', 'Research', 'Economics'],
    skillLevels: { 'Data Analysis': 'Advanced', 'Critical Thinking': 'Expert', 'Research': 'Advanced', 'Economics': 'Intermediate' },
    goals: ['Analyse global economic trends', 'Build a personal data project', 'Debate economics'],
    lessonsCompleted: 19, challengesCompleted: 13, missions: ['m1'],
    teamRole: 'Analyst', bio: 'Data-driven thinker who loves chess and economic models.', subjects: ['Economics', 'Mathematics', 'Computer Science'], availability: 'Part-time'
  },
  {
    id: 's8', name: 'Fatima Al-Hassan', country: 'Jordan', flag: '🇯🇴',
    avatar: 'FA', interests: ['Medicine', 'Biology', 'Chemistry'], credits: 255,
    skills: ['Scientific Thinking', 'Research', 'Critical Thinking', 'Communication'],
    skillLevels: { 'Scientific Thinking': 'Advanced', 'Research': 'Advanced', 'Critical Thinking': 'Intermediate', 'Communication': 'Intermediate' },
    goals: ['Study medicine', 'Research infectious diseases', 'Publish a paper'],
    lessonsCompleted: 17, challengesCompleted: 9, missions: ['m6'],
    teamRole: 'Researcher', bio: 'Aspiring doctor with a passion for life sciences and global health.', subjects: ['Biology', 'Chemistry', 'Mathematics'], availability: 'Weekends'
  },
  {
    id: 's9', name: 'Chibuike Okonkwo', country: 'Nigeria', flag: '🇳🇬',
    avatar: 'CO', interests: ['Entrepreneurship', 'Marketing', 'Music'], credits: 478,
    skills: ['Marketing', 'Entrepreneurship', 'Communication', 'Creativity'],
    skillLevels: { 'Marketing': 'Advanced', 'Entrepreneurship': 'Expert', 'Communication': 'Expert', 'Creativity': 'Advanced' },
    goals: ['Launch a music streaming app', 'Grow a business in Africa', 'Master digital marketing'],
    lessonsCompleted: 25, challengesCompleted: 18, missions: ['m3', 'm5'],
    teamRole: 'Marketer', bio: 'Young entrepreneur from Lagos building the future of African music-tech.', subjects: ['Business', 'Media & Communication', 'Economics'], availability: 'Full-time'
  },
  {
    id: 's10', name: 'Mia Johansson', country: 'Finland', flag: '🇫🇮',
    avatar: 'MJ', interests: ['UI/UX Design', 'Accessibility', 'Art'], credits: 340,
    skills: ['Design', 'UI/UX', 'Creativity', 'Visual Thinking'],
    skillLevels: { 'Design': 'Expert', 'UI/UX': 'Expert', 'Creativity': 'Advanced', 'Visual Thinking': 'Advanced' },
    goals: ['Design accessible apps', 'Improve UX for education tools', 'Learn 3D design'],
    lessonsCompleted: 23, challengesCompleted: 16, missions: ['m4', 'm6'],
    teamRole: 'Designer', bio: 'Designer focused on accessibility and intuitive interfaces. Helsinki-based.', subjects: ['Design', 'Art', 'Computer Science'], availability: 'Part-time'
  },
  {
    id: 's11', name: 'Alejandro Reyes', country: 'Mexico', flag: '🇲🇽',
    avatar: 'AR', interests: ['Architecture', 'History', 'Urban Planning'], credits: 198,
    skills: ['Creativity', 'Research', 'Analytical Thinking', 'Planning'],
    skillLevels: { 'Creativity': 'Advanced', 'Research': 'Intermediate', 'Analytical Thinking': 'Intermediate', 'Planning': 'Beginner' },
    goals: ['Study urban design', 'Restore historic buildings', 'Design community spaces'],
    lessonsCompleted: 11, challengesCompleted: 5, missions: ['m2'],
    teamRole: 'Planner', bio: 'Architecture student passionate about building sustainable cities.', subjects: ['History', 'Geography', 'Art'], availability: 'Weekends'
  },
  {
    id: 's12', name: 'Yuna Kim', country: 'South Korea', flag: '🇰🇷',
    avatar: 'YK', interests: ['K-pop', 'Marketing', 'Social Media'], credits: 512,
    skills: ['Marketing', 'Creativity', 'Communication', 'Digital Literacy'],
    skillLevels: { 'Marketing': 'Expert', 'Creativity': 'Advanced', 'Communication': 'Advanced', 'Digital Literacy': 'Expert' },
    goals: ['Launch a social media agency', 'Reach 100K followers', 'Study at a top university'],
    lessonsCompleted: 35, challengesCompleted: 22, missions: ['m5'],
    teamRole: 'Marketer', bio: 'Digital creative from Seoul mastering social media and personal branding.', subjects: ['Business', 'Media & Communication', 'Economics'], availability: 'Full-time'
  },
  {
    id: 's13', name: 'Ibrahim Al-Qasim', country: 'Saudi Arabia', flag: '🇸🇦',
    avatar: 'IQ', interests: ['Programming', 'Cybersecurity', 'Mathematics'], credits: 387,
    skills: ['Programming', 'Cybersecurity Awareness', 'Problem Solving', 'Mathematics'],
    skillLevels: { 'Programming': 'Advanced', 'Cybersecurity Awareness': 'Intermediate', 'Problem Solving': 'Advanced', 'Mathematics': 'Expert' },
    goals: ['Build a cybersecurity startup', 'Win CTF competitions', 'Teach coding'],
    lessonsCompleted: 29, challengesCompleted: 20, missions: ['m4'],
    teamRole: 'Developer', bio: 'Security-focused developer from Riyadh. Competitive programmer.', subjects: ['Computer Science', 'Mathematics', 'Physics'], availability: 'Part-time'
  },
  {
    id: 's14', name: 'Olena Kovalenko', country: 'Ukraine', flag: '🇺🇦',
    avatar: 'OK', interests: ['Literature', 'Psychology', 'Creative Writing'], credits: 263,
    skills: ['Writing', 'Research', 'Empathy', 'Communication'],
    skillLevels: { 'Writing': 'Expert', 'Research': 'Advanced', 'Communication': 'Advanced', 'Critical Thinking': 'Intermediate' },
    goals: ['Publish a novel', 'Study psychology', 'Volunteer in community projects'],
    lessonsCompleted: 16, challengesCompleted: 7, missions: ['m3'],
    teamRole: 'Writer', bio: 'Young author and psychology enthusiast from Kyiv.', subjects: ['Literature', 'Psychology', 'History'], availability: 'Part-time'
  },
  {
    id: 's15', name: 'Arjun Patel', country: 'India', flag: '🇮🇳',
    avatar: 'AP', interests: ['Machine Learning', 'Data Science', 'Cricket'], credits: 598,
    skills: ['Data Analysis', 'Programming', 'Machine Learning Concepts', 'Mathematics'],
    skillLevels: { 'Data Analysis': 'Expert', 'Programming': 'Advanced', 'Machine Learning Concepts': 'Advanced', 'Mathematics': 'Expert' },
    goals: ['Build an ML model that predicts crop yields', 'Study at IIT', 'Win data science competitions'],
    lessonsCompleted: 44, challengesCompleted: 31, missions: ['m2', 'm4'],
    teamRole: 'Data Scientist', bio: 'Data science enthusiast from Ahmedabad solving agricultural problems with ML.', subjects: ['Computer Science', 'Mathematics', 'Biology'], availability: 'Full-time'
  },
  {
    id: 's16', name: 'Chloe Dubois', country: 'France', flag: '🇫🇷',
    avatar: 'CD', interests: ['Fashion', 'Sustainability', 'Business'], credits: 321,
    skills: ['Design', 'Entrepreneurship', 'Marketing', 'Creativity'],
    skillLevels: { 'Design': 'Advanced', 'Entrepreneurship': 'Intermediate', 'Marketing': 'Advanced', 'Creativity': 'Expert' },
    goals: ['Launch a sustainable fashion brand', 'Study at a fashion school', 'Reduce textile waste'],
    lessonsCompleted: 20, challengesCompleted: 12, missions: ['m5', 'm6'],
    teamRole: 'Designer', bio: 'Fashion designer from Paris reinventing sustainability in the industry.', subjects: ['Design', 'Business', 'Environmental Science'], availability: 'Part-time'
  },
  {
    id: 's17', name: 'Noa Levi', country: 'Israel', flag: '🇮🇱',
    avatar: 'NL', interests: ['Philosophy', 'Debate', 'Politics'], credits: 214,
    skills: ['Critical Thinking', 'Public Speaking', 'Research', 'Debate'],
    skillLevels: { 'Critical Thinking': 'Expert', 'Public Speaking': 'Advanced', 'Research': 'Advanced', 'Debate': 'Expert' },
    goals: ['Win national debate championship', 'Study philosophy at Oxford', 'Write political essays'],
    lessonsCompleted: 12, challengesCompleted: 8, missions: ['m1'],
    teamRole: 'Communicator', bio: 'Debater and philosopher from Tel Aviv challenging conventional thinking.', subjects: ['Philosophy', 'Political Science', 'History'], availability: 'Weekends'
  },
  {
    id: 's18', name: 'Aiko Fujiwara', country: 'Japan', flag: '🇯🇵',
    avatar: 'AF', interests: ['Art', 'Animation', 'Storytelling'], credits: 431,
    skills: ['Creativity', 'Design', 'Storytelling', 'Visual Thinking'],
    skillLevels: { 'Creativity': 'Expert', 'Design': 'Expert', 'Storytelling': 'Advanced', 'Visual Thinking': 'Advanced' },
    goals: ['Create an animated series', 'Study at an art school in Tokyo', 'Collaborate internationally'],
    lessonsCompleted: 27, challengesCompleted: 14, missions: ['m3', 'm6'],
    teamRole: 'Designer', bio: 'Animator and illustrator from Osaka bringing stories to life.', subjects: ['Art', 'Media & Communication', 'Computer Science'], availability: 'Full-time'
  },
  {
    id: 's19', name: 'Mohammed Al-Rashid', country: 'UAE', flag: '🇦🇪',
    avatar: 'MR', interests: ['Entrepreneurship', 'Finance', 'Technology'], credits: 674,
    skills: ['Business Strategy', 'Entrepreneurship', 'Leadership', 'Decision Making'],
    skillLevels: { 'Business Strategy': 'Expert', 'Entrepreneurship': 'Advanced', 'Leadership': 'Advanced', 'Decision Making': 'Expert' },
    goals: ['Build a fintech startup', 'Study at INSEAD', 'Create 100 jobs'],
    lessonsCompleted: 50, challengesCompleted: 35, missions: ['m4', 'm5'],
    teamRole: 'Leader', bio: 'Young entrepreneur from Dubai building fintech solutions for the region.', subjects: ['Business', 'Economics', 'Computer Science'], availability: 'Full-time'
  },
  {
    id: 's20', name: 'Ingrid Larsen', country: 'Norway', flag: '🇳🇴',
    avatar: 'IL', interests: ['Marine Biology', 'Environmental Science', 'Writing'], credits: 287,
    skills: ['Scientific Thinking', 'Research', 'Writing', 'Adaptability'],
    skillLevels: { 'Scientific Thinking': 'Advanced', 'Research': 'Expert', 'Writing': 'Advanced', 'Adaptability': 'Intermediate' },
    goals: ['Research ocean pollution', 'Write a book about marine life', 'Volunteer for ocean cleanup'],
    lessonsCompleted: 18, challengesCompleted: 10, missions: ['m2', 'm6'],
    teamRole: 'Researcher', bio: 'Marine biology enthusiast from Bergen documenting ocean ecosystems.', subjects: ['Biology', 'Environmental Science', 'Chemistry'], availability: 'Part-time'
  },
  {
    id: 's21', name: 'Carlos Silva', country: 'Portugal', flag: '🇵🇹',
    avatar: 'CS', interests: ['Music', 'Technology', 'Entrepreneurship'], credits: 356,
    skills: ['Music', 'Creativity', 'Entrepreneurship', 'Marketing'],
    skillLevels: { 'Music': 'Expert', 'Creativity': 'Expert', 'Entrepreneurship': 'Intermediate', 'Marketing': 'Intermediate' },
    goals: ['Launch a music tech startup', 'Produce an album', 'Collaborate with global artists'],
    lessonsCompleted: 21, challengesCompleted: 13, missions: ['m5'],
    teamRole: 'Creative Lead', bio: 'Musician and music tech innovator from Lisbon combining art and code.', subjects: ['Music', 'Computer Science', 'Business'], availability: 'Part-time'
  },
  {
    id: 's22', name: 'Zara Mensah', country: 'Ghana', flag: '🇬🇭',
    avatar: 'ZM', interests: ['Education', 'Public Health', 'Community Development'], credits: 312,
    skills: ['Leadership', 'Communication', 'Research', 'Teamwork'],
    skillLevels: { 'Leadership': 'Advanced', 'Communication': 'Advanced', 'Research': 'Intermediate', 'Teamwork': 'Expert' },
    goals: ['Build a school in rural Ghana', 'Study public health', 'Create a community network'],
    lessonsCompleted: 19, challengesCompleted: 11, missions: ['m1', 'm3'],
    teamRole: 'Community Manager', bio: 'Community builder from Accra working at the intersection of education and health.', subjects: ['Sociology', 'Psychology', 'Biology'], availability: 'Part-time'
  },
  {
    id: 's23', name: 'Tomasz Kowalski', country: 'Poland', flag: '🇵🇱',
    avatar: 'TK', interests: ['Game Development', 'Programming', 'Mathematics'], credits: 489,
    skills: ['Programming', 'Problem Solving', 'Creativity', 'Mathematics'],
    skillLevels: { 'Programming': 'Expert', 'Problem Solving': 'Advanced', 'Creativity': 'Advanced', 'Mathematics': 'Advanced' },
    goals: ['Release an indie game', 'Master C++ and Unreal Engine', 'Build a gaming community'],
    lessonsCompleted: 37, challengesCompleted: 24, missions: ['m4'],
    teamRole: 'Developer', bio: 'Game developer from Warsaw creating worlds one line of code at a time.', subjects: ['Computer Science', 'Mathematics', 'Physics'], availability: 'Full-time'
  },
  {
    id: 's24', name: 'Camila Torres', country: 'Colombia', flag: '🇨🇴',
    avatar: 'CT', interests: ['Psychology', 'Mental Health', 'Education'], credits: 241,
    skills: ['Empathy', 'Communication', 'Research', 'Writing'],
    skillLevels: { 'Communication': 'Expert', 'Research': 'Intermediate', 'Writing': 'Advanced', 'Critical Thinking': 'Intermediate' },
    goals: ['Become a psychologist', 'Create mental health resources for students', 'Write a self-help guide'],
    lessonsCompleted: 15, challengesCompleted: 7, missions: ['m3', 'm6'],
    teamRole: 'Researcher', bio: 'Psychology student from Bogotá creating mental health resources for young people.', subjects: ['Psychology', 'Sociology', 'Literature'], availability: 'Weekends'
  },
  {
    id: 's25', name: 'Riku Mäkinen', country: 'Finland', flag: '🇫🇮',
    avatar: 'RM', interests: ['Cybersecurity', 'Linux', 'Privacy'], credits: 528,
    skills: ['Cybersecurity Awareness', 'Programming', 'Problem Solving', 'Digital Literacy'],
    skillLevels: { 'Cybersecurity Awareness': 'Expert', 'Programming': 'Expert', 'Problem Solving': 'Advanced', 'Digital Literacy': 'Expert' },
    goals: ['Work in ethical hacking', 'Build privacy tools for activists', 'Earn a security certification'],
    lessonsCompleted: 40, challengesCompleted: 29, missions: ['m2', 'm4'],
    teamRole: 'Security Specialist', bio: 'Ethical hacker and privacy advocate from Tampere building safer digital spaces.', subjects: ['Computer Science', 'Mathematics', 'Philosophy'], availability: 'Full-time'
  },
];

export const LESSONS: Lesson[] = [
  // Mathematics
  {
    id: 'l1', title: 'Introduction to Algebra', category: 'Mathematics', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Learn the foundational concepts of algebra including variables, expressions, and simple equations.',
    objectives: ['Understand variables and constants', 'Solve linear equations', 'Graph simple functions'],
    content: 'Algebra is the branch of mathematics dealing with symbols and the rules for manipulating those symbols. A variable is a symbol that represents an unknown value, usually denoted by letters like x, y, or z. An algebraic expression combines variables, numbers, and operations.',
    activity: 'Solve the equations: 2x + 5 = 13, 3y - 7 = 14, and 5z/2 = 15',
    miniChallenge: 'Write your own real-world equation and solve it in 2 minutes.',
    relatedSkills: ['Mathematics', 'Analytical Thinking', 'Problem Solving'],
    relatedSubjects: ['Mathematics'], nextLessons: ['l2', 'l3'], teacher: 'Foteini Karageorgou',
  },
  {
    id: 'l2', title: 'Quadratic Equations', category: 'Mathematics', difficulty: 'Medium', duration: 30, type: 'private',
    description: 'Deep dive into quadratic equations, completing the square, and the quadratic formula.',
    objectives: ['Factor quadratic expressions', 'Use the quadratic formula', 'Interpret the discriminant'],
    content: 'A quadratic equation is a second-order polynomial equation in a single variable x: ax² + bx + c = 0. The quadratic formula x = (-b ± √(b²-4ac)) / 2a gives the solutions. The discriminant b²-4ac determines the nature of roots.',
    activity: 'Solve x² - 5x + 6 = 0 by factoring and verify with the formula.',
    miniChallenge: 'Find two different real-world scenarios modelled by quadratic equations.',
    relatedSkills: ['Mathematics', 'Analytical Thinking'], relatedSubjects: ['Mathematics', 'Physics'],
    nextLessons: ['l4'], teacher: 'Arjun Patel',
  },
  {
    id: 'l3', title: 'Probability & Statistics Basics', category: 'Mathematics', difficulty: 'Easy', duration: 25, type: 'group',
    description: 'Understand probability theory, mean, median, mode, and simple statistical analysis.',
    objectives: ['Calculate basic probability', 'Find mean, median, mode', 'Interpret simple data'],
    content: 'Probability measures the likelihood of events occurring. P(A) = favourable outcomes / total outcomes. Mean is the average, median is the middle value, and mode is the most frequent value.',
    activity: 'Collect data on 20 students\' favourite subjects and calculate all three measures.',
    miniChallenge: 'Calculate the probability of rolling a sum of 7 with two dice.',
    relatedSkills: ['Mathematics', 'Data Analysis', 'Analytical Thinking'], relatedSubjects: ['Mathematics', 'Economics'],
    nextLessons: ['l5'], teacher: 'Elias Bergström',
  },
  {
    id: 'l4', title: 'Calculus: Limits and Derivatives', category: 'Mathematics', difficulty: 'Hard', duration: 45, type: 'private',
    description: 'Introduction to calculus covering limits, the definition of a derivative, and differentiation rules.',
    objectives: ['Understand the concept of a limit', 'Compute derivatives using rules', 'Apply derivatives to real problems'],
    content: 'The derivative f\'(x) measures the rate of change of f(x). Using the power rule: d/dx[xⁿ] = nxⁿ⁻¹. Limits describe the value a function approaches as input approaches a value.',
    activity: 'Differentiate f(x) = 3x³ - 2x² + 5x - 1 and find critical points.',
    miniChallenge: 'Find the maximum area of a rectangle with perimeter 20 using derivatives.',
    relatedSkills: ['Mathematics', 'Analytical Thinking', 'Problem Solving'], relatedSubjects: ['Mathematics', 'Physics'],
    nextLessons: [], teacher: 'Kenji Tanaka',
  },
  // Programming
  {
    id: 'l5', title: 'Python for Beginners', category: 'Programming', difficulty: 'Easy', duration: 30, type: 'group',
    description: 'Start programming with Python: variables, loops, conditionals, and functions.',
    objectives: ['Write basic Python scripts', 'Use variables and data types', 'Build simple programs'],
    content: 'Python is a high-level, readable programming language. Variables store data: name = "Alice", age = 15. Loops repeat actions: for i in range(10): print(i). Functions group reusable code: def greet(name): return "Hello, " + name',
    activity: 'Build a number guessing game using a while loop and random module.',
    miniChallenge: 'Write a function that returns the Fibonacci sequence up to n terms.',
    relatedSkills: ['Programming', 'Problem Solving', 'Analytical Thinking'], relatedSubjects: ['Computer Science'],
    nextLessons: ['l6', 'l7'], teacher: 'Priya Sharma',
  },
  {
    id: 'l6', title: 'Web Development with HTML & CSS', category: 'Web Development', difficulty: 'Easy', duration: 35, type: 'group',
    description: 'Build your first web page using HTML structure and CSS styling.',
    objectives: ['Create a valid HTML document', 'Style with CSS selectors', 'Build a simple layout'],
    content: 'HTML (HyperText Markup Language) structures web content. CSS (Cascading Style Sheets) controls presentation. A basic page: <!DOCTYPE html><html><head><title>Page</title></head><body><h1>Hello World</h1></body></html>',
    activity: 'Build a personal portfolio page with a header, about section, and contact form.',
    miniChallenge: 'Recreate a famous website header using only HTML and CSS.',
    relatedSkills: ['Web Development', 'Design', 'Creativity'], relatedSubjects: ['Computer Science', 'Design'],
    nextLessons: ['l8'], teacher: 'Priya Sharma',
  },
  {
    id: 'l7', title: 'Algorithms: Sorting and Searching', category: 'Programming', difficulty: 'Medium', duration: 40, type: 'private',
    description: 'Understand fundamental algorithms including bubble sort, binary search, and time complexity.',
    objectives: ['Implement sorting algorithms', 'Understand Big O notation', 'Choose the right algorithm'],
    content: 'Bubble Sort compares adjacent elements and swaps them if out of order. Time complexity O(n²). Binary Search finds elements in sorted arrays in O(log n). Quick sort averages O(n log n).',
    activity: 'Implement three sorting algorithms and compare their performance on 1000 random numbers.',
    miniChallenge: 'Explain in plain language why O(n log n) beats O(n²) for large datasets.',
    relatedSkills: ['Programming', 'Problem Solving', 'Analytical Thinking'], relatedSubjects: ['Computer Science', 'Mathematics'],
    nextLessons: ['l9'], teacher: 'Kenji Tanaka',
  },
  {
    id: 'l8', title: 'JavaScript Fundamentals', category: 'Web Development', difficulty: 'Medium', duration: 35, type: 'group',
    description: 'Add interactivity to web pages with JavaScript: DOM manipulation, events, and ES6.',
    objectives: ['Manipulate the DOM', 'Handle events', 'Use modern ES6 syntax'],
    content: 'JavaScript makes web pages interactive. document.getElementById("btn").addEventListener("click", () => { alert("Clicked!"); }). Arrow functions: const add = (a, b) => a + b. Template literals: `Hello ${name}`.',
    activity: 'Build an interactive to-do list with add, complete, and delete functionality.',
    miniChallenge: 'Create a countdown timer that alerts when it reaches zero.',
    relatedSkills: ['Web Development', 'Programming', 'Problem Solving'], relatedSubjects: ['Computer Science'],
    nextLessons: ['l10'], teacher: 'Tomasz Kowalski',
  },
  // Science
  {
    id: 'l9', title: 'Newton\'s Laws of Motion', category: 'Physics', difficulty: 'Medium', duration: 25, type: 'group',
    description: 'Explore Newton\'s three laws and their applications to everyday motion.',
    objectives: ['State and apply Newton\'s three laws', 'Calculate force, mass, and acceleration', 'Analyse real-world motion examples'],
    content: 'Newton\'s First Law: An object at rest stays at rest unless acted upon by a net force. Second Law: F = ma (Force equals mass times acceleration). Third Law: For every action there is an equal and opposite reaction.',
    activity: 'Calculate the net force on a 10kg object accelerating at 5m/s² and identify the reaction pair.',
    miniChallenge: 'Identify Newton\'s Third Law in three everyday situations.',
    relatedSkills: ['Scientific Thinking', 'Mathematics', 'Analytical Thinking'], relatedSubjects: ['Physics', 'Mathematics'],
    nextLessons: ['l11'], teacher: 'Lucas Hoffmann',
  },
  {
    id: 'l10', title: 'DNA and Genetics', category: 'Biology', difficulty: 'Medium', duration: 30, type: 'group',
    description: 'Understand the structure of DNA, inheritance, and basic genetic principles.',
    objectives: ['Describe DNA structure', 'Apply Mendel\'s laws', 'Predict genetic outcomes'],
    content: 'DNA (Deoxyribonucleic acid) carries genetic information. Its double helix structure consists of base pairs: A-T, G-C. Genes are segments of DNA that code for traits. Mendel\'s Laws describe how traits are inherited through dominant and recessive alleles.',
    activity: 'Complete a Punnett square for a monohybrid cross of pea plants.',
    miniChallenge: 'Predict the probability of a child being colour-blind given specific parental genotypes.',
    relatedSkills: ['Scientific Thinking', 'Research', 'Analytical Thinking'], relatedSubjects: ['Biology', 'Chemistry'],
    nextLessons: [], teacher: 'Fatima Al-Hassan',
  },
  {
    id: 'l11', title: 'Chemical Bonding', category: 'Chemistry', difficulty: 'Medium', duration: 28, type: 'private',
    description: 'Explore ionic, covalent, and metallic bonds and how they determine material properties.',
    objectives: ['Distinguish bond types', 'Draw Lewis structures', 'Explain material properties from bonding'],
    content: 'Ionic bonds form between metals and non-metals through electron transfer. Covalent bonds share electrons between non-metals. Metallic bonds involve a sea of delocalized electrons giving metals conductivity.',
    activity: 'Draw Lewis structures for H₂O, CO₂, and NaCl and explain the bond type in each.',
    miniChallenge: 'Explain why diamond is hard and graphite is soft using bonding theory.',
    relatedSkills: ['Scientific Thinking', 'Analytical Thinking'], relatedSubjects: ['Chemistry', 'Physics'],
    nextLessons: [], teacher: 'Fatima Al-Hassan',
  },
  // Business
  {
    id: 'l12', title: 'Business Model Canvas', category: 'Business', difficulty: 'Easy', duration: 25, type: 'group',
    description: 'Learn to design and communicate your business model using the Business Model Canvas framework.',
    objectives: ['Complete all 9 canvas blocks', 'Identify value propositions', 'Map customer segments'],
    content: 'The Business Model Canvas has 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure.',
    activity: 'Complete a Business Model Canvas for a fictional coffee subscription app.',
    miniChallenge: 'Identify the single most important block in your model and justify why.',
    relatedSkills: ['Entrepreneurship', 'Business Strategy', 'Creativity'], relatedSubjects: ['Business', 'Entrepreneurship'],
    nextLessons: ['l13', 'l14'], teacher: 'Mohammed Al-Rashid',
  },
  {
    id: 'l13', title: 'Customer Discovery & Validation', category: 'Entrepreneurship', difficulty: 'Medium', duration: 30, type: 'group',
    description: 'Learn how to find your real customers through interviews, surveys, and observation.',
    objectives: ['Design customer interview questions', 'Identify key assumptions to test', 'Analyse interview data'],
    content: 'Customer discovery is the process of understanding your customer\'s problems before building a solution. Rule: get out of the building. Conduct 10 interviews before writing a line of code. Look for patterns in responses.',
    activity: 'Design a customer discovery interview guide for a study-help app and conduct 3 mock interviews.',
    miniChallenge: 'Write a problem hypothesis and explain how you\'d test it in 48 hours for zero cost.',
    relatedSkills: ['Entrepreneurship', 'Research', 'Communication'], relatedSubjects: ['Business', 'Psychology'],
    nextLessons: ['l15'], teacher: 'Amara Diallo',
  },
  {
    id: 'l14', title: 'Pricing Strategy', category: 'Business', difficulty: 'Medium', duration: 25, type: 'private',
    description: 'Explore different pricing models and how to choose the right one for your product.',
    objectives: ['Compare cost-plus, value-based, and competitive pricing', 'Calculate break-even', 'Choose a pricing model'],
    content: 'Cost-plus pricing adds a margin to your costs. Value-based pricing reflects customer willingness to pay. Competitive pricing matches or undercuts rivals. Freemium converts free users to paid. Subscription creates recurring revenue.',
    activity: 'Calculate the break-even price and projected revenue for a €5/month study tool with €2000 monthly costs.',
    miniChallenge: 'Redesign the pricing of a product you use daily to increase profitability.',
    relatedSkills: ['Business Strategy', 'Mathematics', 'Analytical Thinking'], relatedSubjects: ['Business', 'Economics'],
    nextLessons: ['l15'], teacher: 'Chibuike Okonkwo',
  },
  {
    id: 'l15', title: 'Pitching Your Idea', category: 'Entrepreneurship', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Build a compelling pitch that gets investors and partners excited about your idea.',
    objectives: ['Structure a 3-minute pitch', 'Deliver with confidence', 'Handle Q&A effectively'],
    content: 'A great pitch has: Hook (30 sec), Problem, Solution, Market size, Business model, Team, Ask. Use storytelling: open with a relatable scenario. Know your numbers. Anticipate tough questions.',
    activity: 'Prepare and deliver a 3-minute pitch for your business idea to the group.',
    miniChallenge: 'Pitch your idea in exactly one sentence (elevator pitch).',
    relatedSkills: ['Public Speaking', 'Communication', 'Entrepreneurship'], relatedSubjects: ['Business', 'English'],
    nextLessons: [], teacher: 'Amara Diallo',
  },
  // Design
  {
    id: 'l16', title: 'UI Design Principles', category: 'Design', difficulty: 'Easy', duration: 30, type: 'group',
    description: 'Learn the core principles of user interface design: hierarchy, contrast, alignment, and spacing.',
    objectives: ['Apply 4 core design principles', 'Critique existing UIs', 'Redesign a simple interface'],
    content: 'Hierarchy guides the eye using size, weight, and colour. Contrast makes elements stand out. Alignment creates order and professionalism. Spacing (whitespace) gives designs room to breathe. Consistency builds trust.',
    activity: 'Redesign the settings page of an app you use, improving all four principles.',
    miniChallenge: 'Find a poorly designed sign in your school and redesign it in 5 minutes.',
    relatedSkills: ['Design', 'UI/UX', 'Creativity', 'Visual Thinking'], relatedSubjects: ['Design', 'Art'],
    nextLessons: ['l17'], teacher: 'Mia Johansson',
  },
  {
    id: 'l17', title: 'User Research Methods', category: 'Design', difficulty: 'Medium', duration: 35, type: 'group',
    description: 'Understand how to conduct usability tests, interviews, and surveys to build user-centred designs.',
    objectives: ['Plan a usability test', 'Analyse user feedback', 'Create personas'],
    content: 'User research reduces the risk of building something nobody wants. Methods include: usability testing (observe users using your product), interviews (understand motivations), surveys (quantify opinions), and card sorting (understand information architecture).',
    activity: 'Conduct a 5-person usability test on a classmate\'s project and write a findings report.',
    miniChallenge: 'Create a user persona for a fictional student using an education app.',
    relatedSkills: ['UI/UX', 'Research', 'Communication'], relatedSubjects: ['Design', 'Psychology'],
    nextLessons: ['l18'], teacher: 'Mia Johansson',
  },
  {
    id: 'l18', title: 'Typography in Design', category: 'Design', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Explore how font choice, size, weight, and spacing affect communication and aesthetics.',
    objectives: ['Choose appropriate typefaces', 'Apply typographic hierarchy', 'Pair fonts effectively'],
    content: 'Typography is 95% of web design. Serif fonts feel traditional and trustworthy. Sans-serif is modern and clean. Font size hierarchy: Heading (32-48px), Subheading (20-28px), Body (16-18px). Line height 1.5x improves readability.',
    activity: 'Redesign a plain paragraph using only typography (no images or colour) to look professional.',
    miniChallenge: 'Find two fonts that pair perfectly and explain why they work together.',
    relatedSkills: ['Design', 'Creativity', 'Visual Thinking'], relatedSubjects: ['Design', 'Art'],
    nextLessons: [], teacher: 'Aiko Fujiwara',
  },
  // Languages
  {
    id: 'l19', title: 'English Writing: Argumentation', category: 'English', difficulty: 'Medium', duration: 30, type: 'group',
    description: 'Learn to write persuasive, evidence-based arguments using the PEEL structure.',
    objectives: ['Apply the PEEL paragraph structure', 'Use evidence effectively', 'Counter opposing arguments'],
    content: 'PEEL: Point (state your argument), Evidence (support with data/quotes), Explanation (link evidence to point), Link (connect to thesis). A strong argument acknowledges counterarguments and rebuts them.',
    activity: 'Write a 300-word argument on "Schools should ban smartphones" using PEEL for each paragraph.',
    miniChallenge: 'Write a PEEL paragraph in under 3 minutes on a topic given by the group.',
    relatedSkills: ['Writing', 'Critical Thinking', 'Research'], relatedSubjects: ['English', 'Literature'],
    nextLessons: ['l20'], teacher: 'Olena Kovalenko',
  },
  {
    id: 'l20', title: 'Introduction to Greek Language', category: 'Greek', difficulty: 'Easy', duration: 25, type: 'group',
    description: 'Start learning Modern Greek: the alphabet, greetings, and basic phrases for daily use.',
    objectives: ['Read the Greek alphabet', 'Greet in Greek', 'Introduce yourself in Greek'],
    content: 'Greek alphabet: α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω. Greetings: Γεια σου (Yia sou) = Hello, Ευχαριστώ (Efharistó) = Thank you, Παρακαλώ (Parakaló) = Please.',
    activity: 'Write your name in Greek letters and practice reading 10 Greek words.',
    miniChallenge: 'Hold a 30-second conversation in Greek introducing yourself and asking someone\'s name.',
    relatedSkills: ['Languages', 'Communication'], relatedSubjects: ['Greek', 'Languages'],
    nextLessons: [], teacher: 'Foteini Karageorgou',
  },
  // History & Social
  {
    id: 'l21', title: 'World War II: Causes and Consequences', category: 'History', difficulty: 'Medium', duration: 35, type: 'group',
    description: 'Analyse the political, economic, and social factors that led to WWII and its global impact.',
    objectives: ['Identify causes of WWII', 'Analyse key turning points', 'Evaluate lasting consequences'],
    content: 'WWII (1939-1945) grew from WWI failures, Great Depression, rise of fascism, and appeasement policies. Key events: German invasion of Poland (1939), Pearl Harbor (1941), D-Day (1944), atomic bombs on Japan (1945).',
    activity: 'Create a timeline of WWII\'s key events with a 50-word analysis of each.',
    miniChallenge: 'Argue in one paragraph whether appeasement was the biggest cause of WWII.',
    relatedSkills: ['Research', 'Critical Thinking', 'Writing'], relatedSubjects: ['History', 'Geography'],
    nextLessons: [], teacher: 'Noa Levi',
  },
  {
    id: 'l22', title: 'Introduction to Psychology', category: 'Psychology', difficulty: 'Easy', duration: 25, type: 'group',
    description: 'Explore the major schools of psychological thought and how psychology affects everyday decisions.',
    objectives: ['Identify major psychological perspectives', 'Understand key experiments', 'Apply psychology to daily life'],
    content: 'Psychology studies mind and behaviour. Major perspectives: Biological (brain and genes), Behavioural (learned responses), Cognitive (thoughts and perceptions), Humanistic (human potential), Psychoanalytic (unconscious).',
    activity: 'Analyse the Milgram Obedience Experiment and discuss its ethical implications.',
    miniChallenge: 'Identify one cognitive bias you exhibited in the past week.',
    relatedSkills: ['Research', 'Critical Thinking', 'Communication'], relatedSubjects: ['Psychology', 'Sociology'],
    nextLessons: [], teacher: 'Camila Torres',
  },
  // Leadership & Personal Development
  {
    id: 'l23', title: 'Public Speaking Fundamentals', category: 'Communication', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Overcome nerves and deliver compelling presentations with structure, voice, and body language.',
    objectives: ['Control nerves', 'Use voice effectively', 'Structure a 5-minute talk'],
    content: 'The fear of public speaking is shared by 75% of people. Techniques: Diaphragmatic breathing calms nerves. Eye contact builds trust. Pauses are powerful. Structure: Opening hook, 3 main points, memorable close. Practice: 10x mental, 5x verbal, 1x full.',
    activity: 'Deliver a 2-minute impromptu speech on "The most important lesson I\'ve learned" to the group.',
    miniChallenge: 'Give a 30-second speech with no "um", "uh", or "like".',
    relatedSkills: ['Public Speaking', 'Communication', 'Leadership'], relatedSubjects: ['English', 'Psychology'],
    nextLessons: ['l15'], teacher: 'Amara Diallo',
  },
  {
    id: 'l24', title: 'Time Management & Productivity', category: 'Personal Development', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Build practical systems for managing time, energy, and priorities as a student.',
    objectives: ['Apply the Eisenhower Matrix', 'Build a study schedule', 'Reduce procrastination'],
    content: 'The Eisenhower Matrix categorises tasks: Urgent+Important (Do now), Important+Not Urgent (Schedule), Urgent+Not Important (Delegate), Not Urgent+Not Important (Delete). Pomodoro technique: 25 min focus, 5 min break.',
    activity: 'Map this week\'s tasks on the Eisenhower Matrix and create a prioritised schedule.',
    miniChallenge: 'Complete a task you\'ve been procrastinating during the next Pomodoro.',
    relatedSkills: ['Organization', 'Time Management', 'Adaptability'], relatedSubjects: ['Psychology'],
    nextLessons: [], teacher: 'Mohammed Al-Rashid',
  },
  {
    id: 'l25', title: 'Project Management Basics', category: 'Personal Development', difficulty: 'Medium', duration: 30, type: 'group',
    description: 'Learn the fundamentals of planning, executing, and closing projects on time and on budget.',
    objectives: ['Create a project plan', 'Define scope and milestones', 'Manage risks and dependencies'],
    content: 'Project management involves Initiation (define scope), Planning (tasks, timeline, budget), Execution (doing the work), Monitoring (tracking progress), and Closure. Tools: Gantt charts, Kanban boards, Trello, Notion.',
    activity: 'Build a project plan for launching a school sustainability initiative in 30 days.',
    miniChallenge: 'Identify the critical path in a 5-task project.',
    relatedSkills: ['Project Management', 'Leadership', 'Organization', 'Planning'], relatedSubjects: ['Business'],
    nextLessons: [], teacher: 'Zara Mensah',
  },
  // AI & Data
  {
    id: 'l26', title: 'Introduction to Machine Learning', category: 'Technology', difficulty: 'Medium', duration: 40, type: 'group',
    description: 'Understand what machine learning is, how algorithms learn from data, and real-world applications.',
    objectives: ['Explain supervised vs unsupervised learning', 'Describe how a neural network works', 'Identify ML applications'],
    content: 'Machine Learning is a subset of AI where algorithms improve through experience. Supervised learning uses labelled data. Unsupervised learning finds patterns. Neural networks mimic the brain: layers of nodes process data and adjust weights.',
    activity: 'Train a simple decision tree to classify fruits based on colour and size.',
    miniChallenge: 'Identify 5 ML applications you\'ve interacted with today.',
    relatedSkills: ['Machine Learning Concepts', 'Data Analysis', 'Programming'], relatedSubjects: ['Computer Science', 'Mathematics'],
    nextLessons: [], teacher: 'Arjun Patel',
  },
  // More lessons to reach a rich library
  {
    id: 'l27', title: 'Creative Writing: Story Structure', category: 'Creative Writing', difficulty: 'Easy', duration: 25, type: 'group',
    description: 'Master the narrative arc to write compelling stories with engaging characters and satisfying endings.',
    objectives: ['Apply the Hero\'s Journey', 'Develop character arcs', 'Write a complete short story'],
    content: 'Every great story has: Setup, Conflict, Rising Action, Climax, Falling Action, Resolution. The Hero\'s Journey: ordinary world → call to adventure → trials → transformation → return. Show, don\'t tell.',
    activity: 'Write a 500-word short story using the Hero\'s Journey structure.',
    miniChallenge: 'Write the opening sentence of a story that immediately creates tension.',
    relatedSkills: ['Writing', 'Creativity', 'Storytelling'], relatedSubjects: ['Literature', 'English'],
    nextLessons: [], teacher: 'Olena Kovalenko',
  },
  {
    id: 'l28', title: 'Environmental Science: Climate Change', category: 'Environmental Science', difficulty: 'Medium', duration: 30, type: 'group',
    description: 'Understand the science of climate change, its causes, effects, and potential solutions.',
    objectives: ['Explain the greenhouse effect', 'Analyse climate data', 'Evaluate solution approaches'],
    content: 'The greenhouse effect: CO₂, methane, and other gases trap heat in the atmosphere. Global temperatures have risen 1.1°C since pre-industrial times. Effects: extreme weather, sea level rise, biodiversity loss. Solutions: renewable energy, reforestation, circular economy.',
    activity: 'Analyse a dataset of CO₂ emissions from 1960-2025 and identify patterns.',
    miniChallenge: 'Calculate your personal carbon footprint for one week.',
    relatedSkills: ['Scientific Thinking', 'Research', 'Data Analysis'], relatedSubjects: ['Environmental Science', 'Geography', 'Chemistry'],
    nextLessons: [], teacher: 'Ingrid Larsen',
  },
  {
    id: 'l29', title: 'Leadership Styles & Team Dynamics', category: 'Leadership', difficulty: 'Medium', duration: 25, type: 'group',
    description: 'Explore different leadership approaches and how to build high-performing teams.',
    objectives: ['Identify your leadership style', 'Adapt to team needs', 'Resolve common team conflicts'],
    content: 'Leadership styles: Autocratic (leader decides), Democratic (team votes), Laissez-faire (team self-directs), Transformational (inspires change), Servant (supports team growth). Tuckman\'s stages: Forming, Storming, Norming, Performing.',
    activity: 'Lead a group task and receive 360° feedback from teammates on your leadership style.',
    miniChallenge: 'Write a 50-word leadership manifesto based on your values.',
    relatedSkills: ['Leadership', 'Teamwork', 'Communication', 'Adaptability'], relatedSubjects: ['Business', 'Psychology'],
    nextLessons: [], teacher: 'Amara Diallo',
  },
  {
    id: 'l30', title: 'Digital Photography Basics', category: 'Photography', difficulty: 'Easy', duration: 20, type: 'group',
    description: 'Learn composition, lighting, and basic editing to take professional-looking photos.',
    objectives: ['Apply the rule of thirds', 'Understand exposure settings', 'Edit photos effectively'],
    content: 'Rule of thirds: divide the frame into 9 equal parts and place subjects on intersections. Exposure triangle: ISO (sensitivity), Aperture (depth of field), Shutter speed (motion). Good light is everything.',
    activity: 'Shoot a 5-photo series using only natural light that tells a story.',
    miniChallenge: 'Retake a bad photo and make it compelling using only composition changes.',
    relatedSkills: ['Photography', 'Creativity', 'Visual Thinking'], relatedSubjects: ['Art', 'Media & Communication'],
    nextLessons: [], teacher: 'Sofia Nascimento',
  },
];

export const CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Logic Puzzle Sprint', category: 'Critical Thinking', difficulty: 'Medium', duration: 10, questions: 3, skillsAwarded: ['Critical Thinking', 'Problem Solving'], description: 'Solve a series of logic puzzles testing deductive reasoning and pattern recognition.' },
  { id: 'c2', title: 'UI Wireframe Challenge', category: 'Design', difficulty: 'Easy', duration: 8, questions: 3, skillsAwarded: ['Design', 'UI/UX', 'Creativity'], description: 'Sketch and explain a wireframe for a mobile app in under 8 minutes.' },
  { id: 'c3', title: 'Data Interpretation Test', category: 'Data Analysis', difficulty: 'Medium', duration: 12, questions: 3, skillsAwarded: ['Data Analysis', 'Analytical Thinking'], description: 'Analyse a dataset and answer questions about trends, outliers, and insights.' },
  { id: 'c4', title: 'Research Summary', category: 'Research', difficulty: 'Easy', duration: 7, questions: 2, skillsAwarded: ['Research', 'Writing'], description: 'Read a 500-word article and write a 3-sentence summary capturing key points.' },
  { id: 'c5', title: 'Persuasive Writing Sprint', category: 'Writing', difficulty: 'Easy', duration: 6, questions: 2, skillsAwarded: ['Writing', 'Communication'], description: 'Write a 150-word persuasive paragraph on an assigned topic.' },
  { id: 'c6', title: 'Business Pitch in 60 Seconds', category: 'Entrepreneurship', difficulty: 'Medium', duration: 10, questions: 2, skillsAwarded: ['Entrepreneurship', 'Communication', 'Public Speaking'], description: 'Record and submit a 60-second business pitch for a product of your choice.' },
  { id: 'c7', title: 'Communication Role Play', category: 'Communication', difficulty: 'Easy', duration: 6, questions: 2, skillsAwarded: ['Communication', 'Teamwork'], description: 'Navigate a realistic communication scenario with a virtual teammate.' },
  { id: 'c8', title: 'Leadership Decision Maker', category: 'Leadership', difficulty: 'Medium', duration: 9, questions: 2, skillsAwarded: ['Leadership', 'Decision Making'], description: 'Make leadership decisions across 5 complex team scenarios.' },
  { id: 'c9', title: 'Code Debugging Challenge', category: 'Programming', difficulty: 'Medium', duration: 15, questions: 3, skillsAwarded: ['Programming', 'Problem Solving'], description: 'Find and fix bugs in 3 short code snippets.' },
  { id: 'c10', title: 'Adaptability Test', category: 'Adaptability', difficulty: 'Easy', duration: 5, questions: 1, skillsAwarded: ['Adaptability', 'Problem Solving'], description: 'Respond to an unexpected scenario change and demonstrate flexibility.' },
  { id: 'c11', title: 'Mathematics Speed Round', category: 'Mathematics', difficulty: 'Hard', duration: 15, questions: 5, skillsAwarded: ['Mathematics', 'Analytical Thinking'], description: 'Solve 5 challenging maths problems covering algebra, probability, and calculus in 15 minutes.' },
  { id: 'c12', title: 'Creativity Brainstorm', category: 'Creativity', difficulty: 'Easy', duration: 8, questions: 2, skillsAwarded: ['Creativity', 'Innovation'], description: 'Generate 10 unique ideas for a given problem in 8 minutes.' },
  { id: 'c13', title: 'Market Research Analysis', category: 'Research', difficulty: 'Medium', duration: 12, questions: 3, skillsAwarded: ['Research', 'Analytical Thinking', 'Entrepreneurship'], description: 'Analyse market research data and make strategic recommendations.' },
  { id: 'c14', title: 'Scientific Method Application', category: 'Research', difficulty: 'Medium', duration: 10, questions: 3, skillsAwarded: ['Scientific Thinking', 'Research', 'Critical Thinking'], description: 'Design an experiment to test a given hypothesis.' },
  { id: 'c15', title: 'Teamwork Simulation', category: 'Teamwork', difficulty: 'Easy', duration: 8, questions: 2, skillsAwarded: ['Teamwork', 'Communication', 'Leadership'], description: 'Navigate a team project simulation making collaborative decisions.' },
  { id: 'c16', title: 'Python Code Challenge', category: 'Programming', difficulty: 'Hard', duration: 20, questions: 4, skillsAwarded: ['Programming', 'Problem Solving', 'Analytical Thinking'], description: 'Solve 4 programming challenges in Python testing loops, functions, and data structures.' },
  { id: 'c17', title: 'Environmental Problem Solver', category: 'Critical Thinking', difficulty: 'Medium', duration: 12, questions: 3, skillsAwarded: ['Critical Thinking', 'Problem Solving', 'Innovation'], description: 'Propose solutions to an environmental challenge using systems thinking.' },
  { id: 'c18', title: 'Storytelling Challenge', category: 'Creativity', difficulty: 'Easy', duration: 7, questions: 2, skillsAwarded: ['Storytelling', 'Creativity', 'Writing'], description: 'Create a compelling story from random prompt words in 7 minutes.' },
  { id: 'c19', title: 'Financial Literacy Quiz', category: 'Mathematics', difficulty: 'Medium', duration: 10, questions: 3, skillsAwarded: ['Mathematics', 'Analytical Thinking'], description: 'Answer questions on budgeting, interest rates, and financial planning.' },
  { id: 'c20', title: 'Digital Citizenship Challenge', category: 'Digital Literacy', difficulty: 'Easy', duration: 8, questions: 3, skillsAwarded: ['Digital Literacy', 'Critical Thinking'], description: 'Identify misinformation, protect privacy, and navigate digital rights.' },
];

export const MISSIONS: Mission[] = [
  {
    id: 'm1', title: 'Reduce School Food Waste', category: 'Sustainability',
    problem: 'Our school cafeteria throws away 30-40kg of food every day. This wastes money and harms the environment.',
    background: 'Food waste contributes 8% of global greenhouse gas emissions. Schools are significant contributors. Simple changes in ordering, serving, and awareness can dramatically reduce waste.',
    objectives: ['Audit current waste levels', 'Design an intervention strategy', 'Implement and measure impact'],
    requiredSkills: ['Research', 'Data Analysis', 'Communication', 'Project Management'],
    teamSize: 4, difficulty: 'Medium', status: 'Recruiting',
    relatedSubjects: ['Environmental Science', 'Mathematics', 'Biology'],
    deliverables: ['Waste audit report', 'Intervention plan', 'Impact measurement dashboard'],
    milestones: ['Week 1: Audit', 'Week 2-3: Design', 'Week 4-6: Implement', 'Week 7-8: Measure'],
  },
  {
    id: 'm2', title: 'Build a Local Weather App', category: 'Technology',
    problem: 'Local fishermen and farmers in coastal communities lack access to accurate, hyperlocal weather forecasts.',
    background: 'Global weather apps give region-wide forecasts. Local variations matter enormously for agriculture and fishing. A simple, locally-calibrated app could save livelihoods.',
    objectives: ['Gather local weather data', 'Build a simple forecast app', 'Test with real users'],
    requiredSkills: ['Programming', 'Data Analysis', 'UI/UX', 'Research'],
    teamSize: 5, difficulty: 'Hard', status: 'In Progress',
    relatedSubjects: ['Computer Science', 'Geography', 'Mathematics'],
    deliverables: ['Working app prototype', 'User testing report', 'Data collection system'],
    milestones: ['Month 1: Data', 'Month 2: Build', 'Month 3: Test', 'Month 4: Launch'],
  },
  {
    id: 'm3', title: 'Community Storytelling Project', category: 'Cultural Projects',
    problem: 'The stories of elderly community members are being lost as younger generations move away and oral traditions fade.',
    background: 'Intergenerational knowledge gaps are widening globally. Documenting community stories preserves cultural heritage and strengthens social cohesion.',
    objectives: ['Interview 20+ community members', 'Create a digital archive', 'Produce a short documentary'],
    requiredSkills: ['Storytelling', 'Writing', 'Photography', 'Communication', 'Research'],
    teamSize: 4, difficulty: 'Easy', status: 'Open',
    relatedSubjects: ['Literature', 'History', 'Media & Communication'],
    deliverables: ['Digital story archive', '10-minute documentary', 'Community exhibition'],
    milestones: ['Month 1: Interviews', 'Month 2: Archive', 'Month 3: Documentary', 'Month 4: Exhibition'],
  },
  {
    id: 'm4', title: 'AI Study Assistant for Students', category: 'Education',
    problem: 'Students struggling with subjects often can\'t afford private tutoring. Many fall behind without support.',
    background: 'The tutoring industry is worth €100B globally. Most students rely on Google or YouTube with inconsistent results. An AI assistant could democratise access to quality academic help.',
    objectives: ['Define core features', 'Build MVP', 'Test with 50 students'],
    requiredSkills: ['Programming', 'UI/UX', 'Machine Learning Concepts', 'Research', 'Education'],
    teamSize: 6, difficulty: 'Hard', status: 'In Progress',
    relatedSubjects: ['Computer Science', 'Education', 'Psychology'],
    deliverables: ['Working AI assistant', 'User research report', 'Improvement roadmap'],
    milestones: ['Month 1: Research', 'Month 2: Design', 'Month 3-4: Build', 'Month 5: Test'],
  },
  {
    id: 'm5', title: 'Youth Entrepreneurship Fair', category: 'Education',
    problem: 'Young entrepreneurs in the community have no platform to present their ideas and find mentors or investors.',
    background: 'Most startup competitions are for adults. Young entrepreneurs need support, exposure, and connections. A youth-focused event could ignite a generation of entrepreneurs.',
    objectives: ['Organise a 50-person fair', 'Attract 5 mentors/judges', 'Create a recurring annual event'],
    requiredSkills: ['Leadership', 'Communication', 'Marketing', 'Project Management', 'Entrepreneurship'],
    teamSize: 5, difficulty: 'Medium', status: 'Open',
    relatedSubjects: ['Business', 'Entrepreneurship', 'Economics'],
    deliverables: ['Event plan', 'Marketing materials', 'Mentor recruitment', 'Post-event report'],
    milestones: ['Week 1-2: Planning', 'Week 3-4: Promotion', 'Week 5: Event', 'Week 6: Report'],
  },
  {
    id: 'm6', title: 'Accessible Digital Tools for Students with Disabilities', category: 'Accessibility',
    problem: 'Many educational digital tools are not accessible to students with visual, hearing, or motor disabilities.',
    background: '15% of the world\'s population has some form of disability. Most ed-tech apps fail basic accessibility standards. Inclusive design benefits all users.',
    objectives: ['Audit 10 popular ed-tech tools', 'Build accessibility guidelines', 'Create an accessible tool prototype'],
    requiredSkills: ['Design', 'UI/UX', 'Research', 'Programming', 'Communication'],
    teamSize: 4, difficulty: 'Medium', status: 'Recruiting',
    relatedSubjects: ['Design', 'Computer Science', 'Psychology'],
    deliverables: ['Accessibility audit report', 'Design guidelines', 'Prototype tool'],
    milestones: ['Month 1: Audit', 'Month 2: Guidelines', 'Month 3-4: Prototype'],
  },
];

export const TEAMS: Team[] = [
  {
    id: 't1', name: 'GreenByte', members: ['s2', 's3', 's7', 's10'],
    skills: ['Programming', 'Data Analysis', 'Design', 'Entrepreneurship'],
    missionId: 'm2', roles: { 's2': 'Developer', 's3': 'Project Lead', 's7': 'Analyst', 's10': 'Designer' },
    progress: 65, projectId: 'p1',
  },
  {
    id: 't2', name: 'StoryKeepers', members: ['s5', 's14', 's18', 's22'],
    skills: ['Storytelling', 'Writing', 'Photography', 'Communication'],
    missionId: 'm3', roles: { 's5': 'Lead Storyteller', 's14': 'Writer', 's18': 'Illustrator', 's22': 'Community Manager' },
    progress: 40, projectId: 'p2',
  },
  {
    id: 't3', name: 'MindBridge', members: ['s6', 's10', 's13', 's15'],
    skills: ['Web Development', 'UI/UX', 'Machine Learning', 'Data Analysis'],
    missionId: 'm4', roles: { 's6': 'Lead Developer', 's10': 'Designer', 's13': 'Security', 's15': 'ML Engineer' },
    progress: 80, projectId: 'p3',
  },
  {
    id: 't4', name: 'VentureYouth', members: ['s3', 's9', 's12', 's19', 's21'],
    skills: ['Leadership', 'Marketing', 'Entrepreneurship', 'Communication', 'Creativity'],
    missionId: 'm5', roles: { 's3': 'Event Director', 's9': 'Partnerships', 's12': 'Social Media', 's19': 'Finance', 's21': 'Entertainment' },
    progress: 25, projectId: 'p4',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1', name: 'HyperLocal Weather Platform', teamId: 't1', missionId: 'm2',
    problem: 'Fishermen need accurate local forecasts, not region-wide averages.',
    solution: 'A web app using local sensor data + ML to generate hyperlocal 48-hour forecasts, displayed on a simple, mobile-friendly interface.',
    progress: 65, status: 'In Progress',
    milestones: [
      { title: 'Data collection system', completed: true },
      { title: 'Forecast algorithm', completed: true },
      { title: 'Frontend interface', completed: false },
      { title: 'User testing with fishermen', completed: false },
      { title: 'Public launch', completed: false },
    ],
    skillsUsed: ['Programming', 'Data Analysis', 'UI/UX', 'Research'],
  },
  {
    id: 'p2', name: 'Voices of Our Village', teamId: 't2', missionId: 'm3',
    problem: 'Elder community members\' stories are disappearing.',
    solution: 'A digital archive and short documentary series collecting and preserving community stories for future generations.',
    progress: 40, status: 'In Progress',
    milestones: [
      { title: 'Interview planning & ethics', completed: true },
      { title: '10 interviews recorded', completed: true },
      { title: 'Digital archive built', completed: false },
      { title: 'Documentary edit complete', completed: false },
      { title: 'Community screening', completed: false },
    ],
    skillsUsed: ['Storytelling', 'Writing', 'Photography', 'Communication'],
  },
  {
    id: 'p3', name: 'StudyMind AI Assistant', teamId: 't3', missionId: 'm4',
    problem: 'Students can\'t afford tutoring and inconsistently find quality help online.',
    solution: 'An AI-powered study assistant that explains concepts, generates practice questions, and adapts to each student\'s learning pace.',
    progress: 80, status: 'Testing',
    milestones: [
      { title: 'User research', completed: true },
      { title: 'Core AI integration', completed: true },
      { title: 'Subject coverage (5 subjects)', completed: true },
      { title: 'User testing (50 students)', completed: true },
      { title: 'Public beta launch', completed: false },
    ],
    skillsUsed: ['Programming', 'UI/UX', 'Machine Learning Concepts', 'Research'],
    result: 'Beta tested with 47 students — 92% reported improved understanding in tested subjects.',
  },
  {
    id: 'p4', name: 'Youth Innovation Fair 2026', teamId: 't4', missionId: 'm5',
    problem: 'Young entrepreneurs have no platform to present ideas and meet mentors.',
    solution: 'A full-day event with 15 student startups, 8 mentor panels, networking sessions, and a €500 prize pool.',
    progress: 25, status: 'Planning',
    milestones: [
      { title: 'Venue secured', completed: true },
      { title: 'Mentor recruitment', completed: false },
      { title: 'Participant applications open', completed: false },
      { title: 'Marketing campaign', completed: false },
      { title: 'Event day', completed: false },
    ],
    skillsUsed: ['Leadership', 'Marketing', 'Project Management', 'Communication'],
  },
];

export const REWARDS: Reward[] = [
  { id: 'r1', name: 'Premium Lesson Access', description: 'Get 5 free premium lessons of your choice from any category in the library.', creditsRequired: 50, category: 'Educational Resources', available: true },
  { id: 'r2', name: 'Study Stationery Bundle', description: 'A bundle of quality study stationery including notebooks, pens, and organisers. DEMO REWARD.', creditsRequired: 80, category: 'Learning Materials', available: true },
  { id: 'r3', name: 'Online Course Voucher', description: 'Voucher for one external online course platform. DEMO REWARD.', creditsRequired: 120, category: 'Educational Resources', available: true },
  { id: 'r4', name: 'Studling Premium Badge', description: 'Exclusive premium badge displayed on your profile and Skill Passport.', creditsRequired: 30, category: 'Digital Rewards', available: true },
  { id: 'r5', name: 'Workshop Ticket', description: 'Access to one exclusive student workshop or webinar event. DEMO REWARD.', creditsRequired: 100, category: 'Student Events', available: true },
  { id: 'r6', name: 'Study Buddy Session', description: 'A 1-hour guided study session with a top-rated student teacher.', creditsRequired: 60, category: 'Educational Resources', available: true },
  { id: 'r7', name: 'Studling Hoodie', description: 'Exclusive Studling branded hoodie in your size. Limited edition. DEMO REWARD.', creditsRequired: 200, category: 'Merchandise', available: true },
  { id: 'r8', name: 'Ebook Collection', description: '10 curated ebooks covering entrepreneurship, science, and personal development. DEMO REWARD.', creditsRequired: 45, category: 'Learning Materials', available: true },
  { id: 'r9', name: 'Skill Passport Highlight', description: 'Feature your Skill Passport on Studling\'s community showcase for 30 days.', creditsRequired: 40, category: 'Digital Rewards', available: true },
  { id: 'r10', name: 'Mentorship Session', description: '30-minute virtual mentorship session with a Studling community mentor. DEMO REWARD.', creditsRequired: 150, category: 'Student Events', available: true },
];

export const SUBJECTS = [
  { id: 'sub1', name: 'Mathematics', icon: '📐', color: 'bg-blue-100 text-blue-800', lessons: 4, challenges: 2, missions: 2 },
  { id: 'sub2', name: 'Physics', icon: '⚛️', color: 'bg-purple-100 text-purple-800', lessons: 2, challenges: 1, missions: 1 },
  { id: 'sub3', name: 'Chemistry', icon: '🧪', color: 'bg-green-100 text-green-800', lessons: 1, challenges: 1, missions: 1 },
  { id: 'sub4', name: 'Biology', icon: '🔬', color: 'bg-emerald-100 text-emerald-800', lessons: 2, challenges: 1, missions: 2 },
  { id: 'sub5', name: 'Computer Science', icon: '💻', color: 'bg-gray-100 text-gray-800', lessons: 5, challenges: 3, missions: 3 },
  { id: 'sub6', name: 'English', icon: '📝', color: 'bg-yellow-100 text-yellow-800', lessons: 2, challenges: 1, missions: 1 },
  { id: 'sub7', name: 'Greek', icon: '🏛️', color: 'bg-blue-100 text-blue-800', lessons: 1, challenges: 0, missions: 0 },
  { id: 'sub8', name: 'History', icon: '🏺', color: 'bg-amber-100 text-amber-800', lessons: 1, challenges: 1, missions: 1 },
  { id: 'sub9', name: 'Geography', icon: '🌍', color: 'bg-teal-100 text-teal-800', lessons: 1, challenges: 0, missions: 2 },
  { id: 'sub10', name: 'Economics', icon: '📊', color: 'bg-indigo-100 text-indigo-800', lessons: 2, challenges: 1, missions: 2 },
  { id: 'sub11', name: 'Business', icon: '💼', color: 'bg-orange-100 text-orange-800', lessons: 3, challenges: 2, missions: 2 },
  { id: 'sub12', name: 'Entrepreneurship', icon: '🚀', color: 'bg-red-100 text-red-800', lessons: 2, challenges: 1, missions: 2 },
  { id: 'sub13', name: 'Art', icon: '🎨', color: 'bg-pink-100 text-pink-800', lessons: 2, challenges: 1, missions: 1 },
  { id: 'sub14', name: 'Design', icon: '✏️', color: 'bg-violet-100 text-violet-800', lessons: 3, challenges: 1, missions: 2 },
  { id: 'sub15', name: 'Music', icon: '🎵', color: 'bg-cyan-100 text-cyan-800', lessons: 1, challenges: 0, missions: 1 },
  { id: 'sub16', name: 'Literature', icon: '📚', color: 'bg-rose-100 text-rose-800', lessons: 2, challenges: 1, missions: 1 },
  { id: 'sub17', name: 'Psychology', icon: '🧠', color: 'bg-fuchsia-100 text-fuchsia-800', lessons: 2, challenges: 1, missions: 2 },
  { id: 'sub18', name: 'Environmental Science', icon: '🌿', color: 'bg-green-100 text-green-800', lessons: 1, challenges: 1, missions: 2 },
  { id: 'sub19', name: 'Media & Communication', icon: '📡', color: 'bg-sky-100 text-sky-800', lessons: 1, challenges: 1, missions: 1 },
  { id: 'sub20', name: 'Philosophy', icon: '🤔', color: 'bg-stone-100 text-stone-800', lessons: 1, challenges: 1, missions: 1 },
];

export const SKILLS_CATALOG = [
  { name: 'Problem Solving', description: 'Identify, analyse, and solve complex problems systematically.', lessons: ['l1', 'l7', 'l9'], challenges: ['c1', 'c10'] },
  { name: 'Critical Thinking', description: 'Evaluate information, arguments, and evidence objectively.', lessons: ['l19', 'l21'], challenges: ['c1', 'c17'] },
  { name: 'Creativity', description: 'Generate original ideas and think outside conventional boundaries.', lessons: ['l27', 'l30'], challenges: ['c12', 'c18'] },
  { name: 'Communication', description: 'Express ideas clearly in writing, speech, and visuals.', lessons: ['l23', 'l19'], challenges: ['c5', 'c7'] },
  { name: 'Research', description: 'Find, evaluate, and synthesise information from multiple sources.', lessons: ['l21', 'l22'], challenges: ['c4', 'c13'] },
  { name: 'Writing', description: 'Write with clarity, purpose, and audience awareness.', lessons: ['l19', 'l27'], challenges: ['c5', 'c18'] },
  { name: 'Public Speaking', description: 'Deliver compelling speeches and presentations with confidence.', lessons: ['l23', 'l15'], challenges: ['c6'] },
  { name: 'Leadership', description: 'Guide and inspire teams toward shared goals.', lessons: ['l29', 'l25'], challenges: ['c8', 'c15'] },
  { name: 'Teamwork', description: 'Collaborate effectively within diverse teams.', lessons: ['l29', 'l25'], challenges: ['c15'] },
  { name: 'Programming', description: 'Write functional code in one or more programming languages.', lessons: ['l5', 'l7', 'l8'], challenges: ['c9', 'c16'] },
  { name: 'Data Analysis', description: 'Collect, process, and interpret data to draw insights.', lessons: ['l3', 'l26'], challenges: ['c3', 'c13'] },
  { name: 'Design', description: 'Create visual and interactive solutions that solve user problems.', lessons: ['l16', 'l17', 'l18'], challenges: ['c2'] },
  { name: 'Mathematics', description: 'Apply mathematical reasoning to solve quantitative problems.', lessons: ['l1', 'l2', 'l3', 'l4'], challenges: ['c11', 'c19'] },
  { name: 'Entrepreneurship', description: 'Identify opportunities and build solutions with commercial value.', lessons: ['l12', 'l13', 'l14', 'l15'], challenges: ['c6', 'c13'] },
  { name: 'Digital Literacy', description: 'Navigate digital tools, media, and online environments confidently.', lessons: ['l6', 'l8'], challenges: ['c20'] },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'mission', title: 'New Mission Match!', body: 'You\'ve been matched to "Reduce School Food Waste" based on your Research and Data Analysis skills.', time: '2 min ago', read: false },
  { id: 'n2', type: 'challenge', title: 'Challenge Completed 🎯', body: 'You completed the Logic Puzzle Sprint and earned Critical Thinking evidence for your Skill Passport.', time: '1 hour ago', read: false },
  { id: 'n3', type: 'credits', title: 'Credits Earned! 💰', body: 'You earned 15 Credits for completing the Python for Beginners lesson.', time: '2 hours ago', read: false },
  { id: 'n4', type: 'team', title: 'Team Update', body: 'GreenByte team reached 65% progress on the HyperLocal Weather Platform project!', time: '3 hours ago', read: true },
  { id: 'n5', type: 'match', title: 'New Student Match 🤝', body: 'Mia Johansson from Finland could be a great complementary teammate. Her UI/UX skills match your Research profile.', time: '5 hours ago', read: true },
  { id: 'n6', type: 'passport', title: 'Skill Passport Updated ✅', body: 'Your Skill Passport now shows Evidence for "Critical Thinking – Advanced" based on 3 completed challenges.', time: '1 day ago', read: true },
  { id: 'n7', type: 'lesson', title: 'Lesson Recommended', body: 'Based on your interest in Mathematics, we recommend "Calculus: Limits and Derivatives".', time: '1 day ago', read: true },
  { id: 'n8', type: 'credits', title: 'Reward Available!', body: 'You have enough Credits to redeem the "Premium Lesson Access" reward. Check it out!', time: '2 days ago', read: true },
];

export const DEMO_SKILL_EVIDENCE: SkillEvidence[] = [
  { skillName: 'Critical Thinking', level: 'Advanced', evidenceType: 'Challenge', description: 'Scored 3/3 on Logic Puzzle Sprint under time pressure.', date: '2026-09-10', source: 'Logic Puzzle Sprint Challenge' },
  { skillName: 'Mathematics', level: 'Expert', evidenceType: 'Lesson', description: 'Completed Quadratic Equations lesson with perfect activity score.', date: '2026-09-08', source: 'Quadratic Equations Lesson' },
  { skillName: 'Research', level: 'Intermediate', evidenceType: 'Challenge', description: 'Wrote a precise 3-sentence summary of a complex research article.', date: '2026-09-05', source: 'Research Summary Challenge' },
  { skillName: 'Communication', level: 'Intermediate', evidenceType: 'Mission', description: 'Presented team findings in Mission 1 to a group of 12 students.', date: '2026-09-01', source: 'Reduce School Food Waste Mission' },
  { skillName: 'Problem Solving', level: 'Advanced', evidenceType: 'Challenge', description: 'Solved 3/3 debugging challenges in the Code Challenge with creative approaches.', date: '2026-08-28', source: 'Code Debugging Challenge' },
];

export const CREDITS_HISTORY = [
  { id: 'h1', date: '2026-09-10', activity: 'Completed Logic Puzzle Sprint Challenge', amount: +15, balance: 285 },
  { id: 'h2', date: '2026-09-08', activity: 'Completed Quadratic Equations Lesson', amount: +10, balance: 270 },
  { id: 'h3', date: '2026-09-05', activity: 'Completed Research Summary Challenge', amount: +8, balance: 260 },
  { id: 'h4', date: '2026-09-01', activity: 'Contributed to Mission: Reduce School Food Waste', amount: +25, balance: 252 },
  { id: 'h5', date: '2026-08-28', activity: 'Completed Code Debugging Challenge', amount: +15, balance: 227 },
  { id: 'h6', date: '2026-08-22', activity: 'Completed Introduction to Algebra Lesson', amount: +10, balance: 212 },
  { id: 'h7', date: '2026-08-18', activity: 'Welcome Bonus', amount: +50, balance: 202 },
  { id: 'h8', date: '2026-08-14', activity: 'Joined Studling Community', amount: +5, balance: 5 },
];

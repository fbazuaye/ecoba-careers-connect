// Mock data for ECOBA Careers

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote: boolean;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  postedAt: string;
  deadline: string;
  employerId: string;
  applicationsCount: number;
  featured?: boolean;
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  bio: string;
  set: string;
  year: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  available: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Employer {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description: string;
  contactEmail: string;
  verified: boolean;
}

export const jobCategories = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Engineering',
  'Legal',
  'Marketing',
  'Sales',
  'Human Resources',
  'Operations',
  'Consulting',
  'Real Estate',
  'Media & Communications',
  'Government',
  'Non-Profit',
  'Other',
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechVentures Nigeria',
    location: 'Lagos, Nigeria',
    type: 'full-time',
    remote: true,
    salary: '₦8,000,000 - ₦12,000,000',
    description: 'We are looking for a passionate Senior Software Engineer to join our growing team. You will be responsible for developing high-quality applications and leading technical projects.',
    requirements: [
      '5+ years of software development experience',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with cloud services (AWS/GCP)',
      'Strong problem-solving skills',
      'Excellent communication abilities',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget',
    ],
    category: 'Technology',
    postedAt: '2024-01-15',
    deadline: '2024-02-28',
    employerId: 'emp1',
    applicationsCount: 24,
    featured: true,
  },
  {
    id: '2',
    title: 'Investment Banking Analyst',
    company: 'First Heritage Bank',
    location: 'Benin City, Nigeria',
    type: 'full-time',
    remote: false,
    salary: '₦5,000,000 - ₦7,500,000',
    description: 'Join our investment banking team to work on high-profile M&A transactions and capital raising activities across Nigeria.',
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      '2-4 years experience in investment banking or corporate finance',
      'Strong financial modeling skills',
      'Excellent analytical abilities',
      'CFA certification preferred',
    ],
    benefits: [
      'Performance bonuses',
      'Career advancement opportunities',
      'Training programs',
      'Health and life insurance',
    ],
    category: 'Finance & Banking',
    postedAt: '2024-01-18',
    deadline: '2024-02-20',
    employerId: 'emp2',
    applicationsCount: 18,
    featured: true,
  },
  {
    id: '3',
    title: 'Medical Officer',
    company: 'Edo State General Hospital',
    location: 'Benin City, Nigeria',
    type: 'full-time',
    remote: false,
    salary: '₦3,500,000 - ₦5,000,000',
    description: 'We are seeking a dedicated Medical Officer to provide quality healthcare services to our patients.',
    requirements: [
      'MBBS degree from a recognized institution',
      'Valid medical license',
      '2+ years clinical experience',
      'Strong patient care skills',
    ],
    benefits: [
      'Government pension scheme',
      'Housing allowance',
      'Continuous medical education',
    ],
    category: 'Healthcare',
    postedAt: '2024-01-20',
    deadline: '2024-03-15',
    employerId: 'emp3',
    applicationsCount: 12,
  },
  {
    id: '4',
    title: 'Legal Counsel',
    company: 'Ogbeifun & Associates',
    location: 'Lagos, Nigeria',
    type: 'full-time',
    remote: true,
    salary: '₦6,000,000 - ₦9,000,000',
    description: 'Join our prestigious law firm as Legal Counsel specializing in corporate law and commercial transactions.',
    requirements: [
      'LLB and BL qualifications',
      '5+ years experience in corporate law',
      'Strong drafting and negotiation skills',
      'Experience with cross-border transactions',
    ],
    benefits: [
      'Partnership track',
      'Professional development',
      'Flexible working arrangements',
      'Performance bonuses',
    ],
    category: 'Legal',
    postedAt: '2024-01-22',
    deadline: '2024-02-25',
    employerId: 'emp4',
    applicationsCount: 8,
    featured: true,
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'Benin Creative Agency',
    location: 'Benin City, Nigeria',
    type: 'full-time',
    remote: true,
    salary: '₦4,000,000 - ₦6,000,000',
    description: 'Lead our marketing team in developing and executing innovative marketing strategies for our diverse client portfolio.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '4+ years marketing experience',
      'Digital marketing expertise',
      'Team leadership experience',
      'Creative problem-solving abilities',
    ],
    benefits: [
      'Creative work environment',
      'Flexible hours',
      'Performance bonuses',
      'Health insurance',
    ],
    category: 'Marketing',
    postedAt: '2024-01-25',
    deadline: '2024-03-01',
    employerId: 'emp5',
    applicationsCount: 15,
  },
  {
    id: '6',
    title: 'Civil Engineer (Contract)',
    company: 'BuildRight Construction',
    location: 'Abuja, Nigeria',
    type: 'contract',
    remote: false,
    salary: '₦7,000,000 - ₦10,000,000',
    description: 'Contract position for a Civil Engineer to oversee major infrastructure projects in the Federal Capital Territory.',
    requirements: [
      'B.Eng in Civil Engineering',
      'COREN registration',
      '6+ years experience in infrastructure projects',
      'Project management certification preferred',
    ],
    benefits: [
      'Contract completion bonus',
      'Accommodation provided',
      'Transportation allowance',
    ],
    category: 'Engineering',
    postedAt: '2024-01-28',
    deadline: '2024-02-15',
    employerId: 'emp6',
    applicationsCount: 6,
  },
];

export const mockMembers: Member[] = [
  {
    id: 'm1',
    name: 'Osaze Okundaye',
    title: 'Senior Software Engineer',
    bio: 'Passionate about building scalable software solutions. Proud Edo College alumnus (Set 2005) with 10+ years in tech.',
    set: 'Set 2005',
    year: '2005',
    location: 'Lagos, Nigeria',
    email: 'osaze.o@email.com',
    linkedin: 'linkedin.com/in/osaze-o',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript'],
    experience: [
      {
        id: 'e1',
        title: 'Senior Software Engineer',
        company: 'TechVentures Nigeria',
        location: 'Lagos',
        startDate: '2020-03',
        current: true,
        description: 'Leading development of enterprise solutions',
      },
    ],
    education: [
      {
        id: 'ed1',
        school: 'University of Benin',
        degree: 'B.Sc',
        field: 'Computer Science',
        startYear: '2006',
        endYear: '2010',
      },
    ],
    available: true,
  },
  {
    id: 'm2',
    name: 'Ehimare Igbinedion',
    title: 'Investment Banker',
    bio: 'Finance professional with expertise in M&A and capital markets. Edo College Set 2003.',
    set: 'Set 2003',
    year: '2003',
    location: 'Benin City, Nigeria',
    email: 'ehimare.i@email.com',
    skills: ['Financial Modeling', 'Valuation', 'M&A', 'Capital Markets'],
    experience: [
      {
        id: 'e2',
        title: 'Associate Director',
        company: 'First Heritage Bank',
        location: 'Benin City',
        startDate: '2018-06',
        current: true,
        description: 'Leading investment banking transactions',
      },
    ],
    education: [
      {
        id: 'ed2',
        school: 'London School of Economics',
        degree: 'MSc',
        field: 'Finance',
        startYear: '2012',
        endYear: '2013',
      },
    ],
    available: false,
  },
];

export const mockEmployers: Employer[] = [
  {
    id: 'emp1',
    name: 'TechVentures Nigeria',
    industry: 'Technology',
    size: '50-200 employees',
    location: 'Lagos, Nigeria',
    website: 'techventures.ng',
    description: 'Leading technology company focused on digital transformation solutions.',
    contactEmail: 'careers@techventures.ng',
    verified: true,
  },
  {
    id: 'emp2',
    name: 'First Heritage Bank',
    industry: 'Finance & Banking',
    size: '500+ employees',
    location: 'Benin City, Nigeria',
    website: 'firstheritagebank.com',
    description: 'Premier banking institution with a focus on regional development.',
    contactEmail: 'careers@firstheritagebank.com',
    verified: true,
  },
];

export const stats = {
  totalJobs: 156,
  totalMembers: 2847,
  companiesHiring: 89,
  placementsThisYear: 324,
};

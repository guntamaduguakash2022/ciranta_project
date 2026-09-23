/**
 * js/data/coursesData.js
 * Comprehensive Course Catalog Dataset
 * Single source of truth for course details, syllabus, mentors, pricing.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const Courses = [
    {
      id: 'resume-linkedin-essentials',
      slug: 'resume-linkedin-essentials',
      title: 'Resume & LinkedIn Essentials',
      category: 'career',
      categoryLabel: 'Career Advancement',
      duration: '3 weeks',
      weeks: 3,
      level: 'Beginner',
      format: 'Live cohorts + 1-on-1 review',
      price: 2999,
      originalPrice: 4999,
      rating: 4.9,
      reviewsCount: 142,
      badge: 'bestseller',
      badgeLabel: 'Bestseller',
      instructor: {
        name: 'Aarav Sharma',
        role: 'Ex-Lead Recruiter @ Microsoft',
        bio: 'Over 10 years in technical and executive recruiting across FAANG and high-growth startups.'
      },
      nextCohort: 'Starts in 5 days',
      cohortDaysRemaining: 5,
      shortDescription: 'Turn your work history into a story recruiters actually read.',
      fullDescription: 'Craft an ATS-proof resume and an inbound-driving LinkedIn profile. You will receive direct teardowns and line-by-line feedback from top industry recruiters.',
      whatYouLearn: [
        'ATS-proof formatting and keyword positioning',
        'Crafting high-impact bullet points with quantified results',
        'LinkedIn headline and About section optimization for recruiter inbound',
        'Direct 1-on-1 personalized portfolio teardown'
      ],
      syllabus: [
        {
          module: 'Module 1: The Recruiter Mindset & ATS Truths',
          lessons: ['How recruiters scan in 6 seconds', 'Demystifying ATS algorithms', 'Choosing the right format']
        },
        {
          module: 'Module 2: High-Conversion Storytelling',
          lessons: ['Action verbs that actually matter', 'Quantifying impact without confidential data', 'Drafting your core bullets']
        },
        {
          module: 'Module 3: LinkedIn Inbound Funnel',
          lessons: ['Headline and About optimization', 'Strategic networking without being spammy', 'Live resume teardown session']
        }
      ]
    },
    {
      id: 'mastering-interviews',
      slug: 'mastering-interviews',
      title: 'Mastering Interviews',
      category: 'career',
      categoryLabel: 'Career Advancement',
      duration: '2 weeks',
      weeks: 2,
      level: 'All Levels',
      format: 'Live mock interviews & feedback',
      price: 3499,
      originalPrice: 5499,
      rating: 4.8,
      reviewsCount: 98,
      badge: 'hot',
      badgeLabel: 'High Demand',
      instructor: {
        name: 'Rohan Mehra',
        role: 'Senior Engineering Manager',
        bio: 'Hired over 80+ professionals and conducted 400+ technical and behavioral interviews.'
      },
      nextCohort: 'Starts in 8 days',
      cohortDaysRemaining: 8,
      shortDescription: 'Practice with mock interviews and get feedback that sticks.',
      fullDescription: 'Stop dreading the question "Tell me about yourself". Master behavioral, competency, and case questions with recorded mock sessions.',
      whatYouLearn: [
        'Master the STAR method for behavioral questions',
        'Confidently answer curveball and conflict questions',
        'Body language, pacing, and executive presence on camera',
        'Two live 1-on-1 mock interviews with written evaluation rubrics'
      ],
      syllabus: [
        {
          module: 'Module 1: Frameworks for Confident Answers',
          lessons: ['Deconstructing the 10 most common interview questions', 'The STAR+Impact storytelling framework']
        },
        {
          module: 'Module 2: Live Mock Interview Lab',
          lessons: ['Simulated behavioral rounds', 'Handling technical/scenario curves', 'Actionable scorecards and review']
        }
      ]
    },
    {
      id: 'negotiation-offers',
      slug: 'negotiation-offers',
      title: 'Negotiation & Offers',
      category: 'career',
      categoryLabel: 'Career Advancement',
      duration: '2 weeks',
      weeks: 2,
      level: 'Intermediate',
      format: 'Simulations + Script templates',
      price: 2499,
      originalPrice: 3999,
      rating: 4.9,
      reviewsCount: 110,
      badge: 'new',
      badgeLabel: 'New',
      instructor: {
        name: 'Neha Kapoor',
        role: 'Career Strategist & Compensation Advisor',
        bio: 'Helped candidates negotiate an aggregate of $2.4M in compensation bumps.'
      },
      nextCohort: 'Starts in 10 days',
      cohortDaysRemaining: 10,
      shortDescription: 'Know what to ask for and how to ask for it.',
      fullDescription: 'Never leave money on the table again. Learn exact email scripts, negotiation psychology, and how to counter offers without risking them being rescinded.',
      whatYouLearn: [
        'Benchmarking your true market value across industries',
        'Word-for-word counter-offer scripts (email & phone)',
        'Negotiating non-salary perks: equity, joining bonus, WFH flexibility',
        'Handling high-pressure exploding offers calmly'
      ],
      syllabus: [
        {
          module: 'Module 1: Market Value & Total Compensation Breakdown',
          lessons: ['Evaluating Base vs Bonus vs Equity/ESOPs', 'Finding unlisted compensation bands']
        },
        {
          module: 'Module 2: The Art of Countering',
          lessons: ['Verbal negotiation playbooks', 'Crafting the counter-proposal email', 'Live roleplay simulations']
        }
      ]
    },
    {
      id: 'data-driven-hr',
      slug: 'data-driven-hr',
      title: 'Data-Driven HR',
      category: 'hr',
      categoryLabel: 'Strategic HR',
      duration: '5 weeks',
      weeks: 5,
      level: 'Intermediate',
      format: 'Project-based live cohorts',
      price: 4999,
      originalPrice: 7999,
      rating: 4.7,
      reviewsCount: 76,
      badge: 'bestseller',
      badgeLabel: 'Popular',
      instructor: {
        name: 'Sunita Rao',
        role: 'VP of People Analytics',
        bio: '15+ years transforming traditional HR teams into high-performing, metrics-driven units.'
      },
      nextCohort: 'Starts in 14 days',
      cohortDaysRemaining: 14,
      shortDescription: 'Use people-analytics to back up decisions that used to run on instinct.',
      fullDescription: 'Move from intuitive guesswork to data-backed human resource decisions. Learn employee lifecycle metrics, retention models, and executive dashboarding.',
      whatYouLearn: [
        'Calculate eNPS, turnover cost, and attrition risk formulas',
        'Build live HR dashboards in Google Sheets and PowerBI',
        'Translate employee survey data into executive actions',
        'Present people insights directly to C-suite stakeholders'
      ],
      syllabus: [
        {
          module: 'Module 1: Core People Metrics',
          lessons: ['Time-to-hire, Quality-of-hire, Attrition formulas', 'Designing surveys that employees actually fill']
        },
        {
          module: 'Module 2: Predictive Retention Modeling',
          lessons: ['Early warning signals in employee tenure', 'Building simple predictive sheets']
        },
        {
          module: 'Module 3: Executive Reporting',
          lessons: ['Designing the People Dashboard', 'Presenting ROI of culture initiatives to CFOs']
        }
      ]
    },
    {
      id: 'modern-talent-acquisition',
      slug: 'modern-talent-acquisition',
      title: 'Modern Talent Acquisition',
      category: 'hr',
      categoryLabel: 'Strategic HR',
      duration: '4 weeks',
      weeks: 4,
      level: 'Beginner–Intermediate',
      format: 'Case studies + Tool walkthroughs',
      price: 3999,
      originalPrice: 5999,
      rating: 4.8,
      reviewsCount: 84,
      badge: 'new',
      badgeLabel: 'New',
      instructor: {
        name: 'Karan Saxena',
        role: 'Global Talent Lead',
        bio: 'Scaled engineering & product teams across Europe and India for Series B-D startups.'
      },
      nextCohort: 'Starts in 7 days',
      cohortDaysRemaining: 7,
      shortDescription: 'Source and screen for a market that no longer waits for job boards.',
      fullDescription: 'Modern recruitment is outbound marketing. Master boolean sourcing, automated candidate engagement sequences, and bias-free screening loops.',
      whatYouLearn: [
        'Advanced boolean search and passive candidate sourcing',
        'Cold outreach email templates that get 60%+ response rates',
        'Structured interview design to eliminate hiring bias',
        'Employer branding on LinkedIn and Glassdoor'
      ],
      syllabus: [
        {
          module: 'Module 1: Passive Candidate Sourcing',
          lessons: ['Boolean strings for GitHub, LinkedIn, and Dribbble', 'Bypassing noisy job board queues']
        },
        {
          module: 'Module 2: Outbound Outreach Campaigns',
          lessons: ['Writing candidate nurture sequences', 'Tracking conversion rates across pipelines']
        }
      ]
    },
    {
      id: 'managing-people-well',
      slug: 'managing-people-well',
      title: 'Managing People Well',
      category: 'mgmt',
      categoryLabel: 'Business Management',
      duration: '4 weeks',
      weeks: 4,
      level: 'New Managers',
      format: 'Cohort discussions + Peer circles',
      price: 4499,
      originalPrice: 6999,
      rating: 4.9,
      reviewsCount: 164,
      badge: 'bestseller',
      badgeLabel: 'Bestseller',
      instructor: {
        name: 'Vikram Joshi',
        role: 'Director of Product & Engineering',
        bio: 'Managed 50+ engineers and product leads over a 14-year tech journey.'
      },
      nextCohort: 'Starts in 6 days',
      cohortDaysRemaining: 6,
      shortDescription: 'First-time manager skills for hard conversations and real growth.',
      fullDescription: 'Transition smoothly from high-performing individual contributor to respected team leader. Master 1-on-1s, delegation, performance improvement plans, and burnout prevention.',
      whatYouLearn: [
        'How to run weekly 1-on-1s that team members actually look forward to',
        'Radical candor: giving tough feedback without destroying motivation',
        'Delegating tasks without micromanaging or losing quality control',
        'Managing up: keeping directors and VP stakeholders aligned'
      ],
      syllabus: [
        {
          module: 'Module 1: The Transition Mindset',
          lessons: ['From doing to enabling', 'Building psychological safety in your squad']
        },
        {
          module: 'Module 2: Crucial Conversations',
          lessons: ['Framework for delivering critical performance feedback', 'Addressing underperformance early']
        },
        {
          module: 'Module 3: Delegation and Scaling',
          lessons: ['The 5 levels of delegation', 'Running async reviews and team rituals']
        }
      ]
    },
    {
      id: 'agile-project-leadership',
      slug: 'agile-project-leadership',
      title: 'Agile Project Leadership',
      category: 'mgmt',
      categoryLabel: 'Business Management',
      duration: '6 weeks',
      weeks: 6,
      level: 'Intermediate',
      format: 'Simulations with Jira & Notion',
      price: 5499,
      originalPrice: 8499,
      rating: 4.8,
      reviewsCount: 92,
      badge: 'hot',
      badgeLabel: 'Popular',
      instructor: {
        name: 'Pooja Verma',
        role: 'Agile Coach & Certified Scrum Master',
        bio: 'Coached over 20 enterprise engineering squads into high-velocity delivery rhythms.'
      },
      nextCohort: 'Starts in 11 days',
      cohortDaysRemaining: 11,
      shortDescription: 'Run projects that ship, with a team that stays sane.',
      fullDescription: 'Cut out ceremonial fluff. Learn how modern tech companies run sprints, backlog grooming, risk matrices, and unblock cross-functional dependencies without endless meetings.',
      whatYouLearn: [
        'Pragmatic Scrum and Kanban setups in Jira / Linear',
        'Sprint planning and estimation without pointless story-point debates',
        'Identifying and eliminating team delivery bottlenecks',
        'Post-mortems and blameless retrospective facilitation'
      ],
      syllabus: [
        {
          module: 'Module 1: Practical Agile Fundamentals',
          lessons: ['Scrum vs Kanban: when to pick which', 'Setting up realistic sprint boards']
        },
        {
          module: 'Module 2: Backlog Grooming & Scoping',
          lessons: ['User story slicing techniques', 'Preventing scope creep during active sprints']
        },
        {
          module: 'Module 3: Retrospectives & continuous improvement',
          lessons: ['Facilitating honest retrospectives', 'Actionable tracking for team velocity']
        }
      ]
    },
    {
      id: 'content-strategy-that-converts',
      slug: 'content-strategy-that-converts',
      title: 'Content Strategy That Converts',
      category: 'marketing',
      categoryLabel: 'Digital Marketing',
      duration: '6 weeks',
      weeks: 6,
      level: 'All Levels',
      format: 'Live workshops + Content teardowns',
      price: 4299,
      originalPrice: 6499,
      rating: 4.8,
      reviewsCount: 118,
      badge: 'bestseller',
      badgeLabel: 'Bestseller',
      instructor: {
        name: 'Ananya Deshmukh',
        role: 'Head of Growth Content',
        bio: 'Scaled organic pipeline from 0 to 500k monthly pageviews for B2B SaaS firms.'
      },
      nextCohort: 'Starts in 9 days',
      cohortDaysRemaining: 9,
      shortDescription: 'Plan, write, and measure content across every channel.',
      fullDescription: 'Stop creating content into the void. Build a repeatable editorial engine that attracts high-intent prospects, builds domain authority, and directly drives revenue.',
      whatYouLearn: [
        'Top-of-funnel vs bottom-of-funnel customer journey mapping',
        'High-converting SEO pillar pages and content clusters',
        'Repurposing 1 core asset into 10 multi-channel touchpoints',
        'Measuring organic attribution and lead conversion in GA4'
      ],
      syllabus: [
        {
          module: 'Module 1: Audience & Competitor Research',
          lessons: ['Finding unmet search queries', 'Customer interview frameworks for content ideas']
        },
        {
          module: 'Module 2: Content Production Engine',
          lessons: ['Writing hooks that retain readers', 'The B2B SaaS conversion copywriting playbook']
        },
        {
          module: 'Module 3: Distribution & Metrics',
          lessons: ['Distribution checklists', 'Evaluating pipeline ROI from organic content']
        }
      ]
    },
    {
      id: 'performance-analytics',
      slug: 'performance-analytics',
      title: 'Performance Analytics',
      category: 'marketing',
      categoryLabel: 'Digital Marketing',
      duration: '4 weeks',
      weeks: 4,
      level: 'Intermediate',
      format: 'Live dashboards & Ad audit sessions',
      price: 4799,
      originalPrice: 7299,
      rating: 4.9,
      reviewsCount: 88,
      badge: 'hot',
      badgeLabel: 'Featured',
      instructor: {
        name: 'Siddharth Nair',
        role: 'Growth Marketing Director',
        bio: 'Managed over $15M in paid acquisition ad spend across Meta, Google, and LinkedIn.'
      },
      nextCohort: 'Starts in 12 days',
      cohortDaysRemaining: 12,
      shortDescription: "Read the numbers that actually predict what's working.",
      fullDescription: 'Go beyond vanity clicks and impressions. Master ROAS, CAC/LTV, blended payback periods, UTM tracking taxonomy, and attribution modeling across paid media channels.',
      whatYouLearn: [
        'Setting up rock-solid UTM tracking and GA4 conversion events',
        'Interpreting Meta and Google Ads performance dashboards',
        'Building cohort retention curves and CAC payback tables',
        'A/B test design and statistical significance calculations'
      ],
      syllabus: [
        {
          module: 'Module 1: Tracking Foundations',
          lessons: ['UTM taxonomy best practices', 'GA4 event architecture and conversion triggers']
        },
        {
          module: 'Module 2: Unit Economics & Ad Efficiency',
          lessons: ['Calculating true CAC vs blended CAC', 'Attribution models and multi-touch reality']
        }
      ]
    },
    {
      id: 'applied-data-analysis',
      slug: 'applied-data-analysis',
      title: 'Applied Data Analysis',
      category: 'career',
      categoryLabel: 'Data & Analytics',
      duration: '8 weeks',
      weeks: 8,
      level: 'Beginner–Intermediate',
      format: 'Live + project-based',
      price: 6999,
      originalPrice: 9999,
      rating: 5.0,
      reviewsCount: 205,
      badge: 'bestseller',
      badgeLabel: 'Flagship Cohort',
      instructor: {
        name: 'Donna Park',
        role: 'Platform Analytics Lead',
        bio: 'Donna leads platform analytics at a mid-size fintech company and has mentored over 200 students through Ciranta\'s data track.'
      },
      nextCohort: 'Starts in 12 days',
      cohortDaysRemaining: 12,
      shortDescription: 'Clean, model, and present real datasets from week one — leave with a portfolio piece, not just a badge.',
      fullDescription: 'Clean, model, and present real datasets from week one — you\'ll leave with a portfolio-ready analysis, not just a certificate.',
      whatYouLearn: [
        'Clean and structure messy real-world datasets',
        'Build and interpret statistical models',
        'Present findings clearly to non-technical stakeholders',
        'Ship a full analysis project for your portfolio'
      ],
      syllabus: [
        {
          module: 'Module 1: Wrangling & Cleaning Raw Data',
          lessons: ['Handling nulls, duplicates, and skewed distributions', 'SQL basics for querying analytical warehouses']
        },
        {
          module: 'Module 2: Exploratory Data Analysis & Statistics',
          lessons: ['Summary statistics and distributions', 'Correlation vs causation pitfalls']
        },
        {
          module: 'Module 3: Data Storytelling & Dashboarding',
          lessons: ['Creating charts executives actually read', 'Final Capstone Project defense']
        }
      ]
    }
  ];

  app.CoursesData = Courses;
})(window.Ciranta);

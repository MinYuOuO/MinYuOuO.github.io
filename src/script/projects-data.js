const projectsData = [
    {
        id: 'prms-fyp',
        title: 'Postgraduate Research Progress Monitoring System',
        type: 'Full-Stack / FYP',
        category: 'WEB_SYSTEMS',
        stack: ['Laravel', 'PHP', 'Redis', 'MySQL', 'SDLC'],
        shortDesc: 'A dedicated web platform to streamline and monitor postgraduate research milestones and progress.',
        media: { type: 'images', content: ['./src/assets/docs/FinalYearProject/FYP PPT.pdf'] },
        introduction: 'A dedicated web platform engineered to solve communication gaps and administrative inefficiencies in higher education research management by streamlining the monitoring of postgraduate research milestones.',
        details: {
            overview: 'Developed as a Final Year Project, this system addresses the complexities of academic research tracking. It enforces strict institutional workflows and provides transparent oversight for students, supervisors, and administrative stakeholders.',
            features: [
                'Progress Tracking Dashboards: Real-time visualization of research milestones and completion status.',
                'Milestone Submission Workflows: Structured pathways for thesis drafts, progress reports, and supervisor approvals.',
                'Stakeholder Communication: Centralized communication channels to ensure all parties are aligned on research goals.',
                'Secure Record Management: Persistent storage of academic history and administrative documents.'
            ],
            responsibilities: [
                'Lead Developer: Engineered the core system using Laravel (PHP) and integrated Redis for performance optimization.',
                'System Architect: Designed the normalized relational database schema and mapped the complete SDLC for the project.',
                'Backend Engineer: Implemented secure authentication, role-based access control, and automated notification systems.'
            ],
            challenges: [
                'Administrative Workflow Modeling: Translating complex, often non-linear academic processes into a digital system.',
                'Stakeholder Alignment: Ensuring the interface meets the differing needs of tech-savvy students and busy supervisors.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'pdf', title: 'Presentation Slides (FYP PPT)', url: './src/assets/docs/FinalYearProject/FYP PPT.pdf' }
        ],
        link: ''
    },
    {
        id: 'jiuxi-mindscape',
        title: 'JiuXi — Voice-Enabled AI Interface',
        type: 'AI Service',
        category: 'AI_DATA',
        stack: ['JavaScript', 'HTML5', 'CSS3', 'AI / LLM', 'Voice / AI', 'iFLYTEK'],
        shortDesc: 'Multilingual voice interface for cultural tourism information, supporting real-time conversational guidance.',
        media: { type: 'images', content: ['./src/assets/docs/JiuXi/JiuXiDashboard.png'] },
        introduction: 'JiuXi is a voice-enabled interface designed for exhibition environments. The system provides multilingual conversational guidance through an animated avatar, integrating speech recognition and LLM services.',
        details: {
            overview: 'Developed as part of the Raffles Graduation Show 2025 (Nanao IP project), this system emphasizes resilience and ease of deployment, enabling on-site demonstrations even in low-connectivity environments.',
            features: [
                'Voice-enabled Conversation UX: Supports push-to-talk voice interaction using ASR with real-time feedback.',
                'Multilingual Support: Designed for Chinese, English, and Malay cultural narration scenarios.',
                'LLM-agnostic Architecture: Connects to any compatible REST-based LLM endpoint.',
                'Offline & Demo Mode: Mock Mode enables zero-credential demonstrations for exhibitions.',
                'Animated Avatar Feedback: Visual states (idle, listening, thinking, speaking) provide conversational cues.'
            ],
            responsibilities: [
                'Core System Developer: Designed the frontend SPA architecture and managed asynchronous voice/LLM interactions.',
                'Voice & AI Integration: Integrated ASR, TTS, and configurable LLM REST APIs into a unified pipeline.',
                'Offline Strategy: Implemented Mock Mode and local configuration persistence for low-connectivity environments.'
            ],
            challenges: [
                'Voice Reliability: Addressed inconsistent microphone behavior across browsers by implementing provider fallbacks.',
                'Asynchronous State Management: Coordinated ASR, LLM inference, and TTS playback states without a framework.'
            ]
        },
        showcase: [
            { type: 'info', url: 'https://raffles-university.edu.my/first-draft-%C2%B7-raffles-graduation-show-2025/' },
            { type: 'info', url: 'https://kancilawards.com/student-winners/entry/2025/8590' }
        ],
        artifacts: [
            { type: 'md', title: 'Technical Documentation (README)', url: './src/assets/docs/JiuXi/README.md' },
            { type: 'image', title: 'System Flowchart', url: './src/assets/docs/JiuXi/flowchart.png' },
            { type: 'image', title: 'Operational Logic Diagram', url: './src/assets/docs/JiuXi/Diagrams-Working-EN.png' },
            { type: 'image', title: 'Full System Architecture', url: './src/assets/docs/JiuXi/Diagrams-Full-EN.png' },
            { type: 'image', title: 'Dashboard UI Showcase', url: './src/assets/docs/JiuXi/JiuXiDashboard.png' },
            { type: 'image', title: 'Voice Interaction Logic', url: './src/assets/docs/JiuXi/Diagrams-Working-CH.png' }
        ],
        link: 'https://raffles-university.edu.my/first-draft-%C2%B7-raffles-graduation-show-2025/'
    },
    {
        id: 'colorella-ticketing',
        title: 'Colorella Event — Ticketing & Finance Management System',
        type: 'Internal Event System',
        category: 'WEB_SYSTEMS',
        stack: ['Python', 'Tkinter', 'Google Sheets API', 'pandas', 'Async UI'],
        shortDesc: 'A custom-built ticketing and attendance management system supporting tiered sales, payment review, and real-time tracking.',
        media: { type: 'images', content: ['https://i.postimg.cc/ZnFMY38Z/Colorella-Ticketing-System.png'] },
        introduction: 'As SRC Treasurer, I designed this system for the Colorella festival to replace manual spreadsheets. It manages registrations, ticket tiers, and payments while ensuring financial transparency.',
        details: {
            overview: 'Using Google Sheets as a backend, the system synchronizes registration data, enforces tier caps, and provides tools for payment approval and attendance marking.',
            features: [
                'Google Forms Ingestion: Automatically processes registration responses from shared sheets.',
                'Tiered Ticket Management: Supports Early Bird and other tiers with participant caps.',
                'Payment Review Workflow: Allows treasurers to approve or reject payments directly from the UI.',
                'Attendance Tracking: One-click attendance marking during event check-in.',
                'Responsive Desktop UI: Uses background threads to ensure the Tkinter interface never blocks.'
            ],
            responsibilities: [
                'SRC Treasurer: Oversaw ticket pricing strategies and revenue tracking.',
                'System Architect: Designed the complete system from API integration to desktop UI.',
                'Operational Lead: Managed live check-in and payment verification during the event.'
            ],
            challenges: [
                'Scaling for High Volume: Designing for hundreds of concurrent registrations.',
                'Data Integrity: Managing concurrent updates to shared sheets without state loss.'
            ]
        },
        showcase: [
            { type: 'info', url: 'https://share.google/aimode/FuksYKCE3dbNmDNIx' }
        ],
        link: ''
    },
    {
        id: 'remind',
        title: 'ReMind - Mobile Relationship Manager',
        type: 'Mobile App',
        category: 'WEB_SYSTEMS',
        stack: ['Ionic', 'Angular', 'Capacitor', 'SQLite', 'Ionic Storage'],
        shortDesc: 'A privacy-first, offline-first relationship manager that helps users store friend details securely on-device.',
        media: { type: 'youtube', content: 'v6Pw95EJqNA' },
        introduction: 'ReMind is a privacy-focused mobile relationship manager. it manages all data locally using SQLite to support a fully offline-first experience.',
        details: {
            overview: 'Developed to explore hybrid app architecture, ReMind prioritizes privacy by keeping data on-device and using local caching for fast startup.',
            features: [
                'Friend Records CRUD: Complete profile management backed by SQLite.',
                'Offline-first Storage: No network required for data access or updates.',
                'Client-side Caching: Uses Ionic Storage for smoother offline UX.',
                'Real-time UI Updates: Reflects database changes immediately via Angular binding.',
                'Decision Roulette: A gamified module for randomized social suggestions.'
            ],
            responsibilities: [
                'Project Lead: Defined the technical direction and coordinated task allocation.',
                'Core Data Architecture: Designed the offline-first layer using SQLite.',
                'Testing & QA: Conducted functional testing to verify CRUD correctness and offline stability.'
            ],
            challenges: [
                'Offline Consistency: Ensuring data stays consistent between SQLite and cache.',
                'Responsive Design: Iterating UI layouts for diverse screen sizes.'
            ]
        },
        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/ReMind' },
            { type: 'figma', url: 'https://www.figma.com/design/6ukaFjEmDfwMgvfcJJop5N/ReMind?node-id=0-1&t=oSeDMvmTn8c8KBmz-1' }
        ],
        artifacts: [
            { type: 'pdf', title: 'Development Presentation', url: './src/assets/docs/ReMind/ProjectReMind_PPT_V2_20251124.pdf' },
            { type: 'image', title: 'Use Case Diagram', url: './src/assets/docs/ReMind/Diagrams-Use Case.drawio.png' },
            { type: 'image', title: 'Project Charter', url: './src/assets/docs/ReMind/PM ReMind Project Charter.png' },
            { type: 'image', title: 'Work Breakdown Structure (WBS)', url: './src/assets/docs/ReMind/Project ReMind Work Breakdown Structure v1.png' }
        ],
        link: 'https://github.com/MinYuOuO/ReMind'
    },
    {
        id: 'telco-churn-malaysia',
        title: 'Telecom Customer Churn Prediction System (Malaysia)',
        type: 'Data Mining / ML',
        category: 'AI_DATA',
        stack: ['Python', 'scikit-learn', 'pandas', 'Orange Mining', 'Tkinter'],
        shortDesc: 'A Malaysia-contextualized telecom churn dataset analysis and predictive decision-support system.',
        media: { type: 'images', content: ['https://i.postimg.cc/kGfm5kCN/Telecom_Churn_Predictor_Exe.png'] },
        introduction: 'This project analyzes customer churn in the Malaysian telecom sector. It evaluates multiple predictive models and deploys a desktop prototype for churn prediction.',
        details: {
            overview: 'The project combines data warehousing design, EDA, and machine learning. A synthetic dataset was generated using DOSM demographic distributions and national statistics.',
            features: [
                'Relational Data Warehouse: Designed Customer, Usage, and Churn tables.',
                'Malaysia-specific Data: Shaped synthetic data using national population distributions.',
                'Multi-model Data Mining: Implemented Random Forest, Decision Tree, and Logistic Regression.',
                'Decision-support Prototype: Tkinter GUI for predicting churn probability and retention priority.'
            ],
            responsibilities: [
                'Dataset Design: Co-designed the synthetic Malaysia-specific churn dataset.',
                'Model Development: Implemented and compared ML models in Python and Orange.',
                'Prototype Developer: Integrated models into a desktop application for decision support.'
            ],
            challenges: [
                'Data Realism: Ensuring synthetic behavior reflected real usage patterns.',
                'Interpretability: Selecting models that offer both predictive power and business insights.'
            ]
        },
        showcase: [
            { type: 'info', url: 'https://colab.research.google.com/drive/1rND6DuffaajBer8j4GUiCMip2_VEeaKa?usp=sharing' }
        ],
        artifacts: [
            { type: 'pdf', title: 'Project Technical Report', url: './src/assets/docs/TelecomCustomerChurnPrediction/Data Mining and Warehousing Project V2.pdf' },
            { type: 'pdf', title: 'Data Mining Presentation', url: './src/assets/docs/TelecomCustomerChurnPrediction/Data Mining PPT.pdf' },
            { type: 'image', title: 'System Design Flowchart', url: './src/assets/docs/TelecomCustomerChurnPrediction/System Design Flowchart.drawio.png' }
        ],
        link: 'https://colab.research.google.com/drive/1rND6DuffaajBer8j4GUiCMip2_VEeaKa?usp=sharing'
    },
    {
        id: 'mamak-eateries-analytics',
        title: 'Mamak Eateries — Data Analytics & Power BI Visualization',
        type: 'Data Analytics / Visualization',
        category: 'AI_DATA',
        stack: ['Power BI', 'Data Analytics', 'Market Analysis', 'Business Intelligence'],
        shortDesc: 'A comprehensive data analytics project exploring the Mamak eatery landscape using Power BI for visual storytelling.',
        media: { type: 'images', content: ['./src/assets/docs/MamakEateries/PowerBI Mamak Eateries.png'] },
        introduction: 'This project focuses on the visualization and analysis of the Mamak eatery market in Malaysia. By leveraging Power BI, I transformed raw data into actionable insights regarding consumer behavior and market trends.',
        details: {
            overview: 'The analysis covers geographic distribution, popular food items, and pricing strategies within the Mamak industry, aimed at providing business intelligence for new market entrants.',
            features: [
                'Interactive Dashboards: Real-time filtering and drill-down capabilities for eatery data.',
                'Geospatial Analysis: Mapping eatery densities across different Malaysian regions.',
                'Consumer Sentiment Tracking: Visualizing preferences and peak traffic periods.',
                'Pricing Benchmarks: Comparative analysis of standard item pricing.'
            ],
            responsibilities: [
                'Data Visualization Lead: Designed the complete Power BI dashboard and narrative flow.',
                'Market Researcher: Gathered and cleaned the dataset to ensure regional representativeness.',
                'Strategic Analyst: Interpreted data patterns to provide business recommendations.'
            ],
            challenges: [
                'Data Normalization: Harmonizing inconsistent naming conventions across regional datasets.',
                'Visualization Clarity: Designing a dense dashboard that remains intuitive for non-technical users.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'pdf', title: 'Data Analytics Final Project Poster', url: './src/assets/docs/MamakEateries/Data Analytics Final Project Poster.pdf' },
            { type: 'image', title: 'Power BI Dashboard Showcase', url: './src/assets/docs/MamakEateries/PowerBI Mamak Eateries.png' }
        ],
        link: ''
    },
    {
        id: 'hangman-game',
        title: 'Hangman Game — OOP Multiplayer Console Game',
        type: 'C++ Game',
        category: 'GAME_CREATIVE',
        stack: ['C++', 'OOP', 'SFML', 'TCP Networking', 'CMake', 'Git'],
        shortDesc: 'A C++ object-oriented Hangman game supporting single-player, local, and online TCP multiplayer modes.',
        media: { type: 'youtube', content: 'fBLt0iN_Cxo' },
        introduction: 'Developed for an OOP course, this game demonstrates the practical application of polymorphism and inheritance. It supports multiple gameplay modes and integrates audio feedback.',
        details: {
            overview: 'Emphasizing software architecture and scalability, an abstract Game base class unifies all modes while dedicated classes handle player state and networking.',
            features: [
                'Multiple Game Modes: Single-player, local two-player, and online client/server gameplay.',
                'Object-Oriented Architecture: Uses inheritance and polymorphism for extensibility.',
                'Online Multiplayer via TCP: Implements LAN-based play using SFML sockets.',
                'Audio Feedback System: Background music and sound effects powered by SFML Audio.'
            ],
            responsibilities: [
                'Team Lead: Led overall project design and defined the OOP architecture.',
                'Core Architecture: Designed the polymorphic structure for seamless mode switching.',
                'Multiplayer Logic: Planned and validated the client-server interaction model.'
            ],
            challenges: [
                'Scalable Architecture: Sharing common interfaces without logic duplication.',
                'Network Synchronization: Managing state consistency in turn-based play.'
            ]
        },
        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/Hangman-Game' }
        ],
        link: 'https://github.com/MinYuOuO/Hangman-Game'
    },
    {
        id: 'student-score-management',
        title: 'Student Score Management System',
        type: 'Python + PHP Web',
        category: 'WEB_SYSTEMS',
        stack: ['Python', 'PHP', 'MySQL', 'File I/O', 'PrettyTable', 'HTML/CSS'],
        shortDesc: 'A student record system that evolved from a Python console app into a full-stack web application.',
        media: { type: 'images', content: ['https://i.postimg.cc/sx9pG40y/SSMS.png'] },
        introduction: 'This project evolved from a simple Python console application into a web-based system, implementing CRUD workflows and secure authentication.',
        details: {
            overview: 'Developed across multiple courses, this system focuses on database normalization and the transition from local tools to web environments.',
            features: [
                'Normalized MySQL Schema: Efficiently handles many-to-many academic relationships.',
                'Secure Authentication: Implements login and session management.',
                'Performance Visualization: Graphical representation of student scores.',
                'Formatted CLI Output: Uses PrettyTable for the console version.'
            ],
            responsibilities: [
                'Lead Developer: Designed and implemented both CLI and Web versions.',
                'Database Architect: Refactored early structures into optimized relational models.',
                'UI Designer: Built the frontend interfaces for score analysis.'
            ],
            challenges: [
                'System Migration: Transitioning logic from Python scripts to a PHP/MySQL stack.',
                'Data Consistency: Maintaining integrity during record modification and deletion.'
            ]
        },
        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/Student-Score-Management' }
        ],
        link: 'https://github.com/MinYuOuO/Student-Score-Management'
    },
    {
        id: 'network-security-simulation',
        title: 'Network Security Protocols Simulation',
        type: 'Cybersecurity',
        category: 'SYSTEMS_SECURITY',
        stack: ['Python', 'OpenSSL', 'Cloudflare', 'Blockchain', 'VPN'],
        shortDesc: 'A simulation and comparative study of network security protocols for secure transmission.',
        media: { type: 'images', content: [] },
        introduction: 'A simulation and comparative study of network security protocols. This project explores cryptography mechanics and certificate-based trust.',
        details: {
            overview: 'Built as a course project for Data Communication to explore the practical mechanics of secure communications.',
            features: [
                'Blockchain Prototype: Demonstrated hashing and immutability logic.',
                'DNS/SSL Protection: Configured security layers via Cloudflare.',
                'TLS/SSL Handshake: Manual simulations using OpenSSL.',
                'VPN Simulation: Comparative analysis of secure tunneling protocols.'
            ],
            responsibilities: [
                'Researcher: Performed manual protocol analysis and comparative studies.',
                'Developer: Built the Python blockchain prototype for security demonstration.',
                'System Configurer: Managed DNS/SSL setups and certificate trust workflows.'
            ],
            challenges: [
                'Protocol Complexity: Understanding the intricate steps of the TLS handshake.',
                'Security Fidelity: Recreating real-world trust scenarios in a local environment.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'pdf', title: 'Introduction to Cybersecurity Certificate', url: './src/assets/docs/NetworkSecurity/Cisco Introduction to Cybersecurity.pdf' },
            { type: 'pdf', title: 'Security Protocols Case Study', url: './src/assets/docs/NetworkSecurity/Computer Network Group Assignment.pdf' }
        ],
        link: ''
    },
    {
        id: 'internet-penetration-analysis',
        title: "Malaysia's Internet Penetration Analysis (2000–2023)",
        type: 'Data Science',
        category: 'AI_DATA',
        stack: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
        shortDesc: "A quantitative study of internet penetration trends in Malaysia, benchmarked against selected countries.",
        media: { type: 'youtube', content: 'FEO8kZxSLHQ' },
        introduction: "This project analyzes how Malaysia’s internet penetration rate evolved over two decades, comparing it with global and regional peers.",
        details: {
            overview: "Using World Bank Open Data, the workflow focuses on end-to-end data cleaning, transformation, and visual analytics.",
            features: [
                'Data Acquisition: Loaded and filtered World Bank historical datasets.',
                'Data Cleaning: Handled sparse early-year data via forward/backward fill.',
                'Trend Visualization: Produced multi-country line charts and heatmaps.',
                'Correlation Analysis: Summarized adoption patterns across countries.'
            ],
            responsibilities: [
                'Data Analyst: Conducted end-to-end data preparation and cleaning.',
                'Visualization Lead: Created core charts and interpreted growth patterns.',
                'Technical Writer: Summarized findings and statistical limitations.'
            ],
            challenges: [
                'Sparse Data: Handling missing historical values without distorting trends.',
                'Ensuring Range Validity: Keeping penetration metrics strictly within 0-100%.'
            ]
        },
        showcase: [
            { type: 'demo', url: 'https://youtu.be/FEO8kZxSLHQ' }
        ],
        link: 'https://youtu.be/FEO8kZxSLHQ'
    },
    {
        id: 'university-db-system',
        title: 'University Database System',
        type: 'SQL Architecture',
        category: 'SYSTEMS_SECURITY',
        stack: ['SQL', 'MySQL', 'ERD Design', 'Normalization', 'Relational Modeling'],
        shortDesc: 'A relational database for managing students, lecturers, courses, and academic programs.',
        media: { type: 'images', content: ['./src/assets/docs/DatabaseProject/BAI12123_A1T3_LohMinYu_V004.png'] },
        introduction: 'A comprehensive relational database for managing the entire lifecycle of university academics, from enrollment to examination records.',
        details: {
            overview: 'Designed to emphasize the importance of normalization and scalability in conceptual-to-physical database design.',
            features: [
                'Relational Modeling: Optimized schema for enrollment and academic program tracking.',
                'Complex Analytics: Advanced SQL queries for demographic and performance reporting.',
                'Data Integrity: Strict enforcement of primary/foreign key constraints.',
                'Normalized Design: Iterative refinement from ERD to physical implementation.'
            ],
            responsibilities: [
                'Database Designer: Iteratively refined ERDs to ensure 3NF compliance.',
                'Physical Schema Lead: Implemented the database on MySQL with strict constraints.',
                'Query Developer: Wrote complex analytical SQL for program-level reporting.'
            ],
            challenges: [
                'Normalization Trade-offs: Balancing strict normalization with efficient query performance.',
                'Mapping Complexity: Managing many-to-many relationships across diverse academic entities.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'image', title: 'Conceptual ERD', url: './src/assets/docs/DatabaseProject/BAI12123_A1T1_LohMinYu_V002.png' },
            { type: 'image', title: 'Logical ERD', url: './src/assets/docs/DatabaseProject/BAI12123_A1T2_LohMinYu_V001.png' },
            { type: 'image', title: 'Physical Schema Design', url: './src/assets/docs/DatabaseProject/BAI12123_A1T3_LohMinYu_V004.png' },
            { type: 'image', title: 'Complex Analytics Queries', url: './src/assets/docs/DatabaseProject/BAI12123_A2T4_LohMinYu_V002.png' }
        ],
        link: ''
    },
    {
        id: 'smart-rain-alert-hci',
        title: 'Smart Rain Alert System',
        type: 'Hardware / IoT',
        category: 'IOT_DESIGN',
        stack: ['ESP32', 'HW-038 Sensor', 'IoT', 'Figma', 'UX Research', 'Usability Testing'],
        shortDesc: 'An IoT rain detection system that delivers real-time visual, audio, and mobile alerts.',
        media: { type: 'images', content: ['https://i.postimg.cc/htgK0byZ/HCI_Presentation.png'] },
        introduction: 'The Smart Rain Alert System is an IoT-based interactive system designed for timely environmental awareness through multi-modal feedback.',
        details: {
            overview: 'Integrates sensors with interaction design to communicate rain status through LED colors, buzzer alerts, and a mobile interface.',
            features: [
                'Real-time Detection: Uses ESP32 and HW-038 sensor for rainfall monitoring.',
                'Multi-modal Feedback: LED colors, buzzers, and digital notifications.',
                'Usability Testing: Alert modes informed by survey responses from 21 participants.',
                'Interactive Prototype: Figma-designed companion mobile interface.'
            ],
            responsibilities: [
                'IoT Developer: Integrated hardware sensors and calibrated intensity thresholds.',
                'UI Researcher: Conducted usability testing and mapped rain levels to feedback modes.',
                'Prototype Designer: Created high-fidelity wireframes for the companion app.'
            ],
            challenges: [
                'Sensor Calibration: Reducing false positives from small water droplets.',
                'Alert Balance: Avoiding notification fatigue while ensuring safety warnings.'
            ]
        },
        showcase: [
            { type: 'figma', url: 'https://www.figma.com/proto/YTjfsQGR3AL6Wvp1oU49jS/HCI-interface-design' }
        ],
        link: ''
    },
    {
        id: 'digital-passport-locker',
        title: 'Digital Passport Management System',
        type: 'System Analysis',
        category: 'SYSTEMS_SECURITY',
        stack: ['System Analysis', 'Requirements Engineering', 'Biometrics', 'Feasibility Study'],
        shortDesc: 'A proposed digital passport locker system replacing manual logbooks with biometric workflows.',
        media: { type: 'images', content: ['./src/assets/docs/DigitalPassportManagement/LohMinYu_AT1_V004.1.JPG'] },
        introduction: 'A proposed digital passport locker system designed to replace manual logbook tracking with secure, server-backed biometric workflows.',
        details: {
            overview: 'Focused on system analysis and design, this project evaluates the feasibility and migration strategy for a high-security storage system.',
            features: [
                'Biometric Workflow: Fingerprint-secured access to document lockers.',
                'Feasibility Analysis: Technical, economic, legal, and operational assessments.',
                'Requirements Engineering: Detailed mapping of stakeholder needs to system specs.',
                'Architecture Planning: Server-backed deployment plan for institutional use.'
            ],
            responsibilities: [
                'Systems Analyst: Conducted feasibility studies and translated requirements into specs.',
                'Technical Researcher: Evaluated biometric hardware and database migration risks.',
                'Co-Developer: Contributed to the architectural deployment specifications.'
            ],
            challenges: [
                'Legal Compliance: Navigating privacy laws concerning biometric data storage.',
                'Infrastructure Transition: Designing a cost-effective plan to replace manual workflows.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'image', title: 'System Architecture (Part 1)', url: './src/assets/docs/DigitalPassportManagement/LohMinYu_AT1_V004.1.JPG' },
            { type: 'image', title: 'System Architecture (Part 2)', url: './src/assets/docs/DigitalPassportManagement/LohMinYu_AT1_V004.2.JPG' },
            { type: 'image', title: 'Feasibility Analysis Summary', url: './src/assets/docs/DigitalPassportManagement/LohMinYu_AT2_V002.jpg' },
            { type: 'image', title: 'Requirement Specifications', url: './src/assets/docs/DigitalPassportManagement/LohMinYu_AT3_V004.jpg' }
        ],
        link: ''
    },
    {
        id: 'unimate-campus-app',
        title: 'UniMate Campus Companion App',
        type: 'UI/UX + Mobile App',
        category: 'IOT_DESIGN',
        stack: ['Figma', 'UX Research', 'Wireframing', 'Information Architecture', 'Gamification'],
        shortDesc: 'A campus mobile app concept combining schedules, events, and a gamified rewards experience.',
        media: { type: 'images', content: ['./src/assets/docs/UniMate/User Persona 1.png'] },
        introduction: 'UniMate is a campus mobile app concept that fuses structured academic tools with a gamified community experience.',
        details: {
            overview: 'Converts fragmented user pain points into a cohesive mobile-first design, emphasizing student engagement and retention.',
            features: [
                'Gamified Experience: Rewards system to encourage participation in campus events.',
                'Integrated Schedules: Unified view for classes, exams, and club activities.',
                'Empathy Mapping: End-to-end user journeys based on student personas.',
                'Interactive Mockups: High-fidelity Figma prototypes for core functional modules.'
            ],
            responsibilities: [
                'UI/UX Designer: Conducted competitor case studies and built empathy maps.',
                'Information Architect: Designed the app navigation and feature hierarchy.',
                'Prototyper: Produced interactive wireframes and conducted rapid prototyping.'
            ],
            challenges: [
                'Feature Cohesion: Integrating disparate modules (schedules/rewards) into a single UI.',
                'User Motivation: Balancing functional utility with gamified retention elements.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'image', title: 'Student Empathy Map', url: './src/assets/docs/UniMate/Empathy Map.png' },
            { type: 'image', title: 'User Persona: Undergraduate Student', url: './src/assets/docs/UniMate/User Persona 1.png' },
            { type: 'image', title: 'User Persona: Club Leader', url: './src/assets/docs/UniMate/User Persona 2.png' },
            { type: 'image', title: 'User Persona: International Student', url: './src/assets/docs/UniMate/User Persona 3.png' }
        ],
        link: ''
    },
    {
        id: 'uniclarity',
        title: 'UniClarity — Interactive Academic Planning Concept',
        type: 'UI/UX Design',
        category: 'IOT_DESIGN',
        stack: ['Figma', 'UI/UX', 'Product Design', 'Business Model Canvas'],
        shortDesc: 'A comprehensive academic planning tool concept featuring interactive wireframes, business modeling, and visual communication assets.',
        media: { type: 'images', content: ['./src/assets/docs/UniClarity/UniClarity Poster.png'] },
        introduction: 'UniClarity is a strategic design project that bridges academic planning with intuitive user experience, developed to simplify the complex landscape of university requirements.',
        details: {
            overview: 'This project includes a full business model canvas, high-fidelity wireframes, and promotional materials designed to showcase a professional-grade educational product.',
            features: [
                'Business Model Canvas: Strategic planning for product viability and market fit.',
                'Interactive Wireframes: High-fidelity mockups showcasing core user flows.',
                'Visual Communication: Professional poster and presentation materials for stakeholders.'
            ],
            responsibilities: [
                'Product Designer: Developed the core visual identity and interactive wireframes.',
                'Strategic Planner: Authored the business model canvas and value proposition.'
            ],
            challenges: [
                'Information Density: Organizing complex academic data into a clean, actionable interface.',
                'Visual Branding: Creating a trustworthy and professional aesthetic for an educational tool.'
            ]
        },
        showcase: [],
        artifacts: [
            { type: 'image', title: 'UniClarity Project Poster', url: './src/assets/docs/UniClarity/UniClarity Poster.png' },
            { type: 'pdf', title: 'Presentation Slides (Light Theme)', url: './src/assets/docs/UniClarity/UniClarity PPT light.pdf' },
            { type: 'image', title: 'Business Model Canvas', url: './src/assets/docs/UniClarity/UniClarity Business Model Canvas.png' },
            { type: 'image', title: 'Wireframe Showcase', url: './src/assets/docs/UniClarity/Wireframe Showcase of UniClarity.png' }
        ],
        link: ''
    },
    {
        id: 'miu-portfolio',
        title: 'Personal Technical Portfolio',
        type: 'Portfolio Website',
        category: 'WEB_SYSTEMS',
        stack: ['Three.js', 'WebGL', 'GSAP', 'Web Audio API', 'Tailwind CSS', 'JavaScript'],
        shortDesc: 'A personal portfolio website focused on frontend performance, WebGL integration, and secure asset management.',
        media: { type: 'images', content: ['./src/assets/preview-card.png'] },
        introduction: 'A technical portfolio developed to demonstrate core frontend engineering skills, 3D graphics implementation, and system-wide asset verification.',
        details: {
            overview: 'This project focuses on the practical application of modern web standards, including custom navigation engines and optimized 3D rendering.',
            features: [
                'Custom Navigation Transitions: Symmetrical shutter-style page transitions using GSAP and CSS backdrop filters.',
                'Procedural Audio: Integrated UI sound feedback generated using the Web Audio API.',
                '3D Visual Elements: WebGL-based hero section with custom bloom and chromatic aberration shaders.',
                'Subresource Integrity (SRI): Security implementation for verifying external CDN-hosted libraries.',
                'Integrated Project Database: Client-side project archive with dynamic filtering and search capabilities.'
            ],
            responsibilities: [
                'Frontend Engineering: Built the core application logic and transition engine using vanilla JavaScript.',
                'Graphics Development: Integrated Three.js for real-time 3D elements and post-processing effects.',
                'Security Implementation: Configured SRI hashes and secure AudioContext handling.'
            ],
            challenges: [
                'Usability Balance: Ensuring readability despite visual distortion.',
                'Performance: Managing real-time effects and particle systems.'
            ]
        },
        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/MinYuOuO.github.io' }
        ],
        link: 'https://minyu.my/'
    },
    {
        id: 'stellar-echoes',
        title: 'Stellar Echoes — 3D Memory Visualization',
        type: '3D Web Application',
        category: 'GAME_CREATIVE',
        stack: ['Three.js', 'JavaScript', 'Web Audio API', 'HTML5'],
        shortDesc: 'A 3D visualization project that renders images as interactive particle fragments using WebGL.',
        media: { type: 'images', content: ['https://i.postimg.cc/pL0HxNCW/stellar_Echoes.png'] },
        introduction: 'Stellar Echoes transforms photographs into interactive 3D fragments within a WebGL-rendered environment.',
        details: {
            overview: 'The project focuses on the integration of real-time 3D graphics with custom interaction logic.',
            features: [
                '3D Particle System: Image-based fragments rendered in a spherical coordinate space.',
                'Procedural UI: A terminal-style interface for system state feedback.',
                'Audio Synchronization: Dynamic background audio integrated with scene updates.'
            ],
            responsibilities: [
                'Scene Engineering: Developed the 3D environment, camera controls, and lighting.',
                'Interaction Logic: Implemented custom pointer-based selection for 3D elements.'
            ],
            challenges: [
                'Optimization: Maintaining 60 FPS performance while managing multiple particle layers.'
            ]
        },
        showcase: [
            { type: 'demo', url: './stellarEchoes.html' },
            { type: 'github', url: 'https://github.com/MinYuOuO/MinYuOuO.github.io' }
        ],
        link: 'https://minyu.my/stellarEchoes.html'
    },
    {
        id: 'travel-calculator',
        title: 'Travel Expense Calculator',
        type: 'Desktop Application',
        category: 'WEB_SYSTEMS',
        stack: ['C++', 'OOP', 'STL', 'CLI'],
        shortDesc: 'A C++ trip cost planner utilizing object-oriented design principles.',
        media: { type: 'youtube', content: 'zHorgB2bUeg' },
        introduction: 'The Travel Expense Calculator application estimates costs using a modular class-based architecture.',
        details: {
            overview: 'The application uses object-oriented decomposition to manage transport, food, and lodging costs.',
            features: [
                'Modular Architecture: Independent classes for different expense categories.',
                'Input Validation: Logic-driven flow to ensure accurate data entry.'
            ],
            responsibilities: [
                'Team Lead: Coordinated development and ensured OOP alignment.',
                'Database Architect: Planned class responsibility boundaries.'
            ],
            challenges: [
                'OOP Application: Translating abstract principles into a practical workflow.'
            ]
        },
        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/Travel-Calculator-App' }
        ],
        link: 'https://github.com/MinYuOuO/Travel-Calculator-App'
    }
];

window.projectsData = projectsData;
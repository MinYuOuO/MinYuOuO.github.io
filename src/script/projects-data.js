const projectsData = [
    {
        id: 'remind',
        title: 'ReMind - Mobile Relationship Manager',
        type: 'Mobile App',
        stack: [
            'Ionic',
            'Angular',
            'Capacitor',
            'SQLite (@capacitor-community/sqlite)',
            'Ionic Storage'
        ],
        shortDesc:
            'A privacy-first, offline-first relationship manager that helps users store friend details (birthdays, notes, contact info)',

        media: {
            type: 'youtube',
            content: 'PASTE_YOUR_YOUTUBE_VIDEO_ID_HERE'
        },

        introduction:
            'ReMind is a privacy-focused mobile relationship manager built with Ionic + Angular. It helps users record and organize key friend information (e.g., birthdays, contact details, conversation notes) and manages all data locally using SQLite to support an offline-first experience.',

        details: {
            overview:
                'Developed as a mobile application development project to explore hybrid app architecture with Ionic/Angular and robust local data management. The app prioritizes privacy by storing user data on-device and implementing a complete CRUD data core with SQLite, complemented by local caching for fast startup and offline reliability.',

            features: [
                'Friend Records CRUD: Create, view, edit, and delete friend profiles (name, relationship type, birthday, notes) backed by local SQLite tables.',
                'Offline-first Storage: Stores and retrieves all records directly on-device via @capacitor-community/sqlite (no network required).',
                'Client-side Caching: Uses Ionic Storage + Capacitor Preferences to persist and quickly load friend data for smoother offline UX.',
                'Real-time UI Updates: Reflects database changes immediately in the UI using Angular data binding for a responsive list experience.',
                'Decision Roulette: A gamified “spin wheel” module for randomized suggestions (e.g., activities/meetups).'
            ],

            responsibilities: [
                'Project Lead & Technical Owner: Led the overall development of ReMind, defined the technical direction, coordinated task allocation, and ensured consistent integration across frontend, database, and native layers.',
                'Core Data Architecture: Designed and implemented the offline-first data layer using SQLite with @capacitor-community/sqlite, including schema planning and repository-style CRUD services.',
                'CRUD & Persistence Implementation: Built and validated full Create, Read, Update, and Delete workflows for friend records, ensuring real-time UI updates via Angular data binding and reliable local persistence.',
                'Offline Reliability & Caching Strategy: Implemented client-side caching with Ionic Storage and Capacitor Preferences to guarantee fast startup and stable access to data without network connectivity.',
                'System Integration & Debugging: Integrated Capacitor plugins, resolved environment and plugin-related issues, and debugged data consistency problems between SQLite and cached storage.',
                'Testing & Quality Assurance: Conducted manual functional testing across devices to verify CRUD correctness, offline behavior, validation logic, and UI stability with zero runtime errors.',
                'Future Architecture Planning: Designed the foundation for advanced features including reminders, biometric/PIN security, and AI-assisted interaction insights, ensuring scalability beyond the assignment scope.'
            ],

            challenges: [
                'Offline Data Consistency: Ensured create/update/delete operations stay consistent between SQLite and cached storage; validated that deleted items do not reappear after refresh/reopen.',
                'Responsive UI on Small Screens: Identified layout issues (e.g., roulette component padding/overlap) and iterated UI adjustments to maintain usability across screen sizes.',
                'Scalable Feature Roadmap: Designed the foundation to extend into reminders, security unlock (PIN/biometric), and optional AI-assisted interaction insights.'
            ]
        },

        showcase: [
            { type: 'github', url: 'https://github.com/MinYuOuO/ReMind' },

            // Replace with your actual links:
            // If you want Figma to be the main media instead, switch media.type to 'figma'
            // and paste the embed URL into media.content.
            { type: 'figma', url: 'https://www.figma.com/design/6ukaFjEmDfwMgvfcJJop5N/ReMind?node-id=0-1&t=oSeDMvmTn8c8KBmz-1' },

            // Optional extra links:
            // { type: 'demo', url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' },
            // { type: 'live', url: 'https://your-live-site.com' }
        ],

        link: 'https://github.com/MinYuOuO/ReMind'
    },
    {
        id: 'jiuxi-mindscape',
        title: 'JiuXi Mindscape — AI Cultural Narrator',
        type: 'AI Service',
        stack: [
            'JavaScript',
            'HTML',
            'CSS',
            'LLM (REST API)',
            'Speech-to-Text (ASR)',
            'Text-to-Speech (TTS)',
            'Web Speech API',
            'iFLYTEK'
        ],
        shortDesc:
            'Voice-enabled AI avatar conversation service designed for on-site cultural tourism, supporting multilingual narration.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/7LYZMMsN/jiuxi.png'
            ]
        },

        introduction:
            'JiuXi Mindscape is a lightweight, voice-enabled AI narrator interface designed for cultural tourism experiences. The system provides multilingual conversational guidance through a talking avatar, integrating speech recognition, text-to-speech, and configurable LLM services while supporting offline and demo-friendly deployment.',

        details: {
            overview:
                'This project was developed as part of the Raffles Graduation Show 2025 (Nanao IP cross-disciplinary project), collaborating with design and arts teams to deliver an interactive AI concierge for rural cultural tourism. The system emphasizes resilience, portability, and ease of deployment, enabling on-site demonstrations even in low-connectivity environments. Built as a static SPA, it can run standalone, embedded via WebView/iframe, or served from any simple web server.',

            features: [
                'Voice-enabled Conversation UX: Supports both text input and push-to-talk voice interaction using ASR with real-time feedback.',
                'Multilingual Support: Designed for Chinese, English, and Malay cultural narration scenarios.',
                'Provider-flexible Speech Pipeline: Integrates high-fidelity iFLYTEK ASR/TTS with automatic browser fallbacks (Web Speech API & SpeechSynthesis).',
                'LLM-agnostic Architecture: Connects to any compatible REST-based LLM endpoint (e.g., custom gateway, OpenAI-compatible APIs).',
                'Context & Persona Management: Uses persona profiles, knowledge materials, and simplified RAG logic to guide culturally relevant responses.',
                'Offline & Demo Mode: Mock Mode enables zero-credential, offline demonstrations for exhibitions and on-site showcases.',
                'Animated Avatar Feedback: Visual avatar states (idle, listening, thinking, speaking, error) provide intuitive conversational feedback.',
                'Debugging & Persistence Tools: In-app settings and logging panels with localStorage persistence and export/import support.'
            ],

            responsibilities: [
                'Core System Developer: Designed and implemented the entire frontend SPA architecture, managing UI state, conversation flow, and asynchronous voice/LLM interactions.',
                'Voice & AI Integration: Integrated ASR (speech-to-text), TTS (text-to-speech), and configurable LLM REST APIs into a unified conversational pipeline.',
                'Architecture Design: Planned a modular service-based structure (ASR manager, TTS manager, LLM manager, settings manager) to ensure maintainability and extensibility.',
                'Offline-first Demo Strategy: Implemented Mock Mode and local configuration persistence to support exhibitions, demos, and low-connectivity environments.',
                'Cross-disciplinary Collaboration: Worked closely with design and arts teams to align technical behavior with narrative, visual, and cultural experience goals.',
                'Deployment & Security Considerations: Implemented client-side credential handling, HMAC-based WebSocket signing, and documented production security recommendations.'
            ],

            challenges: [
                'Voice Reliability Across Environments: Addressed inconsistent microphone and audio behavior across browsers and WebViews by implementing provider fallbacks and user-gesture audio gating.',
                'Offline Demonstration Constraints: Designed Mock Mode to simulate full AI conversations without external APIs, ensuring smooth exhibition demos.',
                'Asynchronous State Management: Coordinated ASR, LLM inference, TTS playback, and avatar animation states without a frontend framework.',
                'Security Trade-offs: Balanced client-side API key usage for demos while documenting server-side proxy recommendations for production deployment.'
            ]
        },

        showcase: [
            {
                type: 'info',
                url: 'https://raffles-university.edu.my/first-draft-%C2%B7-raffles-graduation-show-2025/'
            },
            {
                type: 'info',
                url: 'https://kancilawards.com/student-winners/entry/2025/8590'
            }
        ],

        link: 'https://raffles-university.edu.my/first-draft-%C2%B7-raffles-graduation-show-2025/'
    },
    {
        id: 'hangman-game',
        title: 'Hangman Game — Object-Oriented Multiplayer Console Game',
        type: 'Game Development',
        stack: [
            'C++',
            'OOP',
            'SFML (Audio & Network)',
            'TCP Sockets',
            'CMake',
            'Git'
        ],
        shortDesc:
            'A C++ object-oriented Hangman game supporting single-player, local multiplayer, and online multiplayer modes.',

        media: {
            type: 'youtube',
            content: 'fBLt0iN_Cxo'
        },

        introduction:
            'This Hangman Game was developed as part of an Object-Oriented Programming course to demonstrate practical application of OOP principles in a real-world system. The game supports multiple gameplay modes, integrates audio feedback, and implements online multiplayer functionality using TCP networking, all built with a modular and extensible C++ architecture.',

        details: {
            overview:
                'The project was designed to move beyond a simple console game by emphasizing software architecture, scalability, and clean object-oriented design. An abstract Game base class unifies all gameplay modes, while dedicated classes handle player state, word management, categories, audio playback, and networking. The system is cross-platform, built with CMake, and demonstrates how OOP concepts can be applied to interactive and networked applications.',

            features: [
                'Multiple Game Modes: Single-player, local two-player, and online multiplayer (client/server) gameplay using a unified Game interface.',
                'Object-Oriented Architecture: Uses abstraction, encapsulation, inheritance, and polymorphism to separate responsibilities and support extensibility.',
                'Category-based Word System: Randomized word selection from predefined categories such as Food, Countries, and Computer Science.',
                'Online Multiplayer via TCP: Implements LAN-based multiplayer using SFML TCP sockets with synchronized gameplay flow.',
                'Audio Feedback System: Background music and sound effects (correct/incorrect guesses) powered by SFML Audio.',
                'Cross-platform Build System: Uses CMake to ensure consistent compilation across different environments.',
                'Robust Testing Coverage: Manual unit, integration, functional, and network testing documented with structured test cases.'
            ],

            responsibilities: [
                'Team Lead & System Architect: Led the overall project design, defined the object-oriented architecture, and ensured alignment with course learning outcomes.',
                'Core Game Architecture Design: Designed the abstract Game base class and polymorphic structure enabling seamless switching between gameplay modes.',
                'Multiplayer Logic Oversight: Planned and validated the client–server interaction model for online multiplayer using TCP sockets.',
                'Code Review & Integration: Reviewed team contributions, resolved integration conflicts, and ensured consistent coding standards across modules.',
                'Debugging & Testing Coordination: Led debugging efforts, verified gameplay correctness across all modes, and ensured all documented test cases passed.',
                'Documentation & Presentation Support: Contributed to system design explanations, UML interpretation, and final project validation.'
            ],

            challenges: [
                'Designing Scalable OOP Architecture: Ensuring that multiple game modes could share a common interface without duplicating logic.',
                'Network Synchronization: Managing turn-based gameplay and state consistency between server and client in online multiplayer mode.',
                'Audio Integration in Console Context: Integrating SFML audio playback while maintaining a console-based UI.',
                'Balancing Complexity and Stability: Implementing advanced features (networking, audio, polymorphism) while keeping the system stable and testable.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/Hangman-Game'
            }
        ],

        link: 'https://github.com/MinYuOuO/Hangman-Game'
    }
    ,
    {
        id: 'miu-portfolio',
        title: 'Miu Portfolio — Dissociative Recombination Web Experience',
        type: 'Portfolio Website',
        stack: [
            'HTML5',
            'CSS / Tailwind CSS',
            'JavaScript',
            'Three.js',
            'WebGL',
            'GitHub Pages'
        ],
        shortDesc:
            'A highly experimental personal portfolio that rejects conventional grid-based layouts, combining anti-design principles, asymmetric UI, and WebGL-driven interactions to express both technical rigor and creative dissociation.',

        media: {
            type: 'images',
            content: [
                './src/assets/preview-card.png'
            ]
        },

        introduction:
            'The Miu Portfolio is a personal web experience designed to move beyond the “static brochure” model of traditional developer portfolios. It fuses structured front-end engineering with experimental visual systems inspired by digital deconstruction and dissociative recombination, presenting projects as an evolving computational space rather than a fixed layout.',

        details: {
            overview:
                'This project serves as both a professional portfolio and a design research experiment. Conceptually inspired by anti-design and scientific metaphors from dissociative recombination, the site deliberately fractures conventional UI patterns while maintaining usability, accessibility, and responsive behavior. A clear separation is enforced between the logical content layer (HTML/CSS) and an expressive dissociative layer (WebGL/Three.js), allowing controlled chaos without sacrificing clarity.',

            features: [
                'Anti-design & Asymmetric Layout: Breaks standard grid systems using aggressive negative space, off-axis alignment, and non-linear visual flow.',
                'Hybrid Rendering Architecture: Combines traditional DOM-based UI with WebGL canvas layers for immersive visual effects.',
                'Three.js Interactive Visuals: Implements animated 3D elements, particle systems, and wireframe structures as narrative UI components.',
                'Dissociative Interaction Effects: Includes fluid data distortion, chromatic aberration, and controlled glitch effects driven by cursor and scroll input.',
                'Responsive & Accessible Design: Uses fluid units, media queries, and reduced-motion fallbacks to maintain usability across devices.',
                'Design System Consistency: Enforces a strict neon-on-dark color palette and typographic hierarchy to balance chaos with readability.'
            ],

            responsibilities: [
                'Concept & Visual System Design: Defined the core design philosophy and translated abstract theory into a concrete UI system.',
                'Frontend Engineering: Implemented the complete site using semantic HTML, modern CSS utilities, and vanilla JavaScript.',
                'WebGL & Three.js Development: Built and integrated interactive 3D scenes, shaders, and post-processing effects to support narrative-driven interactions.',
                'Architecture Planning: Designed a layered system separating logical content rendering from experimental visual effects.',
                'Performance & Accessibility Considerations: Tuned animations, applied reduced-motion strategies, and ensured responsive behavior across screen sizes.',
                'Continuous Iteration: Refactored and expanded the portfolio across multiple design versions, evolving from controlled chaos to a more formalized theoretical framework.'
            ],

            challenges: [
                'Balancing Chaos and Usability: Ensuring experimental layouts remained readable and navigable despite heavy visual distortion.',
                'WebGL Performance Constraints: Managing real-time effects and particle systems without degrading frame rate on lower-end devices.',
                'Design Originality: Avoiding common sci-fi and cyberpunk clichés while still delivering a high-impact futuristic aesthetic.',
                'Cross-device Responsiveness: Adapting asymmetrical, rotated layouts for mobile screens without losing design intent.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/MinYuOuO.github.io'
            },
            {
                type: 'live',
                url: 'https://minyuouo.github.io/'
            }
        ],

        link: 'https://minyuouo.github.io/'
    },
    {
        id: 'stellar-echoes',
        title: 'Stellar Echoes — Interactive Friendship Memory Archive',
        type: 'Creative Web Experience',
        stack: [
            'JavaScript',
            'Three.js',
            'HTML',
            'CSS',
            'Web Audio API'
        ],
        shortDesc:
            'An immersive 3D web experience that visualizes personal friendship memories as floating starlight particles, transforming a birthday gift into a long-term digital archive of shared moments.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/pL0HxNCW/stellar_Echoes.png'
            ]
        },

        introduction:
            'Stellar Echoes began as a birthday gift website for a close friend and evolved into a personal digital archive of friendship memories. The project uses Three.js to render photographs as interactive starlight fragments in deep space, allowing users to explore, recall, and preserve emotional moments through an immersive 3D interface.',

        details: {
            overview:
                'The project explores how software engineering and real-time graphics can be used to express emotional narratives. Memory photographs are transformed into spatial particles distributed in a nebula-like formation, accompanied by atmospheric audio and subtle interaction cues. The experience emphasizes emotional resonance while maintaining technical robustness, performance stability, and cross-device support.',

            features: [
                '3D Stellar Memory System: Displays photos as glowing 3D particles arranged in spherical space, simulating a starfield of memories.',
                'Interactive Exploration: Supports rotation, zoom, and click/tap interactions to inspect individual memory fragments.',
                'Boot Sequence & Narrative UI: Implements a terminal-style loading sequence to frame memory recall as a system initialization process.',
                'Photo Modal Viewer: Clicking a particle opens a decrypted memory view with smooth modal transitions.',
                'Audio Atmosphere: Integrates background music and sound effects using the Web Audio API to enhance immersion.',
                'Cross-platform Interaction: Supports mouse, touch, pinch-to-zoom, and responsive resizing across devices.',
                'Performance-aware Rendering: Optimized particle count, lazy image loading, and post-processing for smooth 60 FPS animation.'
            ],

            responsibilities: [
                'Concept Creation & Emotional Design: Conceived the project as an emotional storytelling medium, translating personal friendship memories into an interactive technical format.',
                'Three.js Scene Engineering: Designed and implemented the complete 3D scene, camera system, particle geometry, and post-processing pipeline.',
                'Interaction System Implementation: Built custom mouse and touch interaction logic for rotation, zooming, and raycasting-based photo selection.',
                'UI & Narrative Layer Design: Developed the HUD, boot screen, modal system, and glitch-style visual language to support the memory recall narrative.',
                'Audio Integration: Implemented background music and sound effects using the Web Audio API, synchronized with user interactions.',
                'Performance & Device Optimization: Tuned rendering settings, interaction handling, and asset loading to ensure stable performance on desktop and mobile devices.'
            ],

            challenges: [
                'Balancing Emotion and Technical Clarity: Ensuring the experience conveyed intimacy and warmth without sacrificing usability or performance.',
                'Real-time Performance: Managing post-processing effects, particle animations, and interactions while maintaining smooth frame rates.',
                'Cross-device Input Handling: Supporting mouse, touch, and gesture controls within a single interaction system.',
                'Scalability of Memories: Designing the system to accommodate additional photos without overwhelming the visual space.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/MinYuOuO.github.io'
            },
            {
                type: 'live',
                url: 'https://minyuouo.github.io/stellarEchoes.html'
            }
        ],

        link: 'https://minyuouo.github.io/stellarEchoes.html'
    },
    {
        id: 'travel-calculator',
        title: 'Travel Calculator App — OOP-based Trip Cost Planner',
        type: 'Desktop Application',
        stack: [
            'C++',
            'Object-Oriented Programming',
            'STL',
            'CLI / Console UI',
            'Git & GitHub'
        ],
        shortDesc:
            'A C++ object-oriented travel cost calculator that helps users estimate trip expenses using modular OOP design, multiple calculation modes',

        // Template supports ONE media type.
        // Replace with your actual YouTube presentation video ID.
        media: {
            type: 'youtube',
            content: 'PASTE_YOUR_YOUTUBE_PRESENTATION_VIDEO_ID_HERE'
        },

        introduction:
            'The Travel Calculator App is an object-oriented C++ application developed to apply OOP principles to a real-world problem: estimating and planning travel expenses. The system emphasizes modular design, extensibility, and clean separation of responsibilities while providing an intuitive console-based user experience.',

        details: {
            overview:
                'This project was developed as part of an Object-Oriented Programming assignment and iteratively refined through multiple versions, culminating in a stable v2.0.0 release. The application decomposes travel planning into reusable classes responsible for transport, accommodation, food, and miscellaneous costs, demonstrating abstraction, encapsulation, and polymorphism in practice.',

            features: [
                'Modular Cost Calculation: Separates transport, accommodation, food, and additional expenses into dedicated classes.',
                'Object-Oriented Architecture: Applies encapsulation, inheritance, and polymorphism to manage calculation logic cleanly.',
                'User-driven Input Flow: Guides users through structured input steps with validation to reduce calculation errors.',
                'Extensible Design: Allows new cost categories or pricing rules to be added without modifying core logic.',
                'Versioned Release (v2.0.0): Improved structure, refined calculations, and clearer user prompts compared to earlier iterations.'
            ],

            responsibilities: [
                'Team Lead & Design Coordinator: Led the project direction, coordinated development tasks, and ensured alignment with OOP learning objectives.',
                'Core Architecture Planning: Defined the class structure and responsibility boundaries for cost calculation modules.',
                'Implementation Support: Contributed to core logic development and assisted teammates in resolving design and implementation issues.',
                'Code Review & Integration: Reviewed team contributions, merged features, and resolved integration conflicts.',
                'Testing & Validation Oversight: Coordinated testing of calculation accuracy and ensured stable behavior prior to the v2.0.0 release.'
            ],

            challenges: [
                'Applying OOP to a Real-world Scenario: Translating abstract OOP principles into a practical travel-planning workflow.',
                'Balancing Simplicity and Flexibility: Keeping the console UI easy to use while maintaining extensible class design.',
                'Team Coordination: Managing contributions from multiple developers and integrating features consistently.',
                'Iterative Refactoring: Refactoring early code to improve structure and maintainability for the final release.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/Travel-Calculator-App'
            },
            {
                type: 'live',
                url: 'https://github.com/MinYuOuO/Travel-Calculator-App/releases/tag/v2.0.0'
            }
        ],

        link: 'https://github.com/MinYuOuO/Travel-Calculator-App'
    },
    {
        id: 'colorella-ticketing',
        title: 'Colorella Event — Ticketing & Finance Management System',
        type: 'Internal Event System',
        stack: [
            'Python',
            'Tkinter',
            'Google Sheets API',
            'gspread',
            'pandas',
            'Threading (Async UI)'
        ],
        shortDesc:
            'A custom-built ticketing and attendance management system developed for the Colorella: Bazaar of Colors event, supporting tiered ticket sales, payment review, and real-time attendance tracking for a large-scale student festival.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/ZnFMY38Z/Colorella-Ticketing-System.png'
            ]
        },

        introduction:
            'Colorella is a large-scale student-led cultural festival involving multiple universities, vendors, and charitable partners. As SRC Treasurer, I designed and implemented a dedicated ticketing system to manage registrations, ticket tiers, payments, and attendance, ensuring financial transparency and smooth on-site operations.',

        details: {
            overview:
                'The Colorella Ticketing System was created to replace manual spreadsheet workflows with a structured, reliable desktop application. Using Google Sheets as a shared backend, the system synchronizes registration data from Google Forms, enforces tier caps, prevents duplicate registrations, and provides fast tools for payment approval and attendance marking during the event.',

            features: [
                'Google Forms Ingestion: Automatically syncs and processes registration responses from one or multiple Google Sheets.',
                'Tiered Ticket Management: Supports Early Bird, Mid Batch, and Last Chance tiers with participant caps and automatic waitlisting.',
                'De-duplication Logic: Identifies duplicate registrations by email and assigns tier position and confirmation status.',
                'Payment Review Workflow: Allows treasurers to open payment proof links and approve or reject payments directly from the UI.',
                'Attendance Tracking: Provides searchable participant records with one-click attendance marking during event check-in.',
                'Responsive Desktop UI: Uses background threads and batched I/O to ensure the Tkinter interface never blocks during sync operations.',
                'Structured OOP Architecture: Separates gateway, repository, service, and UI layers for maintainability and clarity.'
            ],

            responsibilities: [
                'SRC Treasurer & Finance Lead: Oversaw ticket pricing strategies, revenue tracking, and financial transparency for the event.',
                'System Architect & Developer: Designed and implemented the complete ticketing system, from Google Sheets integration to the desktop UI.',
                'Tier & Pricing Logic Design: Implemented tier caps, discounts (EduCity, volunteer), and confirmation/waitlist rules aligned with the approved event proposal.',
                'Operational Support: Used the system during live event operations to manage check-in, attendance, and payment verification.',
                'Cross-team Coordination: Worked closely with publicity, security, and guest check-in teams to ensure ticketing data matched on-site workflows.',
                'Data Integrity & Auditability: Ensured consistent records for participants, payments, and attendance to support post-event financial reporting.'
            ],

            challenges: [
                'Scaling for Large Participation: Designing a system capable of handling hundreds of registrations across multiple universities.',
                'Real-time Event Constraints: Ensuring fast search and attendance marking during peak check-in periods.',
                'Preventing Data Inconsistencies: Managing concurrent updates to shared Google Sheets while maintaining reliable state.',
                'Bridging Technical & Non-technical Users: Creating a UI usable by SRC members without programming background.'
            ]
        },

        showcase: [
            {
                type: 'info',
                url: 'https://share.google/aimode/FuksYKCE3dbNmDNIx'
            },
        ],

        link: ''
    },
    {
        id: 'student-score-management',
        title: 'Student Score Management System',
        type: 'Console Application',
        stack: [
            'Python',
            'Object-Oriented Programming',
            'File I/O (TXT)',
            'PrettyTable',
            'CLI Interface'
        ],
        shortDesc:
            'A Python-based student score management system that allows teachers to input, manage, sort, and analyze student academic records using a structured object-oriented design.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/sx9pG40y/SSMS.png'
            ]
        },

        introduction:
            'The Student Score Management System is a console-based Python application developed to support teachers in managing and analyzing student academic records. It provides essential CRUD operations, sorting, and basic analytics through a clear object-oriented structure and persistent file storage.',

        details: {
            overview:
                'Developed as a coursework project for Principles of Computer Programming, this system focuses on applying fundamental programming and object-oriented concepts to a real-world educational scenario. The application separates core logic and user interaction into multiple modules, using text files as a lightweight persistence layer to store student records.',

            features: [
                'Student Record CRUD: Allows users to create, search, modify, and delete student records stored in a text-based database.',
                'Object-Oriented Data Model: Implements a Student class to encapsulate student attributes and related behaviors.',
                'Input Validation: Validates score inputs to prevent invalid or out-of-range data from being stored.',
                'Sorting & Analysis: Supports sorting student records by subject scores in ascending or descending order.',
                'Summary Statistics: Calculates and displays the total number of students in the system.',
                'Formatted Output: Uses PrettyTable to display student data in a clean, readable tabular format within the console.'
            ],

            responsibilities: [
                'Sole Developer: Designed and implemented the entire system independently, from requirement analysis to final testing.',
                'System Architecture Design: Structured the project into separate modules (main menu and score management logic) for clarity and maintainability.',
                'OOP Implementation: Designed the Student class and related methods to apply encapsulation and abstraction.',
                'File-based Persistence: Implemented text file read/write logic to store and retrieve student records reliably.',
                'Testing & Debugging: Conducted manual testing for all core workflows, including insertion, modification, sorting, and deletion of records.',
                'Documentation: Produced complete technical documentation explaining algorithms, data structures, and testing scenarios.'
            ],

            challenges: [
                'Managing Data Consistency: Ensuring file-based data remained consistent after multiple modify and delete operations.',
                'Applying OOP Concepts Correctly: Translating abstract OOP principles into a functional, beginner-friendly system design.',
                'Input Validation & Error Handling: Preventing invalid data types and values from breaking program flow.',
                'Balancing Simplicity and Functionality: Keeping the system easy to understand while supporting multiple management features.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/Student-Score-Management'
            }
        ],

        link: 'https://github.com/MinYuOuO/Student-Score-Management'
    },
    {
        id: 'bmi-calculator-se',
        title: 'BMI Calculator — Software Engineering Assignment',
        type: 'Desktop Application',
        stack: [
            'Python',
            'Tkinter',
            'Software Engineering Practices',
            'Git & GitHub',
            'Modular Design'
        ],
        shortDesc:
            'A Python Tkinter-based BMI calculator that computes and categorizes Body Mass Index with robust input validation, iterative refinement, and modular architecture following software engineering principles.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/59Tcsq0H/lteration4.png'
            ]
        },

        introduction:
            'This project is a BMI (Body Mass Index) calculator developed as part of the Raffles University BAI21113 Software Engineering course. It provides a simple graphical interface for users to input height and weight, calculates BMI in real time, and classifies the result into standard health categories.',

        details: {
            overview:
                'The BMI Calculator was developed through multiple structured iterations to demonstrate the application of software engineering methodologies, including modularization, error handling, version control workflows, and iterative improvement. The project separates UI logic from computation logic and emphasizes maintainability, clarity, and correctness.',

            features: [
                'Graphical User Interface: Built with Tkinter for an intuitive desktop-based user experience.',
                'Accurate BMI Calculation: Computes BMI using validated height and weight inputs.',
                'Health Category Classification: Categorizes results into Underweight, Normal, Overweight, or Obesity.',
                'Robust Input Validation: Prevents invalid, non-numeric, or zero-height inputs from producing errors.',
                'Modular Code Structure: Separates BMI calculation logic into independent modules for maintainability.',
                'Readable Result Display: Enhanced UI text styling and layout for clarity.'
            ],

            responsibilities: [
                'Primary Developer: Designed and implemented the full BMI calculator system independently.',
                'Requirement Interpretation: Translated assignment requirements into functional UI and logic components.',
                'Iterative Development: Delivered the project through multiple iterations, progressively improving correctness, usability, and structure.',
                'Error Handling Implementation: Added validation logic to handle invalid inputs and prevent runtime errors.',
                'Modularization & Refactoring: Extracted calculation logic into separate modules to improve code organization.',
                'Version Control Management: Used Git branching and pull requests to manage features, fixes, and documentation updates.'
            ],

            challenges: [
                'Handling Invalid User Input: Ensuring numerical validation and preventing division-by-zero errors.',
                'Maintaining Correct Calculations: Fixing logic errors related to incorrect height handling across iterations.',
                'Balancing Simplicity and Structure: Keeping the application beginner-friendly while applying proper software engineering practices.',
                'Iteration Management: Correcting earlier commits and ensuring documentation accurately reflected code changes.'
            ]
        },

        showcase: [
            {
                type: 'github',
                url: 'https://github.com/MinYuOuO/SE-Assignment'
            }
        ],

        link: 'https://github.com/MinYuOuO/SE-Assignment'
    },
    {
        id: 'internet-penetration-analysis',
        title: "Data Processing & Visualization — Malaysia's Internet Penetration Analysis (2000–2023)",
        type: 'Data Analysis',
        stack: [
            'Python',
            'pandas',
            'NumPy',
            'Matplotlib',
            'Seaborn',
            'Jupyter Notebook'
        ],
        shortDesc:
            "A data processing and visualization project comparing Malaysia’s internet penetration growth (2000–2023) against selected countries using cleaned World Bank data and multiple visual analytics (trend lines, bar charts, heatmaps, correlation matrix).",

        media: {
            type: 'youtube',
            content: 'FEO8kZxSLHQ'
        },

        introduction:
            "This project analyzes how Malaysia’s internet penetration rate evolved from 2000 to 2023 and compares it with the UK, US, Germany, China, Russia, Japan, Indonesia, and Thailand. The workflow focuses on end-to-end data acquisition, cleaning, transformation, and visualization to identify growth trends, gaps, and correlations across countries.",

        details: {
            overview:
                "Using World Bank Open Data (Individuals using the Internet % of population), we filtered relevant countries and years, handled missing values via forward/backward filling, removed duplicates (precautionary), treated outliers outside 0–100%, transformed the dataset from wide to tidy long format, and encoded countries for analysis. Visualizations include trend comparisons, 2023 snapshots, growth-rate heatmaps, and a correlation matrix to summarize relationships in adoption patterns",

            features: [
                'Data Acquisition & Filtering: Loaded World Bank dataset and filtered selected countries and years (2000–2023).',
                'Missing Value Treatment: Reduced missing values after filtering and filled remaining gaps using forward/backward fill.',
                'Outlier Detection & Cleaning: Converted to numeric and removed invalid penetration values (<0% or >100%).',
                'Data Reshaping: Melted wide-format year columns into a tidy long-format dataset (Country–Year–Usage).',
                'Country Encoding: Added numeric country IDs for modeling and consistent visualization.',
                'Multi-chart Analytics: Built line charts for trends, bar charts for 2023 comparison, heatmaps for growth rate, and correlation matrix for relationships.'
            ],

            responsibilities: [
                'Co-author & Analyst: Conducted end-to-end data preparation and visualization for the comparative study.',
                'Data Cleaning Pipeline: Implemented missing value handling, duplicate checks, and outlier treatment to ensure valid ranges.',
                'Data Transformation: Converted the dataset into analysis-friendly long format and created encoded identifiers for countries.',
                'Visualization Development: Produced the core charts (trend line, 2023 bar comparison, growth heatmap, correlation matrix) and interpreted key patterns.',
                'Insight Writing: Summarized findings and limitations (e.g., incomplete early-year data and correlation not implying causation).'
            ],

            challenges: [
                'Handling Sparse Historical Data: Early-year missing values required careful fill strategies after filtering.',
                'Ensuring Valid Ranges: Internet penetration must remain within 0–100%, so outlier treatment was necessary.',
                'Avoiding Misinterpretation: Correlation analysis highlights relationships but does not prove causation.',
                'Communicating Complex Trends: Selecting visualizations that clearly explain long-term adoption patterns across multiple countries.'
            ]
        },

        showcase: [
            // Add your repo / notebook link if you have one
            // { type: 'info', url: '' },

            // If you want the PPT as a showcase item, host it and paste the link:
            { type: 'demo', url: 'https://youtu.be/FEO8kZxSLHQ' }
        ]
    },
    {
        id: 'food-waste-eda',
        title: 'Exploratory Data Analysis — Food Waste at Mamak Eateries',
        type: 'Data Analytics',
        stack: [
            'Python',
            'pandas',
            'NumPy',
            'Matplotlib',
            'Seaborn',
            'Jupyter Notebook'
        ],
        shortDesc:
            'An exploratory data analysis project examining pre-consumer food waste at mamak eateries, using cleaned and simulated datasets derived from real interviews to uncover waste patterns and operational inefficiencies.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/FsVfyRFs/Power-BI-Mamak-Eateries.png'
            ]
        },

        introduction:
            'This EDA project analyzes pre-consumer food waste in mamak eateries to understand how customer volume and food preparation practices influence wastage levels. Interview data collected from actual operators was transformed into a simulated quantitative dataset and explored using Python-based data analytics and visualization techniques.',

        details: {
            overview:
                'Conducted as part of the BDS 23114 Data Analytics course, the project follows a complete EDA workflow: data understanding, cleaning, transformation, statistical summarization, and visualization. The study focuses on key variables such as daily customers, servings per item, staff per shift, and pre-consumer waste percentage to identify trends and correlations that inform operational recommendations.',

            features: [
                'Data Cleaning & Validation: Checked for missing values and duplicates, and removed outliers using the IQR method.',
                'Feature Engineering: Grouped daily customer counts into Low, Medium, and High categories for comparative analysis.',
                'Descriptive Statistics: Computed mean, median, standard deviation, and range to summarize operational variables.',
                'Histogram Analysis: Visualized the distribution of pre-consumer waste percentages to identify skewness and common ranges.',
                'Correlation Heatmap: Analyzed relationships between customer volume, servings per item, and waste percentage.',
                'Comparative Visualization: Compared waste levels across different customer load groups using bar charts with variability indicators.'
            ],

            responsibilities: [
                'Data Analyst & Co-author: Contributed to dataset design, cleaning, exploratory analysis, and interpretation of results.',
                'EDA Pipeline Implementation: Executed data preprocessing, statistical summaries, and visualization using Python.',
                'Visualization Development: Created core plots including histograms, correlation heatmaps, and grouped waste comparisons.',
                'Insight Generation: Interpreted analytical results to derive actionable operational insights and recommendations.',
                'Reporting & Presentation: Assisted in preparing the written report and final poster summarizing methodology, findings, and conclusions.'
            ],

            challenges: [
                'Limited Real-world Data Volume: Worked with a small simulated dataset derived from interviews, requiring careful interpretation.',
                'Outlier Sensitivity: Ensured that extreme values did not distort trends by applying IQR-based filtering.',
                'Avoiding Over-interpretation: Treated correlations cautiously, recognizing that correlation does not imply causation.',
                'Communicating Insights Clearly: Translating statistical patterns into practical, actionable recommendations for operators.'
            ]
        },

        showcase: [
            // Optional: add a GitHub repo or notebook link if available
            { type: 'info', url: 'https://colab.research.google.com/drive/1QqTAhM5hGkFpGegCzdgVfixNcCNy_1W0?usp=sharing' }
        ]
    },
    {
        id: 'telco-churn-malaysia',
        title: 'Data Mining & Warehousing — Telecom Customer Churn in Malaysia',
        type: 'Data Mining & Decision Support System',
        stack: [
            'Python',
            'scikit-learn',
            'pandas',
            'Orange Data Mining',
            'Tkinter',
            'CSV-based Data Warehouse'
        ],
        shortDesc:
            'A data mining and data warehousing project that builds a Malaysia-contextualized telecom churn dataset, evaluates multiple predictive models, and deploys a desktop decision-support prototype for churn prediction.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/kGfm5kCN/Telecom_Churn_Predictor_Exe.png'
            ]
        },

        introduction:
            'This project analyzes customer churn in the Malaysian telecommunications sector by constructing a realistic, Malaysia-contextualized dataset and applying data mining techniques to predict churn. Multiple models are evaluated and integrated into a desktop decision-support system that provides churn probabilities and retention recommendations.',

        details: {
            overview:
                'Developed for the BDS23124 Data Mining and Data Warehousing course, the project combines data warehousing design, exploratory data analysis, and predictive modeling. A synthetic but realistic dataset was generated using global churn data, Malaysian demographic distributions (DOSM), and telecom statistics, structured into three relational tables and later merged for modeling.',

            features: [
                'Relational Data Warehouse Design: Designed Customer Master, Usage Transaction, and Churn Decision tables to reflect real telecom operations.',
                'Malaysia-contextualized Data Generation: Shaped synthetic data using DOSM population distribution and national telecom statistics.',
                'Comprehensive EDA: Performed statistical and visual EDA on demographics, usage patterns, payment behavior, and churn outcomes.',
                'Multi-model Data Mining: Implemented Decision Tree, Random Forest, and Logistic Regression models for churn prediction.',
                'Model Evaluation & Comparison: Evaluated models using accuracy, precision, recall, F1-score, and ROC/AUC in both Python and Orange.',
                'Decision-support Prototype: Built a Tkinter-based GUI that allows users to input customer data and receive churn probability, label, and retention tier.'
            ],

            responsibilities: [
                'Dataset Design & Generation: Co-designed the synthetic Malaysia-specific churn dataset and implemented feature distributions aligned with real demographics.',
                'Data Warehousing Structure: Structured and validated relational tables and merged datasets for modeling and analysis.',
                'EDA & Insight Extraction: Conducted exploratory analysis to validate realism and uncover churn-related behavioral patterns.',
                'Model Development & Evaluation: Implemented and compared Logistic Regression, Random Forest, and Decision Tree models in Python and Orange.',
                'System Prototype Development: Integrated trained models into a Tkinter-based desktop application for churn prediction and retention decision support.',
                'Technical Reporting: Authored major sections of the final report covering methodology, results, and system design.'
            ],

            challenges: [
                'Realism of Synthetic Data: Ensuring generated data accurately reflected Malaysian telecom demographics and usage behavior.',
                'Model Comparison Fairness: Reconciling differences between Python train-test splits and Orange cross-validation results.',
                'Balancing Interpretability and Accuracy: Selecting models that offer both predictive power and business interpretability.',
                'System Integration: Bridging data mining outputs with a usable desktop decision-support interface.'
            ]
        },

        showcase: [
            // Optional: add repo / notebook if hosted
            // { type: 'github', url: 'PASTE_REPO_URL_HERE' }
            { type: 'info', url: 'https://colab.research.google.com/drive/1rND6DuffaajBer8j4GUiCMip2_VEeaKa?usp=sharing' }
        ]
    },
    {
        id: 'uiux-unifi-tv-redesign',
        title: 'UI/UX Interface Redesign — Unifi TV Box',
        type: 'UI/UX Design',
        stack: [
            'Figma',
            'User Persona',
            'User Story Mapping',
            'User Journey',
            'Information Architecture',
            'Wireframing & Prototyping'
        ],
        shortDesc:
            'A comprehensive UI/UX redesign of the Unifi TV Box interface, focusing on accessibility, simplified navigation, and remote-friendly interaction through user personas, user stories, wireframes, and an interactive prototype.',

        media: {
            type: 'youtube',
            content: 'OHjgUJ5DjpQ'
        },

        introduction:
            'This project redesigns the Unifi TV Box interface to improve usability for Malaysian IPTV users, particularly middle-aged and less tech-savvy audiences. The redesign emphasizes clarity, minimal navigation steps, and large, legible UI elements suitable for TV viewing distances and remote-control interaction.',

        details: {
            overview:
                'Developed for ADE22074 UI/UX Analysis (Assignment 2), the project follows a full user-centered design process. The team analyzed the existing Unifi TV Box interface, identified usability issues, and proposed an improved design using personas, empathy maps, user stories, information architecture, and multiple design variations before finalizing a polished prototype.',

            features: [
                'User Persona Development: Created realistic personas (e.g., Ahmad Firdaus, a working technician) to represent primary user groups.',
                'User Story Mapping: Defined common TV usage scenarios such as searching content, watching with family, and managing settings.',
                'User Journey Mapping: Visualized end-to-end user interactions to identify friction points and improvement opportunities.',
                'Information Architecture: Designed a clear navigation flow optimized for remote-based interaction.',
                'Wireframes & Design Variations: Produced low-fidelity wireframes and three visual design styles before selecting a final direction.',
                'Final UI Design: Delivered a high-fidelity interface with large typography, strong contrast, and simplified layout.',
                'Interactive Prototype: Built a clickable Figma prototype and demo video showcasing the redesigned experience.'
            ],

            responsibilities: [
                'UI/UX Designer & Research Contributor: Contributed to interface analysis, persona definition, and UX rationale.',
                'User Persona & Story Development: Helped define user personas, user stories, and daily usage scenarios to guide design decisions.',
                'Interaction Flow Design: Assisted in mapping navigation flow, content hierarchy, and interaction logic.',
                'Design Iteration & Refinement: Participated in wireframing, design variation evaluation, and final UI refinement.',
                'Reflection & Documentation: Authored individual reflection focusing on accessibility, clarity, and teamwork outcomes.'
            ],

            challenges: [
                'Designing for TV Constraints: Adapting UI/UX principles for large screens and remote-control input instead of touch.',
                'Balancing Simplicity and Functionality: Reducing visual clutter while preserving essential IPTV features.',
                'User Diversity: Designing an interface usable by both tech-savvy users and older or less experienced users.',
                'Iterative Consistency: Maintaining alignment across multiple design variations and final mockups.'
            ]
        },

        showcase: [
            {
                type: 'figma',
                url: 'https://www.figma.com/design/GIst9HOpXmD8OJt5RSNwuR/Unifi-TV-Box'
            },
            {
                type: 'demo',
                url: 'https://youtu.be/OHjgUJ5DjpQ'
            }
        ]
    },
    {
        id: 'smart-rain-alert-hci',
        title: 'Smart Rain Alert System — HCI & IoT Interactive Prototype',
        type: 'HCI / IoT System',
        stack: [
            'ESP32',
            'HW-038 Rain Sensor',
            'IoT Prototyping',
            'Figma',
            'User-Centered Design',
            'Survey Analysis'
        ],
        shortDesc:
            'An HCI-focused IoT rain detection system that delivers real-time alerts using visual LEDs, audio buzzers, and a mobile interface, designed through user research and usability testing.',

        media: {
            type: 'images',
            content: [
                'https://i.postimg.cc/htgK0byZ/HCI_Presentation.png'
            ]
        },

        introduction:
            'The Smart Rain Alert System is an IoT-based interactive system designed to provide immediate rainfall alerts through visual, audio, and digital feedback. Developed for a Human-Computer Interaction course, the project emphasizes user-centered design, accessibility, and timely environmental awareness.',

        details: {
            overview:
                'This project integrates hardware sensors with interaction design to explore how environmental data can be communicated effectively to users. Using an ESP32 microcontroller and HW-038 rain sensor, the system detects rainfall intensity and communicates status through LED colors, buzzer alerts, and a companion mobile interface designed in Figma. User surveys and public demonstrations were conducted to evaluate usability and preferences.',

            features: [
                'Real-time Rain Detection: Uses HW-038 water sensor to detect rainfall onset and intensity.',
                'Multi-modal Feedback: Communicates rain status through colored LEDs (green, yellow, red), buzzer sounds, and visual alerts.',
                'Rain Level Logic: Categorizes rain into No Rain, Warning, Small Rain, and Heavy Rain using threshold-based logic.',
                'User Preference Integration: Alert frequency and feedback modes informed by survey responses from 21 participants.',
                'Mobile Interface Prototype: Designed a companion control and notification interface using Figma.',
                'Physical Demonstration Model: Implemented within a house model to simulate real household usage scenarios.',
                'Public Exhibition Testing: Demonstrated the system at Brainwave Plaza to gather real user feedback.'
            ],

            responsibilities: [
                'Co-designer & Developer: Contributed to system concept, interaction design, and overall implementation.',
                'HCI Research & User Study: Designed and analyzed user preference surveys focusing on alert visibility, frequency, and usability.',
                'Interaction Logic Design: Helped define rain-level thresholds and corresponding feedback behaviors.',
                'UI/UX Prototyping: Created Figma wireframes illustrating system control, notification flow, and tutorial screens.',
                'Presentation & Demonstration: Participated in system setup, live demonstrations, and user feedback collection during exhibition.'
            ],

            challenges: [
                'Sensor Sensitivity: HW-038 sensor detected small water amounts as high rainfall, leading to overestimation.',
                'Clarity of LED Indicators: Users required clearer mapping between LED colors and rain severity.',
                'Balancing Alert Frequency: Avoiding excessive notifications while ensuring timely warnings.',
                'Hardware–UX Alignment: Translating raw sensor data into meaningful, user-friendly feedback.'
            ]
        },

        showcase: [
            {
                type: 'figma',
                url: 'https://www.figma.com/proto/YTjfsQGR3AL6Wvp1oU49jS/HCI-interface-design'
            }
        ]
    }
];

window.projectsData = projectsData;
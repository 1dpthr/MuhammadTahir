import resumeFile from './assets/Muhammad_Tahir_Resume.pdf';
import cForEveryone from './assets/Certificates/C for Everyone Programming Fundamentals.pdf';
import cppEssentials from './assets/Certificates/CPA Programming Essentials in C++.pdf';
import dataStructures from './assets/Certificates/Data Structures.pdf';
import designPatterns from './assets/Certificates/Design Patterns.pdf';
import gameDevelopment from './assets/Certificates/Game Development.pdf';
import softwareEngineering from './assets/Certificates/Introduction to Software Engineering.pdf';
import objectOrientedDataStructures from './assets/Certificates/Object-Oriented Data Structures in C++.pdf';
import operatingSystems from './assets/Certificates/Operating Systems Basics.pdf';
import treesAndGraphs from './assets/Certificates/Trees and Graphs Basics.pdf';

// Portfolio data
export const portfolioData = {
  name: "Muhammad Tahir",
  title: "Software Engineer & Creative Developer",
  subtitle: "Software Engineering Student | Web, Mobile & Unity Developer",
  description: "Software Engineering student building responsive web applications, cross-platform mobile apps, and interactive games. I work with React, Node.js, Flutter, C++, C#, and Unity to turn ideas into practical digital products.",
  email: "tahiramanat21@gmail.com",
  resume: resumeFile,

  certificates: [
    { title: 'Data Structures', issuer: 'University of California San Diego', issueDate: 'Jan 2024', file: dataStructures, detail: 'Essential structures for organizing and processing data efficiently.' },
    { title: 'Trees and Graphs: Basics', issuer: 'University of Colorado Boulder', issueDate: 'Jan 2024', file: treesAndGraphs, detail: 'Tree and graph structures, traversal, and practical applications.' },
    { title: 'Design Patterns', issuer: 'University of Alberta', issueDate: 'Dec 2023', file: designPatterns, detail: 'Reusable software design solutions for maintainable applications.' },
    { title: 'Introduction to Software Engineering', issuer: 'IBM', issueDate: 'Nov 2023', file: softwareEngineering, detail: 'Software development practices, processes, and engineering principles.' },
    { title: 'Object-Oriented Data Structures in C++', issuer: 'University of Illinois at Urbana-Champaign', issueDate: 'May 2023', file: objectOrientedDataStructures, detail: 'Object-oriented approaches to implementing and using data structures.' },
    { title: 'CPA: Programming Essentials in C++', issuer: 'Cisco Networking Academy / C++ Institute', issueDate: 'May 2023', file: cppEssentials, detail: 'Core C++ programming concepts and object-oriented techniques.' },
    { title: 'C for Everyone: Programming Fundamentals', issuer: 'University of California, Santa Cruz', issueDate: 'Jan 2023', file: cForEveryone, detail: 'Programming fundamentals, syntax, and problem-solving with C.' },
    { title: 'Game Development', issuer: 'Zaff Institute', issueDate: 'Sep 2022', file: gameDevelopment, detail: 'Foundations of game development, gameplay systems, and production.' },
    { title: 'Operating Systems Basics', issuer: 'Cisco Networking Academy / Riphah International University', issueDate: 'May 2026', file: operatingSystems, detail: 'Core operating system concepts, processes, memory, and file systems.' }
  ],
  
  social: {
    github: "https://github.com/1dpthr",
    linkedin: "https://www.linkedin.com/in/dpthr/",
    instagram: "https://www.instagram.com/dp.thr/",
    email: "mailto:tahiramanat21@gmail.com"
  },

  about: {
    intro: [
      "I'm Muhammad Tahir, a Software Engineering student focused on building useful and engaging digital experiences. My portfolio combines full-stack web development, cross-platform mobile apps, Unity games, and user-centered interface design.",
      "I have worked with React.js and Vite on front-end experiences, Node.js and Express on backend APIs, Flutter for mobile development, and C++ and C# for software and game projects. My work also includes Figma prototypes, database systems, and computer vision experiments with OpenCV and MediaPipe.",
      "Through academic projects, internships, and independent work, I'm developing the skills to design, build, and improve software from idea to implementation. I value clear interfaces, efficient code, and continuous learning."
    ],
    cards: [
      {
        icon: "education",
        title: "Education",
        description: "Currently pursuing Software Engineering degree, building strong fundamentals in computer science."
      },
      {
        icon: "mission",
        title: "Mission",
        description: "To build practical software that combines reliable engineering with clear, user-friendly experiences."
      },
      {
        icon: "focus",
        title: "Current Focus",
        description: "Building stronger full-stack, Flutter, Unity, and computer vision projects while deepening my software engineering fundamentals."
      }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      items: ["C++", "Java", "Python", "JavaScript", "Dart", "C#"]
    },
    {
      category: "Frontend",
      icon: "frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: "backend",
      items: ["Node.js", "Express", "MongoDB", "SQLite", "MySQL", "Firebase", "REST APIs", "Spring Boot"]
    },
    {
      category: "Mobile Development",
      icon: "smartphone",
      items: ["Flutter", "Dart", "Firebase", "Cross-Platform Development"]
    },
    {
      category: "Game Development",
      icon: "software",
      items: ["Unity", "C#", "2D Game Development", "3D Game Development", "Game Physics", "Level Design"]
    },
    {
      category: "Tools & Platforms",
      icon: "tools",
      items: ["GitHub", "Git", "VS Code", "Figma", "Docker", "Maven"]
    },
    {
      category: "UI/UX & Design",
      icon: "design",
      items: ["Figma", "UI Design", "Prototyping", "User Experience"]
    },
    {
      category: "Media & Content",
      icon: "media",
      items: ["Adobe Photoshop", "Adobe Premiere Pro", "Video Editing", "Content Creation"]
    },
    {
      category: "Computer Vision & AI",
      icon: "camera",
      items: ["MediaPipe", "OpenCV", "TensorFlow", "Hand Tracking", "Gesture Recognition"]
    },
    {
      category: "Operating Systems",
      icon: "server",
      items: ["Memory Management", "Process Scheduling", "IPC", "Distributed Systems"]
    }
  ],

  experience: [
    {
      company: "Softech Digital Group",
      role: "Software Engineering Intern",
      duration: "October 2025 – December 2025",
      icon: "briefcase",
      certificate: "assets/Softech Digital Internship.png",
      responsibilities: [
        {
          title: "Front-End Development",
          description: "Developed the user interface for 'Fit Kro,' a fitness-focused application using React.js."
        },
        {
          title: "UI/UX Design",
          description: "Designed a comprehensive Figma prototype for 'Style Sathi,' an e-commerce platform."
        },
        {
          title: "Compliance",
          description: "Handled sensitive company data and original codebases according to NDA protocols."
        },
        {
          title: "Collaboration",
          description: "Completed probationary period and contributed to the company's digital product portfolio."
        }
      ],
      skills: ["React.js", "HTML5", "CSS3", "JavaScript", "Figma", "UI/UX Design"]
    },
    {
      company: "Code Alpha",
      role: "Backend Developer Intern",
      duration: "July 1, 2026 – July 31, 2026",
      icon: "briefcase",
      certificate: "assets/Code Alpha Internship.pdf",
      lor: "assets/Code Alpha LOR.pdf",
      responsibilities: [
        {
          title: "Backend API Development",
          description: "Designed and implemented RESTful APIs for web applications using Node.js and Express."
        },
        {
          title: "Database Management",
          description: "Worked with MongoDB for data modeling, querying, and database optimization."
        },
        {
          title: "Server-Side Logic",
          description: "Developed server-side business logic and middleware for request processing and authentication."
        },
        {
          title: "Collaboration & Deployment",
          description: "Collaborated with frontend team to integrate APIs and participated in deployment workflows."
        }
      ],
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "JavaScript", "Git"]
    }
  ],

  services: [
    {
      icon: "software",
      title: "Software Development",
      description: "Custom software solutions built with modern technologies and best practices.",
      features: ["Desktop Applications", "Algorithm Optimization", "Code Review"]
    },
    {
      icon: "web",
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with the latest technologies.",
      features: ["Frontend Development", "Responsive Design", "Web Performance"]
    },
    {
      icon: "software",
      title: "Game Development",
      description: "Interactive games developed with Unity for engaging 2D and 3D player experiences.",
      features: ["Unity Development", "Gameplay Systems", "UI for Games"]
    },
    {
      icon: "design",
      title: "UI/UX Design",
      description: "User-centered design solutions that create engaging and intuitive experiences.",
      features: ["Prototyping", "User Interface Design", "Design Systems"]
    },
    {
      icon: "content",
      title: "Content Creation",
      description: "Professional video editing and content creation services for digital platforms.",
      features: ["Video Editing", "Motion Graphics", "Brand Content"]
    },
    {
      icon: "mobile",
      title: "Mobile App Development",
      description: "Cross-platform mobile applications built with Flutter for Android and iOS.",
      features: ["Flutter Development", "Cross-Platform Apps", "Mobile UI Design"]
    },
    {
      icon: "ai",
      title: "AI & Computer Vision",
      description: "Computer vision solutions leveraging machine learning for gesture recognition and drawing.",
      features: ["Hand Tracking", "Shape Recognition", "Real-time Processing"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Personal Portfolio",
      type: "Personal Website",
      role: "Creator",
      icon: "personal",
      description: "My personal portfolio website showcasing selected projects, resume, and contact information. Built to present work and experiments in modern web development.",
      technologies: ["React.js", "Vite", "CSS3", "Responsive Design"],
      links: {
        web: "https://1dpthr.github.io/MuhammadTahir/",
        github: "https://github.com/1dpthr/MuhammadTahir"
      }
    },
    {
      id: 2,
      title: "VehicleHub",
      type: "Web App",
      role: "Full Stack Developer",
      icon: "vehiclehub",
      description: "Semester project for Web Programming course — a vehicle listing and management system with search, filters, and CRUD functionality.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "MongoDB"],
      links: {
        web: "https://1dpthr.github.io/VehicleHub/",
        github: "https://github.com/1dpthr/VehicleHub"
      }
    },
    {
      id: 3,
      title: "Fit Kro",
      type: "Web & Mobile App",
      role: "Front-End Developer",
      icon: "fitkro",
      description: "Fitness-focused application developed during internship. Features responsive web and mobile interfaces using React.js.",
      technologies: ["React.js", "HTML5", "CSS3"],
      links: {
        web: "https://1dpthr.github.io/Fit-Kro/",
        mobile: "https://1dpthr.github.io/Fit-Kro-Mob/"
      }
    },
    {
      id: 4,
      title: "Style Sathi",
      type: "UI/UX Design",
      role: "UI/UX Designer",
      icon: "stylesathi",
      description: "Comprehensive e-commerce platform prototype created during internship. Includes customer, seller, and admin interfaces.",
      technologies: ["Figma", "Prototyping", "UI/UX Design"],
      links: {
        customer: "https://www.figma.com/proto/lOtS5XICaEG3Wc3UjokG1l/Style-Sathi-Customer-View",
        seller: "https://www.figma.com/proto/lOtS5XICaEG3Wc3UjokG1l/Style-Sathi-Seller-View",
        admin: "https://www.figma.com/proto/lOtS5XICaEG3Wc3UjokG1l/Style-Sathi-Admin-View"
      }
    },
    {
      id: 5,
      title: "Hangman Game",
      type: "Console Game",
      role: "C++ Developer",
      icon: "hangman",
      description: "A classic word-guessing game implemented in C++ with file-based word bank, score tracking, and ASCII art visuals.",
      technologies: ["C++", "File I/O", "OOP"],
      links: {
        github: "https://github.com/1dpthr/HangmanGame"
      }
    },
    {
      id: 6,
      title: "Hotel Management System",
      type: "Management System",
      role: "Python Developer",
      icon: "hotel",
      description: "A Python application for hotel operations including room booking, guest management, and billing with a simple GUI.",
      technologies: ["Python", "SQLite", "Tkinter"],
      links: {
        github: "https://github.com/1dpthr/HotelManagment-python-"
      }
    },
    {
      id: 7,
      title: "EasyPaisa Replica",
      type: "Mobile App Design",
      role: "UI/UX Designer",
      icon: "easypaisa",
      description: "A modern UI/UX redesign concept for EasyPaisa mobile app, focusing on improved user flows and visual aesthetics.",
      technologies: ["Figma", "UI Redesign", "Mobile App"],
      links: {
        figma: "https://www.figma.com/proto/2H99Tf0N9GP2YceT1h4fzn/figma-Easypaisa-assignment"
      }
    },
    {
      id: 8,
      title: "Ilm Dost",
      type: "Full Stack Web App",
      role: "Full Stack Developer",
      icon: "ilmdost",
      description: "A comprehensive, privacy-first educational platform powered by fully local AI for student learning, progress tracking, and academic success. Features smart dashboard, AI study assistant, course management, and voice assistant.",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Supabase", "Local AI", "Recharts"],
      links: {
        web: "https://1dpthr.github.io/ILM-Dost/",
        github: "https://github.com/1dpthr/ILM-Dost"
      }
    },
    {
      id: 9,
      title: "Traffic Racer",
      type: "3D Game",
      role: "Unity Developer",
      icon: "traffic",
      description: "A 3D traffic racing game built with Unity featuring endless racing, multiple vehicles, dynamic traffic system, score tracking, and garage system with car selection.",
      technologies: ["Unity", "C#", "3D Game Development", "TextMesh Pro"],
      links: {
        github: "https://github.com/1dpthr/Traffic-Racer"
      }
    },
    {
      id: 10,
      title: "AI-Based Air Drawing",
      type: "Computer Vision",
      role: "AI Developer",
      icon: "airdraw",
      description: "An innovative computer vision application enabling air drawing using hand gestures. Features real-time hand tracking, 12-color palette, AI-powered shape and letter recognition, and gesture-based controls.",
      technologies: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "Computer Vision"],
      links: {
        github: "https://github.com/1dpthr/Ai-Based-Air-Drawing"
      }
    },
    {
      id: 11,
      title: "SyncStay",
      type: "Full Stack Web App",
      role: "Full Stack Developer",
      icon: "syncstay",
      description: "A comprehensive hostel management and roommate matching platform built with Spring Boot. Features intelligent roommate matching, room selection, booking system, and multi-role support for students, owners, and administrators.",
      technologies: ["Java", "Spring Boot", "MySQL", "Docker", "Maven", "Hibernate"],
      links: {
        github: "https://github.com/1dpthr/SyncStay-SCD"
      }
    },
    {
      id: 12,
      title: "SyncStay Mobile",
      type: "Mobile App",
      role: "Flutter Developer",
      icon: "syncstaymob",
      description: "A Flutter-based mobile application for student accommodation management and roommate matching. Features multi-role dashboards, real-time notifications, location services, and payment management.",
      technologies: ["Flutter", "Dart", "Firebase", "Supabase", "Cross-Platform"],
      links: {
        github: "https://github.com/1dpthr/SyncStay-Mobile"
      }
    },
    {
      id: 13,
      title: "OS Simulation",
      type: "Educational Tool",
      role: "Java Developer",
      icon: "os",
      description: "A comprehensive Java-based Operating System simulation project demonstrating core OS concepts including memory management, process scheduling, IPC mechanisms, and distributed systems with interactive GUI visualizations.",
      technologies: ["Java", "JavaFX", "Swing", "Maven", "Multithreading"],
      links: {
        github: "https://github.com/1dpthr/Operating-System-Simulation"
      }
    }
  ]
};

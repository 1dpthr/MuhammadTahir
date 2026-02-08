// Portfolio data
export const portfolioData = {
  name: "Muhammad Tahir",
  title: "Creative Developer",
  subtitle: "Software Engineering Student",
  description: "A passionate Software Engineering student dedicated to creating optimized, user-focused software solutions. I blend technical expertise with creative problem-solving to build applications that make a difference.",
  email: "tahiramanat21@gmail.com",
  phone: "+92 123 456 7890",
  resume: "assets/Muhammad_Tahir_Resume.pdf",
  
  social: {
    github: "https://github.com/1dpthr",
    linkedin: "https://www.linkedin.com/in/dpthr/",
    instagram: "https://www.instagram.com/dp.thr/",
    email: "mailto:tahiramanat21@gmail.com"
  },

  about: {
    intro: [
      "I'm a passionate Software Engineering student who thrives on turning complex problems into elegant digital solutions. My journey in tech began with curiosity about how things work, and has evolved into a deep commitment to creating software that genuinely improves people's lives.",
      "Currently pursuing my degree in Software Engineering, I'm building a strong foundation in computer science fundamentals while staying current with modern development practices. I believe in the power of clean, efficient code and user-centered design.",
      "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or working on personal projects that challenge me to grow as a developer."
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
        description: "To create innovative software solutions that bridge the gap between complex technology and user-friendly experiences."
      },
      {
        icon: "focus",
        title: "Current Focus",
        description: "Expanding knowledge in modern web technologies, data structures & algorithms, and open-source contributions."
      }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "code",
      items: ["C++", "Java", "Python", "JavaScript"]
    },
    {
      category: "Frontend",
      icon: "frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: "backend",
      items: ["Node.js", "Express", "MongoDB", "SQLite", "REST APIs"]
    },
    {
      category: "Tools & Platforms",
      icon: "tools",
      items: ["GitHub", "Git", "VS Code", "Figma"]
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
    }
  ],

  experience: [
    {
      company: "Softech Digital Group",
      role: "Software Engineering Intern",
      duration: "October 2025 – December 2025",
      icon: "briefcase",
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
    }
  ]
};

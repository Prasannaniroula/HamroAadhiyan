const subjectData = {
  "csit": {
    semester1: [
      {
        title: "Introduction to Information Technology",
        desc: "This course covers the basic concepts of computers and information technology including introduction, hardware, software, memory, input/output, data representation, database, networks and data communication, Internet, multimedia, and computer security."
      }, {
        "title": "C Programming",
        "desc": "This course covers the concepts of structured programming using C programming language."
      },
      {
        "title": "Digital Logic",
        "desc": "This course covers the concepts of digital logic and switching networks. The course includes the fundamental concepts of boolean algebra and its application for circuit analysis, multilevel gates networks, flip-lops, counters logic devices and synchronous and asynchronous sequential logic and digital integrated circuits."
      },
      {
        "title": "Mathematics I",
        "desc": "The course covers the concepts of functions, limits, continuity, differentiation, integration of function of one variable; logarithmic, exponential, applications of derivative and antiderivatives, differential equations, vectors and applications, partial derivatives and Multiple Integrals. "
      }, {
        "title": "Physics",
        "desc": "This course covers the fundamentals of physics including oscillations, electromagnetic theory, and basics of quantum mechanics, band theory, semiconductors and universal logic gates and finally physics of manufacturing integrated circuits. "
      }],
    semester2: [
      {
        title: "Discrete Structure",
        desc: "The course covers fundamental concepts of discrete structure like introduce logic, proofs, sets, relations, functions, counting, and probability, with an emphasis on applications in computer science."
      },
      {
        title: "Object Oiented Programming",
        desc: "The course covers the basic concepts of object oriented programming using C++ programming language"
      },
      {
        title: "Microprocessor",
        desc: "This course contains of fundamental concepts of computer organization, basic I/O interfaces and Interrupts operations."
      },
      {
        title: "Mathematics II",
        desc: "The course contains concepts and techniques of linear algebra. The course topics include systems of linear equations, determinants, vectors and vector spaces, eigen values and eigenvectors, and singular value decomposition of a matrix."
      }, {
        title: "Statistics",
        desc: "This course contains basics of statistics, descriptive statistics, probability, sampling, random variables and mathematical expectations, probability distribution, correlation and regression."
      }],
    semester3: [
      {
        title: "Data Sturcute and Algoirthms",
        desc: "This course includes the basic foundations in of data structures and algorithms. This course covers concepts of various data structures like stack, queue, list, tree and graph. Additionally, the course includes idea of sorting and searching."
      },
      {
        title: "Numerical Method",
        desc: "This course contains the concepts of numerical method techniques for solving linear and nonlinear equations, interpolation and regression, differentiation and integration, and partial differential equations."
      },
      {
        title: "Computer Architecture",
        desc: "This course includes concepts of instruction set architecture, organization or micro-architecture, and system architecture. The micro-architecture consist internal representation of computers at register and functional unit level. The system architecture includes organization of computers at the cache and bus level."
      },
      {
        title: "Computer Graphics",
        desc: "The course covers concepts of graphics hardware, software, and applications, data structures for representing 2D and 3D geometric objects, drawing algorithms for graphical objects, techniques for representing and manipulating geometric objects, illumination , and concept of virtual reality."
      },
      {
        title: "Statistics II",
        desc: " The course consists of concepts of sampling, testing hypothesis, parametric and non parametric tests, correlation and regression, experimental designs and stochastic processes."
      }],
    semester4: [
      {
        title: "Theory of Computation",
        desc: "This course presents a study of Finite State Machines and their languages. It covers the details of finite state automata, regular expressions, context free grammars. More, the course includes design of the Push-down automata and Turing Machines. The course also includes basics of undecidabilty and intractability."
      },
      {
        title: "Computer Networks",
        desc: "This course introduces concept of computer networking and discuss the different layers of networking model."
      },
      {
        title: "Operating Systems",
        desc: "This course includes the basic concepts of operating system components. It consists of process management, deadlocks and process synchronization, memory management techniques, File system implementation, and I/O device management principles. It also includes case study on Linux operating system."
      },
      {
        title: "Database Management Systems",
        desc: " The course covers the basic concepts of databases, database system concepts and architecture, data modeling using ER diagram, relational model, SQL, relational algebra and calculus, normalization, transaction processing, concurrency control, and database recovery"
      },
      {
        title: "Artificial Intelligence",
        desc: " The course introduces the ideas and techniques underlying the principles and design of artificial intelligent systems. The course covers the basics and applications of AI, including: design of intelligent agents, problem solving, searching, knowledge representation systems, neural networks, machine learning and natural language processing"
      }],
    semester5: [
      {
        title: "Design and Analysis of Algorithms",
        desc: " This course introduces basic elements of the design and analysis of computer algorithms. Topics include asymptotic notations and analysis, divide and conquer strategy, greedy methods, NP-completeness, and approximation algorithms."
      },
      {
        title: "System Analysis and Design",
        desc: "This course familiarizes students with the concepts of information systems development including systems development life cycle, different approaches to systems development, project management, design, and maintenance. This course also covers some fundamental concepts of object oriented systems analysis and design."
      },
      {
        title: "Cryptography",
        desc: "The course introduces the underlying the principles and design of cryptosystems. The course covers the basics concepts of cryptography including: traditional ciphers, block ciphers, stream ciphers, public and private key cryptosystems. The course also includes the theory of hash functions, authentication systems, and malicious logic. "
      },
      {
        title: "Simulation and Modeling",
        desc: "The syllabus consists of introduction to system, modeling and simulation of different types of systems. It includes the modeling of systems, its validation, verification and analysis of simulation output. It comprises the concept of queuing theory, random number generation as well as study of some simulation languages."
      },
      {
        title: "Webtechnology",
        desc: " This course covers the fundamental concepts of HTML, CSS, JavaScript, XML, and PHP. "
      },
      {
        title: "Society and Ethics in Information Technology",
        desc: "This course covers different concepts related with sociology, and social and ethical issues related with the use of Information Technology. This course also covers social context of computing, software issues and new frontiers of computer ethics"
      }
    ],
    semester6: [
      {
        title: "Software Engineering",
        desc: "This course familiarizes students with different concepts of software engineering mainly focusing on software process models, agile development, requirements engineering, models, design, implementation, testing, evolution, and software project management."
      },
      {
        title: "Compiler Design and Construction",
        desc: "This course is designed to develop acquaintance with fundamental concepts of compiler design. The course starts with the basic concepts and also includes different phases of compilers like lexical analysis, syntax-directed translation, type checking etc. in detail."
      },
      {
        title: "E-governance",
        desc: "This course familiarizes students with different concepts of E-Government and E-Governance, different E-Governance models and infrastructure development, E-government security, and data warehousing and data mining for e-governance."
      },
      {
        title: "NET centric computing",
        desc: "The course covers the concepts of cross-platform web application development using the ASP.NET Core MVC framework using C# programming Language"
      },
      {
        title: "Technical Writing",
        desc: "This course is designed for students to enhance their skills for workplace writing. It helps them in the process of ‘listening, researching, planning, composing, revising, and editing’ documents for use in business, science, hi-tech, and other practical fields. "
      },
      {
        title: "E-commerce",
        desc: "This course covers the fundamental concepts of E-commerce and E-business models, and components of E-commerce system."
      }
    ],
    semester7: [
      {
        title: "Advanced Java Programming",
        desc: "This course familiarizes students with basic as well as advanced features of Java Programming Emphasis will be given to GUI and event-driven programming, Servlets and JSP Technology, and Distributed Programming."
      },
      {
        title: "Data warehousing and Data mining",
        desc: "This course introduces advanced aspects of data warehousing and data mining, encompassing the principles, research results and commercial application of the current technologies."
      },
      {
        title: "Principles of Management",
        desc: "This course contains The Nature of Organizations, Introduction to Management, Environmental Context of Management, Planning and Decision Making, Organizing Function, Leadership, Motivation, Communication, Global Context of Management, Management Trends and Scenario in Nepal."
      },
      {
        title: "Project work",
        desc: "This course covers theoretical and practical concepts needed to develop a real world software system. The course focuses on enabling students with the skills related to software development. The course includes practicing the abilities pertaining to the planning, analysis, design, implementation and testing of software applications."
      }],
    semester8: [
      {
        title: "Advanced Database",
        desc: "This course includes advanced concept of database system. The main topics covered are advanced concept of relational data model, Extended E-R model, new database management technologies, query optimization, NoSQL database and big data processing techniques."
      },
      {
        title: "Internship",
        desc: "This course covers the real-world practice in industry. It includes using theoretical and practical knowledge while working in industry together with the understanding of industry culture."
      }]

  },
  bit: {
    semester1: [
      {
        title: "Introduction to Information Technology",
        desc: "This course covers the basic concepts of computers and information technology including introduction, hardware, software, memory, input/output, data representation, database, networks and data communication, Internet, multimedia, and computer security."
      },
      {
        "title": "C Programming",
        "desc": "This course covers the concepts of structured programming using C programming language."
      },
      {
        "title": "Digital Logic",
        "desc": "This course covers the concepts of digital logic and switching networks. The course includes the fundamental concepts of boolean algebra and its application for circuit analysis, multilevel gates networks, flip-lops, counters logic devices and synchronous and asynchronous sequential logic and digital integrated circuits."
      },
      {
        "title": "Basic Mathematics",
        "desc": "This course familiarizes students with functions, limits, continuity, differentiation, integration of function of one variable, logarithmic, exponential, applications of derivative and antiderivatives, differential equations, partial derivatives."
      },
      {
        "title": "Sociology",
        "desc": "This course familiarizes students with the subject matter of sociology in terms of broader understanding of society in relation to information technology. It helps students understand the importance of sociology as its relationship to other sciences"
      }],

    semester2: [
      {
        title: "Microprocessor and Computer Architecture",
        desc: "This course contains of fundamental concepts of computer organization, basic I/O interfaces and Interrupts operations."
      },
      {
        title: "Discrete Structure",
        desc: "The course covers fundamental concepts of discrete structure like introduce logic, proofs, sets, relations, functions, counting, and probability, with an emphasis on applications in computer science."
      },
      {
        title: "Object Oiented Programming",
        desc: "The course covers the basic concepts of object oriented programming using C++ programming language"
      },
      {
        title: "Economics",
        desc: "This course covers the basic concepts of microeconomics and macroeconomics. In encompasses basic economic problems, demand, supply, market equilibrium, elasticity of demand and supply, consumer choice, production, and income and its measurement, monetary and fiscal policies."
      }, {
        title: "Basic statistics",
        desc: "This course contains basics of statistics, descriptive statistics, probability, sampling, random variables and mathematical expectations, probability distribution, correlation and regression."
      }],
    semester3: [
      {
        title: "Data Sturcute and Algoirthms",
        desc: "This course includes the basic foundations in of data structures and algorithms. This course covers concepts of various data structures like stack, queue, list, tree and graph. Additionally, the course includes idea of sorting and searching."
      },
      {
        title: "Numerical Method",
        desc: "This course contains the concepts of numerical method techniques for solving linear and nonlinear equations, interpolation and regression, differentiation and integration, and partial differential equations."
      },
      {
        title: "Computer Architecture",
        desc: "This course includes concepts of instruction set architecture, organization or micro-architecture, and system architecture. The micro-architecture consist internal representation of computers at register and functional unit level. The system architecture includes organization of computers at the cache and bus level."
      },
      {
        title: "Computer Graphics",
        desc: "The course covers concepts of graphics hardware, software, and applications, data structures for representing 2D and 3D geometric objects, drawing algorithms for graphical objects, techniques for representing and manipulating geometric objects, illumination , and concept of virtual reality."
      },
      {
        title: "Statistics II",
        desc: " The course consists of concepts of sampling, testing hypothesis, parametric and non parametric tests, correlation and regression, experimental designs and stochastic processes."
      }
    ],semester4: [
      {
        title: "Theory of Computation",
        desc: "This course presents a study of Finite State Machines and their languages. It covers the details of finite state automata, regular expressions, context free grammars. More, the course includes design of the Push-down automata and Turing Machines. The course also includes basics of undecidabilty and intractability."
      },
      {
        title: "Computer Networks",
        desc: "This course introduces concept of computer networking and discuss the different layers of networking model."
      },
      {
        title: "Operating Systems",
        desc: "This course includes the basic concepts of operating system components. It consists of process management, deadlocks and process synchronization, memory management techniques, File system implementation, and I/O device management principles. It also includes case study on Linux operating system."
      },
      {
        title: "Database Management Systems",
        desc: " The course covers the basic concepts of databases, database system concepts and architecture, data modeling using ER diagram, relational model, SQL, relational algebra and calculus, normalization, transaction processing, concurrency control, and database recovery"
      },
      {
        title: "Artificial Intelligence",
        desc: " The course introduces the ideas and techniques underlying the principles and design of artificial intelligent systems. The course covers the basics and applications of AI, including: design of intelligent agents, problem solving, searching, knowledge representation systems, neural networks, machine learning and natural language processing"
      }],
  }
};

export default subjectData;

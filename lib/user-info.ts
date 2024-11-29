import React from "react";
const info = {
    "Skills": {
    //   "description": "Technical skills including web development, programming languages, and database management.",
      "details": [
        {
          "name": "Web Development",
          "technologies": ["React", "ExpressJs", "NodeJs", "Tailwind CSS"]
        },
        {
          "name": "Programming Languages",
          "technologies": ["JavaScript", "Java", "TypeScript", "C", "C++"]
        },
        {
          "name": "Databases",
          "technologies": ["MongoDB", "Firebase", "SQL", "Prisma ORM"]
        }
      ],
    },
    "Projects": {
    //   "description": "Significant projects demonstrating experience and expertise in various technologies.",
      "details": [
        {
          "name": "Dynamic Allocation CLI using van Emde Boas Trees",
          "status": "Completed",
          link: "https://github.com/drdholu/van-Emde-Boas",
          "description": "Implemented van Emde Boas trees in C to improve operation times and engineered a dynamic application for efficient seat allocation.",
          "technologies": ["C"]
        },
        {
          "name": "COEP PG Admission Portal",
          "status": "Completed",
          link: "http://pgadmission.coep.org.in/",
          "description": "Contributed to the backend for the official merit list generation",
          "technologies": ["ReactJS", "NodeJS", "MongoDB", "ExpressJS"]
        },
        {
            "name": "Impressions 24, COEP",
            "status": "Ongoing",
            link: "https://coepimpressions.org/",
            "description": "Designed the official website of Impressions, a cultural fest conducted in COEP.",
            "technologies": ["ReactJS", "ThreeJS", "GSAP", "Framer Motion"]
          },
          {
            "name": "Unified Student Portal",
            "status": "Ongoing/Abandoned",
            "link": "",
            "description": "Architected a portal for document management for students and faculty, with robust authentication and a scalable solution using MERN stack.",
            "technologies": ["ReactJS", "NodeJS", "MongoDB", "ExpressJS"]
          },
          {
            "name": "Paint Store App",
            "status": "Ongoing/Abandoned",
            link: "",
            "description": "Developed a comprehensive paint store ecosystem with customer and salesman apps, a web-admin interface, real-time inventory tracking, and order management features.",
            "technologies": ["ExpressJS", "NodeJS", "ReactJS", "React-Native", "Firebase Firestore"]
          },
      ],
    },
    "Positions of Responsibility": {
    //   "description": "Roles undertaken demonstrating leadership and contribution to significant projects.",
      "details": [
        {
          "position": "Software Developer",
          "organization": "Software Development Section, COEP Pune",
          "duration": "Aug 2023 - Present",
          "responsibilities": [
            "Developing the Student Portal using the MERN stack.",
            "Contributing to merit list generation and student seat allocation algorithms for COEP’s MTech admission portal."
          ]
        },
        {
          "position": "Web Head",
          "organization": "Impressions, COEP Pune",
          "duration": "Oct 2024 - Present",
          "responsibilities": [
            "Responsible for designing upto 6 pages for Impressions 2023 using plain HTML, CSS & JS",
            "Currently managing the Impressions 24 site using React for frontend and GSAP & ThreeJS to improve overall user interactivity and design."
          ]
        },
      ],
    },
    "Education": {
    //   "description": "Academic background and achievements.",
      "details": [
        {
          "degree": "Bachelor of Computer Engineering",
          "institution": "College of Engineering Pune Technological University",
          "expected_graduation": "2026",
          "cgpa": "7.38/10"
        }
      ],
    },
    "Contact": {
    //   "description": "hit me up, i don't bite :)",
      "details": {
        // "phone": "+91 84212 70069",
        "location": "Pune, India",
        "linkedin": "linkedin.com/in/parasdhole",
        "github": "github.com/drdholu"
      },
    }
}

export default info;
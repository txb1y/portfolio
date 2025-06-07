import { Github, Linkedin, Mail } from "lucide-react";

export interface SocialLink {
  name: string;
  icon: any;
  url: string;
}

export interface Technology {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: Technology[];
  demoUrl: string;
  linkedinUrl?: string; // Added LinkedIn URL for projects
}

export interface AboutMe {
  photo: string;
  academic: string;
  personal: string;
  interests: string;
}

export interface Skill {
  name: string;
  color: string;
}

export interface Skills {
  languages: Skill[];
  frameworks: Skill[];
  softSkills: Skill[];
}

export interface Resume {
  fileUrl: string;
  description: string;
}

export interface Contact {
  email: string;
  message: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  socialLinks: SocialLink[];
  projects: Project[];
  about: AboutMe;
  skills: Skills;
  resume: Resume;
  contact: Contact;
}

export const portfolioData: PortfolioData = {
  name: "Bharathi B.",
  role: "Frontend Dev | AI x UI/UX Enthusiast | Building Aesthetic Digital Experiences",
  tagline: "",
  socialLinks: [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/txb1y",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/bharathi54123",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:bharathibalu101@gmail.com",
    },
  ],
  about: {
    photo: "/images/profile.jpg",
    academic: "Currently pursuing a B.Tech in Information Technology at Kongunadu College of Engineering and Technology. My journey has been more than lectures and labs — it's a blend of hands-on projects, real-world problem-solving, and self-driven learning beyond the syllabus. Throughout this path, I've built a solid foundation in software development, database management, web technologies, and AI concepts. Alongside academics, I've actively explored tech fests, workshops, and coding challenges — sharpening both technical skills and teamwork.",
    personal: "", // Removed personal story as requested
    interests: "Passionate about software development, AI, and system design. Aiming to build innovative solutions, sharpen technical skills, and grow as a creative problem solver.",
  },
  skills: {
    languages: [
      { name: "JavaScript", color: "bg-yellow-500" },
      { name: "TypeScript", color: "bg-blue-600" },
      { name: "HTML5", color: "bg-orange-600" },
      { name: "CSS3", color: "bg-blue-500" },
      { name: "Python", color: "bg-blue-800" },
    ],
    frameworks: [
      { name: "React", color: "bg-blue-400" },
      { name: "Next.js", color: "bg-black" },
      { name: "TailwindCSS", color: "bg-teal-500" },
      { name: "Node.js", color: "bg-green-600" },
      { name: "Express", color: "bg-gray-600" },
    ],
    softSkills: [
      { name: "Communication", color: "bg-violet-600" },
      { name: "Leadership", color: "bg-purple-600" },
      { name: "Problem Solving", color: "bg-indigo-600" },
      { name: "Team Collaboration", color: "bg-pink-600" },
    ],
  },
  resume: {
    fileUrl: "/BHARATHI-Resume.pdf",
    description: "Download my resume to learn more about my experience, skills, and qualifications. Feel free to reach out if you have any questions!",
  },
  contact: {
    email: "bharathibalu101@gmail.com",
    message: "I'm always open to new opportunities and collaborations. Feel free to reach out via email, and I'll get back to you as soon as possible!",
  },
  projects: [
    {
      id: "smart-farming",
      title: "AI-Powered Smart Farming Platform for Climate-Driven Crop Optimization",
      description: "AI chatbot, weather analysis, crop advice, irrigation planning, scalable farming platform.",
      imageUrl: "",
      technologies: [
        { name: "AI", color: "bg-purple-600" },
        { name: "Weather API", color: "bg-blue-500" },
        { name: "React", color: "bg-blue-400" },
        { name: "Node.js", color: "bg-green-600" }
      ],
      demoUrl: "",
      linkedinUrl: "https://www.linkedin.com/posts/bharathi54123_ai-agritech-smartfarming-activity-7311956742890823681-duNL?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEcuAo8BqExAieg4RwEewetYoYh4QC5rz0Y&utm_campaign=copy_link"
    },
    {
      id: "telegram-email-bot",
      title: "Telegram Email Bot",
      description: "Send single or bulk emails directly from Telegram using simple chat commands.",
      imageUrl: "", // Add an image if available
      technologies: [
        { name: "Python", color: "bg-blue-800" },
        { name: "smtplib", color: "bg-gray-600" },
        { name: "Telegram Bot API", color: "bg-blue-400" }
      ],
      demoUrl: "https://github.com/txb1y/MailBot-Telegram"
    }
  ]
};

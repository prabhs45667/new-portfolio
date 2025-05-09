import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  github: string;
}

const projects: Project[] = [
  {
    title: "Dream11 Fantasy Cricket Prediction System",
    description: "IPL fantasy cricket solution using ML algorithms to predict player performance",
    details: [
      "Developed using Python, Streamlit, pandas, numpy, scikit-learn, PuLP, and Random Forest Regressor.",
      "Engineered a player performance prediction system based on historical match data and venue-specific metrics.",
      "Built an optimization algorithm for role-based team selection and impact player identification.",
      "Created an interactive Streamlit dashboard with real-time predictions and performance analytics using matplotlib and plotly."
    ],
    tech: ["Python", "Machine Learning", "Streamlit", "pandas", "numpy", "scikit-learn", "PuLP"],
    github: "https://github.com/prabhs4546"
  },
  {
    title: "Optimized Real-Time Bidding (RTB) with Predictive Modeling",
    description: "Advanced predictive models for real-time digital ad bidding optimization",
    details: [
      "Built CTR, CVR, and market price prediction models using Logistic Regression, LightGBM, and Linear Regression.",
      "Engineered features from bid logs, user agents, and ad slots, applying PCA and frequency encoding.",
      "Achieved +28% score improvement, 99% budget utilization, and 3.2ms bid latency (under 5ms).",
      "Implemented in Python with NumPy, pandas, LightGBM, and Bayesian Optimization for tuning."
    ],
    tech: ["Python", "Logistic Regression", "LightGBM", "Linear Regression", "NumPy", "pandas", "Bayesian Optimization"],
    github: "https://github.com/prabhs4546"
  },
  {
    title: "LearnFast",
    description: "\"Knowledge is power, but structured knowledge is empowerment.\"",
    details: [
      "Built using Next.js & Tailwind CSS for frontend, Flask (Python) for backend logic, and MongoDB Atlas for cloud-based storage.",
      "The frontend collects inputs like playlist link and time availability, which is processed by the Flask backend using model.py to generate a learning schedule; data is securely stored in MongoDB.",
      "Automated schedule generation, customizable learning paths, future scope for user authentication and progress tracking.",
      "Transforms unstructured YouTube playlists into structured, goal-based learning journeys."
    ],
    tech: ["Next.js", "Tailwind CSS", "Flask", "Python", "MongoDB Atlas"],
    github: "https://github.com/prabhs4546"
  },
  {
    title: "GynoGuide",
    description: "Online Support Platform for Pregnant Women",
    details: [
      "Built a secure platform using HTML, CSS, Bootstrap, JavaScript, and Django for pregnancy-related guidance.",
      "Provided a safe space for women to ask questions, share concerns, and get expert advice from doctors and NGOs.",
      "Offered resources to help women stay informed, detect small abnormalities, and maintain a healthy pregnancy.",
      "Fostered a supportive community, ensuring pregnant women feel safe, empowered, and well-informed."
    ],
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "Django"],
    github: "#"
  }
];

const ProjectsSection: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = projectsRef.current;
    if (sectionEl) {
      const cards = Array.from(
        sectionEl.querySelectorAll<HTMLElement>('.tech-card')
      );
      gsap.from(cards, {
        scrollTrigger: { trigger: sectionEl, start: 'top bottom', toggleActions: 'play reverse play reverse' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        immediateRender: false,
      });
    }
  }, []);

  return (
    <section id="projects" className="py-20 bg-muted/30" ref={projectsRef}>
      <div className="container mx-auto">
        <h2 className="section-heading">Projects</h2>
        
        {/* Carousel for Projects */}
<div className="mt-12">
  <div className="swiper-container">
    <div className="swiper-wrapper">
      {projects.reduce((acc, _, idx, arr) => {
        if (idx % 2 === 0) {
          acc.push(arr.slice(idx, idx + 2));
        }
        return acc;
      }, [] as Project[][]).map((slide, slideIdx) => (
        <div className="swiper-slide w-full flex justify-center space-x-4" key={slideIdx}>
          {slide.map((project, index) => (
            <div
              key={index}
              className="tech-card flex flex-col rounded-xl overflow-hidden bg-card shadow-lg mx-2 w-2/5"
            >
              {/* Upper half: Image */}
              <div className="w-full h-[270px] bg-gray-800 flex items-center justify-center">
                <img
                  src={project.title === "Dream11 Fantasy Cricket Prediction System" ? "/img/dream.png" : "/img/dream.png"}
                  alt="Project Preview"
                  className={`w-full h-full ${project.title === "Dream11 Fantasy Cricket Prediction System" ? "object-contain" : "object-cover"}`}
                />
              </div>
              {/* Lower half: Content */}
              <div className="flex flex-col flex-grow p-6">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold mb-1 text-white">{project.title}</h3>
                  <div className="text-base text-muted-foreground mb-2">{project.description}</div>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {project.details.slice(0, 2).map((detail, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">{detail}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex justify-between gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-accent" asChild>
                    <a href="#" className="flex items-center">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    {/* Navigation buttons can be added here if using SwiperJS or similar */}
  </div>
</div>
      </div>
    </section>
  );
};

export default ProjectsSection;

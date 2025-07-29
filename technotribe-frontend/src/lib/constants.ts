class Constants {

   public static employmentTypes = [
        { value: "full-time", label: "Full Time" },
        { value: "part-time", label: "Part Time" },
        { value: "contract", label: "Contract" },
        { value: "freelance", label: "Freelance" },
        { value: "internship", label: "Internship" },
      ];
      
      public static experienceLevels = [
        { value: "junior", label: "Junior (0-2 years)" },
        { value: "mid-level", label: "Mid Level (2-5 years)" },
        { value: "senior", label: "Senior (5-8 years)" },
        { value: "lead", label: "Lead (8-12 years)" },
        { value: "principal", label: "Principal (12+ years)" },
      ];
      
      public static currencies = [
        { value: "USD", label: "USD ($)" },
        { value: "EUR", label: "EUR (€)" },
        { value: "GBP", label: "GBP (£)" },
        { value: "CAD", label: "CAD (C$)" },
        { value: "AUD", label: "AUD (A$)" },
        { value: "INR", label: "INR (₹)" },
      ];
      
      public static availableSkills = [
        "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "C#", "C++",
        "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart", "Flutter", "React Native", "Next.js",
        "Nuxt.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Laravel", "Ruby on Rails",
        "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API", "Docker", "Kubernetes",
        "AWS", "Azure", "Google Cloud", "Firebase", "Git", "GitHub", "GitLab", "CI/CD", "Jenkins",
        "Jest", "Cypress", "Selenium", "Webpack", "Vite", "Tailwind CSS", "Bootstrap", "Material-UI",
        "Ant Design", "Figma", "Adobe XD", "Sketch", "WordPress", "Shopify", "Magento", "WooCommerce"
      ];

      public static companySizes = [
        "1-10 employees",
        "11-50 employees", 
        "51-200 employees",
        "201-500 employees",
        "500+ employees",
      ];
      
      public static industries = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "E-commerce",
        "Manufacturing",
        "Consulting",
        "Media & Entertainment",
        "Real Estate",
        "Other",
      ];

}

export default Constants;
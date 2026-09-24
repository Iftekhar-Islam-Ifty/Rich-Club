/* ==========================================================
   RICH Club - ALL website content lives in this file.
   Edit text, links and image paths here. Do not touch
   render.js unless you want to change the layout itself.
   Images: put files in assets/images/ and update the paths.
   ========================================================== */
window.RICH_CONTENT = {
  site: {
    name: "RICH Club",
    fullName: "Club for Rights, Innovation, Community & Humanity",
    tagline: "We Serve With Pride",
    since: 2020,
    logo: "assets/images/logo.png"
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Vision", href: "#vision" },
    { label: "Impact", href: "#impact" },
    { label: "Projects", href: "#projects" },
    { label: "Founder", href: "#founder" },
    { label: "News", href: "#news" },
    { label: "Contact", href: "#contact" }
  ],
  navCta: { label: "Join Us", href: "#membership" },

  hero: {
    title: "RICH CLUB",
    since: "Since 2020",
    text: "A community dedicated to advancing Rights, Innovation, Community, and Humanity.",
    image: "assets/images/hero.jpg",
    imageAlt: "A smiling child holding medals at a RICH Club sports event",
    primaryCta: { label: "See Our Work", href: "#projects" },
    secondaryCta: { label: "Become a Member", href: "#membership" }
  },

  about: {
    title: "Birth & Growth",
    text: [
      "Founded in 2020 by school friends, RICH Club has grown into a youth organization with members from schools, colleges, and universities, active in Chittagong and Dhaka."
    ],
    image: "assets/images/about.jpg",
    imageAlt: "RICH Club members together at an event"
  },

  vision: {
    title: "What Drives Us",
    items: [
      {
        title: "Vision",
        text: "A world where rights, innovation, community, and humanity thrive. We envision a society where every individual has access to equal opportunities, fostering innovation to solve pressing challenges. By building strong communities and prioritizing compassion, we aim to create a sustainable and inclusive future for all."
      },
      {
        title: "Purpose",
        text: "Empowering individuals, fostering creativity, and uplifting society. We strive to provide resources and opportunities that enable people to unlock their full potential. By nurturing collaboration and promoting social responsibility, we aim to build a stronger, more compassionate world."
      },
      {
        title: "Mission",
        text: "Uniting youth to drive impactful change through meaningful initiatives. We aim to inspire and equip the next generation with the tools to address societal challenges. Together, we work towards creating sustainable solutions and fostering a culture of empathy and innovation."
      }
    ]
  },

  /* Numbers come from the portfolio PDF. Update when you have new figures. */
  impact: {
    title: "Impact in Numbers",
    stats: [
      { value: 12, suffix: "", label: "Flagship projects" },
      { value: 100, suffix: "+", label: "Stray dogs fed" },
      { value: 300, suffix: "+", label: "Students given free blood group tests" },
      { value: 2, suffix: "", label: "Cities: Chittagong and Dhaka" }
    ]
  },

  /* category must be one of the names in projects.categories.
     Optional: add  details: "longer text"  to a project to show more
     text in its popup. If omitted, the short text is used. */
  projects: {
    title: "Journey & Accomplishments",
    intro: "From classrooms to riverbanks, here is what our members have done together.",
    categories: ["All", "Environment", "Health", "Education", "Community", "Sports"],
    items: [
      {
        title: "Project Eco-Roots",
        category: "Environment",
        image: "assets/images/projects/eco-roots.jpg",
        text: "An event at ChalkPencil English School focusing on SDGs 4 and 13, where students learned to embrace sustainable practices for a greener future."
      },
      {
        title: "Project Clean Touch",
        category: "Education",
        image: "assets/images/projects/clean-touch.jpg",
        text: "In partnership with Manobik Pathsala: a Good Touch-Bad Touch session, a drawing competition, and hygiene kits for students."
      },
      {
        title: "Project Jute Revolution",
        category: "Environment",
        image: "assets/images/projects/jute-revolution.jpg",
        text: "Led by our Department of Community to promote jute as a sustainable alternative to plastic, reducing pollution and protecting the environment."
      },
      {
        title: "Project Wellness",
        category: "Health",
        image: "assets/images/projects/wellness.jpg",
        text: "A Wellness Fair and Free Medical Camp with healthcare professionals, offering free checkups, consultations, and treatments."
      },
      {
        title: "Feeding Strays",
        category: "Community",
        image: "assets/images/projects/feeding-strays.jpg",
        text: "Feeding more than 100 stray dogs and making sure they are safe in their usual spots."
      },
      {
        title: "Helping the Flood-Affected",
        category: "Community",
        image: "assets/images/projects/flood-relief.jpg",
        text: "Dry food and financial aid delivered to flood-affected families, bringing relief during a difficult time."
      },
      {
        title: "Promoting Waste Segregation",
        category: "Environment",
        image: "assets/images/projects/waste-segregation.jpg",
        text: "A session on colour-coded bins (red, yellow, and blue) that taught recycling and waste reduction, aligned with SDGs 4 and 13."
      },
      {
        title: "Promoting Tree-Plantation",
        category: "Environment",
        image: "assets/images/projects/tree-plantation.jpg",
        text: "Students of orphanages planted fruit and medicinal trees, followed by a shared meal."
      },
      {
        title: "Youth Awareness",
        category: "Education",
        image: "assets/images/projects/youth-awareness.jpg",
        text: "Engaging young, curious minds about key social issues and the importance of making a positive impact in their communities."
      },
      {
        title: "RICHClubians Day",
        category: "Community",
        image: "assets/images/projects/richclubians-day.jpg",
        text: "An annual gathering of past and present members with seminars, awards, and cultural performances."
      },
      {
        title: "Joyful Sportsmanship",
        category: "Sports",
        image: "assets/images/projects/sportsmanship.jpg",
        text: "A football match with underprivileged children, with medals and a trophy awarded to every participant."
      },
      {
        title: "Health Awareness",
        category: "Health",
        image: "assets/images/projects/health-awareness.jpg",
        text: "Free blood group testing for 300+ students from four primary schools in a village, supporting student Unique IDs."
      }
    ]
  },

  founder: {
    title: "Founder & Chairman",
    name: "Rudmil Sharin Shah",
    role: "Founder, Chairman - RICH Club, Bangladesh",
    image: "assets/images/founder.jpg",
    imageAlt: "Portrait of Rudmil Sharin Shah",
    text: [
      "Rudmil Sharin Shah founded RICH Club in 2020 with friends, envisioning a platform for youth to drive meaningful change. Under his leadership, the club has grown from a small initiative into a thriving youth organization, making an impact in Chittagong and Dhaka.",
      "As a dedicated student of LLB at BRAC University, Rudmil blends academic excellence with his passion for societal progress. His forward-thinking approach and commitment to empowering youth have enabled RICH Club to take on impactful initiatives, fostering innovation, community development, and human rights advocacy."
    ]
  },

  membership: {
    title: "Become a Member",
    text: "Members contribute 100 BDT per month, fueling sustainable societal change.",
    price: "100 BDT",
    period: "per month",
    cta: { label: "Join RICH Club", href: "mailto:richcluborg2020@gmail.com?subject=Membership%20Request" }
  },

  /* Headlines are short English summaries of the clippings. Please verify. */
  news: {
    title: "Our Story in the News",
    items: [
      { paper: "Samakal", headline: "Dreamers building a beautiful society", image: "assets/images/news/samakal.jpg" },
      { paper: "Dhaka Protidin", headline: "RICH Club community celebrates four years of service", image: "assets/images/news/dhaka-protidin.jpg" },
      { paper: "Daily Purbokone", headline: "RICH Club Organization holds three-year anniversary gathering", image: "assets/images/news/purbokone.jpg" },
      { paper: "Amar Desh 24", headline: "Annual sports competition and prize distribution", image: "assets/images/news/amar-desh-24.jpg" },
      { paper: "Azadi", headline: "RICH Club Organization holds three-year anniversary gathering", image: "assets/images/news/azadi.jpg" },
      { paper: "Daily Purbodesh", headline: "RICH Club celebrates four years of service", image: "assets/images/news/purbodesh.jpg" },
      { paper: "Business Bangladesh", headline: "RICH Club members celebrate fourth anniversary", image: "assets/images/news/business-bangladesh.jpg" },
      { paper: "Aakash Jamin", headline: "RICH Club community celebrates four years of service", image: "assets/images/news/aakash-jamin.jpg" },
      { paper: "Sakaler Shomoy", headline: "RICH Club community celebrates four years of service", image: "assets/images/news/sakaler-shomoy.jpg" },
      { paper: "BCSC and RICH Club", headline: "Earthquake awareness campaign in Chittagong", image: "assets/images/news/earthquake-campaign.jpg" }
    ]
  },

  contact: {
    title: "Get in Touch",
    text: "Want to join, partner, or support a project? Reach out to us.",
    phone: "017 2438 6718",
    phoneHref: "tel:+8801724386718",
    email: "richcluborg2020@gmail.com",
    qrImage: "assets/images/qr.png",
    qrAlt: "QR code for RICH Club"
  },

  social: [
    { label: "Facebook", href: "https://www.facebook.com/richclub.org.2020/" },
    { label: "Instagram", href: "https://www.instagram.com/rich_club_bangladesh/" }
  ],

  footer: {
    note: "Chittagong and Dhaka, Bangladesh"
  }
};

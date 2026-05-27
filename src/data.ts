import { Facility, FaqItem } from './types';

export const SCHOOL_NAME = "Akshara Vidyaashram";
export const ESTABLISHED_YEAR = 1993;
export const CAMPUS_SIZE = "25 Acres";
export const CORE_POSITIONING = "A premium 25-acre educational sanctuary where freedom meets responsibility, and children grow into confident future-ready leaders.";

export const LOGO_PATH = "/images/124.png";

export const FACILITIES: Facility[] = [
  {
    id: "pool",
    title: "Olympic-Sized Swimming Pool",
    category: "Sports",
    description: "A premium aquatic arena with trained coordinators promoting cardiovascular fitness and swimming expertise.",
    detailedDescription: "Our custom-designed, Olympic-sized swimming arena is a pinnacle of physical training at Akshara Vidyaashram. With designated lanes, professional lifeguards, and expert swimming coaches, students learn essential water survival skills, competitive swimming techniques, and recreational aquatic safety from an early age.",
    imagePath: "/images/128.jpeg"
  },
  {
    id: "courtyard",
    title: "Centred Assembly Green Courtyard",
    category: "Infrastructure",
    description: "An open-air amphitheatre and community hub where students gather for group discussions and events.",
    detailedDescription: "Designed for open dialogue, psychological safety, and community bonding, this lush green lawn within the multi-level campus structure allows children to sit in semi-circles, attend presentations under palm trees, and experience natural ventilation during assemblies and interactive lectures.",
    imagePath: "/images/125.jpeg"
  },
  {
    id: "science_lab",
    title: "State-of-the-Art Science Laboratories",
    category: "Academics",
    description: "Immersive learning environments equipped for specialized research, chemistry, and biology experiments.",
    detailedDescription: "Our secondary school science lab is stocked with premium apparatus, compound microscopes, and hazard-safe workstations. Students don lab coats to conduct hands-on chemical analyses, explore microbiological cellular structures, and learn advanced science principles by active discovery.",
    imagePath: "/input_file_13.png"
  },
  {
    id: "library_commons",
    title: "Vast Literature and Resource Centre",
    category: "Academics",
    description: "Two tiers of bookshelves housing a comprehensive catalog of global publications and reference texts.",
    detailedDescription: "A serene temple of knowledge, our institutional library contains thousands of educational resources, classic fiction, scientific magazines, and research materials. Built to encourage focused self-study as well as group literary inquiries, it provides comfortable bench-desks for peaceful study.",
    imagePath: "/input_file_5.png"
  },
  {
    id: "collaborative_study",
    title: "Collaborative Open Library Commons",
    category: "Academics",
    description: "A spacious floor layout where students gather in circles to share knowledge and discuss text materials.",
    detailedDescription: "This unique learning space allows students to sit in comfortable, unstructured floor arrangements, reading storybooks or textbook chapters in peer groups. It breaks down rigid hierarchical classroom silos to foster peer support, critical debate, and natural dialogue.",
    imagePath: "/input_file_6.png"
  },
  {
    id: "archery_club",
    title: "Archery & Fine Motor Training",
    category: "Sports",
    description: "A specialized outdoor sport cultivating immense focus, posture, and spatial awareness.",
    detailedDescription: "Akshara Vidyaashram is one of Cuddalore's premium hubs for archery coaching. Trained archery guides help young players build posture, refine their coordination, and develop extreme mental focus—teaching them to block out ambient distractions in pursuit of their academic and personal goals.",
    imagePath: "/input_file_2.png"
  },
  {
    id: "martial_arts",
    title: "Karate & Self-Defense Academy",
    category: "Sports",
    description: "Broad-daylight outdoor training sessions that instill discipline, physical core strength, and quick reflexes.",
    detailedDescription: "Martial arts are integrated into our curriculum to develop self-defense capability and inner discipline. Structured belt gradings and daily training outdoors build cardiorespiratory endurance, instilling the school motto of 'Freedom with Responsibility'.",
    imagePath: "/input_file_1.png"
  },
  {
    id: "forest_kindergarten",
    title: "Forest Schooling & Eco-Play",
    category: "Primary / Kindergarten",
    description: "A tree-canopied natural classroom where small children explore environmental biodiversity.",
    detailedDescription: "Our primary children participate in regular lessons beneath towering banyan and canopy trees. Immersed in Cuddalore's peaceful woodlands, pupils learn about soils, birds, and insects first-hand, building a lifeworthy relationship with nature.",
    imagePath: "/input_file_7.png"
  },
  {
    id: "sensory_art",
    title: "Sensory Arts & Expression Room",
    category: "Primary / Kindergarten",
    description: "Playful tactile classrooms designed for early-childhood paper crafts and physical creations.",
    detailedDescription: "We believe children absorb lessons through creative visual expression. In our early years program, pupils explore mixed-medium finger painting, clay manipulation, and color play safely inside designated spaces that encourage imaginative play.",
    imagePath: "/input_file_9.png"
  },
  {
    id: "eco_gardening",
    title: "Horticulture & Agricultural Training",
    category: "Infrastructure",
    description: "An active botanical space where students learn to dig soil, plant seedlings, and harvest produce.",
    detailedDescription: "Our active gardening sessions allow students to get their hands dirty. Guided by agricultural experts, they understand the science of plants, photosynthetic development, organic farming, and ecological conservation while sowing the seeds of patience and hard work.",
    imagePath: "/input_file_10.png"
  },
  {
    id: "bamboo_pathways",
    title: "Bamboo-Canopied Nature Corridors",
    category: "Infrastructure",
    description: "Shady botanical walkways connecting multiple administrative blocks inside the 25-acre estate.",
    detailedDescription: "With tall rows of bamboo and local foliage lining the campus pathways, children walk safely between the main office and school buildings. The natural shade preserves comfortable microclimates, reflecting our design philosophy as an eco-conscious educational sanctuary.",
    imagePath: "/input_file_14.png"
  },
  {
    id: "eco_crafting",
    title: "Syllabus on Eco-Sustainability",
    category: "Primary / Kindergarten",
    description: "Lessons based on building sustainable items like paper bags to encourage a plastic-free lifestyle.",
    detailedDescription: "Our students take absolute responsibility for their ecological footprint. From craft classes where they create stylish, useful carry-bags from recycled newspapers to dynamic science projects, they put ecological parameters into everyday practice.",
    imagePath: "/input_file_15.png"
  }
];

export const GENERAL_GALLERY: string[] = [
  "/images/125.jpeg", // Courtyard
  "/images/128.jpeg", // Pool
  "/input_file_13.png", // Science
  "/input_file_2.png", // Archery
  "/input_file_1.png", // Karate
  "/input_file_14.png", // Bamboo corridor
  "/input_file_15.png", // Green paper bag class
  "/input_file_7.png", // Kindergarten garden
  "/input_file_8.png", // Reading
  "/input_file_11.png", // Paper boat crafting
  "/input_file_12.png"  // Group study
];

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    category: "Admissions",
    question: "What is the admissions process for the 2026-27 academic year?",
    answer: "Admissions begin with an online registration or campus visit scheduling using this portal. Following registration, our team coordinates a short parent dialogue and interaction with the child to evaluate readiness, followed by confirmation of enrollment and fee settlement."
  },
  {
    id: "f2",
    category: "Admissions",
    question: "What is the age-eligibility threshold for Kindergarten and Grade 1?",
    answer: "Following State and CBSE guidelines, a child must have completed 3 years of age by March 31 of the academic year for Pre-KG, 4 years for LKG, and 6 years for Grade 1. Use our custom Age Calculator below to instantly check grade eligibility."
  },
  {
    id: "f3",
    category: "Campus Life",
    question: "How does the school balance the CBSE syllabus with non-syllabus activities?",
    answer: "Our guiding philosophy is 'Beyond the Syllabus'. While we have achieved a track record of CBSE academic excellence, students are allocated designated timetables for professional sports training (including archery, martial arts, and swimming) and arts to ensure continuous cognitive development."
  },
  {
    id: "f4",
    category: "Transport & Facilities",
    question: "Is school bus transport available across Cuddalore?",
    answer: "Yes, we operate a fleet of private GPS-enabled school buses carrying students safely across Cuddalore municipal limits and adjoining rural gateways. Every coach features an alert conductor, female helper, and real-time transit telemetry."
  },
  {
    id: "f5",
    category: "Academics",
    question: "What makes Akshara Vidyaashram a child-centered sanctuary?",
    answer: "We focus heavily on psychological safety and spacious classroom design. Class sizes are regulated to maintain a 1:15 educator-to-student coaching ratio. Instead of rote homework pressures, students absorb concepts through collaborative interactions."
  }
];

export const EDUCATION_STAGES = [
  {
    title: "Pre-Primary Sanctuary",
    grades: "Pre-KG / LKG / UKG",
    description: "Tactile, play-based, forest discovery curriculum nurturing foundational sensory motor skills, speech, and emotional confidence.",
    highlights: ["Forest kindergarten outdoor lessons", "Sensory finger paintings", "No-homework cognitive framework"]
  },
  {
    title: "Primary Academic Arena",
    grades: "Grades 1 to 5",
    description: "An inquiry-led CBSE curriculum focusing on literacy, logical numeracy, and natural sciences, blended with athletic specialization.",
    highlights: ["Mandatory swimming instruction", "Karate and archery focus", "Active horticulture and seed planting"]
  },
  {
    title: "Middle & Secondary Board",
    grades: "Grades 6 to 10",
    description: "Advanced scientific experiments, analytics, literature, and team leadership modules preparing youngsters for board benchmarks and life challenges.",
    highlights: ["Compound chemistry lab research", "Vast reading research thesis", "Democratic student leadership groups"]
  }
];

export const AGE_ELIGIBILITY_RULES = [
  { minAge: 3, maxAge: 4, grade: "Pre-KG" },
  { minAge: 4, maxAge: 5, grade: "LKG" },
  { minAge: 5, maxAge: 6, grade: "UKG" },
  { minAge: 6, maxAge: 7, grade: "Grade 1" },
  { minAge: 7, maxAge: 8, grade: "Grade 2" },
  { minAge: 8, maxAge: 9, grade: "Grade 3" },
  { minAge: 9, maxAge: 10, grade: "Grade 4" },
  { minAge: 10, maxAge: 11, grade: "Grade 5" },
  { minAge: 11, maxAge: 12, grade: "Grade 6" },
  { minAge: 12, maxAge: 13, grade: "Grade 7" },
  { minAge: 13, maxAge: 14, grade: "Grade 8" },
  { minAge: 14, maxAge: 15, grade: "Grade 9" },
  { minAge: 15, maxAge: 17, grade: "Grade 10" }
];

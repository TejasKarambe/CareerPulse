export const SEED_APPLICATIONS = [
  {
    id: "app-seed-1",
    companyName: "Stripe",
    jobTitle: "Senior Frontend Engineer",
    status: "interview",
    location: "San Francisco, CA (Remote)",
    workArrangement: "Remote",
    employmentType: "Full-time",
    salaryMin: 180000,
    salaryMax: 225000,
    currency: "USD ($)",
    appliedDate: "2026-09-18",
    url: "https://stripe.com/jobs",
    description: "Building next-generation developer checkout experiences with React, TypeScript, and high-performance WebGL visualizations.",
    rating: 5,
    tags: ["React", "TypeScript", "FinTech", "High Priority"],
    interviewDates: [
      { id: "iv-1", round: "Recruiter Screen", date: "2026-09-22T10:00", interviewer: "Sarah Jenkins", notes: "Went great, aligned on compensation and team structure." },
      { id: "iv-2", round: "System Architecture", date: "2026-10-12T14:30", interviewer: "David Miller (Staff Eng)", notes: "Focus on UI component architecture & state caching." }
    ],
    interviewQuestions: [
      { id: "q-1", question: "How would you architect an idempotent payment submission UI under flaky network conditions?", answer: "Implemented optimistic updates, client-side idempotency keys with retry backoff and abort controllers." },
      { id: "q-2", question: "Explain CSS layout thrashing and how to profile micro-benchmarks in DevTools.", answer: "Discussed batching DOM reads/writes and utilizing requestAnimationFrame." }
    ],
    notes: "Top choice company. The team values clean design systems and developer ergonomics."
  },
  {
    id: "app-seed-2",
    companyName: "Linear",
    jobTitle: "Product Designer & UI Engineer",
    status: "offer",
    location: "Remote (Global)",
    workArrangement: "Remote",
    employmentType: "Full-time",
    salaryMin: 195000,
    salaryMax: 240000,
    currency: "USD ($)",
    appliedDate: "2026-09-05",
    url: "https://linear.app/careers",
    description: "Designing and engineering fluid, keyboard-first software interfaces with GSAP, Tailwind, and React.",
    rating: 5,
    tags: ["Product Design", "GSAP", "Keyboard Shortcuts", "Dream Job"],
    interviewDates: [
      { id: "iv-3", round: "Founder Chat", date: "2026-09-12T15:00", interviewer: "Karri Saarinen", notes: "Product philosophy alignment." },
      { id: "iv-4", round: "Pair Programming", date: "2026-09-25T11:00", interviewer: "Tuomas Artman", notes: "Built interactive drag-and-drop workspace." }
    ],
    interviewQuestions: [
      { id: "q-3", question: "What is the secret behind Linear's perceived latency?", answer: "Zero layout shift, local optimistic synchronization with IndexedDB and background conflict resolution." }
    ],
    notes: "Received written offer letter! Need to negotiate equity package before Friday."
  },
  {
    id: "app-seed-3",
    companyName: "Vercel",
    jobTitle: "Developer Experience Engineer",
    status: "screening",
    location: "Remote (US)",
    workArrangement: "Remote",
    employmentType: "Full-time",
    salaryMin: 165000,
    salaryMax: 200000,
    currency: "USD ($)",
    appliedDate: "2026-10-02",
    url: "https://vercel.com/careers",
    description: "Championing Next.js edge capabilities, building interactive documentation and benchmark toolkits.",
    rating: 4,
    tags: ["Next.js", "DX", "Turborepo"],
    interviewDates: [
      { id: "iv-5", round: "Recruiter Chat", date: "2026-10-14T09:30", interviewer: "Alex Rivera", notes: "Prep portfolio links and open source contributions." }
    ],
    interviewQuestions: [],
    notes: "Applied through referral from Lee Robinson's Twitter thread."
  },
  {
    id: "app-seed-4",
    companyName: "Figma",
    jobTitle: "Design Systems Engineer",
    status: "interview",
    location: "New York, NY",
    workArrangement: "Hybrid",
    employmentType: "Full-time",
    salaryMin: 175000,
    salaryMax: 215000,
    currency: "USD ($)",
    appliedDate: "2026-09-20",
    url: "https://figma.com/careers",
    description: "Scaling the internal Design System for Figma and FigJam across web and desktop canvases.",
    rating: 5,
    tags: ["Design System", "Tokens", "Accessibility", "Wasm"],
    interviewDates: [
      { id: "iv-6", round: "Technical Screen", date: "2026-09-29T16:00", interviewer: "Clara Wood", notes: "Reviewed component token synchronization." },
      { id: "iv-7", round: "Onsite Virtual (4 rounds)", date: "2026-10-16T13:00", interviewer: "Design Eng Panel", notes: "Prepare deep dive into accessible keyboard roving tabindex." }
    ],
    interviewQuestions: [
      { id: "q-4", question: "How would you handle WCAG AAA color contrast compliance in dark/light themes dynamically?", answer: "Calculated APCA perceptual contrast algorithm and CSS relative color syntax." }
    ],
    notes: "Hybrid 2 days per week in NYC office. Generous wellness stipend."
  },
  {
    id: "app-seed-5",
    companyName: "Spotify",
    jobTitle: "Web Platform Engineer",
    status: "applied",
    location: "Stockholm / London / Remote",
    workArrangement: "Hybrid",
    employmentType: "Full-time",
    salaryMin: 140000,
    salaryMax: 175000,
    currency: "EUR (€)",
    appliedDate: "2026-10-06",
    url: "https://spotifyjobs.com",
    description: "Building web playback infrastructure and audio engine visualizations.",
    rating: 4,
    tags: ["WebAudio", "Audio SDK", "Streaming"],
    interviewDates: [],
    interviewQuestions: [],
    notes: "Submitted via job portal with personalized cover letter."
  },
  {
    id: "app-seed-6",
    companyName: "Airbnb",
    jobTitle: "Frontend Architect",
    status: "rejected",
    location: "San Francisco, CA",
    workArrangement: "Remote",
    employmentType: "Full-time",
    salaryMin: 210000,
    salaryMax: 260000,
    currency: "USD ($)",
    appliedDate: "2026-08-15",
    url: "https://careers.airbnb.com",
    description: "Architecting host dashboard micro-frontends with high test coverage and SSR speed.",
    rating: 4,
    tags: ["Micro-frontends", "SSR", "GraphQL"],
    interviewDates: [
      { id: "iv-8", round: "Recruiter Screen", date: "2026-08-20T10:00", interviewer: "Tom Vance", notes: "Discussed relocation and remote policy." },
      { id: "iv-9", round: "System Design", date: "2026-08-28T14:00", interviewer: "Eileen K.", notes: "Position was put on freeze internally." }
    ],
    interviewQuestions: [
      { id: "q-5", question: "How would you design a distributed client-side image cache for listings?", answer: "Service worker Cache Storage API with LRU eviction and WebP/AVIF format negotiation." }
    ],
    notes: "Headcount closed for Q3. Recruiter said they will reconnect for Q1 next year."
  },
  {
    id: "app-seed-7",
    companyName: "Datadog",
    jobTitle: "Senior UI Engineer - Observability",
    status: "applied",
    location: "New York, NY",
    workArrangement: "Hybrid",
    employmentType: "Full-time",
    salaryMin: 170000,
    salaryMax: 210000,
    currency: "USD ($)",
    appliedDate: "2026-10-08",
    url: "https://datadoghq.com/careers",
    description: "High-density real-time metrics charts, custom canvases, and logarithmic data visualizers.",
    rating: 3,
    tags: ["Data Viz", "Canvas", "Performance"],
    interviewDates: [],
    interviewQuestions: [],
    notes: "Applied yesterday. Got automated confirmation email."
  }
];

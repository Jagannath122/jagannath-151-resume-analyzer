export interface SampleResumeMeta {
  id: string;
  name: string;
  title: string;
  level: string;
  description: string;
  accent: string;
  badge: string;
  targetRolePlaceholder: string;
}

export const SAMPLE_RESUMES: SampleResumeMeta[] = [
  {
    id: 'senior-cloud-arch',
    name: 'Alex Rivera',
    title: 'Senior Staff Cloud Systems Engineer',
    level: 'Staff / Lead (8+ YOE)',
    description: 'High-impact distributed systems engineer with multi-cloud scaling, Kubernetes, and Golang expertise.',
    accent: 'emerald',
    badge: 'High Impact / FAANG Tier',
    targetRolePlaceholder: 'Principal Distributed Systems Engineer at Cloudflare or Google Cloud',
  },
  {
    id: 'junior-dev-pitfalls',
    name: 'David Miller',
    title: 'Junior Full-Stack Web Developer',
    level: 'Junior (1.5 YOE)',
    description: 'Early-career developer with common resume pitfalls: unquantified bullets, passive voice, and formatting traps.',
    accent: 'amber',
    badge: 'Contains Fixable Pitfalls',
    targetRolePlaceholder: 'Full-Stack Software Engineer II at a modern SaaS company',
  },
  {
    id: 'product-lead',
    name: 'Sophia Chen',
    title: 'Lead Growth Product Manager',
    level: 'Senior / Lead (6 YOE)',
    description: 'Growth & PLG expert with strong A/B testing, ARR expansion, retention metrics, and roadmap leadership.',
    accent: 'indigo',
    badge: 'Metrics & Business Driven',
    targetRolePlaceholder: 'Director of Product or Principal PM at a Series C-D Unicorn',
  },
  {
    id: 'ml-researcher',
    name: 'Dr. Elena Rostova',
    title: 'Staff AI / ML Research Engineer',
    level: 'Staff (5 YOE + PhD)',
    description: 'Specializes in LLM post-training, inference optimization, PyTorch, and distributed training clusters.',
    accent: 'purple',
    badge: 'Deep Tech & ML Specialist',
    targetRolePlaceholder: 'Staff Research Engineer at an AI Foundation Lab',
  },
];

export async function generateSamplePdf(id: string): Promise<{ base64: string; fileName: string; fileSizeKb: number }> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
  });

  const margin = 40;
  let y = 45;

  const addHeader = (name: string, title: string, contact: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(24, 32, 47);
    doc.text(name, margin, y);
    y += 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(79, 70, 229);
    doc.text(title, margin, y);
    y += 16;

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(contact, margin, y);
    y += 18;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(margin, y, 572, y);
    y += 16;
  };

  const addSectionTitle = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(title.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + 45, y);
    y += 14;
  };

  const addJobHeader = (role: string, company: string, dates: string, location: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    const dateText = `${dates} | ${location}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, 572 - dateWidth, y);
    y += 13;

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);
    doc.text(company, margin, y);
    y += 13;
  };

  const addBullet = (bullet: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const bulletPrefix = '•  ';
    const splitText = doc.splitTextToSize(bullet, 510);
    doc.text(bulletPrefix + splitText[0], margin + 6, y);
    if (splitText.length > 1) {
      for (let i = 1; i < splitText.length; i++) {
        y += 11;
        doc.text('   ' + splitText[i], margin + 6, y);
      }
    }
    y += 13;
  };

  if (id === 'senior-cloud-arch') {
    addHeader(
      'Alex Rivera',
      'Senior Staff Cloud Systems Engineer',
      'San Francisco, CA | alex.rivera@example.com | (415) 555-0192 | linkedin.com/in/alexrivera-cloud | github.com/arivera-systems'
    );

    addSectionTitle('Executive Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summary = 'Distributed systems engineer with 8+ years of experience architecting fault-tolerant microservices, high-throughput message brokers, and enterprise multi-region Kubernetes infrastructure. Proven track record reducing cloud compute expenses by 42% ($2.4M ARR) while improving 99.99% SLO availability.';
    doc.text(doc.splitTextToSize(summary, 530), margin, y);
    y += 26;

    addSectionTitle('Experience');
    addJobHeader('Staff Platform Infrastructure Engineer', 'Apex Cloud Technologies', '2021 – Present', 'San Francisco, CA');
    addBullet('Architected global multi-region service mesh supporting 350M+ requests/day across 18 EKS clusters, slashing p99 latency from 145ms to 28ms.');
    addBullet('Spearheaded FinOps cluster rightsizing initiative, automated spot instance reclamation, saving $2.4M annually in AWS compute costs.');
    addBullet('Led engineering team of 9 senior engineers designing zero-downtime database migration tooling handling 14TB Postgres sharded cluster.');
    addBullet('Established comprehensive SLO monitoring and automated remediation playbooks, reducing MTTR by 64% (from 48 min to 17 min).');
    y += 6;

    addJobHeader('Senior Backend Systems Engineer', 'Veloce Data Systems', '2018 – 2021', 'Seattle, WA');
    addBullet('Engineered high-throughput event streaming ingestion engine with Apache Kafka and Go, processing 1.2M events/sec with zero message loss.');
    addBullet('Migrated legacy monolith to Go microservices, improving deployment frequency from bi-weekly to 18 deployments per day.');
    addBullet('Mentored 6 junior/mid-level engineers, resulting in 3 internal promotions to Senior Engineer within 14 months.');
    y += 6;

    addSectionTitle('Technical Skills & Architecture');
    addBullet('Languages: Go (Golang), Rust, Python, TypeScript, Bash, SQL.');
    addBullet('Cloud & DevOps: AWS (EKS, Lambda, SQS, RDS, CloudFront), GCP, Kubernetes, Terraform, Helm, Docker, GitHub Actions, ArgoCD.');
    addBullet('Databases & Storage: PostgreSQL, Redis, Apache Kafka, Cassandra, DynamoDB, Elasticsearch, OpenTelemetry, Prometheus, Datadog.');
    y += 6;

    addSectionTitle('Education & Certifications');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('B.S. in Computer Science', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('University of California, Berkeley | 2014 – 2018', margin + 140, y);
    y += 13;
    doc.text('AWS Certified Solutions Architect – Professional (Active) | Certified Kubernetes Administrator (CKA)', margin, y);

    const pdfOutput = doc.output('datauristring');
    const base64 = pdfOutput.split(',')[1];
    return {
      base64,
      fileName: 'Alex_Rivera_Staff_Cloud_Engineer.pdf',
      fileSizeKb: Math.round(base64.length * 0.75 / 1024),
    };
  }

  if (id === 'junior-dev-pitfalls') {
    addHeader(
      'David Miller',
      'Junior Full-Stack Web Developer',
      'Austin, TX | david.miller.dev@email.com | (512) 555-0812'
    );

    addSectionTitle('Objective');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summary = 'Hardworking, passionate developer looking to leverage my knowledge of web development to secure a junior software engineering role at an innovative company. Always willing to learn new technologies and be a team player.';
    doc.text(doc.splitTextToSize(summary, 530), margin, y);
    y += 24;

    addSectionTitle('Work Experience');
    addJobHeader('Junior Web Developer', 'Creative Media Solutions', '2023 – Present', 'Austin, TX');
    addBullet('Responsible for maintaining and updating client websites built using React and Node.js.');
    addBullet('Helped team with front-end bug fixes and attended daily agile standup meetings.');
    addBullet('Worked on improving page loading speeds and made websites responsive on mobile screens.');
    addBullet('Participated in code reviews and collaborated with UI designers.');
    y += 6;

    addJobHeader('Web Development Intern', 'Spark Studio', 'Summer 2022', 'Austin, TX');
    addBullet('Assisted in building UI components using HTML, CSS, and basic JavaScript.');
    addBullet('Tested web applications across different browsers to make sure they worked properly.');
    addBullet('I created documentation for internal developer onboarding.');
    y += 6;

    addSectionTitle('Academic Projects');
    addBullet('E-Commerce Website: Built a shopping cart application with React, Express, and MongoDB. Allowed users to buy products.');
    addBullet('Task Manager App: Created a todo list application where users can add, delete, and edit tasks.');
    y += 6;

    addSectionTitle('Skills');
    addBullet('Languages & Tech: JavaScript, HTML5, CSS3, React, Node.js, Express, MongoDB, Git, GitHub.');
    addBullet('Soft Skills: Fast learner, great communication, team player, critical thinking, problem solving.');
    y += 6;

    addSectionTitle('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('B.A. in Digital Arts & Computer Information Systems', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Texas State University | 2019 – 2023 (GPA: 3.4)', margin + 240, y);

    const pdfOutput = doc.output('datauristring');
    const base64 = pdfOutput.split(',')[1];
    return {
      base64,
      fileName: 'David_Miller_Junior_Developer_Pitfalls.pdf',
      fileSizeKb: Math.round(base64.length * 0.75 / 1024),
    };
  }

  if (id === 'product-lead') {
    addHeader(
      'Sophia Chen',
      'Lead Growth Product Manager',
      'New York, NY | sophia.chen@example.com | (917) 555-0329 | linkedin.com/in/sophiachen-pm'
    );

    addSectionTitle('Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summary = 'Product Leader with 6 years experience driving product-led growth (PLG) for B2B SaaS platforms. Specialized in onboarding experimentation, freemium-to-paid conversion funnels, and monetization strategy. Led cross-functional squads of 14 across engineering, design, and data science to drive $8.2M in net new ARR.';
    doc.text(doc.splitTextToSize(summary, 530), margin, y);
    y += 24;

    addSectionTitle('Professional Experience');
    addJobHeader('Lead Product Manager - Growth & Monetization', 'FlowMetric SaaS', '2022 – Present', 'New York, NY');
    addBullet('Redesigned self-serve onboarding flow, reducing time-to-first-value (TTFV) from 18 minutes to 4.2 minutes, driving a 34% increase in Day-7 activation.');
    addBullet('Introduced usage-based tiering and in-app checkout prompts, expanding free-to-paid conversion rate from 2.1% to 4.7% ($5.1M incremental ARR).');
    addBullet('Managed roadmap and sprint planning for 2 full-stack squads (14 engineers, 2 product designers, 1 data scientist).');
    addBullet('Built automated churn prediction feedback loops using Mixpanel and Amplitude, reducing annual customer churn by 18%.');
    y += 6;

    addJobHeader('Senior Product Manager', 'Kinetix Workspace', '2019 – 2022', 'Boston, MA');
    addBullet('Launched enterprise collaboration workspace module from zero to 85,000 MAU within first 6 months of general availability.');
    addBullet('Conducted 120+ customer discovery interviews with VP-level buyers to identify core friction points in procurement cycle.');
    addBullet('Partnered with sales engineering to build SOC2 compliance export tools, unblocking $3.1M in stalled enterprise deals.');
    y += 6;

    addSectionTitle('Skills & Competencies');
    addBullet('Product Craft: Product Strategy, Growth Loops, Pricing & Packaging, A/B Testing, User Research, Agile/Scrum, Roadmap Prioritization.');
    addBullet('Analytics & Tools: Amplitude, Mixpanel, SQL, Looker, Figma, Jira, Linear, Segment, FullStory, Salesforce.');
    y += 6;

    addSectionTitle('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('B.S. in Industrial Engineering & Economics', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Columbia University | 2015 – 2019', margin + 200, y);

    const pdfOutput = doc.output('datauristring');
    const base64 = pdfOutput.split(',')[1];
    return {
      base64,
      fileName: 'Sophia_Chen_Lead_Product_Manager.pdf',
      fileSizeKb: Math.round(base64.length * 0.75 / 1024),
    };
  }

  // Elena Rostova - ML Engineer
  addHeader(
    'Dr. Elena Rostova',
    'Staff AI / Machine Learning Research Engineer',
    'Seattle, WA | elena.rostova@example.com | (206) 555-0841 | github.com/erostova-ai | scholar.google.com/citations?user=erostova'
  );

  addSectionTitle('Research & Technical Profile');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summary = 'AI Research Engineer with PhD in Computer Science and 5 years industry experience developing LLM alignment, speculative decoding, and scalable inference infrastructure. First-author of 6 peer-reviewed papers at NeurIPS, ICML, and ICLR with 1,200+ citations.';
  doc.text(doc.splitTextToSize(summary, 530), margin, y);
  y += 24;

  addSectionTitle('Industry Experience');
  addJobHeader('Staff ML Research Engineer', 'Synthetica AI Labs', '2022 – Present', 'Seattle, WA');
  addBullet('Designed custom tensor parallelism and speculative decoding pipeline for 70B parameter models, achieving 2.8x higher throughput on H100 clusters.');
  addBullet('Developed novel RLHF and DPO alignment training recipes that outperformed baseline benchmarks on HumanEval by 14.6%.');
  addBullet('Optimized KV-cache compression and quantization (FP8 / AWQ), cutting GPU memory footprint by 45% with sub-0.5% perplexity degradation.');
  y += 6;

  addJobHeader('Senior Applied Scientist', 'OmniVision Research', '2020 – 2022', 'Redmond, WA');
  addBullet('Trained multi-modal contrastive embeddings across 500M image-text pairs; deployed to production serving 45M search queries daily.');
  addBullet('Published 3 patents on memory-efficient attention mechanisms for long-context transformer architectures.');
  y += 6;

  addSectionTitle('Core Technical Expertise');
  addBullet('Frameworks & ML: PyTorch, JAX, HuggingFace, vLLM, TensorRT-LLM, DeepSpeed, Megatron-LM, Triton, Ray, Weights & Biases.');
  addBullet('Domains: Large Language Models, RLHF/DPO, Quantization, Efficient Attention, Speculative Decoding, Multi-modal Vision-Language.');
  y += 6;

  addSectionTitle('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Ph.D. in Computer Science (Machine Learning Focus)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('University of Washington | 2016 – 2020', margin + 250, y);
  y += 13;
  doc.setFont('helvetica', 'bold');
  doc.text('B.S. in Mathematics & Computer Science', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Carnegie Mellon University | 2012 – 2016', margin + 250, y);

  const pdfOutput = doc.output('datauristring');
  const base64 = pdfOutput.split(',')[1];
  return {
    base64,
    fileName: 'Dr_Elena_Rostova_Staff_ML_Engineer.pdf',
    fileSizeKb: Math.round(base64.length * 0.75 / 1024),
  };
}

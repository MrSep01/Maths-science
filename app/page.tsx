"use client";

import { FormEvent, useState } from "react";

const subjects = [
  {
    code: "01",
    title: "A-Level Chemistry",
    text: "Concept-led support for Cambridge and Pearson Edexcel AS and A Level Chemistry, from atomic structure and energetics to organic synthesis.",
    topics: ["Exam technique", "Calculations", "Practical skills"],
    accent: "blue",
  },
  {
    code: "02",
    title: "IGCSE Chemistry & Science",
    text: "Clear explanations, structured practice and targeted revision for Cambridge and Pearson Edexcel IGCSE Chemistry and combined sciences.",
    topics: ["Core concepts", "Past papers", "Confidence building"],
    accent: "coral",
  },
  {
    code: "03",
    title: "Secondary Mathematics",
    text: "Patient, step-by-step support in algebra, graphs, geometry and the mathematical skills students need across the sciences.",
    topics: ["Algebra", "Graphs", "Problem-solving"],
    accent: "lime",
  },
];

const steps = [
  ["01", "Assess", "We identify current understanding, course requirements and the topics creating the biggest barrier."],
  ["02", "Plan", "Each learner receives a focused pathway built around upcoming assessments and longer-term goals."],
  ["03", "Learn", "Lessons combine clear teaching, worked examples, guided practice and independent exam-style questions."],
  ["04", "Review", "Progress is checked regularly so teaching can be adjusted and every lesson keeps moving forward."],
];

const faqs = [
  ["Which curricula do you support?", "Cambridge International and Pearson Edexcel IGCSE, AS and A Level are the main focus. Support can also be adapted for IB and AP Chemistry students."],
  ["Are lessons online or in person?", "Both. Online tutoring is available for students across Thailand and Asia. In-person lessons can be arranged in Bangkok, subject to location and availability."],
  ["Is tutoring only for students who are struggling?", "No. Lessons support students who need to rebuild foundations, strengthen exam technique or push toward the highest grades."],
  ["What happens in the first consultation?", "We discuss the student’s course, current level, recent assessments, goals and schedule. This allows the first lesson plan to be properly targeted."],
];

const EMAIL = "sep.alamouti@sepalamouti.com";
const PHONE_DISPLAY = "+66 64 558 5241";
const WHATSAPP_URL = "https://wa.me/66645585241";
const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";

const programmes = [
  {
    label: "Ongoing support",
    title: "IGCSE Success Programme",
    bestFor: "Cambridge and Pearson Edexcel IGCSE students",
    description: "Build secure foundations, keep pace with school and develop the exam skills needed for confident progress across the course.",
    features: ["Personal learning assessment", "Targeted topic teaching", "Calculation and practical skills", "Exam-style practice and feedback", "Progress review and next-step planning"],
    accent: "programme-blue",
  },
  {
    label: "Advanced study",
    title: "A-Level Chemistry Mastery",
    bestFor: "AS and A Level Chemistry students",
    description: "Strengthen demanding concepts and connect chemical theory, mathematical reasoning, practical analysis and precise exam communication.",
    features: ["AS or A2 diagnostic review", "Specification-aligned lessons", "Multi-step calculations", "Data and practical analysis", "Synoptic and past-paper preparation"],
    accent: "programme-coral",
    featured: true,
  },
  {
    label: "Short-term intensive",
    title: "Exam Preparation Intensive",
    bestFor: "Mocks, final examinations and resits",
    description: "A focused preparation pathway that identifies mark-losing patterns and prioritizes the topics with the greatest potential impact.",
    features: ["Diagnostic past paper", "Prioritized revision plan", "Timed question practice", "Detailed marking and corrections", "Exam strategy and final review"],
    accent: "programme-lime",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Tutoring consultation request — ${form.get("subject") || "Science or Mathematics"}`;
    const body = [
      `Name: ${form.get("name") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Course level: ${form.get("level") || ""}`,
      `Subject: ${form.get("subject") || ""}`,
      "",
      "Support requested:",
      `${form.get("message") || ""}`,
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sep Science and Math home">
          <span className="brand-mark">S</span>
          <span>Sep Science <i>&amp;</i> Math</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#subjects" onClick={() => setMenuOpen(false)}>Subjects</a>
          <a href="#programmes" onClick={() => setMenuOpen(false)}>Programmes</a>
          <a href="/resources" onClick={() => setMenuOpen(false)}>Resources</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Sep</a>
        </nav>
        <a className="button button-small header-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Private tutoring for international curricula</p>
          <h1>Build confidence.<br />Master the <em>science.</em></h1>
          <p className="hero-lead">Expert one-to-one tutoring for international-school students—online across Asia and in person in Bangkok.</p>
          <div className="hero-actions">
            <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
            <a className="button button-outline" href="#subjects">Explore subjects <span>↓</span></a>
          </div>
          <div className="trust-row" aria-label="Tutor highlights">
            <div><b>15+</b><span>years of international<br />teaching</span></div>
            <div><b>A*</b><span>curriculum-aligned<br />exam preparation</span></div>
            <div><b>1:1</b><span>personalized<br />learning plans</span></div>
          </div>
        </div>

        <div className="hero-visual reveal delay-one" aria-label="One-to-one science tutoring">
          <div className="hero-image" role="img" aria-label="Tutor supporting an international school student with science and mathematics" />
          <div className="atom-orbit" aria-hidden="true"><i /><i /><i /><b /></div>
          <div className="formula-card card-top" aria-hidden="true">pV = nRT</div>
          <div className="formula-card card-bottom" aria-hidden="true"><span>y</span> = ax² + bx + c</div>
          <div className="availability"><span /> Accepting a limited number of students</div>
        </div>
      </section>

      <section className="curriculum-strip" aria-label="Curricula supported">
        <span>Curriculum experience</span>
        <b>Cambridge International</b><i />
        <b>Pearson Edexcel</b><i />
        <b>IB Chemistry</b><i />
        <b>AP Chemistry</b>
      </section>

      <section className="section subjects" id="subjects">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Subject support</p><h2>Focused tutoring.<br /><em>Real understanding.</em></h2></div>
          <p>International courses move quickly. Lessons connect the underlying ideas, the calculations and the exam language so students can answer with confidence.</p>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => (
            <article className={`subject-card ${subject.accent}`} key={subject.title}>
              <div className="subject-top"><span>{subject.code}</span><div className="subject-icon" aria-hidden="true" /></div>
              <h3>{subject.title}</h3>
              <p>{subject.text}</p>
              <ul>{subject.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              <a href="#consultation" aria-label={`Enquire about ${subject.title}`}>Enquire about this subject <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section programmes" id="programmes">
        <div className="section-heading programme-heading">
          <div><p className="eyebrow"><span /> Tutoring programmes</p><h2>Support designed around<br /><em>the student’s goal.</em></h2></div>
          <div className="programme-intro"><p>Choose the programme that best matches the student’s course and current priority. Lesson frequency and duration are agreed after the free consultation.</p><span>Pricing tailored after consultation</span></div>
        </div>
        <div className="programme-grid">
          {programmes.map((programme) => (
            <article className={`programme-card ${programme.accent} ${programme.featured ? "featured" : ""}`} key={programme.title}>
              {programme.featured && <span className="popular-label">Most requested</span>}
              <p className="programme-label">{programme.label}</p>
              <h3>{programme.title}</h3>
              <p className="best-for">Best for: {programme.bestFor}</p>
              <p className="programme-description">{programme.description}</p>
              <ul>{programme.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
              <div className="programme-price"><span>Investment</span><b>Enquire for pricing</b></div>
              <a className="programme-button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a free consultation <span>↗</span></a>
            </article>
          ))}
        </div>
        <p className="programme-note">Available online across Asia and in person in Bangkok, subject to location and availability.</p>
      </section>

      <section className="section approach" id="approach">
        <div className="approach-intro">
          <p className="eyebrow light"><span /> How tutoring works</p>
          <h2>A clear route from<br /><em>uncertain to capable.</em></h2>
          <p>Every student starts from a different place. The teaching plan should reflect that.</p>
          <a className="text-link" href="#consultation">Discuss your learning goals <span>→</span></a>
        </div>
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-art">
          <img className="about-photo-main" src="/sep-educator-profile.png" alt="Sep, an international Chemistry and Science educator" />
          <div className="credential-card"><b>15+ years</b><span>Teaching internationally</span></div>
          <div className="molecule"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span /> Meet your tutor</p>
          <h2>Experienced teaching.<br /><em>Personal attention.</em></h2>
          <p className="large">I’m Sep, a Canadian international educator specializing in Chemistry, Science and the mathematical skills students need to succeed in both.</p>
          <p>For more than 15 years, I have worked with international-school students in Thailand and China across Cambridge, Pearson Edexcel, IB and AP programmes. My approach combines patient explanation, careful diagnosis and purposeful exam practice.</p>
          <blockquote>“Students make lasting progress when they understand why a method works—not only which steps to memorize.”</blockquote>
          <a className="about-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Meet Sep in a free consultation <span>↗</span></a>
        </div>
      </section>

      <section className="credentials-section" aria-label="Professional credentials">
        <div className="credentials-header"><p className="eyebrow light"><span /> Professional background</p><h2>Qualified, experienced<br />and internationally minded.</h2></div>
        <div className="credential-grid">
          <article><span>BSc</span><div><b>Biochemistry &amp; Molecular Biology</b><p>Strong subject foundations across chemistry and the molecular sciences.</p></div></article>
          <article><span>MEd</span><div><b>International Teaching</b><p>Advanced preparation in learning, curriculum and effective instruction.</p></div></article>
          <article><span>15+</span><div><b>Years of experience</b><p>Teaching and supporting international-school students across multiple levels.</p></div></article>
          <article><span>TH</span><div><b>Thailand Teaching Licence</b><p>Licensed professional teaching experience in the Thai international context.</p></div></article>
          <article><span>US</span><div><b>Secondary Chemistry Licensure Training</b><p>Professional preparation completed through Moreland University.</p></div></article>
          <article><span>4×</span><div><b>International curricula</b><p>Cambridge, Pearson Edexcel, International Baccalaureate and Advanced Placement.</p></div></article>
          <article><span>2</span><div><b>International contexts</b><p>Extensive classroom experience in Thailand and China.</p></div></article>
          <article><span>CA</span><div><b>Canadian educator</b><p>A global perspective grounded in international education.</p></div></article>
        </div>
      </section>

      <section className="section learning-experience">
        <div className="experience-heading">
          <div><p className="eyebrow"><span /> What learners can expect</p><h2>Support that is clear,<br /><em>structured and responsive.</em></h2></div>
          <p>These are the principles behind every lesson. They describe the learning experience rather than claiming unverified student endorsements.</p>
        </div>
        <div className="experience-layout">
          <div className="experience-images">
            <img src="/chemistry-classroom.png" alt="Students learning through a guided Chemistry practical" />
            <img src="/online-tutoring.png" alt="An online Chemistry tutoring lesson with digital notes" />
          </div>
          <div className="expectation-cards">
            <article><span>01</span><h3>Complex ideas made manageable</h3><p>New concepts are broken into clear steps, connected to prior knowledge and checked before moving forward.</p></article>
            <article><span>02</span><h3>Practice with a purpose</h3><p>Questions are selected to reveal misconceptions, strengthen reasoning and prepare students for the demands of their examination.</p></article>
            <article><span>03</span><h3>Feedback students can use</h3><p>Students learn what is working, where marks are being lost and exactly what to improve next.</p></article>
          </div>
        </div>
        <div className="testimonial-note"><b>Authentic testimonials coming soon</b><span>Verified student and parent feedback can be added here as it becomes available.</span></div>
      </section>

      <section className="section outcomes">
        <p className="eyebrow"><span /> What we work toward</p>
        <div className="outcome-grid">
          <h2>Not just more practice.<br /><em>Better learning habits.</em></h2>
          <div className="outcome-list">
            <div><span>01</span><p><b>Clearer explanations</b>Connect evidence, concepts and chemical language.</p></div>
            <div><span>02</span><p><b>Stronger problem-solving</b>Choose methods confidently and show working clearly.</p></div>
            <div><span>03</span><p><b>Smarter exam technique</b>Interpret command words and target every mark.</p></div>
            <div><span>04</span><p><b>Greater independence</b>Plan revision and recognize what still needs attention.</p></div>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div><p className="eyebrow"><span /> Common questions</p><h2>Before we<br /><em>get started.</em></h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="consultation" id="consultation">
        <div className="consultation-copy">
          <p className="eyebrow light"><span /> Free 15-minute consultation</p>
          <h2>Let’s make the next topic<br /><em>feel manageable.</em></h2>
          <p>Share a few details about the student and their course. We can then discuss the right support, schedule and learning priorities.</p>
          <div className="mode-pills"><span>Online across Asia</span><span>In person in Bangkok</span></div>
          <a className="calendar-button" href={BOOKING_URL} target="_blank" rel="noreferrer"><b>Choose a consultation time</b><span>Open Google Calendar ↗</span></a>
          <div className="direct-contact">
            <a href={`mailto:${EMAIL}`}>Email Sep <span>{EMAIL}</span></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp <span>{PHONE_DISPLAY}</span></a>
          </div>
        </div>
        <form className="consultation-form" onSubmit={submitRequest}>
          {sent ? (
            <div className="form-success" role="status"><b>Your email is ready.</b><p>Your email application should open with the consultation details already completed. Send it to Sep to request your free consultation.</p><div className="success-actions"><a href={`mailto:${EMAIL}`}>Email Sep</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Use WhatsApp</a></div><button type="button" onClick={() => setSent(false)}>Submit another request</button></div>
          ) : <>
            <label>Parent or student name<input name="name" required placeholder="Your name" /></label>
            <label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label>
            <div className="form-row">
              <label>Course level<select name="level" defaultValue=""><option value="" disabled>Select level</option><option>IGCSE</option><option>AS / A Level</option><option>IB / AP</option><option>Secondary school</option></select></label>
              <label>Subject<select name="subject" defaultValue=""><option value="" disabled>Select subject</option><option>Chemistry</option><option>Science</option><option>Mathematics</option></select></label>
            </div>
            <label>What support would be most useful?<textarea name="message" rows={3} placeholder="Current challenges, upcoming exams and preferred schedule" /></label>
            <button className="button form-button" type="submit">Request a consultation <span>→</span></button>
            <small>No commitment—just a short conversation about what the student needs.</small>
          </>}
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></a>
        <p>Specialist tutoring for international-school students in Bangkok and across Asia.</p>
        <div><a href="#subjects">Subjects</a><a href="#programmes">Programmes</a><a href="/resources">Resources</a><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a><a href={`mailto:${EMAIL}`}>Email</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a></div>
        <small>© {new Date().getFullYear()} Sep Science &amp; Math. All rights reserved.</small>
      </footer>
    </main>
  );
}

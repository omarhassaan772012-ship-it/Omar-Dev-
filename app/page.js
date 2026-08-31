import Image from "next/image";
import styles from "./page.module.css";
import htmlLogo from "../imgs/Html.png";
import cssLogo from "../imgs/css.png";
import jsLogo from "../imgs/JavaScript.png";
import reactLogo from "../imgs/React.webp";
import nextLogo from "../imgs/Next.png";
import { defaultPortfolio, defaultProjects, defaultTech, fetchPortfolioBundle } from "../lib/api";

export const dynamic = "force-dynamic";

const localLogos = {
  HTML5: htmlLogo,
  HTML: htmlLogo,
  CSS3: cssLogo,
  CSS: cssLogo,
  JavaScript: jsLogo,
  React: reactLogo,
  "Next.js": nextLogo,
  Next: nextLogo,
};

function renderHeadline(headline) {
  const text = headline || "";
  const match = text.match(/^(.*?)(\bbold\b)(.*)$/i);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <span>{match[2]}</span>
      {match[3]}
    </>
  );
}

function brandName(name) {
  const first = (name || "Omar").trim().split(" ")[0];
  return first || "Omar";
}

function TechImage({ name, image }) {
  if (image && /^https?:\/\//i.test(image)) {
    return <img src={image} alt={name} width={64} height={64} />;
  }

  const local = localLogos[name];
  if (local) {
    return <Image src={local} alt={name} width={64} height={64} />;
  }

  return <span className={styles.techFallback}>{name.slice(0, 2).toUpperCase()}</span>;
}

export default async function Home() {
  let profile = defaultPortfolio;
  let projects = defaultProjects;
  let techStack = defaultTech;
  let contact = defaultPortfolio.contact;

  try {
    const data = await fetchPortfolioBundle();
    profile = data.profile;
    projects = data.projects;
    techStack = data.techStack;
    contact = data.contact;
  } catch (error) {
    console.error("Portfolio fetch failed:", error);
  }

  const stats = profile.stats?.length ? profile.stats : defaultPortfolio.stats;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span>{brandName(profile.name)}</span>
          <small>Dev</small>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className={`${styles.button} ${styles.primary}`}>
          Hire Me
        </a>
      </header>

      <section id="home" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{profile.role}</p>
          <h1>{renderHeadline(profile.headline)}</h1>
          <p className={styles.lead}>{profile.summary}</p>

          <div className={styles.ctas}>
            <a href="#projects" className={`${styles.button} ${styles.primary}`}>
              View Projects
            </a>
            <a href="#contact" className={`${styles.button} ${styles.secondary}`}>
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.cardTop}>
            <span className={styles.statusDot} />
            <span>Available for work</span>
          </div>

          <div className={styles.metrics}>
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Selected work</p>
          <h2>Projects</h2>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project._id || project.title} className={styles.projectCard}>
              {project.image ? (
                <div className={styles.projectImageWrap}>
                  <img src={project.image} alt={project.title} />
                </div>
              ) : null}
              <span className={styles.projectTag}>{project.category || project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer">
                  Explore project
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="tech-stack" className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>What I use</p>
          <h2>Tech Stack</h2>
        </div>

        <div className={styles.techGrid}>
          {techStack.map((item) => (
            <div key={item._id || item.name} className={styles.techCard}>
              <div className={styles.techImageWrap}>
                <TechImage name={item.name} image={item.image} />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.contactBox}>
          <div>
            <p className={styles.eyebrow}>Let&apos;s build</p>
            <h2>Contact</h2>
          </div>

          <div className={styles.contactList}>
            {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null}
            {contact.github ? (
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {contact.linkedin ? (
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

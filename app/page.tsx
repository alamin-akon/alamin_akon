const projects = [
  { title: "Project One", type: "Web Application", description: "A short description of your first featured project." },
  { title: "Project Two", type: "Creative Build", description: "A short description of another project you are proud of." },
  { title: "Project Three", type: "Case Study", description: "A short description of the problem you solved." },
];

export default function Home() {
  return (
    <main>
      <nav className="nav container">
        <a className="logo" href="#home">YN.</a>
        <div>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero container">
        <p className="eyebrow">PORTFOLIO — 2026</p>
        <h1>I build thoughtful digital experiences.</h1>
        <p className="intro">I&apos;m <strong>Your Name</strong>, a designer and developer focused on simple, useful, and memorable products.</p>
        <a className="button" href="#work">See my work <span>↓</span></a>
      </section>

      <section id="work" className="container section">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <h2>A few things I&apos;ve made.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project project-${index + 1}`} key={project.title}>
              <div className="project-art"><span>0{index + 1}</span></div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href="#contact" aria-label={`View ${project.title}`}>View project ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about container section">
        <p className="eyebrow">ABOUT ME</p>
        <p className="about-copy">I care about the details that make a product feel effortless. From the first idea to the final polished interface, I enjoy turning complex problems into clear, human experiences.</p>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <p className="eyebrow">LET&apos;S WORK TOGETHER</p>
          <h2>Have a project in mind?</h2>
          <a className="email" href="mailto:hello@example.com">hello@example.com ↗</a>
        </div>
      </section>

      <footer className="container footer"><span>© 2026 Your Name</span><span>Built with Next.js</span></footer>
    </main>
  );
}

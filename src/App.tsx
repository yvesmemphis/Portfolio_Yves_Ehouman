import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDialog } from './components/ProjectDialog';
import { profile, projects, skills, socialLinks, type Project } from './data/portfolio';
import { useReveal } from './hooks/useReveal';
import './styles/site.css';

gsap.registerPlugin(ScrollTrigger);

const heroPoster = './images/galaxy/hero-poster.webp';
const cosmicDetail = './images/galaxy/cosmic-detail.webp';

function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${event.clientX}px`;
      ref.current.style.top = `${event.clientY}px`;
    };
    const enter = (event: Event) => { if ((event.target as HTMLElement).closest('a,button')) ref.current?.classList.add('is-link'); };
    const leave = (event: Event) => { if ((event.target as HTMLElement).closest('a,button')) ref.current?.classList.remove('is-link'); };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointerout', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointerout', leave);
    };
  }, []);
  return <div className="cursor-halo" ref={ref} aria-hidden="true"><i /></div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [motionReduced, setMotionReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const introRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();

  const closeProject = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = (event: MediaQueryListEvent) => setMotionReduced(event.matches);
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (motionReduced) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.88 });
    lenis.on('scroll', ScrollTrigger.update);
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, [motionReduced]);

  useEffect(() => {
    if (motionReduced) return;
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
    entrance.fromTo('.hero-index, .hero-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.11, delay: 0.15 });
    entrance.fromTo('.hero-title-line', { yPercent: 115, rotateX: -14 }, { yPercent: 0, rotateX: 0, duration: 1.16, stagger: 0.11 }, '-=0.34');
    entrance.fromTo('.hero-subtitle, .hero-scroll', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 }, '-=0.52');
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row) => {
        gsap.fromTo(row, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 86%', once: true } });
      });
      gsap.fromTo('.section-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.section-heading-row', start: 'top 82%', once: true } });
      gsap.to('.hero-media', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
      gsap.to('.about-cosmos', { yPercent: -9, ease: 'none', scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    return () => { entrance.kill(); context.revert(); };
  }, [motionReduced]);

  return (
    <>
      <Navigation open={menuOpen} onClose={() => setMenuOpen((value) => !value)} />
      <CursorHalo />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img className="hero-poster" src={heroPoster} alt="" fetchPriority="high" />
            {!motionReduced && <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={heroPoster}>
              <source src="./media/hero-galaxy.mp4" type="video/mp4" />
            </video>}
          </div>
          <div className="hero-border" aria-hidden="true"><span className="border-mark border-mark--top">01</span><span className="border-mark border-mark--left">EY</span><span className="border-mark border-mark--bottom">© {new Date().getFullYear()}</span><span className="border-mark border-mark--right">05° · 20°</span></div>
          <div className="hero-index"><span className="signal-dot" /> Développeur web <span className="hero-index-separator">—</span> {profile.city}</div>
          <div className="hero-center">
            <p className="hero-kicker">Développement backend & applications web</p>
            <h1 className="hero-title" id="hero-title"><span className="hero-title-mask"><span className="hero-title-line">EHOUMAN</span></span><span className="hero-title-mask hero-title-mask--offset"><span className="hero-title-line">ELIEZER YVES-LEO<span className="hero-title-dot">.</span></span></span></h1>
            <p className="hero-subtitle">Je développe des applications web<br />avec Django et Vue.js.</p>
          </div>
          <div className="hero-orbit-label hero-orbit-label--left">Python /<br />Django</div>
          <div className="hero-orbit-label hero-orbit-label--right">Vue.js /<br />API REST</div>
          <a className="hero-scroll" href="#work"><span>Explorer le portfolio</span><span className="hero-scroll-icon"><ArrowDown size={14} strokeWidth={1.2} /></span><span className="hero-scroll-nr">01 / 04</span></a>
        </section>

        <section className="intro-section" aria-label="Introduction">
          <div className="section-frame" aria-hidden="true"><span>02</span><span>Développement web</span></div>
          <div ref={introRef.ref} className={`intro-copy reveal ${introRef.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow"><span className="tiny-cross">+</span> Backend Django · frontend Vue.js</p>
            <p className="intro-statement">Je suis <em>développeur web</em>.<br />Je construis des applications<br className="mobile-break" /> <span className="intro-line-muted">fiables et utiles.</span></p>
            <a href="#about" className="text-link intro-link">Quelques mots sur moi <ArrowDown size={13} /></a>
          </div>
          <div className="intro-stamp" aria-hidden="true"><span>Curieux</span><i /><span>toujours</span></div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-heading">
          <div className="section-heading-row">
            <div><p className="eyebrow"><span className="tiny-cross">+</span> Projets web · 2026</p><h2 className="section-heading" id="work-heading">Quelques<br /><em>projets.</em></h2></div>
            <p className="section-aside">Applications web<br />et développement backend <span aria-hidden="true">↘</span></p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => <ProjectCard key={project.id} project={project} total={projects.length} reverse={index === 1} onOpen={setActiveProject} />)}
          </div>
          <div className="work-footnote"><span className="tiny-cross">+</span> Un SaaS de gestion de stock, un logiciel RH en développement, un outil OpenAPI et un site associatif.</div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="about-cosmos" aria-hidden="true"><img src={cosmicDetail} alt="" loading="lazy" decoding="async" /></div>
          <div className="about-decoration" aria-hidden="true"><span>EY</span><i /></div>
          <div ref={aboutRef.ref} className={`about-inner reveal ${aboutRef.visible ? 'is-visible' : ''}`}>
            <div className="about-intro"><p className="eyebrow"><span className="tiny-cross">+</span> 03 — À propos</p><p className="about-big">Du code.<br /><em>Des données.</em><br />Des solutions<br />utiles<span>.</span></p></div>
            <div className="about-detail">
              <h2 id="about-heading">Bonjour, moi c’est <span>Ehouman.</span></h2>
              <p className="about-body">{profile.about}</p>
              <div className="about-divider" />
              <div className="about-facts"><div><span className="detail-label">Basé à</span><p>{profile.city}</p></div><div><span className="detail-label">En ce moment</span><p>{profile.availability}</p></div></div>
              <div className="skill-set"><span className="detail-label">Technologies & spécialités</span><div>{skills.map((skill, index) => <span className="skill-pill" key={skill}><i>0{index + 1}</i>{skill}</span>)}</div></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-top"><p className="eyebrow"><span className="tiny-cross">+</span> 04 — Parlons de ton projet web</p><span className="contact-coordinate">05°20′N 04°01′W</span></div>
          <h2 id="contact-heading">Un projet<br /><em>d’application web</em><span className="contact-punctuation">?</span></h2>
          <a className="contact-cta" href={`mailto:${profile.email}`}><span>Échangeons sur ton projet.</span><span className="contact-cta-arrow"><MoveUpRight size={20} strokeWidth={1.1} /></span></a>
          <div className="contact-bottom"><a href={`mailto:${profile.email}`}>{profile.email}</a><div className="social-list">{socialLinks.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={11} /></a>)}</div></div>
        </section>
      </main>
      <footer className="site-footer"><a className="footer-mark" href="#home">EY<span>.</span></a><span>Portfolio développeur web · {new Date().getFullYear()}</span><a href="#home">Remonter <ArrowRight size={13} className="rotate-arrow" /></a></footer>
      <ProjectDialog project={activeProject} total={projects.length} onClose={closeProject} />
    </>
  );
}

export default App;

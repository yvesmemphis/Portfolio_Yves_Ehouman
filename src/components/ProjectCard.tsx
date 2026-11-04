import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { Project } from '../data/portfolio';

type Props = { project: Project; total: number; reverse?: boolean; onOpen: (project: Project) => void };

export function ProjectCard({ project, total, reverse = false, onOpen }: Props) {
  const tilt = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 5.5}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 7}deg`);
  };
  const reset = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <article className={`project-row ${reverse ? 'project-row--reverse' : ''}`}>
      <button className="project-visual" onMouseMove={tilt} onMouseLeave={reset} onClick={() => onOpen(project)} aria-label={`Ouvrir le projet ${project.title}`}>
        <span className={`project-visual-frame ${project.imageFit === 'contain' ? 'project-visual-frame--contain' : ''}`}>
          <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
          <span className="project-visual-shade" />
          <span className="project-visual-index">{project.index} / {String(total).padStart(2, '0')}</span>
          <span className="project-open"><ArrowUpRight size={19} strokeWidth={1.3} /></span>
          <span className="project-preview">Voir le projet</span>
        </span>
      </button>
      <div className="project-copy">
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
        <button className="project-title-button" onClick={() => onOpen(project)}><h3>{project.title}</h3><ArrowUpRight size={24} strokeWidth={1.2} /></button>
        <p>{project.intro}</p>
        <button className="text-link" onClick={() => onOpen(project)}>{project.nextLabel}<span aria-hidden="true">↗</span></button>
      </div>
    </article>
  );
}

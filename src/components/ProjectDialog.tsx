import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../data/portfolio';

type Props = { project: Project | null; total: number; onClose: () => void };

export function ProjectDialog({ project, total, onClose }: Props) {
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const initialFocus = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('#dialog-title')?.focus({ preventScroll: true });
    });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusInside = dialogRef.current?.contains(document.activeElement) ?? false;
      if (event.shiftKey && (!focusInside || document.activeElement === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!focusInside || document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.cancelAnimationFrame(initialFocus);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className="dialog-close" onClick={onClose} aria-label="Fermer le projet"><X size={20} /></button>
        <div className="dialog-topline"><button className="back-link" onClick={onClose}><ArrowLeft size={16} /> Retour aux projets</button><span>{project.index} / {String(total).padStart(2, '0')}</span></div>
        <div className="dialog-heading"><p className="eyebrow">{project.status === 'development' ? 'En développement' : project.siteType === 'repository' ? 'Dépôt GitHub' : project.siteUrl ? 'Site en ligne' : 'Étude de cas'} · {project.year}</p><h2 id="dialog-title" tabIndex={-1}>{project.title}</h2><p>{project.intro}</p></div>
        <div className={`dialog-image ${project.imageFit === 'contain' ? 'dialog-image--contain' : ''}`}><img src={project.image} alt={project.imageAlt} /><span className="dialog-image-caption">{project.siteType === 'repository' ? `${project.category} — dépôt GitHub` : project.siteUrl ? `${project.category} — site en ligne` : project.status === 'development' ? `${project.category} — aperçu du projet` : `${project.category} — aperçu`}</span></div>
        {project.screenshots && (
          <section className="project-screenshots" aria-label={`Captures du projet ${project.title}`}>
            <h3>Aperçus du développement</h3>
            {project.screenshots.length > 0 ? (
              <div className="project-screenshot-grid">
                {project.screenshots.map(({ src, alt }) => <img key={src} src={src} alt={alt} loading="lazy" />)}
              </div>
            ) : (
              <div className="project-screenshot-placeholder">Ajoutez des captures dans <code>public/images/sira/</code>, puis renseignez-les dans <code>screenshots</code> dans <code>src/data/portfolio.ts</code>.</div>
            )}
          </section>
        )}
        <div className="dialog-details">
          <div><span className="detail-label">Contribution</span><p>{project.role}</p></div>
          <div className="dialog-description"><span className="detail-label">{project.siteUrl ? 'Le projet' : 'L’intention'}</span><p>{project.description ?? 'Une piste créative exploratoire, encore imaginaire à ce stade. Ce texte, comme le concept, pourra être remplacé par le véritable contexte, la démarche et les résultats du projet.'}</p></div>
        </div>
        {project.siteUrl && <a className="dialog-next" href={project.siteUrl} target="_blank" rel="noreferrer">{project.nextLabel} <ArrowUpRight size={18} /></a>}
        <div className="dialog-scroll-note"><ArrowDown size={14} /> Faire défiler pour explorer</div>
      </section>
    </div>
  );
}

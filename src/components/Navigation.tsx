import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const links = [
  { href: '#work', number: '01', label: 'Projets' },
  { href: '#about', number: '02', label: 'À propos' },
  { href: '#contact', number: '03', label: 'Contact' },
];

type Props = { open: boolean; onClose: () => void };

export function Navigation({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);

  return (
    <>
      <header className="site-header">
        <button className={`menu-trigger ${open ? 'is-open' : ''}`} onClick={onClose} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}>
          <span className="menu-lines"><i /><i /></span>
          <span className="menu-word">{open ? 'Fermer' : 'Menu'}</span>
        </button>
        <a className="wordmark" href="#home" onClick={onClose} aria-label="Ehouman Eliezer Yves-Leo, accueil">
          <span className="wordmark-orbit" aria-hidden="true"><i /></span>
          <span>EY<span className="wordmark-dot">.</span></span>
        </a>
        <a className="availability" href="#contact"><span className="availability-dot" /> Disponible pour projets</a>
      </header>
      <div className={`menu-overlay ${open ? 'is-visible' : ''}`} aria-hidden={!open}>
        <div className="menu-topline"><span>Navigation</span><button onClick={onClose} aria-label="Fermer"><X size={19} /></button></div>
        <nav className="menu-list" aria-label="Navigation principale">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose} tabIndex={open ? 0 : -1}>
              <span className="menu-index">{link.number}</span><span className="menu-link-label">{link.label}</span><ArrowUpRight className="menu-arrow" strokeWidth={1} />
            </a>
          ))}
        </nav>
        <div className="menu-foot"><span>Abidjan · développeur web</span><span>© {new Date().getFullYear()} — Portfolio</span></div>
      </div>
    </>
  );
}

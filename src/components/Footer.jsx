export default function Footer() {
  return (
    <footer className="border-t border-line py-20 px-5 sm:px-8 lg:px-16 bg-black/40 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-grad-flame grid place-items-center font-display text-2xl text-[#1a0a0a]">
              C
            </span>
            <span className="font-display text-lg leading-none tracking-[0.04em] flex flex-col">
              Le Crousty
              <small className="font-sans text-[9px] tracking-[0.3em] text-ink-dim mt-1">
                BONNEUIL
              </small>
            </span>
          </div>
          <p className="text-ink-dim text-sm leading-relaxed m-0">
            Burgers · Tacos · Sandwichs gratinés.<br />
            Avenue de Paris, depuis 2019.
          </p>
        </div>

        <FootCol title="Navigation">
          <FootLink href="#story">Histoire</FootLink>
          <FootLink href="#menu">Menu</FootLink>
          <FootLink href="#signature">Signature</FootLink>
          <FootLink href="#visit">Nous trouver</FootLink>
        </FootCol>

        <FootCol title="Suivez-nous">
          <FootLink href="https://www.instagram.com/croustybonneuil/" ext>Instagram</FootLink>
          <FootLink href="https://www.facebook.com/p/Le-Crousty-100054457059795/" ext>Facebook</FootLink>
          <FootLink href="tel:+33953162347">09 53 16 23 47</FootLink>
        </FootCol>

        <FootCol title="Légal">
          <p className="text-ink-dim text-sm leading-relaxed m-0">
            © {new Date().getFullYear()} Le Crousty — Bonneuil-sur-Marne.<br />
            Tous droits réservés.
          </p>
        </FootCol>
      </div>

      <div className="max-w-[1280px] mx-auto pt-6 border-t border-line flex justify-between flex-wrap gap-2 text-xs text-ink-dim tracking-wide">
        <span>Site fait avec ❤︎ pour Le Crousty.</span>
        <span>v2.0 · React + Three.js</span>
      </div>
    </footer>
  );
}

function FootCol({ title, children }) {
  return (
    <div>
      <h5 className="text-[11px] tracking-[0.25em] uppercase text-ink-dim m-0 mb-4 font-medium">{title}</h5>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FootLink({ href, children, ext }) {
  const props = ext ? { target: "_blank", rel: "noopener" } : {};
  return (
    <a href={href} {...props} className="text-ink text-sm hover:text-gold hover:translate-x-1 transition-all">
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2/60 backdrop-blur-md">
      <div className="container-x py-16 grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 border-b border-line">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-9 h-9 bg-flame grid place-items-center font-display font-bold text-bg text-lg">
              C
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-semibold text-[15px] tracking-tighter">Le Crousty</span>
              <span className="mono text-[9px] tracking-[0.22em] text-ink-dim mt-1">
                BONNEUIL · EST. 2019
              </span>
            </span>
          </div>
          <p className="text-ink-dim text-[13px] leading-relaxed m-0 max-w-[280px]">
            Burgers, tacos, sandwichs gratinés.<br />
            6 avenue de Paris, depuis 2019.
          </p>
        </div>

        <FootCol title="MAP">
          <FootLink href="#story">[01] Histoire</FootLink>
          <FootLink href="#menu">[02] Menu</FootLink>
          <FootLink href="#signature">[03] Signature</FootLink>
          <FootLink href="#visit">[04] Visiter</FootLink>
        </FootCol>

        <FootCol title="CONTACT">
          <FootLink href="https://www.instagram.com/croustybonneuil/" ext>Instagram ↗</FootLink>
          <FootLink href="https://www.facebook.com/p/Le-Crousty-100054457059795/" ext>Facebook ↗</FootLink>
          <FootLink href="tel:+33953162347">09 53 16 23 47</FootLink>
        </FootCol>

        <FootCol title="LEGAL">
          <p className="mono text-[11px] text-ink-dim leading-relaxed m-0 tracking-wider">
            © {new Date().getFullYear()}<br />
            LE CROUSTY<br />
            BONNEUIL-SUR-MARNE<br />
            ALL RIGHTS RESERVED.
          </p>
        </FootCol>
      </div>

      <div className="container-x py-6 flex justify-between flex-wrap gap-3 mono text-[10px] text-ink-soft tracking-wider">
        <span>BUILD v3.0 · REACT + R3F</span>
        <span>SITE BY <span className="text-flame">CLAUDE</span> · 2026</span>
      </div>
    </footer>
  );
}

function FootCol({ title, children }) {
  return (
    <div>
      <h5 className="mono text-[10px] tracking-[0.22em] text-ink-dim m-0 mb-4">{title}</h5>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FootLink({ href, children, ext }) {
  const props = ext ? { target: "_blank", rel: "noopener" } : {};
  return (
    <a
      href={href}
      {...props}
      className="mono text-[12px] text-ink hover:text-flame transition-colors"
    >
      {children}
    </a>
  );
}

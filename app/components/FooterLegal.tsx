"use client";

interface FooterLegalProps {
  /** Copyright text */
  copyright?: string;
  /** Contact info text */
  contact?: string;
  /** Built with attribution */
  builtWith?: string;
  /** Privacy link href */
  privacyHref?: string;
}

export default function FooterLegal({
  copyright = "© 2026 — JR Dev",
  contact = "Remote — working",
  builtWith = "Built with heart.",
  privacyHref = "mailto:infante.ryaj02@gmail.com?subject=Privacy",
}: FooterLegalProps = {}) {
  return (
    <div className="footer-legal-row">
      <div className="col">
        <strong>All rights reserved</strong><br />
        {copyright}
      </div>
      <div className="col center">
        <strong>Contact Me Anytime</strong><br />
        {contact}
      </div>
      <div className="col right">
        <strong>{builtWith}</strong><br />
        <a href={privacyHref}>Privacy</a>
      </div>
    </div>
  );
}
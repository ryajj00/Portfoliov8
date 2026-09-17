"use client";

import { FormEvent, useState } from "react";
import Contact from "../components/contact";

export default function ContactPage() {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    setFormSent(true);
    window.location.href = `mailto:infante.ryaj02@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <style jsx>{`
        .contact-page-hero {
          height: 100dvh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 6vw 4rem;
          text-align: center;
          background:
            radial-gradient(circle at 50% 35%, rgba(195, 216, 197, 0.12), transparent 42%),
            var(--bg);
        }
        .contact-page-eyebrow {
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .contact-page-title {
          max-width: 12ch;
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-size: clamp(3.5rem, 11vw, 9rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.06em;
          text-transform: uppercase;
        }
        .contact-page-description {
          max-width: 42rem;
          margin-top: 2rem;
          color: var(--fg-dim);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.6;
        }
        .contact-form-section {
          max-width: 760px;
          margin: 0 auto;
          padding: 8rem 6vw;
        }
        .contact-form-title {
          margin-bottom: 2rem;
          font-family: var(--font-display, "Unbounded", sans-serif);
          font-size: clamp(1.8rem, 4vw, 3rem);
          text-transform: uppercase;
        }
        .contact-form {
          display: grid;
          gap: 1.25rem;
        }
        .contact-form-field {
          display: grid;
          gap: 0.5rem;
        }
        .contact-form-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--fg-dim);
        }
        .contact-form-input {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 14px 16px;
          background: var(--bg-alt);
          color: var(--fg);
          font: inherit;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
        }
        .contact-form-textarea {
          min-height: 150px;
          resize: vertical;
        }
        .contact-form-submit {
          justify-self: start;
          border: 1px solid var(--accent);
          border-radius: 999px;
          padding: 12px 22px;
          background: var(--accent);
          color: var(--bg);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .contact-form-submit:hover {
          background: transparent;
          color: var(--accent);
          transform: translateY(-2px);
        }
        .contact-form-status {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 12px;
        }
        @media (max-width: 720px) {
          .contact-page-hero {
            height: 100dvh;
            min-height: 100svh;
            padding: 4rem 8vw 3rem;
          }
          .contact-page-description {
            margin-top: 1.5rem;
            font-size: 1rem;
          }
          .contact-form-section {
            padding: 5rem 8vw;
          }
        }
      `}</style>

      <section className="contact-page-hero" aria-labelledby="contact-page-title">
        <p className="contact-page-eyebrow">Start a conversation</p>
        <h1 className="contact-page-title" id="contact-page-title">
          Let&apos;s work together.
        </h1>
        <p className="contact-page-description">
          Have a project, idea, or opportunity in mind? Let&apos;s make
          something meaningful together.
        </p>
      </section>

      <section className="contact-form-section" aria-labelledby="contact-form-title">
        <h2 className="contact-form-title" id="contact-form-title">
          Tell me about it.
        </h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="name">Name</label>
            <input className="contact-form-input" id="name" name="name" type="text" required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="email">Email</label>
            <input className="contact-form-input" id="email" name="email" type="email" required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="message">Message</label>
            <textarea className="contact-form-input contact-form-textarea" id="message" name="message" required />
          </div>
          <button className="contact-form-submit" type="submit">Send message</button>
          {formSent && (
            <p className="contact-form-status">
              Your email client is opening with your message.
            </p>
          )}
        </form>
      </section>

      <Contact />
    </>
  );
}

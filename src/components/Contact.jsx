import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Copy } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CONTACT_EMAIL = "crazybibek4444@email.com";

const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const contactRef = useRef(null);
  const copyMessageRef = useRef(null);
  const timeoutRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".contact-header > *", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
      }).from(
        ".contact-box",
        {
          y: 36,
          opacity: 0,
          stagger: 0.18,
          duration: 0.75,
          ease: "back.out(1.2)",
        },
        "-=0.25"
      );
    },
    { scope: contactRef }
  );

  // animate "Email Copied!" pop only when it appears
  useGSAP(
    () => {
      if (!isCopied || !copyMessageRef.current) return;

      gsap.fromTo(
        copyMessageRef.current,
        { y: 6, scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.22, ease: "back.out(1.7)" }
      );
    },
    { scope: contactRef, dependencies: [isCopied] }
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setIsCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 sm:mb-14 contact-header">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-teal-400">
          Contact
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-white/70 max-w-2xl leading-relaxed">
          Have a project, idea, or opportunity in mind? Let’s connect and build
          something meaningful.
        </p>
      </div>

      {/* Content grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left box */}
        <div className="contact-box rounded-2xl border border-teal-400/20 bg-white/60 dark:bg-zinc-950/40 backdrop-blur p-5 sm:p-6">
          <h2 className="text-2xl font-semibold mb-3 text-teal-300">
            Get in Touch
          </h2>

          <p className="text-zinc-600 dark:text-white/70 mb-6 leading-relaxed">
            I’m open to internships, freelance work, collaborations, and
            learning opportunities. Feel free to reach out.
          </p>

          <dl className="space-y-4 text-zinc-700 dark:text-white/80">
            {/* on mobile: stacked; on sm+: label/value row */}
            <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-1 sm:gap-3">
              <dt className="text-zinc-500 dark:text-white/50">Name</dt>
              <dd className="font-medium">Bibek Adhikari</dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-1 sm:gap-3">
              <dt className="text-zinc-500 dark:text-white/50">Role</dt>
              <dd className="font-medium">Frontend Developer</dd>
            </div>

            {/* Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-1 sm:gap-3">
              <dt className="text-zinc-500 dark:text-white/50">Email</dt>

              {/* IMPORTANT: min-w-0 + break-all prevents overflow on mobile */}
              <dd className="min-w-0">
                <div className="relative inline-flex max-w-full items-center gap-2 rounded-full bg-teal-500/10 px-3 py-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="min-w-0 break-all text-sm sm:text-base underline underline-offset-4 text-teal-400 hover:text-teal-300 transition"
                  >
                    {CONTACT_EMAIL}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 p-2 rounded-full bg-teal-500/10 text-teal-300 hover:bg-teal-500/25 transition"
                    aria-label="Copy email address"
                  >
                    <Copy size={16} />
                  </button>

                  {isCopied && (
                    <span
                      ref={copyMessageRef}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 text-black text-xs font-semibold px-2.5 py-1 shadow-lg whitespace-nowrap"
                    >
                      Email Copied!
                    </span>
                  )}
                </div>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right box: form */}
        <form
          className="contact-box rounded-2xl border border-teal-400/20 bg-white/60 dark:bg-zinc-950/40 backdrop-blur p-5 sm:p-6 space-y-4 sm:space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm font-medium text-teal-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/70 border border-teal-400/25 px-4 py-3 text-sm sm:text-base
                         focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teal-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/70 border border-teal-400/25 px-4 py-3 text-sm sm:text-base
                         focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teal-300 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell me about your idea..."
              className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/70 border border-teal-400/25 px-4 py-3 text-sm sm:text-base
                         focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 resize-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-500 text-black font-bold py-3
                       hover:bg-teal-600 active:scale-[0.99] transition shadow-lg shadow-teal-500/20"
          >
            Send Message
          </button>

          <p className="text-xs text-zinc-500 dark:text-white/40">
            (Demo form — wire it to EmailJS / Formspree / your backend when ready.)
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;

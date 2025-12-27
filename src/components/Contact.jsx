import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Copy } from 'lucide-react'; // Import icons

const CONTACT_EMAIL = 'crazybibek4444@email.com';

const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const contactRef = useRef(null);
  const emailRef = useRef(null);
  const copyMessageRef = useRef(null);

  // GSAP for Entrance Animation and Copy Message
  useGSAP(
    () => {
      // Entrance Animation for Header
      gsap.from('.contact-header > *', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Entrance Animation for Content Boxes
      gsap.from('.contact-box', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.2)',
        delay: 0.4,
      });

      // Animation for Copy Success Message
      if (isCopied) {
        gsap.fromTo(copyMessageRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }
    },
    { scope: contactRef, dependencies: [isCopied] }
  );

  // Function to handle the copy action
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setIsCopied(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optional: Add a fallback if clipboard API fails
    }
  };

  return (
    <section
      ref={contactRef}
      className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 md:px-16 py-20"
      id='contact'
    >

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 contact-header">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-teal-400">
          Contact
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-white/70 max-w-2xl">
          Have a project, idea, or opportunity in mind?
          Let’s connect and build something meaningful.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left – Info */}
        <div className="border border-teal-400/20 p-6 rounded-lg contact-box">
          <h2 className="text-2xl font-semibold mb-4 text-teal-300">
            Get in Touch
          </h2>

          <p className="text-zinc-600 dark:text-white/70 mb-6 leading-relaxed">
            I’m open to internships, freelance work, collaborations,
            and learning opportunities. Feel free to reach out.
          </p>

          <div className="space-y-4 text-zinc-600 dark:text-white/80">
            <p className="flex items-center">
              <span className="text-zinc-500 dark:text-white/50 w-20">Name:</span> Bibek Adhikari
            </p>
            <p className="flex items-center">
              <span className="text-zinc-500 dark:text-white/50 w-20">Role:</span> Frontend Developer
            </p>

            {/* Email with Copy Feature */}
            <div className="flex items-start">
              <span className="text-zinc-500 dark:text-white/50 w-20 pt-1">Email:</span>{' '}
              <div className="relative flex items-center group">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  ref={emailRef}
                  className="underline underline-offset-4 text-teal-400 hover:text-teal-300 transition"
                >
                  {CONTACT_EMAIL}
                </a>

                {/* Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="ml-3 p-1 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/30 transition"
                  aria-label="Copy email address"
                >
                  <Copy size={16} />
                </button>

                {/* Copy Success Message */}
                {isCopied && (
                  <span
                    ref={copyMessageRef}
                    className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-teal-500 text-black text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    Email Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right – Form */}
        <form className="border border-teal-400/20 p-6 rounded-lg space-y-5 contact-box">
          <div>
            <label className="block text-sm text-teal-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-100 dark:bg-zinc-900 border border-teal-400/30 px-4 py-3 rounded-md focus:outline-none focus:border-teal-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-teal-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-gray-100 dark:bg-zinc-900 border border-teal-400/30 px-4 py-3 rounded-md focus:outline-none focus:border-teal-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-teal-300 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Tell me about your idea..."
              className="w-full bg-gray-100 dark:bg-zinc-900 border border-teal-400/30 px-4 py-3 rounded-md focus:outline-none focus:border-teal-400 resize-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-black font-bold py-3 rounded-md hover:bg-teal-600 transition duration-300 shadow-md shadow-teal-500/30"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
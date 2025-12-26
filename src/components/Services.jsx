import React from 'react'

const services = [
  {
    title: 'Frontend Development',
    desc: 'Building fast, responsive, and modern web interfaces using React and clean UI practices.',
  },
  {
    title: 'UI / UX Design',
    desc: 'Designing minimal, user-focused interfaces with attention to layout, spacing, and usability.',
  },
  {
    title: 'Web Animations',
    desc: 'Creating smooth, meaningful animations using GSAP to enhance user experience.',
  },
  {
    title: 'Responsive Design',
    desc: 'Ensuring your website looks and works perfectly across all devices and screen sizes.',
  },
  {
    title: 'Performance Optimization',
    desc: 'Optimizing load times, animations, and assets for better performance.',
  },
  {
    title: 'Portfolio & Landing Pages',
    desc: 'Crafting professional portfolios and landing pages that make a strong first impression.',
  },
]

const Services = () => {
  return (
    <section className="min-h-screen bg-zinc-950 text-white px-6 md:px-16 py-20" id='services'>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Services
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          I help individuals and businesses build clean, modern,
          and interactive web experiences.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-white/10 p-6 hover:border-white/30 transition"
          >
            <h2 className="text-xl font-semibold mb-3">
              {service.title}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services

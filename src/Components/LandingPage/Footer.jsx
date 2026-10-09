import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-black text-white">

      {/* Top Footer */}
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-12 md:py-16 lg:px-20">

        {/* Logo and Back to Top */}
        <div className="flex flex-col gap-8 border-b border-white/20 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="https://www.lamborghini.com/en-en"
            className="text-xl font-bold uppercase tracking-[0.25em] md:text-2xl"
          >
            Lamborghini
          </a>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex w-fit items-center gap-3 text-xs uppercase tracking-widest transition-colors hover:text-gray-400"
          >
            Back to top
            <span className="text-lg">↑</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-10 py-10 sm:grid-cols-3 lg:grid-cols-5">

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://www.lamborghini.com/en-en/company" className="transition hover:text-white">About Us</a></li>
              <li><a href="https://www.lamborghini.com/en-en/company" className="transition hover:text-white">Our History</a></li>
              <li><a href="https://www.lamborghini.com/en-en/company" className="transition hover:text-white">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest">
              Models
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://www.lamborghini.com/en-en/models" className="transition hover:text-white">Revuelto</a></li>
              <li><a href="https://www.lamborghini.com/en-en/models" className="transition hover:text-white">Temerario</a></li>
              <li><a href="https://www.lamborghini.com/en-en/models" className="transition hover:text-white">Urus</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://www.lamborghini.com/en-en/dealers" className="transition hover:text-white">Find a Dealer</a></li>
              <li><a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Contact Us</a></li>
              <li><a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Customer Care</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Motorsport</a></li>
              <li><a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">News</a></li>
              <li><a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Events</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <a href="https://www.instagram.com/lamborghini/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
              <a href="https://www.youtube.com/@Lamborghini" target="_blank" rel="noreferrer" className="transition hover:text-white">YouTube</a>
              <a href="https://www.facebook.com/Lamborghini/" target="_blank" rel="noreferrer" className="transition hover:text-white">Facebook</a>
            </div>
          </div>

        </div>

        {/* Social Message */}
        <div className="border-t border-white/20 py-8">
          <p className="max-w-3xl text-xs leading-6 text-gray-400 md:text-sm">
            Lamborghini represents the combination of Italian craftsmanship,
            innovative technology and extraordinary performance.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-5 border-t border-white/20 pt-8 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Automobili Lamborghini S.p.A.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Privacy Policy</a>
            <a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Cookie Policy</a>
            <a href="https://www.lamborghini.com/en-en" className="transition hover:text-white">Legal Notice</a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
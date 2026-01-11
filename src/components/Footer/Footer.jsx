import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="-m-6 flex flex-wrap">

          {/* BRAND */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              
              {/* TEXT BRAND (FIXED) */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">
                  DevBlog
                </h2>
                <p className="text-sm text-white/80 mt-1">
                  Write • Share • Inspire
                </p>
              </div>

              <p className="text-sm text-white/70 leading-relaxed">
                &copy; 2026 DevBlog.  
                <br />
                Crafted with ❤️ for developers worldwide.
              </p>
            </div>
          </div>

          {/* COMPANY */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/80">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm font-medium text-white/90 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/80">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm font-medium text-white/90 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* LEGALS */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/80">
              Legals
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm font-medium text-white/90 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/70">
          Built with React, Tailwind & Appwrite 🚀
        </div>
      </div>
    </section>
  );
}

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import {FaGraduationCap,FaLinkedinIn,FaArrowUp,} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-700 bg-slate-950">
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/40 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500">
              <FaGraduationCap className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Study<span className="text-blue-400">·</span>Spark
              </h2>

              <p className="text-xs font-medium text-slate-400">
                Learn. Practice. Grow.
              </p>
            </div>
          </Link>

          <div className="max-w-lg text-center md:text-left">
            <p className="text-sm leading-6 text-slate-400">
              Study·Spark is built to make learning simple, focused, and
              consistent. Learn new concepts, practice your skills, and
              continue improving every day.
            </p>
          </div>

          <Link
            to="/linkedin"
            aria-label="Study·Spark LinkedIn"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-950/40"
          >
            <FaLinkedinIn />
          </Link>
        </div>

        <div className="my-8 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">

          <p className="text-center text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Study·Spark. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition-colors hover:text-blue-400"
            >
              Terms
            </Link>

            <Link
              to="/"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaArrowUp className="text-xs" />
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


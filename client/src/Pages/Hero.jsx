import React from "react";
const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-white px-4 py-14 sm:px-6 lg:px-8">
      
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">

          <div className="text-center lg:text-left">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Smart Learning Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              Learn Better.
              <br />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Grow Smarter.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
              Study·Spark makes learning simple, interactive, and engaging.
              Explore courses, understand concepts, and build your knowledge
              in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button className="group rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:scale-95">
                Start Learning
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:scale-95">
                Explore Courses
              </button>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500 lg:justify-start">

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  ✓
                </span>
                Interactive Learning
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  ✓
                </span>
                Quality Courses
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  ✓
                </span>
                Learn Anywhere
              </div>

            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">

            <div className="absolute -inset-8 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative rounded-[2rem] border border-blue-100 bg-white p-5 shadow-[0_30px_80px_-25px_rgba(37,99,235,0.25)] sm:p-7">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Welcome to
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                    Study<span className="text-blue-600">·</span>Spark
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/20">
                  ✦
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
                <p className="text-sm font-medium text-blue-100">
                  Discover Knowledge
                </p>

                <h3 className="mt-2 text-2xl font-bold leading-tight">
                  Everything you need to learn in one place.
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-50">
                  Explore interesting subjects and improve your skills through
                  simple and engaging lessons.
                </p>

                <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50">
                  Browse Courses
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    📚
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    Courses
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Explore structured learning content.
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💡
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    Knowledge
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Understand concepts with ease.
                  </p>
                </div>

              </div>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  🎓
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Learning Made Simple
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Build knowledge through simple and engaging learning.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


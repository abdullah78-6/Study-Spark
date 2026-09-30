import React from "react";
import { Link } from "react-router-dom"; // remove if you don't use react-router

/*
  THEME TOKENS — change these 5 values to match your Study Spark theme.
  Everything below uses them, so one edit restyles the whole page.
*/
const theme = {
  ink: "#2563EB",      // deep navy text / dark sections (blue-950)
  primary: "#2563EB",  // main brand color (same as Tailwind blue-600)
  spark: "#FBBF24",    // accent (the "spark")
  soft: "#EFF6FF",     // light tinted background (blue-50)
  paper: "#FFFFFF",    // page background
};

const stats = [
  { value: "50K+", label: "Students learning with us" },
  { value: "1,200+", label: "Study resources and notes" },
  { value: "95%", label: "Report better focus" },
  { value: "24/7", label: "Access from any device" },
];

const features = [
  {
    title: "Smart study plans",
    text: "Turn a syllabus and an exam date into a daily plan you can actually follow.",
    icon: (
      <path d="M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    ),
  },
  {
    title: "Clear notes and resources",
    text: "Find well-organized notes, practice questions and guides in one place.",
    icon: (
      <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4ZM8 9h8M8 13h6" />
    ),
  },
  {
    title: "Progress you can see",
    text: "Track streaks, topics covered and weak spots so you know what to revise next.",
    icon: <path d="M3 17l6-6 4 4 8-9M15 6h6v6" />,
  },
  {
    title: "Learn together",
    text: "Share doubts, swap notes and stay motivated with a community of learners.",
    icon: (
      <path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8" />
    ),
  },
];

const values = [
  {
    title: "Learning should feel light",
    text: "Studying is hard enough. We remove clutter so you can spend energy on understanding, not searching.",
  },
  {
    title: "Every student is different",
    text: "Some learn fast, some learn deep. Our tools adapt to your pace instead of forcing one.",
  },
  {
    title: "Small steps, real results",
    text: "A focused 25 minutes every day beats a last-night panic. We help you build that habit.",
  },
];

const Spark = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M50 4 L58 38 L96 50 L58 62 L50 96 L42 62 L4 50 L42 38 Z"
      fill="currentColor"
    />
  </svg>
);

const About = () => {
  return (
    <div
      className="min-h-screen font-sans antialiased font-bold"
      style={{ background: theme.paper, color: theme.ink }}
    >
      {/* STATS */}
      <section className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
        <div
          className="grid grid-cols-2 gap-6 rounded-3xl p-6 shadow-xl sm:p-10 lg:grid-cols-4"
          style={{ background: theme.ink, color: "#fff" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-3xl font-extrabold sm:text-4xl"
                style={{ color: theme.spark }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          It started with a messy desk and too many open tabs.
        </h2>
        <div className="space-y-4 text-base leading-relaxed opacity-85 sm:text-lg">
          <p>
            Study Spark began when a group of students realised they were
            spending more time hunting for material than learning from it.
            Notes were scattered, plans were forgotten and motivation faded
            by week two.
          </p>
          <p>
            So we built the tool we wished we had: one simple space to plan,
            learn, revise and stay consistent. Today it helps thousands of
            learners turn effort into results.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: theme.soft }}>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Everything you need to study with confidence
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-5 rounded-3xl p-6 sm:p-8"
                style={{ background: theme.paper }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: theme.spark }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke={theme.ink}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-80 sm:text-base">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="text-3xl font-bold sm:text-4xl">What we believe</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="border-l-4 pl-5"
              style={{ borderColor: theme.primary }}
            >
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 leading-relaxed opacity-80">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12 sm:py-20"
        >
          <Spark className="absolute -left-6 -bottom-6 h-32 w-32 opacity-25" />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
            Ready to make your study time count?
          </h2>
          <p className="mx-auto mt-4 max-w-lg opacity-90">
            Join Study Spark today and build a routine that lasts.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-full px-8 py-3 font-semibold transition hover:brightness-95 focus:outline-none focus-visible:ring-4"
            style={{ background: theme.spark, color: theme.ink }}
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
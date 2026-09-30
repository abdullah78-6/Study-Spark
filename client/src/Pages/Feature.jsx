import React from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { Link } from "react-router-dom"; // remove if you don't use react-router

const Check = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
    ✓
  </span>
);

const IconBox = ({ children, className = "" }) => (
  <div
    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-md ${className}`}
  >
    {children}
  </div>
);

const faqs = [
  {
    q: "Is Study Spark free to use?",
    a: "Yes. You can create an account and start exploring courses, notes and quizzes right away.",
  },
  {
    q: "How do the mock quizzes work?",
    a: "Pick a quiz, answer the questions within the timer, and get your score instantly. ",
  },
  {
    q: "Where can I find study material?",
    a: "Open the Courses page to browse lessons and resources arranged by subject, in simple and easy-to-follow language.",
  },
  {
    q: "How can I contact us?",
    a: "Open the Contact-us page from the top menu and send us your question or message. We will get back to you as soon as possible.",
  },
];

const FaqItem = ({ item, itemKey, initialEntered = false }) => (
  <AccordionItem
    itemKey={itemKey}
    initialEntered={initialEntered}
    className={({ isEnter }) =>
      `rounded-2xl border bg-white transition-colors ${
        isEnter ? "border-blue-300 shadow-md shadow-blue-600/10" : "border-blue-100"
      }`
    }
    header={({ isEnter }) => (
      <>
        <span className="text-base font-semibold text-slate-900 sm:text-lg">
          {item.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
            isEnter
              ? "rotate-45 bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
              : "bg-blue-50 text-blue-600"
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </>
    )}
    buttonProps={{
      className:
        "flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:px-6 sm:py-5",
    }}
    contentProps={{ className: "transition-[height] duration-300 ease-out" }}
    panelProps={{
      className:
        "px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base",
    }}
  >
    {item.a}
  </AccordionItem>
);

const Feature = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            FEATURES
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              study smarter
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Quizzes to test yourself, notes to remember, material to learn
            from and feedback to keep improving, all in one place.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Quizzes (large, gradient) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-7 text-white shadow-xl shadow-blue-600/20 sm:p-9 lg:col-span-2">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <IconBox>🧠</IconBox>
                <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                  Mock quizzes
                </h2>
                <p className="mt-3 leading-relaxed text-white/90">
                  Practice with timed quizzes, get instant scores and review
                  every answer so you know exactly what to fix.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/95">
                  {["Timed practice tests", "Instant results and review", "Track your score over time"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                          ✓
                        </span>
                        {t}
                      </li>
                    )
                  )}
                </ul>
                <Link
                  to="/quiz"
                  className="mt-7 inline-block rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  Try a quiz
                </Link>
              </div>

              {/* Sample question preview */}
              <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Question 3 of 10</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">
                    08:45
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                  <div className="h-1.5 w-[30%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                </div>
                <p className="mt-4 text-sm font-semibold">
                  Which data structure works on the LIFO principle?
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  {["Queue", "Stack", "Array"].map((o) => (
                    <div
                      key={o}
                      className={`rounded-xl border px-3 py-2 ${
                        o === "Stack"
                          ? "border-blue-600 bg-blue-50 font-semibold text-blue-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
            <IconBox className="bg-blue-50">📝</IconBox>
            <h2 className="mt-5 text-xl font-bold">Smart notes</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Write and save notes while you learn, so every important idea
              is easy to find before an exam.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {["Save notes by topic", "Bookmark key points", "Edit anytime"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Study material */}
          <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-7 shadow-sm">
            <IconBox>📚</IconBox>
            <h2 className="mt-5 text-xl font-bold">Study material</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Clear, well-organized lessons and resources that explain
              concepts in simple language.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {["Structured by subject", "Easy to revise", "Access anywhere"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback (wide) */}
          <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-9 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <IconBox className="bg-blue-50">💬</IconBox>
                <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                  Feedback that helps you grow
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Share your thoughts on courses and quizzes, and see what to
                  improve next. Your feedback shapes Study Spark.
                </p>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <div className="text-sm text-amber-400" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <p className="mt-1 text-sm text-slate-700">
                    The quizzes helped me find my weak topics quickly.
                  </p>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-4 sm:ml-8">
                  <div className="text-sm text-amber-400" aria-label="4 out of 5 stars">
                    ★★★★☆
                  </div>
                  <p className="mt-1 text-sm text-slate-700">
                    Notes are simple and easy to revise before exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-600">
              Quick answers to what students ask us most.
            </p>
          </div>
          <Accordion
            transition
            transitionTimeout={300}
            className="mt-8 space-y-3"
          >
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                itemKey={i}
                item={item}
                initialEntered={i === 0}
              />
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-blue-100 sm:flex-row sm:items-center sm:p-9">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              Ready to start learning?
            </h3>
            <p className="mt-1 text-slate-600">
              Explore courses and take your first quiz today.
            </p>
          </div>
          <Link
            to="/course"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feature;
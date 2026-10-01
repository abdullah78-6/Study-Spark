import React from "react";
import { motion } from "framer-motion";
import {FiTarget,FiBookOpen,FiClock,FiRepeat,FiTrendingUp,FiAward,FiCheckCircle,FiZap,FiHeart,} from "react-icons/fi";
const Content = () => {
  const steps = [
    {
      icon: <FiTarget />,
      number: "01",
      title: "Set Clear Goals",
      description:
        "Start with a clear learning goal. Decide what you want to learn and break it into small, achievable targets.",
    },
    {
      icon: <FiBookOpen />,
      number: "02",
      title: "Learn Every Day",
      description:
        "Spend some time learning every day. Regular practice helps you understand concepts better and build strong fundamentals.",
    },
    {
      icon: <FiClock />,
      number: "03",
      title: "Manage Your Time",
      description:
        "Create a simple study routine and give dedicated time to your learning. Focus on one task at a time.",
    },
    {
      icon: <FiRepeat />,
      number: "04",
      title: "Practice Consistently",
      description:
        "Learning becomes powerful when you practice what you learn. Solve questions, build projects and revise regularly.",
    },
    {
      icon: <FiTrendingUp />,
      number: "05",
      title: "Track Your Progress",
      description:
        "Look back at what you have learned and identify where you can improve. Small improvements add up over time.",
    },
    {
      icon: <FiAward />,
      number: "06",
      title: "Celebrate Progress",
      description:
        "Every completed lesson, solved problem and new skill is progress. Celebrate small wins and keep moving forward.",
    },
  ];

  const habits = [
    "Study at the same time whenever possible.",
    "Set small daily learning targets.",
    "Avoid distractions while studying.",
    "Take short breaks to refresh your mind.",
    "Revise important concepts regularly.",
    "Never compare your learning journey with someone else's.",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-hidden">

      {/* Hero Section */}
      <section className="relative px-5 sm:px-8 lg:px-16 pt-16 pb-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute right-0 top-20 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <FiZap />
              Learn • Practice • Grow
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Your Journey to{" "}
              <span className="text-blue-600">Success</span>
              <br />
              Starts With One Step
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-slate-500 text-base sm:text-lg leading-8">
              Success in learning is not about studying everything at once.
              It is about taking small steps, staying consistent and never
              stopping your curiosity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Steps */}
      <section className="px-5 sm:px-8 lg:px-16 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-blue-600 font-semibold mb-2">
              THE PATH TO SUCCESS
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              6 Steps to Become a Better Learner
            </h2>

            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Follow a simple process, stay patient and give yourself enough
              time to grow.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -7 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                    {step.icon}
                  </div>

                  <span className="text-4xl font-bold text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-500 leading-7 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consistency Section */}
      <section className="px-5 sm:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-200 mb-6">
                <FiRepeat />
              </div>

              <p className="text-blue-600 font-semibold mb-3">
                THE POWER OF CONSISTENCY
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Small Efforts Every Day
                <span className="text-blue-600"> Create Big Results.</span>
              </h2>

              <p className="text-slate-500 mt-5 leading-8">
                You do not need to study for many hours every day to make
                progress. What matters is showing up regularly. One concept,
                one problem and one lesson at a time can take you much further
                than occasional intense study sessions.
              </p>

              <div className="mt-7 flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm">
                  <FiCheckCircle />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Focus on progress, not perfection.
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Keep learning even when progress feels slow.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Habits Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-100/40 p-7 sm:p-9"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Build Better Study Habits
              </h3>

              <div className="space-y-4">
                {habits.map((habit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 text-blue-600 flex-shrink-0">
                      <FiCheckCircle />
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-6">
                      {habit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-blue-600 px-7 sm:px-12 py-14 text-center text-white"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="relative z-10">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl mb-6">
              <FiHeart />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Keep Going. Your Future Self Will Thank You.
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-blue-100 leading-7">
              Some days will be productive and some days will be difficult.
              That is completely normal. What matters is that you keep coming
              back, keep learning and keep improving.
            </p>

            <div className="mt-8">
              <p className="text-lg sm:text-xl font-semibold">
                "Every expert was once a beginner."
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Start where you are. Learn at your own pace.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final Message */}
      <section className="px-5 sm:px-8 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Learn Today. Grow Tomorrow.
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Use Study·Spark to learn new skills, practice your knowledge and
            take another step toward your goals every day.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default Content;


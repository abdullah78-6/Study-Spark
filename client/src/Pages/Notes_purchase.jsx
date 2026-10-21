import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { control } from "../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import Pdfviewer from "./Pdfviewer";
import toast from "react-hot-toast";
import { IoMdDownload } from "react-icons/io";
import {
  FaBookOpen,
  FaUserTie,
  FaRupeeSign,
  FaFilePdf,
  FaEye,
  FaTimes,
} from "react-icons/fa";

const Notes_purchase = ({ url }) => {
  const dispatch = useDispatch();
  const notesclient = useSelector((state) => state.main.purchasenotes);
  const backendemail = useSelector((state) => state.main.backendemail);

  // Unique key of the note whose preview is open (null = list view)
  const [openpdfkey, setopenpdfkey] = useState(null);

  const Fetchnotes = async () => {
    try {
      const res = await axios.get(url + "/api/notes/get_purchase_notes", {
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(control.setpurchasenotes(res.data.result));
      }
    } catch (error) {
      console.log("fetch notes error", error);
    }
  };

  useEffect(() => {
    Fetchnotes();
  }, []);

  // Attach an always-unique key to every note
  const notesWithKey = notesclient.map((note, index) => ({
    note,
    index,
    key: `${note._id ?? note.public_id ?? "note"}-${index}`,
  }));

  const openItem = notesWithKey.find((n) => n.key === openpdfkey) || null;

  const openpreview = (key) => {
    setopenpdfkey(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closepreview = () => setopenpdfkey(null);

  // Press Esc to close the preview
  useEffect(() => {
    if (!openpdfkey) return;
    const onKey = (e) => e.key === "Escape" && setopenpdfkey(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openpdfkey]);

  const Downloadnotes = (fileurl, publicid) => {
    if (!backendemail) {
      toast.error("Student Login Required");
      return;
    }
    const downloadurl = fileurl.replace("/upload/", "/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadurl;
    link.setAttribute("download", `${publicid || "study-notes"}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar url={url} />

      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* ================= FOCUS MODE: only the selected PDF ================= */}
        {openItem ? (
          <div className="mx-auto w-full max-w-5xl">
            {/* Close button lives here, so it always shows */}
            <div className="sticky top-0 z-30 mb-3 flex justify-end">
              <button
                type="button"
                onClick={closepreview}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                <FaTimes />
                Close Preview
              </button>
            </div>

            <Pdfviewer key={openItem.key} pdfurl={openItem.note.filename} />
          </div>
        ) : (
          <>
            {/* ================= LIST MODE ================= */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Study resources
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Explore your notes
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Access your Notes and preview PDF notes in a comfortable
                  reading space.
                </p>
                <p className="mt-3 max-w-2xl text-xl font-bold leading-7 text-blue-600">
                  Welcome to your personal study library on Study·Spark! Here
                  you can access all your purchased study notes in one place.
                  Preview your notes online or download the PDF documents for
                  convenient offline revision. Use these learning resources to
                  strengthen your understanding of important concepts, revise
                  key topics, and prepare more effectively for your semester
                  exams. Learn at your own pace and keep your study materials
                  ready whenever you need them.
                </p>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FaFilePdf className="text-xl text-blue-600" />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {notesclient.length}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Study resources
                  </p>
                </div>
              </div>
            </div>

            {notesclient.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-5 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <FaBookOpen className="text-3xl text-blue-500" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-800">
                  No notes available yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your Notes will appear here once you purchase
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                {notesWithKey.map(({ note: i, index, key }) => (
                  <article
                    key={key}
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    {/* Note Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                            <FaFilePdf className="text-xl" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                              Note #{index + 1}
                            </p>

                            <h2 className="mt-1 break-words text-lg font-bold text-slate-900">
                              {i.subject || "Study Material"}
                            </h2>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                            ["approved", "active"].includes(
                              String(i.status).toLowerCase()
                            )
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {i.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Note Details */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FaUserTie />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-400">Uploaded by</p>
                            <p className="break-words text-sm font-semibold text-slate-700">
                              {i.authorname || "Teacher"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">Price</p>

                          <p className="mt-1 flex items-center justify-end gap-1 text-xl font-extrabold text-slate-900">
                            <FaRupeeSign className="text-sm text-blue-600" />
                            {i.price ?? 0}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openpreview(key)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <FaEye />
                        Preview Full Notes
                      </button>

                      <button
                        type="button"
                        onClick={() => Downloadnotes(i.filename, i.public_id)}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <IoMdDownload className="text-xl" />
                        <span>Download</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Footer Information */}
            <div className="mt-10 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
              <FaBookOpen className="mt-1 shrink-0 text-lg text-blue-600" />

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your learning, your pace
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer url={url} />
    </div>
  );
};

export default Notes_purchase;
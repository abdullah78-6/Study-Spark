import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import axios from "axios"
import toast from "react-hot-toast"
import {FaEnvelope,FaPhoneAlt,FaMapMarkerAlt,FaPaperPlane,FaGraduationCap,FaCheck} from 'react-icons/fa'
import { control } from '../Redux/slice'
import { useDispatch,useSelector } from 'react-redux'
const Field = ({ label, name, type = 'text', value, onChange, textarea = false }) => {
    const shared =
        'peer w-full rounded-xl border border-blue-100 bg-blue-50/40 px-4 pt-6 pb-2 text-gray-800 outline-none placeholder-transparent transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

    return (
        <div className="relative">
            {textarea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                    rows="5"
                    required
                    className={`${shared} resize-none`}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                    required
                    className={shared}
                />
            )}

            <label
                htmlFor={name}
                className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-blue-600 transition-all duration-200
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
                           peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-600"
            >
                {label}
            </label>
        </div>
    )
}
const InfoRow = ({ icon: Icon, title, text, href }) => {
    const Tag = href ? motion.a : motion.div
    return (
        <Tag
            {...(href ? { href } : {})}
            variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.25 }}
            className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/20"
        >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 transition-transform group-hover:scale-105">
                <Icon className="text-lg" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="block truncate text-sm text-blue-100">{text}</span>
            </span>
        </Tag>
    )
}
const Contact = ({ url }) => {
    const reduceMotion = useReducedMotion()
    const backendemail=useSelector(state=>state.main.backendemail);
    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
 const [status, setStatus] = useState('idle')

    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }

    const handlesubmit=async(e)=> {
        e.preventDefault()
        if(!backendemail){
            toast.error("User Login Required");
            return ;
        }
        try {
        // setStatus('sending')
        const res=await axios.post(url+"/api/feedback/add_feedback",formdata,{
            
    withCredentials:true,
            
        })
        if(res.data.status){
            setStatus("sending");
            setTimeout(() => {
            setStatus('sent')
            setformdata({ name: '', email: '', subject: '', message: '' })
        }, 900)
        }
        else{
            setStatus("idle")
            toast.error(res.data.message);
        }
    } 
    catch (error) {
            
        }
    }

    
    const filled = Object.values(formdata).filter((v) => v.trim() !== '').length
    const progress = (filled / 4) * 100

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/60 to-white">
            
            <Navbar url={url} />

            <section className="px-4 py-12 sm:px-6 md:py-20">
                <div className="mx-auto max-w-6xl">

                    {/* ---------- Title ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center md:mb-14"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', delay: 0.15, stiffness: 200, damping: 14 }}
                            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200"
                        >
                            <FaGraduationCap className="text-3xl text-white" />
                        </motion.div>

                        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-5xl">
                            Contact Study<span className="text-blue-600">·</span>Spark
                        </h1>

                        <p className="mx-auto max-w-2xl leading-7 text-gray-500">
                            Have a question, suggestion, or need help with Study·Spark?
                            We'd love to hear from you.
                        </p>
                    </motion.div>

                    {/* ---------- Split card ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative grid overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-100 lg:grid-cols-5"
                    >

                        {/* ===== LEFT: blue info panel ===== */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6 sm:p-8 lg:col-span-2 lg:p-10">

                            {/* ambient floating circles */}
                            <motion.div
                                aria-hidden="true"
                                animate={reduceMotion ? {} : { y: [0, -18, 0], x: [0, 10, 0] }}
                                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"
                            />
                            <motion.div
                                aria-hidden="true"
                                animate={reduceMotion ? {} : { y: [0, 16, 0], x: [0, -12, 0] }}
                                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                                className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-400/30"
                            />

                            <div className="relative flex h-full flex-col">
                                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                                    Let's talk
                                </h2>

                                <p className="mb-8 leading-7 text-blue-100">
                                    Whether you're having trouble with a course, want to share
                                    feedback, or simply want to know more about Study·Spark,
                                    reach out and we'll help.
                                </p>

                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-4"
                                >
                                    <InfoRow
                                        icon={FaEnvelope}
                                        title="Email us"
                                        text="support@studyspark.com"
                                        href="mailto:support@studyspark.com"
                                    />
                                    <InfoRow
                                        icon={FaPhoneAlt}
                                        title="Call us"
                                        text="+91 00000 00000"
                                        href="tel:+910000000000"
                                    />
                                    <InfoRow
                                        icon={FaMapMarkerAlt}
                                        title="Our location"
                                        text="India"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="mt-8 rounded-2xl bg-white p-5 lg:mt-auto"
                                >
                                    <h3 className="mb-1 font-semibold text-blue-700">
                                        We're here to help!
                                    </h3>
                                    <p className="text-sm leading-6 text-gray-500">
                                        Your feedback helps us make Study·Spark better for every learner.
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* ===== RIGHT: form ===== */}
                        <div className="relative p-6 sm:p-8 lg:col-span-3 lg:p-10">

                            <AnimatePresence mode="wait">
                                {status !== 'sent' ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                                                Send us a message
                                            </h2>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Fill out the form and we'll get back to you as soon as possible.
                                            </p>

                                            {/* progress bar: fills as fields are completed */}
                                            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
                                                <motion.div
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                                                />
                                            </div>
                                        </div>

                                        <form onSubmit={handlesubmit} className="space-y-5">

                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <Field
                                                    label="Your name"
                                                    name="name"
                                                    value={formdata.name}
                                                    onChange={handlechange}
                                                />
                                                <Field
                                                    label="Email address"
                                                    name="email"
                                                    type="email"
                                                    value={formdata.email}
                                                    onChange={handlechange}
                                                />
                                            </div>

                                            <Field
                                                label="Subject"
                                                name="subject"
                                                value={formdata.subject}
                                                onChange={handlechange}
                                            />

                                            <Field
                                                label="Message"
                                                name="message"
                                                textarea
                                                value={formdata.message}
                                                onChange={handlechange}
                                            />

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                type="submit"
                                                disabled={status === 'sending'}
                                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-80"
                                            >
                                                {status === 'sending' ? (
                                                    <>
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                                            className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white"
                                                        />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <motion.span
                                                            whileHover={{ x: 3, y: -3 }}
                                                            className="inline-flex"
                                                        >
                                                            <FaPaperPlane />
                                                        </motion.span>
                                                        Send message
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex min-h-[420px] flex-col items-center justify-center text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.1 }}
                                            className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-xl shadow-blue-200"
                                        >
                                            {!reduceMotion && (
                                                <motion.span
                                                    initial={{ scale: 1, opacity: 0.5 }}
                                                    animate={{ scale: 1.8, opacity: 0 }}
                                                    transition={{ duration: 1.2, repeat: Infinity }}
                                                    className="absolute inset-0 rounded-full bg-blue-400"
                                                />
                                            )}
                                            <FaCheck className="relative text-4xl text-white" />
                                        </motion.div>

                                        <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                                            Message sent
                                        </h2>
                                        <p className="mb-8 max-w-sm text-gray-500">
                                            Thanks for reaching out. We'll reply to your email as soon as we can.
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setStatus('idle')}
                                            className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                                        >
                                            Send another message
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer url={url} />
        </div>
    )
}

export default Contact
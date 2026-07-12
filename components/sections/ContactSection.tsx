"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Loader2 } from "lucide-react"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "", // Extra field agar aapko backend pe adjust karni ho, warna message me append kar denge
        message: "",
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: null, message: "" })

        // Combining service into message if backend doesn't have a specific 'service' column
        const finalMessage = formData.service
            ? `[Service Interest: ${formData.service}]\n${formData.message}`
            : formData.message

        try {
            const response = await fetch("https://backend.theorbit7.com/api/v1/leads", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: finalMessage,
                    source: "web-contact-form", // Identifiable source
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: "success", message: "Inquiry submitted successfully! We'll get back to you soon." })
                setFormData({ name: "", email: "", phone: "", service: "", message: "" })
            } else {
                setStatus({ type: "error", message: data.message || "Something went wrong. Please check your inputs." })
            }
        } catch (error) {
            setStatus({ type: "error", message: "Network error. Please try again later." })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="relative w-full py-16 md:py-24 bg-gray-50 overflow-hidden">
            {/* Optional Map/Dotted Background Effect mimicking the image - Adjusted for Light Theme */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, #000000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

                    {/* Left Column: Text & Contact Info */}
                    <div className="flex flex-col justify-center space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase leading-[1.1] tracking-tight text-gray-900">
                                YOUR NEXT <br />
                                <span className="text-emerald-300">PROJECT</span> IS JUST <br />
                                A CLICK AWAY!
                            </h2>
                            <p className="max-w-[500px] text-gray-600 text-lg">
                                We work with you to make the most of your online presence! <br />
                                <span className="font-bold text-gray-900">Let&apos;s Collaborate</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 mt-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-300 shadow-sm">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Office Address</h4>
                                    <p className="text-gray-600 mt-1">Karachi, Pakistan — serving clients worldwide.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-300 shadow-sm">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Call / WhatsApp Us</h4>
                                    <p className="text-gray-600 mt-1">+92 310 0301826</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-300 shadow-sm">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Mail Us</h4>
                                    <p className="text-gray-600 mt-1">info@theorbit7.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Dark & Red Highlighted Form Container */}
                    <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-gray-900 to-black p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(220,38,38,0.15)] hover:shadow-[0_10px_50px_rgba(220,38,38,0.25)] transition-shadow duration-500 overflow-hidden">

                        {/* Subtle Neon Red Glow inside the card at the top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-600/20 blur-[60px] pointer-events-none"></div>

                        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Full Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-white placeholder-gray-200 focus:border-emerald-500 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-white placeholder-gray-200 focus:border-emerald-500 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Phone */}
                                <div className="relative">
                                    {/* Fake flag/country code visual for style */}
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400 text-sm">🇵🇰 +92</span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="310 1234567"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-800 bg-gray-950/60 py-3 pl-16 pr-4 text-sm text-white placeholder-gray-200 focus:border-emerald-500 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                                    />
                                </div>

                                {/* Service Selection */}
                                <div>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-gray-300 focus:border-emerald-500 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all appearance-none"
                                        style={{ WebkitAppearance: 'none' }}
                                    >
                                        <option value="" disabled className="text-gray-500 bg-gray-900">- Select Service -</option>
                                        <option value="Web Development" className="text-white bg-gray-900">Web Development</option>
                                        <option value="Mobile App" className="text-white bg-gray-900">Mobile App</option>
                                        <option value="SEO" className="text-white bg-gray-900">SEO & Marketing</option>
                                        <option value="AI Automation" className="text-white bg-gray-900">AI Automation</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-white placeholder-gray-200 focus:border-emerald-500 focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {status.type && (
                                <div className={`p-3 rounded-md text-sm font-medium border ${status.type === "success"
                                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative flex w-full h-12 items-center justify-center rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-sm font-bold tracking-wide text-white transition-all hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
                                >
                                    {/* Subtle shine effect on hover */}
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            SENDING...
                                        </>
                                    ) : (
                                        <>
                                            LET&apos;S TALK
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card-content";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [status, setStatus] = useState<null | "idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, business }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setName("");
        setBusiness("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0f] to-neutral-900 text-slate-100">
      {/* Animated background sparkles */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#ff7a59]/10 via-transparent to-transparent" />
      </div>

      {/* HEADER */}
      <header className="py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500 flex items-center justify-center font-bold text-neutral-900 shadow-lg">
              S
            </div>
            <div>
              <div className="text-lg font-semibold">Sello</div>
              <div className="text-xs text-neutral-400 -mt-0.5">Light Up Your Online Store</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#waitlist" className="px-3 py-1 bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 text-neutral-900 rounded-md shadow">Join Waitlist</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="pt-12 pb-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Light up your online store — launch in minutes, sell everywhere.
              </h1>
              <p className="mt-6 text-gray-300 max-w-xl">
                Sello is an AI-powered store builder for small businesses: auto-setup, one-click themes, WhatsApp checkout, and delivery integrations — all in a simple dashboard.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a href="#waitlist" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 text-neutral-900 px-5 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition-transform">Join Early Access</a>
                <a href="#features" className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-3 rounded-md text-neutral-300 hover:text-white">See Features</a>
              </div>
              <div className="mt-6 text-sm text-neutral-400">No credit card • Demo-ready • Built for small shops</div>
            </div>

            {/* Hero right image */}
            <div className="relative">
              <div className="rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src="https://images.unsplash.com/photo-1612831455544-80b05ee2a09a?auto=format&fit=crop&w=800&q=80"
                    alt="Sello Store Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 left-6 text-xs text-neutral-400">Mobile & desktop friendly</div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center">Powerful features that spark sales</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="AI Auto-Store Setup"
                desc="Answer a few questions and get a ready-made store with descriptions, categories, and demo products."
                icon="https://img.icons8.com/fluency/64/000000/artificial-intelligence.png"
              />
              <FeatureCard
                title="WhatsApp Ordering"
                desc="Customers place orders directly via WhatsApp — no complex checkout."
                icon="https://img.icons8.com/color/64/000000/whatsapp.png"
              />
              <FeatureCard
                title="Delivery Integrations"
                desc="Send orders to local couriers via webhook or email."
                icon="https://img.icons8.com/color/64/000000/delivery.png"
              />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="5 Ready Themes"
                desc="Switch themes with one click — minimal, classic, bold, card, pastel."
                icon="https://img.icons8.com/fluency/64/000000/design.png"
              />
              <FeatureCard
                title="Smart Product Tools"
                desc="AI product descriptions, pricing suggestions, and image hints."
                icon="https://img.icons8.com/fluency/64/000000/toolbox.png"
              />
              <FeatureCard
                title="Simple Dashboard"
                desc="Manage products, orders, and delivery requests from one place."
                icon="https://img.icons8.com/fluency/64/000000/dashboard.png"
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-12 bg-neutral-950/30 border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center py-10">
            <div>
              <h3 className="text-2xl font-bold">How Sello works</h3>
              <ol className="mt-6 space-y-4 text-neutral-300">
                <li><strong>1.</strong> Sign up and answer 3 quick questions about your shop.</li>
                <li><strong>2.</strong> AI generates store copy, categories, and starter products.</li>
                <li><strong>3.</strong> Publish your store link and share it with customers.</li>
                <li><strong>4.</strong> Customers order via WhatsApp and delivery requests are sent automatically.</li>
              </ol>
              <div className="mt-6 text-sm text-neutral-400">Designed for sellers who want fast setup and simple operations.</div>
            </div>
            <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
              <div className="text-sm text-neutral-400">Trusted for</div>
              <div className="mt-4 flex gap-3">
                <Badge>Bakery</Badge>
                <Badge>Clothing</Badge>
                <Badge>Handmade</Badge>
              </div>
              <div className="mt-6 text-xs text-neutral-500">Fast setup · No coding · Mobile-first</div>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="py-14">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-white">Get early access to Sello</h3>
            <p className="text-neutral-400 mt-2">Join the waitlist and get a chance for a free onboarding session.</p>

            <form onSubmit={handleSubmit} aria-label="Sello waitlist signup" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" maxLength={120} className="p-3 rounded-md bg-neutral-900 border border-neutral-800 focus:ring-2 focus:ring-orange-400 outline-none" required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="email" maxLength={254} className="p-3 rounded-md bg-neutral-900 border border-neutral-800 focus:ring-2 focus:ring-orange-400 outline-none" required />
              <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business type (e.g., bakery)" maxLength={120} className="p-3 rounded-md bg-neutral-900 border border-neutral-800 focus:ring-2 focus:ring-orange-400 outline-none" required />

              <div className="md:col-span-3 mt-2">
                <div className="flex items-center justify-center gap-4">
                  <Button type="submit" disabled={status === "loading"} className="px-6 py-3 bg-gradient-to-r from-orange-400 via-pink-500 to-rose-500 text-neutral-900 font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform">Join Waitlist</Button>
                </div>
                <div role="status" aria-live="polite" className="mt-3 text-sm text-neutral-400">
                  {status === "loading" && "Submitting..."}
                  {status === "ok" && <span className="text-green-400">Thanks — we’ll email you soon!</span>}
                  {status === "error" && <span className="text-rose-400">Submission failed — try again.</span>}
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="font-semibold">Sello</div>
              <div className="text-sm text-neutral-500">Light Up Your Online Store</div>
            </div>
            <div className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} Sello</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ---------------------------
   Helper UI Components
   --------------------------- */
function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <Card className="hover:border-neutral-700 hover:shadow-xl transition-all duration-200 p-6">
      <CardContent className="flex flex-col items-center text-center gap-4">
        <img src={icon} alt={title} className="w-16 h-16" />
        <div className="mt-2 text-xl font-semibold text-white">{title}</div>
        <div className="mt-1 text-md text-neutral-300">{desc}</div>
      </CardContent>
    </Card>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1 bg-neutral-800 text-neutral-200 rounded-full text-sm">{children}</span>;
}

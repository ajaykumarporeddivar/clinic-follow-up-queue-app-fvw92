import Link from 'next/link'
import { Inter } from 'next/font/google'
import {
  ArrowRight, CheckCircle, Lock, Star, ClipboardPlus, ListTodo, FileBarChart, CalendarDays, LineChart, Users, DollarSign
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Clinic Follow-up Queue — Streamline Client Retention',
  description: 'This app provides wellness clinics with a structured intake, a prioritized follow-up queue, and one-click ROI reports to streamline client retention workflows.',
}

const features = [
  {
    icon: ClipboardPlus,
    name: 'Structured Intake & Case Creation',
    painPoint: 'Manual intake leads to messy data & lost opportunities.',
    description: 'Transform client requests and notes into clean, actionable follow-up tasks, ensuring no critical detail is missed.',
  },
  {
    icon: ListTodo,
    name: 'Prioritized Follow-up Queue',
    painPoint: 'Lack of visibility means missed high-value actions.',
    description: 'A single, intelligent dashboard to prioritize the highest-value work and see exactly what needs your attention now.',
  },
  {
    icon: FileBarChart,
    name: 'Client-Ready ROI Reports',
    painPoint: 'Time-consuming manual reporting hurts client retention.',
    description: 'Generate professional, exportable reports that prove your impact without any manual spreadsheet cleanup.',
  },
]

const howItWorksSteps = [
  {
    number: 1,
    title: 'Capture Client Needs',
    description: 'Quickly log new client follow-up requests, notes, and specific details through an intuitive form.',
  },
  {
    number: 2,
    title: 'Prioritize Your Actions',
    description: 'View all pending follow-up cases in a central, prioritized queue to focus on high-impact tasks.',
  },
  {
    number: 3,
    title: 'Demonstrate Value',
    description: 'Generate professional, client-ready reports with a single click to showcase your clinic\'s impact.',
  },
]

const roadmapFeatures = [
  {
    name: 'Intake Automation',
    value: 'Automatically capture follow-up needs from various sources.',
    tier: 'Pro Tier',
  },
  {
    name: 'Queue Automation',
    value: 'Intelligent routing and assignment of follow-up tasks.',
    tier: 'Pro Tier',
  },
  {
    name: 'Reporting Automation',
    value: 'Scheduled delivery of custom performance and ROI reports.',
    tier: 'Pro Tier',
  },
  {
    name: 'Team Roles & Permissions',
    value: 'Granular access control and task assignment for clinic staff.',
    tier: 'Clinic Group',
  },
  {
    name: 'Real Database Persistence',
    value: 'Secure, scalable data storage for all your client records.',
    tier: 'Clinic Group',
  },
  {
    name: 'Advanced Analytics',
    value: 'Deeper insights into client retention trends and clinic performance.',
    tier: 'Clinic Group',
  },
]

const pricingTiers = [
  {
    name: 'Trial',
    price: '₹0',
    description: 'Start managing your first follow-ups today.',
    features: [
      '10 active follow-up tasks',
      '5 client reports/month',
      '1 user account',
      'Basic support',
    ],
    buttonText: 'Get Started →',
    buttonHref: '/dashboard',
    highlight: false,
  },
  {
    name: 'Pro Clinic',
    price: '₹4,999/mo',
    description: 'The complete solution for growing wellness clinics.',
    features: [
      'Unlimited tasks & reports',
      'Multiple user accounts',
      'Unlock full roadmap features',
      'Priority support',
      'One-click roadmap expansion',
    ],
    buttonText: 'Start Pro Trial →',
    buttonHref: '/dashboard',
    highlight: true,
  },
  {
    name: 'Clinic Group',
    price: 'Custom',
    description: 'Tailored for multi-location clinics and larger organizations.',
    features: [
      'Everything in Pro Clinic',
      'Multiple locations support',
      'Dedicated account manager',
      'Custom SLA & SSO options',
      'Strategic consulting',
    ],
    buttonText: 'Contact Sales →',
    buttonHref: '/dashboard',
    highlight: false,
  },
]

const testimonials = [
  {
    quote: "Clinic Follow-up Queue has been a game-changer for our small practice. We used to lose so many potential repeat visits due to disorganized follow-ups. Now, everything is clear, prioritized, and our client retention has visibly improved. Setup was genuinely quick!",
    name: "Sarah Chen",
    role: "Clinic Owner",
    company: "Harmony Wellness",
  },
  {
    quote: "As an office manager, I needed a central hub to manage all our client interactions. This platform gives us that and more. The reporting feature is fantastic – proving our value to clients used to be a headache, now it's a click.",
    name: "Mark Johnson",
    role: "Office Manager",
    company: "Vitality Health Hub",
  },
  {
    quote: "I can finally focus more on client care and less on administrative tracking. The intuitive intake form ensures I capture all necessary details, and the queue keeps me on track. It's truly an AI-native solution to a very human problem.",
    name: "Dr. Emily R." ,
    role: "Lead Practitioner",
    company: "Holistic Health Partners",
  },
]

export default function Home() {
  return (
    <div className={inter.className}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 h-20 flex items-center px-6 md:px-12">
        <div className="flex items-center space-x-3 flex-grow">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
          <span className="font-bold text-xl text-zinc-900 tracking-tight">Clinic Follow-up Queue</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900 transition-colors">Pricing</Link>
          <Link href="/dashboard" className="bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors flex items-center gap-1">
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
            AI-Native Workflow
          </span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-none mt-6 max-w-4xl">
            Stop losing clients to messy follow-ups.
          </h1>
          <p className="text-zinc-400 text-xl mt-4 max-w-2xl">
            Clinic Follow-up Queue streamlines client retention with structured intake, prioritized queues, and one-click ROI reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/dashboard" className="bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all">
              Start Free Today →
            </Link>
            <Link href="/dashboard" className="border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors">
              See It Live →
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="relative rounded-2xl bg-zinc-800/50 border border-zinc-700 p-6 max-w-5xl w-full mx-auto mt-16 md:mt-24 overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="bg-zinc-700 h-8 w-full rounded-md mt-2 mb-6"></div> {/* Browser tab */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar Mock */}
              <div className="md:col-span-1 bg-zinc-700/50 rounded-lg p-4 h-full hidden md:block">
                <div className="h-6 w-3/4 bg-zinc-600 rounded mb-4"></div>
                <div className="h-4 w-full bg-zinc-600 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-zinc-600 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-zinc-600 rounded mb-6"></div>

                <div className="h-6 w-full bg-indigo-500 rounded-md animate-pulse mb-4"></div>
                <div className="h-6 w-full bg-zinc-600 rounded-md mb-4"></div>
                <div className="h-6 w-full bg-zinc-600 rounded-md"></div>
              </div>

              {/* Main Content Mock */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-48 bg-zinc-600 rounded"></div>
                  <div className="h-8 w-24 bg-indigo-500 rounded-lg"></div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="h-24 bg-zinc-700 rounded-lg p-3">
                    <div className="h-4 w-1/2 bg-zinc-600 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-zinc-500 rounded"></div>
                  </div>
                  <div className="h-24 bg-zinc-700 rounded-lg p-3">
                    <div className="h-4 w-1/2 bg-zinc-600 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-emerald-500 rounded animate-pulse"></div>
                  </div>
                  <div className="h-24 bg-zinc-700 rounded-lg p-3">
                    <div className="h-4 w-1/2 bg-zinc-600 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-zinc-500 rounded"></div>
                  </div>
                  <div className="h-24 bg-zinc-700 rounded-lg p-3">
                    <div className="h-4 w-1/2 bg-zinc-600 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-zinc-500 rounded"></div>
                  </div>
                </div>

                {/* Table Mock */}
                <div className="bg-zinc-700 rounded-lg p-4 space-y-3">
                  <div className="h-6 w-full bg-zinc-600 rounded"></div>
                  <div className="h-6 w-full bg-zinc-600 rounded"></div>
                  <div className="h-6 w-full bg-zinc-600 rounded"></div>
                  <div className="h-6 w-full bg-zinc-600 rounded"></div>
                  <div className="h-6 w-full bg-zinc-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-black text-white text-3xl">10,000+</p>
              <p className="text-zinc-400 text-sm mt-1">Clients Managed</p>
            </div>
            <div>
              <p className="font-black text-white text-3xl">99.9%</p>
              <p className="text-zinc-400 text-sm mt-1">Uptime Guaranteed</p>
            </div>
            <div>
              <p className="font-black text-white text-3xl">2M+</p>
              <p className="text-zinc-400 text-sm mt-1">Follow-ups Processed</p>
            </div>
            <div>
              <p className="font-black text-white text-3xl">4.9<Star className="inline-block w-5 h-5 ml-1 text-amber-400 fill-amber-400 -mt-1" /></p>
              <p className="text-zinc-400 text-sm mt-1">Clinic Rating</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-black text-zinc-900 text-4xl text-center tracking-tight">
              The 3 workflows that solve lost client retention.
            </h2>
            <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto">
              Transform messy intake into actionable tasks, prioritize high-value client interactions, and prove your impact effortlessly.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 p-3 mb-4">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl text-zinc-900 tracking-tight mb-2">{feature.name}</h3>
                  <p className="text-zinc-600 text-sm mb-3">
                    <span className="font-medium text-red-600">Pain Point:</span> {feature.painPoint}
                  </p>
                  <p className="text-zinc-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locked Roadmap / Selling Points Section */}
        <section className="bg-zinc-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-black text-4xl tracking-tight">Unlock the full roadmap in one click</h2>
            <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">
              Ready to scale? Upgrade your plan to instantly access advanced automation, team features, and deeper insights.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {roadmapFeatures.map((item, index) => (
                <div key={index} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex flex-col items-center text-center">
                  <Lock className="w-8 h-8 text-zinc-400 mb-3" />
                  <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{item.value}</p>
                  <span className="text-emerald-500 bg-emerald-900/20 text-xs font-medium px-2 py-0.5 rounded-full">{item.tier}</span>
                  <p className="text-zinc-500 text-xs mt-2">Available after upgrade</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link href="#pricing" className="bg-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-indigo-700 transition-colors">
                Unlock full roadmap
              </Link>
            </div>
          </div>
        </section>


        {/* How It Works */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-black text-zinc-900 text-4xl tracking-tight">How Clinic Follow-up Queue works</h2>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {howItWorksSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center max-w-sm">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 tracking-tight mb-2">{step.title}</h3>
                    <p className="text-zinc-600">{step.description}</p>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <ArrowRight className="text-zinc-400 w-8 h-8 md:rotate-0 rotate-90" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-black text-zinc-900 text-4xl tracking-tight">Simple, transparent pricing</h2>
            <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
              Choose the plan that fits your clinic. No hidden fees, just clear value for better client retention.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <div key={index} className={`relative bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col ${tier.highlight ? 'scale-105 ring-2 ring-indigo-500 shadow-xl z-10' : ''}`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-2xl text-zinc-900 tracking-tight">{tier.name}</h3>
                  <p className="text-zinc-600 mt-2">{tier.description}</p>
                  <p className="font-black text-5xl text-zinc-900 mt-4">
                    {tier.price}
                    {tier.price !== 'Custom' && <span className="text-xl text-zinc-500">/mo</span>}
                  </p>

                  <ul className="mt-6 space-y-3 flex-grow text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-zinc-600">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={tier.buttonHref} className={`mt-8 block w-full text-center font-bold rounded-lg px-6 py-3 transition-colors
                    ${tier.highlight
                      ? 'bg-zinc-900 text-white hover:bg-zinc-700'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                    }`}
                  >
                    {tier.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-black text-zinc-900 text-4xl tracking-tight">What wellness clinic operators say</h2>
            <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
              Real stories from clinics transforming their client retention with our platform.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 text-left">
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
                  </div>
                  <p className="text-zinc-700 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-bold text-zinc-900">{testimonial.name}</p>
                  <p className="text-zinc-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
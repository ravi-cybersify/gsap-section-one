"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Smartphone, Palette, BarChart3, Zap } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// JSON data for cards and content
const cardsData = [
  {
    id: 1,
    title: "Websites",
    icon: Code,
    gradient: "from-pink-500 to-blue-500",
  },
  {
    id: 2,
    title: "Web Apps",
    icon: Smartphone,
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Design",
    icon: Palette,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Analytics",
    icon: BarChart3,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 5,
    title: "Performance",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
  },
]

const contentData = [
  {
    id: 1,
    title: "Custom Websites",
    description:
      "Craft stunning, responsive websites that captivate your audience. Our expert team delivers pixel-perfect designs with seamless user experiences that drive conversions and establish your digital presence.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
  },
  {
    id: 2,
    title: "Progressive Web Applications",
    description:
      "Build future-proof web apps with cutting-edge technology. Our end-to-end development expertise creates scalable, agile solutions that maximize your ROI and deliver blazing-fast performance.",
    features: ["Scalable Architecture", "Cross-Platform", "Offline Support", "Native Feel"],
  },
  {
    id: 3,
    title: "Creative Design Solutions",
    description:
      "Transform your brand with innovative design strategies. We create visually stunning interfaces that communicate your brand story effectively while ensuring optimal user engagement and satisfaction.",
    features: ["Brand Identity", "UI/UX Design", "Visual Strategy", "Creative Direction"],
  },
  {
    id: 4,
    title: "Data Analytics & Insights",
    description:
      "Unlock the power of data to drive informed decisions. Our analytics solutions provide deep insights into user behavior, performance metrics, and growth opportunities for your business.",
    features: ["Real-time Analytics", "Custom Dashboards", "Performance Tracking", "Data Visualization"],
  },
  {
    id: 5,
    title: "Performance Optimization",
    description:
      "Supercharge your digital presence with lightning-fast performance. We optimize every aspect of your applications to ensure maximum speed, efficiency, and user satisfaction across all devices.",
    features: ["Speed Optimization", "Core Web Vitals", "Mobile Performance", "Technical SEO"],
  },
]

export default function ScrollCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cardsContainer = cardsContainerRef.current
    const content = contentRef.current

    if (!section || !cardsContainer || !content) return

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.floor(progress * cardsData.length)
          const clampedIndex = Math.min(activeIndex, cardsData.length - 1)

          // Update content based on scroll progress
          gsap.set(`.content-item`, { opacity: 0, y: 20 })
          gsap.set(`.content-item-${clampedIndex}`, { opacity: 1, y: 0 })
        },
      },
    })

    // Animate cards from center to top
    cardsData.forEach((_, index) => {
      tl.to(
        `.card-${index}`,
        {
          y: -100 * index,
          scale: 0.9 - index * 0.1,
          opacity: 1 - index * 0.2,
          duration: 1,
          ease: "power2.out",
        },
        index * 0.2,
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="bg-black text-white">
      {/* Spacer before section */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl font-bold">Scroll down to see the animation</h2>
      </div>

      {/* Main scroll section */}
      <div ref={sectionRef} className="relative h-[500vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-between px-8 lg:px-16">
          {/* Left side - Cards */}
          <div ref={cardsContainerRef} className="relative w-1/2 flex flex-col items-center justify-center">
            <div className="mb-8">
              <h3 className="text-yellow-400 text-lg font-medium mb-4">what we do</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                42Works delivers end-to-end digital solutions, from designing stunning websites and crafting impactful
                marketing strategies to developing powerful mobile apps.
              </p>
            </div>

            <div className="relative">
              {cardsData.map((card, index) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.id}
                    className={`card-${index} absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-32 rounded-2xl bg-gradient-to-r ${card.gradient} p-6 flex items-center gap-4 shadow-2xl`}
                    style={{ zIndex: cardsData.length - index }}
                  >
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white text-2xl font-bold">{card.title}</h4>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Content */}
          <div ref={contentRef} className="w-1/2 pl-16">
            {contentData.map((content, index) => (
              <div key={content.id} className={`content-item content-item-${index} absolute opacity-0`}>
                <h2 className="text-4xl font-bold mb-6 text-white">{content.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">{content.description}</p>

                <div className="space-y-3 mb-8">
                  {content.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="group flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
                  <span className="text-lg">explore</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer after section */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl font-bold">End of animation section</h2>
      </div>
    </div>
  )
}

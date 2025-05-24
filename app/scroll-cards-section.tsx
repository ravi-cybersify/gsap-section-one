"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Smartphone, Palette, BarChart3, Zap } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Combined card and content data
const combinedData = [
  {
    id: 1,
    title: "Enhanced Security",
    icon: Code,
    gradient: "from-pink-500 to-blue-500",
    content: {
      title: "Enhanced Security",
      description:
        "We create and tell stories that connect with people and convey your brand's message in a clear, authentic way. Our creative, artistic thinkers immerse into the DNA of your brand to conceptualize and shape visual content that achieves your objectives and resonates within your target audience.",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading",
        "Modern UI/UX",
      ],
    },
  },
  {
    id: 2,
    title: "Scalability & Flexibility",
    icon: Smartphone,
    gradient: "from-purple-500 to-cyan-500",
    content: {
      title: "Scalability & Flexibility",
      description:
        "We create and tell stories that connect with people and convey your brand's message in a clear, authentic way. Our creative, artistic thinkers immerse into the DNA of your brand to conceptualize and shape visual content that achieves your objectives and resonates within your target audience.",
      features: [
        "Scalable Architecture",
        "Cross-Platform",
        "Offline Support",
        "Native Feel",
      ],
    },
  },
  {
    id: 3,
    title: "Design",
    icon: Palette,
    gradient: "from-orange-500 to-red-500",
    content: {
      title: "Creative Design Solutions",
      description:
        "Transform your brand with innovative design strategies. We create visually stunning interfaces that communicate your brand story effectively while ensuring optimal user engagement and satisfaction.",
      features: [
        "Brand Identity",
        "UI/UX Design",
        "Visual Strategy",
        "Creative Direction",
      ],
    },
  },
  {
    id: 4,
    title: "Analytics",
    icon: BarChart3,
    gradient: "from-green-500 to-teal-500",
    content: {
      title: "Data Analytics & Insights",
      description:
        "Unlock the power of data to drive informed decisions. Our analytics solutions provide deep insights into user behavior, performance metrics, and growth opportunities for your business.",
      features: [
        "Real-time Analytics",
        "Custom Dashboards",
        "Performance Tracking",
        "Data Visualization",
      ],
    },
  },
  {
    id: 5,
    title: "Performance",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    content: {
      title: "Performance Optimization",
      description:
        "Supercharge your digital presence with lightning-fast performance. We optimize every aspect of your applications to ensure maximum speed, efficiency, and user satisfaction across all devices.",
      features: [
        "Speed Optimization",
        "Core Web Vitals",
        "Mobile Performance",
        "Technical SEO",
      ],
    },
  },
];

export default function ScrollCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const content = contentRef.current;

    if (!section || !cardsContainer || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${(combinedData.length-1) * 800 + 1000}`,
        // end:"bottom center",
        pin: true,
        scrub: 1,
        markers:true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.floor(progress * combinedData.length);
          const clampedIndex = Math.min(activeIndex, combinedData.length - 1);

          gsap.utils.toArray(".content-item").forEach((el) => {
            gsap.set(el, { opacity: 0, y: 20, display: "none" });
          });

          const activeContent = document.querySelector(
            `.content-item-${clampedIndex}`
          );
          if (activeContent) {
            gsap.set(activeContent, { opacity: 1, y: 0, display: "block" });
          }
        },
      },
    });

    for (let index = 0; index < combinedData.length - 1; index++) {
      tl.to(
        `.card-${index}`,
        {
          y: -250,
          scale: 1,
          opacity: 0,
          ease: "power2.out",
          duration: 2,
        },
         ">+=0.5" // Increase this for slower transition between cards
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Intro Section */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl font-bold">Scroll down to see the animation</h2>
      </div>

      {/* Scroll Section */}
      <div ref={sectionRef} className="relative h-[100vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-between px-8 lg:px-16">
          {/* Cards */}
          <div
            ref={cardsContainerRef}
            className="relative w-1/2 flex flex-col items-center justify-center z-12"
          >
            <div className="mb-96">
              <h3 className="text-yellow-400 text-lg font-medium mb-4">
                what we do
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                42Works delivers end-to-end digital solutions, from designing
                stunning websites and crafting impactful marketing strategies to
                developing powerful mobile apps.
              </p>
            </div>

            <div className="relative bottom-60 z-9">
              {combinedData.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`card-${index} absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-32 rounded-2xl bg-gradient-to-r ${card.gradient} p-6 flex items-center gap-4 shadow-2xl`}
                    style={{ zIndex: combinedData.length - index }}
                  >
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white text-2xl font-bold">
                      {card.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="w-1/2 pl-16 relative bottom-20">
            {combinedData.map((content, index) => (
              <div
                key={content.id}
                className={`content-item content-item-${index} absolute opacity-0`}
                style={{ display: "none" }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">
                  {content.content.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                  {content.content.description}
                </p>

                <div className="space-y-3 mb-8">
                  {content.content.features.map((feature, featureIndex) => (
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen bg-gray-800 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white">
          Now showing new content after cards
        </h2>
      </div>
    </div>
  );
}

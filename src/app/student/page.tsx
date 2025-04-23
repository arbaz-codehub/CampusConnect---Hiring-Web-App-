"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function StudentDashboard() {
  const [testTaken, setTestTaken] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Create refs for each section
  const dashboardRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const qualifyTestRef = useRef<HTMLElement>(null);
  const jobBoardRef = useRef<HTMLElement>(null);
  const applicationsRef = useRef<HTMLElement>(null);
  const leaderboardRef = useRef<HTMLElement>(null);
  const helpCenterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: true,
      easing: "ease-in-out",
    });

    // Function to check which section is in viewport
    const handleScroll = () => {
      const sections = [
        { ref: dashboardRef, name: "dashboard" },
        { ref: resumeRef, name: "resume" },
        { ref: qualifyTestRef, name: "qualifyTest" },
        { ref: jobBoardRef, name: "jobBoard" },
        { ref: applicationsRef, name: "applications" },
        { ref: leaderboardRef, name: "leaderboard" },
        { ref: helpCenterRef, name: "helpCenter" },
      ];

      // Find the section that is currently in viewport
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          // If the section is in viewport (with some buffer)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    // Close sidebar on resize if screen becomes larger
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle smooth scrolling
  const scrollToSection = (
    ref: React.RefObject<HTMLElement>,
    sectionName: string
  ) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionName);
      // Close sidebar on mobile after clicking a navigation item
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] to-[#eef1f6] font-[Poppins]">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar - Fixed on desktop, slide-in on mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:z-10`}
      >
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Student Portal</h2>
        </div>
        <nav>
          <ul className="space-y-4">
            {[
              {
                name: "dashboard",
                label: "Dashboard",
                icon: "📊",
                ref: dashboardRef,
              },
              { name: "resume", label: "Resume", icon: "📄", ref: resumeRef },
              {
                name: "qualifyTest",
                label: "Qualify Test",
                icon: "🎯",
                ref: qualifyTestRef,
              },
              {
                name: "jobBoard",
                label: "Job Board",
                icon: "💼",
                ref: jobBoardRef,
              },
              {
                name: "applications",
                label: "Applications",
                icon: "📝",
                ref: applicationsRef,
              },
              {
                name: "leaderboard",
                label: "Leaderboard",
                icon: "🏆",
                ref: leaderboardRef,
              },
              {
                name: "helpCenter",
                label: "Help Center",
                icon: "❓",
                ref: helpCenterRef,
              },
            ].map((item) => (
              <li key={item.name}>
                <button
                  onClick={() =>
                    scrollToSection(
                      item.ref as React.RefObject<HTMLElement>,
                      item.name
                    )
                  }
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f8fafd] transition-colors w-full text-left ${
                    activeSection === item.name
                      ? "bg-[#a8f68f] text-green-800"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content - Adjusted padding for mobile */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        {/* Section 1: Dashboard Hero Section */}
        <section
          ref={dashboardRef}
          className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-r from-[#f0f9ff] to-[#e6fffa]"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-white opacity-80"></div>
            <div className="absolute inset-0 opacity-30">
              {/* Modern geometric background pattern */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <pattern
                  id="dots"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <circle cx="2" cy="2" r="1" fill="#34d399" opacity="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8" data-aos="fade-up">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold tracking-wide">
                  Student Dashboard
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                  Showcase Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Talent
                  </span>{" "}
                  to Top Companies
                </h1>
                <p className="text-lg text-gray-700 max-w-lg">
                  Take the Qualify Test to demonstrate your skills and get
                  ranked on our leaderboard, making you visible to premium
                  employers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <>
                    <button
                      onClick={() => {
                        document
                          .getElementById("qualifyTestModal")
                          ?.classList.remove("hidden");
                      }}
                      className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center justify-center whitespace-nowrap"
                    >
                      <span>Give Test</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Modal */}
                    <div
                      id="qualifyTestModal"
                      className="fixed inset-0 z-50 hidden overflow-y-auto"
                    >
                      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
                        </div>
                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-emerald-100">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2"></div>
                          <div className="bg-white px-6 pt-6 pb-5">
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-4 flex items-center">
                                  <svg
                                    className="w-6 h-6 text-emerald-500 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Qualify Test Information
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600 mb-4">
                                    This is a comprehensive assessment
                                    consisting of 100 questions covering:
                                  </p>
                                  <ul className="space-y-2 text-sm text-gray-600 mb-5 bg-gray-50 p-4 rounded-lg">
                                    <li className="flex items-center">
                                      <svg
                                        className="w-4 h-4 text-emerald-500 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Logical Reasoning
                                    </li>
                                    <li className="flex items-center">
                                      <svg
                                        className="w-4 h-4 text-emerald-500 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Quantitative Aptitude
                                    </li>
                                    <li className="flex items-center">
                                      <svg
                                        className="w-4 h-4 text-emerald-500 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      General Programming
                                    </li>
                                    <li className="flex items-center">
                                      <svg
                                        className="w-4 h-4 text-emerald-500 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Computer Fundamentals
                                    </li>
                                    <li className="flex items-center">
                                      <svg
                                        className="w-4 h-4 text-emerald-500 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Problem Solving
                                    </li>
                                  </ul>
                                  <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                    The test helps employers identify your
                                    strengths and match you with suitable
                                    opportunities.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-col">
                            <button
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-base font-medium text-white hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm mb-4 transition-all duration-300 hover:shadow-lg"
                              onClick={() => {
                                document
                                  .getElementById("qualifyTestModal")
                                  ?.classList.add("hidden");
                              }}
                            >
                              Proceed to give test
                            </button>

                            <div className="mt-2">
                              <p className="text-sm text-gray-600 mb-3 text-center font-medium">
                                Rate this test
                              </p>
                              <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => {
                                      // Show toast notification
                                      const toast =
                                        document.createElement("div");
                                      toast.className =
                                        "fixed top-4 left-4 z-[9999] bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl transition-all duration-500 flex items-center";

                                      const checkIcon =
                                        document.createElement("span");
                                      checkIcon.innerHTML = `
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                      `;

                                      const textNode = document.createTextNode(
                                        "Thank you for your feedback!"
                                      );
                                      toast.appendChild(checkIcon);
                                      toast.appendChild(textNode);

                                      document.body.appendChild(toast);

                                      // Add entrance animation
                                      toast.style.transform =
                                        "translateY(-20px)";
                                      toast.style.opacity = "0";

                                      setTimeout(() => {
                                        toast.style.transform = "translateY(0)";
                                        toast.style.opacity = "1";
                                      }, 10);

                                      // Remove toast after 3 seconds
                                      setTimeout(() => {
                                        toast.style.transform =
                                          "translateY(-20px)";
                                        toast.style.opacity = "0";
                                        setTimeout(() => {
                                          document.body.removeChild(toast);
                                        }, 500);
                                      }, 3000);
                                    }}
                                    className="focus:outline-none transform transition-transform hover:scale-110"
                                  >
                                    <svg
                                      className="h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-colors"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transition-colors duration-300"
                              onClick={() => {
                                document
                                  .getElementById("qualifyTestModal")
                                  ?.classList.add("hidden");
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  <button
                    className="px-6 py-3 md:px-8 md:py-4 bg-white text-emerald-600 border border-emerald-200 font-medium rounded-xl shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center whitespace-nowrap"
                    onClick={() => {
                      // Create info modal
                      const infoModal = document.createElement("div");
                      infoModal.className =
                        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
                      infoModal.id = "learnMoreModal";

                      infoModal.innerHTML = `
                        <div class="bg-white rounded-xl p-6 max-w-md mx-4 relative">
                          <h3 class="text-xl font-bold text-gray-800 mb-4">Qualification Test Information</h3>
                          <p class="text-gray-600 mb-3">Our qualification test helps assess your skills and match you with appropriate job opportunities.</p>
                          <ul class="list-disc pl-5 mb-4 text-gray-600">
                            <li>30-minute assessment</li>
                            <li>Multiple choice and coding questions</li>
                            <li>Immediate results</li>
                            <li>Unlocks job application features</li>
                          </ul>
                          <button class="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                            Got it
                          </button>
                        </div>
                      `;

                      document.body.appendChild(infoModal);

                      // Add event listeners to close modal
                      const gotItBtn = infoModal.querySelector("button.w-full");

                      const closeModal = () => {
                        document.body.removeChild(infoModal);
                      };

                      gotItBtn?.addEventListener("click", closeModal);
                      infoModal.addEventListener("click", (e) => {
                        if (e.target === infoModal) closeModal();
                      });
                    }}
                  >
                    Learn More
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>4.9/5 Student Rating</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-emerald-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30 min Assessment</span>
                  </div>
                </div>
              </div>

              <div
                className="relative mt-8 lg:mt-0"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-1"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white mr-1"></span>
                    Live Tests
                  </div>
                  <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Student coding on laptop"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Your Qualification Journey
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                          1
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            Take the Test
                          </h4>
                          <p className="text-sm text-gray-600">
                            Complete coding challenges
                          </p>
                        </div>
                        <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center">
                          <svg
                            className="h-4 w-4 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                          2
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            Get Ranked
                          </h4>
                          <p className="text-sm text-gray-600">
                            Appear on the leaderboard
                          </p>
                        </div>
                        <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-3">
                          3
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            Get Hired
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receive job offers
                          </p>
                        </div>
                        <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Resume Overview */}
        <section
          ref={resumeRef}
          className="py-16 bg-gradient-to-r from-white to-[#f8fafd] min-h-screen flex items-center"
        >
          <div className="container mx-auto px-4 sm:px-8">
            <div
              className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border-l-4 border-green-500 transform transition-all hover:scale-[1.01]"
              data-aos="fade-up"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">📄</span>
                    Resume Overview
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
                      Computer Science
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                      React
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">
                      Node.js
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Resume Score
                      </span>
                      <div className="flex items-center mt-1">
                        <div className="w-32 sm:w-40 h-3 bg-gray-200 rounded-full mr-3">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          75%
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Status
                      </span>
                      <div className="text-base font-bold text-yellow-600 flex items-center mt-1">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                        In Progress
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-6 md:mt-0 bg-white border-2 border-[#2f8be6] text-[#2f8be6] hover:bg-[#2f8be6] hover:text-white px-6 py-3 rounded-lg transition-colors font-bold flex items-center whitespace-nowrap min-w-[160px] justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Resume
                </button>
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-700 flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <span className="font-bold">Pro Tip:</span> A high-quality
                    resume significantly increases your chances of being matched
                    with premium companies. Complete all sections for best
                    results.
                  </span>
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Education</h3>
                  <div className="h-2 bg-green-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Complete</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Experience</h3>
                  <div className="h-2 bg-yellow-200 rounded-full">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">In progress</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Skills</h3>
                  <div className="h-2 bg-red-200 rounded-full">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Needs attention</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Test Result + Leaderboard Snapshot */}
        <section
          ref={qualifyTestRef}
          className="py-12 sm:py-16 bg-gradient-to-b from-[#f8fafd] to-[#f0f7ff]"
        >
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700">
                Test Performance
              </span>
              <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            </h2>

            {testTaken ? (
              <div
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100 transform transition-all hover:shadow-xl"
                data-aos="fade-up"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                  <div className="bg-gradient-to-r from-[#a8f68f] to-[#5fb088] p-4 sm:p-6 md:p-8 rounded-xl text-white shadow-md transform transition-transform hover:scale-105">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center">
                      <span className="mr-2">🏅</span>
                      Your Score
                    </h3>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
                      87/100
                    </p>
                    <p className="text-xs sm:text-sm opacity-90 font-medium">
                      Excellent performance!
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                      <span className="mr-2">📊</span>
                      Percentile Rank
                    </h3>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      Top 5%
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Among all test takers
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                      <span className="mr-2">🏆</span>
                      Leaderboard Position
                    </h3>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">
                      #42
                    </p>
                    <Link
                      href="#"
                      className="text-[#2f8be6] hover:underline text-sm font-medium inline-flex items-center group"
                    >
                      See Full Leaderboard
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-xl text-center border border-blue-100 shadow-inner">
                  <p className="text-blue-700 font-medium text-sm sm:text-lg">
                    Your score puts you ahead of{" "}
                    <span className="font-bold">9,000+</span> students!
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100"
                data-aos="fade-up"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <span className="text-emerald-500 mr-2">✨</span>
                  Why take the Qualify Test?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                  <div className="border border-gray-200 p-4 sm:p-6 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                      🎯
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">
                      Get Discovered
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Companies actively recruit from our leaderboard
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 sm:p-6 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">
                      Know Your Standing
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      See how you compare to peers nationwide
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 sm:p-6 rounded-xl hover:border-purple-200 hover:bg-purple-50 transition-colors group">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                      💼
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">
                      Better Job Matches
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Get AI-matched to roles that fit your skills
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 text-center">
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center mx-auto whitespace-nowrap text-sm sm:text-base min-w-max">
                    <span>Schedule Your Test Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 4: AI-Recommended Jobs */}
        <section
          ref={jobBoardRef}
          className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-white to-[#f0f9ff] flex items-center"
        >
          <div className="container mx-auto px-4 sm:px-8">
            <div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              data-aos="fade-up"
            >
              <div className="p-4 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-[#f8fafd] to-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                      <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">
                        💼
                      </span>
                      AI-Recommended Jobs
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                      Personalized job matches based on your skills and
                      preferences
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full font-medium transition-colors flex items-center text-sm sm:text-base whitespace-nowrap"
                  >
                    View All Jobs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      title: "Frontend Developer",
                      company: "TechCorp Inc.",
                      match: 85,
                      location: "Remote / Bangalore",
                      stipend: "₹40,000 - ₹60,000",
                      isNew: true,
                    },
                    {
                      title: "React Developer",
                      company: "InnovateTech",
                      match: 92,
                      location: "Hybrid / Delhi",
                      stipend: "₹45,000 - ₹65,000",
                      isNew: true,
                    },
                    {
                      title: "Full Stack Engineer",
                      company: "GlobalSoft Solutions",
                      match: 78,
                      location: "Remote / Mumbai",
                      stipend: "₹50,000 - ₹70,000",
                      isNew: false,
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] group"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">
                              {job.company}
                            </p>
                          </div>
                          {job.isNew && (
                            <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                              New
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                          <div className="flex items-center">
                            <span className="text-gray-500 w-20 sm:w-24 text-xs sm:text-sm">
                              Skill Match:
                            </span>
                            <div className="flex items-center">
                              <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 rounded-full mr-2">
                                <div
                                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                  style={{ width: `${job.match}%` }}
                                ></div>
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-green-600">
                                {job.match}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-20 sm:w-24 text-xs sm:text-sm">
                              Location:
                            </span>
                            <span className="text-gray-700 text-xs sm:text-sm">
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 w-20 sm:w-24 text-xs sm:text-sm">
                              Stipend:
                            </span>
                            <span className="text-gray-700 font-medium text-xs sm:text-sm">
                              {job.stipend}
                            </span>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#a8f68f] to-[#8be573] hover:from-[#95e57c] hover:to-[#7ad064] text-gray-800 font-bold py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm hover:shadow text-xs sm:text-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-5 rounded-xl text-center border border-blue-100 shadow-inner">
                  <p className="text-blue-700 flex flex-wrap items-center justify-center text-xs sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-bold">Pro Tip:</span>&nbsp;Jobs are
                    matched using your resume, projects, and test score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Application Status Tracker */}
        <section
          ref={applicationsRef}
          className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-[#f8fafd] to-[#eef1f6] flex items-center"
        >
          <div className="container mx-auto px-4 sm:px-8">
            <div className="mb-6 sm:mb-10" data-aos="fade-up">
              <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2 sm:mb-3">
                Track Your Progress
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
                Application Status
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                Monitor your job applications and track your progress in
                real-time. We'll provide personalized recommendations to improve
                your chances.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-l-4 border-blue-500 transform transition-all hover:scale-[1.01]"
              data-aos="fade-up"
            >
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      Data Analyst Intern
                    </h3>
                    <div className="flex items-center mt-1">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="Company Logo"
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-2"
                      />
                      <p className="text-sm sm:text-base text-gray-600">
                        DataViz Solutions
                      </p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                    Under Review
                  </span>
                </div>

                <div className="relative mt-8 sm:mt-12 mb-8 sm:mb-12">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1.5 sm:h-2 bg-gray-200 rounded-full"></div>
                  <div className="relative flex justify-between">
                    {[
                      "Applied",
                      "Under Review",
                      "Shortlisted",
                      "Contacted",
                      "Hired",
                    ].map((step, index) => {
                      const isActive = index <= 1;
                      const isCompleted = index < 1;
                      return (
                        <div key={step} className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full z-10 flex items-center justify-center ${
                              isCompleted
                                ? "bg-green-500"
                                : isActive
                                  ? "bg-[#2f8be6]"
                                  : "bg-gray-200"
                            } transition-all duration-300 shadow-md`}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : isActive ? (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                            ) : null}
                          </div>
                          <span
                            className={`text-xs sm:text-sm mt-2 sm:mt-3 ${
                              isActive
                                ? "text-[#2f8be6] font-medium"
                                : isCompleted
                                  ? "text-green-600 font-medium"
                                  : "text-gray-500"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-10">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Application Timeline
                  </h4>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex">
                      <div className="w-20 sm:w-24 text-blue-700 font-medium">
                        Today
                      </div>
                      <div className="flex-1 text-blue-800">
                        Application under review
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-20 sm:w-24 text-blue-700 font-medium">
                        May 15
                      </div>
                      <div className="flex-1 text-blue-800">
                        Application submitted
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-20 sm:w-24 text-gray-500 font-medium">
                        Expected
                      </div>
                      <div className="flex-1 text-gray-600">
                        Response within 7 days
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl border border-yellow-100">
                  <h4 className="font-bold text-yellow-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Improve Your Chances
                  </h4>
                  <ul className="text-xs sm:text-sm text-yellow-700 space-y-1.5 sm:space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600 mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Complete your GitHub profile and link more projects
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600 mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add a portfolio website to your resume
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600 mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Take the Qualify Test to showcase your skills
                    </li>
                  </ul>
                  <button className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm">
                    Improve Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center" data-aos="fade-up">
              <button className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors inline-flex items-center whitespace-nowrap min-w-max">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Apply to More Jobs
              </button>
            </div>
          </div>
        </section>

        {/* Section 6: Project Showcase */}
        <section className="min-h-screen py-12 sm:py-16 bg-gradient-to-r from-[#f0f9ff] to-[#e6fffa] flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold tracking-wide mb-3">
                Showcase Your Work
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Project{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Showcase
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Highlight your best projects to impress recruiters and
                demonstrate your technical skills. Your portfolio is your
                professional story.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8"
              data-aos="fade-up"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <select className="w-full sm:w-auto border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option>All Projects</option>
                  <option>Web Development</option>
                  <option>Mobile Apps</option>
                  <option>Data Science</option>
                </select>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center sm:justify-start whitespace-nowrap">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((project) => (
                <div
                  key={project}
                  className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={project * 100}
                >
                  <div className="h-36 sm:h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    {project === 1 && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Recruiter Approved
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {project === 1
                        ? "E-Commerce Dashboard"
                        : project === 2
                          ? "Social Media App"
                          : "AI Chatbot Interface"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      {project === 1
                        ? "A responsive dashboard with analytics for online stores built with React and Chart.js"
                        : project === 2
                          ? "A full-stack social platform with real-time messaging using Socket.io"
                          : "An intelligent chatbot interface with natural language processing capabilities"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project === 1 ? (
                        <>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            React
                          </span>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            Chart.js
                          </span>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            Firebase
                          </span>
                        </>
                      ) : project === 2 ? (
                        <>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            Node.js
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                            MongoDB
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            Socket.io
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                            Python
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            TensorFlow
                          </span>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            NLP
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <Link
                        href="#"
                        className="text-[#2f8be6] hover:text-blue-700 text-xs sm:text-sm flex items-center transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </Link>
                      <Link
                        href="#"
                        className="text-[#2f8be6] hover:text-blue-700 text-xs sm:text-sm flex items-center transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        Live Demo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 text-center" data-aos="fade-up">
              <button className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-colors inline-flex items-center shadow-sm hover:shadow whitespace-nowrap min-w-max">
                View All Projects
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 7: Top Students Leaderboard Preview */}
        <section
          ref={leaderboardRef}
          className="py-12 sm:py-16 bg-gradient-to-r from-[#f0f9ff] to-[#e6fffa]"
        >
          <div className="container mx-auto px-4 sm:px-8">
            <div className="text-center mb-6 sm:mb-10" data-aos="fade-up">
              <div className="inline-block px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2 sm:mb-3">
                Top Performers
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
                Student{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                  Leaderboard
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                See how you rank among other talented students. Climb the
                leaderboard by improving your test scores and project quality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-4 w-full sm:w-auto">
                <select className="w-full xs:w-auto border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700">
                  <option>All Branches</option>
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                </select>
                <select className="w-full xs:w-auto border border-gray-200 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>All Time</option>
                </select>
              </div>
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors text-sm"
              >
                View Full Leaderboard
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
              data-aos="fade-up"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Branch
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        rank: 1,
                        name: "Priya Sharma",
                        branch: "Computer Science",
                        score: 98,
                      },
                      {
                        rank: 2,
                        name: "Rahul Verma",
                        branch: "Information Technology",
                        score: 96,
                      },
                      {
                        rank: 3,
                        name: "Ananya Patel",
                        branch: "Computer Science",
                        score: 95,
                      },
                      {
                        rank: 4,
                        name: "Vikram Singh",
                        branch: "Electronics",
                        score: 93,
                      },
                      {
                        rank: 5,
                        name: "Neha Gupta",
                        branch: "Computer Science",
                        score: 92,
                      },
                    ].map((student) => (
                      <tr
                        key={student.rank}
                        className={`transition-colors hover:bg-blue-50 ${student.rank === 3 ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                                student.rank === 1
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                  : student.rank === 2
                                    ? "bg-gray-100 text-gray-800 border border-gray-300"
                                    : student.rank === 3
                                      ? "bg-orange-100 text-orange-800 border border-orange-300"
                                      : "bg-gray-100 text-gray-600"
                              } text-xs sm:text-sm font-bold shadow-sm`}
                            >
                              {student.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 flex items-center justify-center text-blue-700 font-bold mr-2 sm:mr-3">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              {student.rank === 3 && (
                                <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-1.5 sm:px-2 py-0.5 rounded-full inline-block mt-0.5 sm:mt-1">
                                  You
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                          <div className="text-xs sm:text-sm text-gray-700">
                            {student.branch}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 sm:w-24 h-1.5 sm:h-2 bg-gray-200 rounded-full mr-2 sm:mr-3">
                              <div
                                className="h-full bg-gradient-to-r from-blue-400 to-teal-500 rounded-full"
                                style={{ width: `${student.score}%` }}
                              ></div>
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-gray-900">
                              {student.score}/100
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="mt-10 text-center" data-aos="fade-up">
              <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1 flex items-center mx-auto">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Take Your Test & Climb the Ranks
              </button>
            </div> */}
          </div>
        </section>

        {/* Section 8: Career Tips & Suggested Skills */}
        <section
          ref={helpCenterRef}
          className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div
              className="text-center mb-6 sm:mb-8 md:mb-10"
              data-aos="fade-up"
            >
              <div className="inline-block px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2 sm:mb-3">
                Career Growth
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
                Career Tips &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Suggested Skills
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Personalized recommendations to help you advance your career and
                stay ahead in the tech industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="col-span-1 md:col-span-2">
                <div
                  className="bg-white border border-gray-100 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
                  data-aos="fade-up"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <span className="text-emerald-500 mr-2">🚀</span>
                    AI-Suggested Learning Topics
                  </h3>

                  <div className="space-y-3 sm:space-y-4 md:space-y-5">
                    {[
                      {
                        skill: "React Advanced Patterns",
                        reason: "Based on your frontend projects",
                        icon: "⚛️",
                      },
                      {
                        skill: "Data Structures & Algorithms",
                        reason: "Highly requested in tech interviews",
                        icon: "🧮",
                      },
                      {
                        skill: "System Design Fundamentals",
                        reason: "To complement your development skills",
                        icon: "🏗️",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start p-3 sm:p-4 border border-gray-100 rounded-xl hover:bg-emerald-50 transition-colors duration-300 group"
                      >
                        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center text-lg sm:text-xl transition-colors duration-300">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-grow mb-3 sm:mb-0">
                          <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">
                            {item.skill}
                          </h4>
                          <p className="text-sm text-gray-600">{item.reason}</p>
                        </div>
                        <button className="w-full sm:w-auto flex-shrink-0 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Add to plan
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-white transform hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
                  <span className="mr-2">💫</span>
                  Weekly Career Inspiration
                </h3>
                <blockquote className="text-base sm:text-lg md:text-xl italic mb-4 sm:mb-6 leading-relaxed">
                  "The only way to do great work is to love what you do. If you
                  haven't found it yet, keep looking. Don't settle."
                </blockquote>
                <p className="text-right font-medium text-emerald-100 text-sm sm:text-base">
                  — Steve Jobs
                </p>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white border-opacity-20">
                  <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <span className="mr-2">💡</span>
                    Quick Tip
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-100">
                    Update your GitHub profile with a professional README to
                    stand out to recruiters scanning your code.
                  </p>
                  <button className="mt-3 sm:mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

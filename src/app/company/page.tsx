"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function CompanyDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobPostModalOpen, setJobPostModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Create refs for each section
  const dashboardRef = useRef<HTMLElement>(null);
  const jobPostsRef = useRef<HTMLElement>(null);
  const applicantsRef = useRef<HTMLElement>(null);
  const aiMatchesRef = useRef<HTMLElement>(null);
  const topStudentsRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<HTMLElement>(null);
  const analyticsRef = useRef<HTMLElement>(null);
  const suggestionsRef = useRef<HTMLElement>(null);

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
        { ref: jobPostsRef, name: "jobPosts" },
        { ref: applicantsRef, name: "applicants" },
        { ref: aiMatchesRef, name: "aiMatches" },
        { ref: topStudentsRef, name: "topStudents" },
        { ref: messagesRef, name: "messages" },
        { ref: analyticsRef, name: "analytics" },
        { ref: suggestionsRef, name: "suggestions" },
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>, name: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(name);
      setSidebarOpen(false);
    }
  };

  const toggleJobPostModal = () => {
    setJobPostModalOpen(!jobPostModalOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] to-[#eef1f6] font-[Poppins]">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Company Portal</h2>
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
          <h2 className="text-2xl font-bold text-gray-800">Company Portal</h2>
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
              {
                name: "jobPosts",
                label: "Job Posts",
                icon: "📄",
                ref: jobPostsRef,
              },
              {
                name: "applicants",
                label: "Applicants",
                icon: "👥",
                ref: applicantsRef,
              },
              {
                name: "aiMatches",
                label: "AI Matches",
                icon: "🔍",
                ref: aiMatchesRef,
              },
              {
                name: "topStudents",
                label: "Top Students",
                icon: "⭐",
                ref: topStudentsRef,
              },
              {
                name: "messages",
                label: "Messages",
                icon: "💬",
                ref: messagesRef,
              },
              {
                name: "analytics",
                label: "Analytics",
                icon: "📈",
                ref: analyticsRef,
              },
              {
                name: "suggestions",
                label: "Suggestions",
                icon: "💡",
                ref: suggestionsRef,
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8" data-aos="fade-up">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
                  Company Dashboard
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                  Smart Hiring{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Starts Here
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-lg">
                  Use CampusConnect to find the right talent instantly. Post
                  jobs, filter candidates, and connect in minutes.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    onClick={toggleJobPostModal}
                    className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center justify-center whitespace-nowrap text-sm sm:text-base"
                  >
                    <span>+ Post a Job</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
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
                  <button className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 bg-white text-emerald-600 border border-emerald-200 font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center whitespace-nowrap text-sm sm:text-base">
                    View Candidates
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>4.9/5 Employer Rating</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Hire in 48 hours</span>
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
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-emerald-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10 flex items-center">
                    <span className="animate-ping absolute inline-flex h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-white opacity-75 mr-1"></span>
                    <span className="relative inline-flex rounded-full h-1.5 sm:h-2 w-1.5 sm:w-2 bg-white mr-1"></span>
                    Live Dashboard
                  </div>
                  <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Company dashboard"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                      Companies Using Our Platform
                    </h3>
                    <div className="flex flex-wrap -mx-1 mb-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white">
                            <div className="w-full h-full bg-green-100 flex items-center justify-center text-emerald-600 font-bold text-xs sm:text-sm">
                              {String.fromCharCode(64 + i)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="p-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-emerald-600 font-bold text-xs sm:text-sm border-2 border-white">
                          +50
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Active Jobs
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          24
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-emerald-600 h-1.5 sm:h-2 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Applicants
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          142
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-teal-500 h-1.5 sm:h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Interviews
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          38
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-green-500 h-1.5 sm:h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2: Job Posts */}
        <section
          ref={jobPostsRef}
          className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f9fffe] to-[#f0f9ff]"
        >
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 text-center" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Manage Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Job Postings
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                Create, edit and track all your job postings in one place. Get
                real-time insights on applicant engagement.
              </p>
            </div>

            <div
              className="mb-6 sm:mb-8 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4"
              data-aos="fade-up"
            >
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "all"
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "active"
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("draft")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "draft"
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Drafts
                </button>
                <button
                  onClick={() => setActiveTab("closed")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === "closed"
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Closed
                </button>
              </div>
              <button
                onClick={() => setJobPostModalOpen(true)}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1 flex items-center whitespace-nowrap text-xs sm:text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Post New Job
              </button>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Job Card 1 */}
              {(activeTab === "all" || activeTab === "active") && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">
                          Software Engineer Intern
                        </h3>
                        <p className="text-emerald-600 font-medium text-xs sm:text-sm">
                          Engineering Department
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">
                          San Francisco, CA (Remote)
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">Full-time</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">
                          Posted 2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-800 mr-2">
                          32 applicants
                        </span>
                        <div className="flex -space-x-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                            +
                          </div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-emerald-600">
                        8 matches
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors whitespace-nowrap text-center">
                        Edit
                      </button>
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors whitespace-nowrap text-center">
                        View Applicants
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Job Card 2 */}
              {(activeTab === "all" || activeTab === "active") && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">
                          Marketing Coordinator
                        </h3>
                        <p className="text-emerald-600 font-medium text-xs sm:text-sm">
                          Marketing Department
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">New York, NY</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">Full-time</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">
                          Posted 1 week ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-800 mr-2">
                          18 applicants
                        </span>
                        <div className="flex -space-x-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                            +
                          </div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-emerald-600">
                        5 matches
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors whitespace-nowrap text-center">
                        Edit
                      </button>
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors whitespace-nowrap text-center">
                        View Applicants
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Job Card 3 */}
              {(activeTab === "all" || activeTab === "draft") && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">
                          Data Analyst
                        </h3>
                        <p className="text-emerald-600 font-medium text-xs sm:text-sm">
                          Business Intelligence
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                        Draft
                      </span>
                    </div>
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">
                          Chicago, IL (Hybrid)
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">Part-time</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm">
                          Not published yet
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-800 mr-2">
                          0 applicants
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-500">
                        Draft
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors whitespace-nowrap text-center">
                        Edit
                      </button>
                      <button className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors whitespace-nowrap text-center">
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 sm:mt-10 text-center" data-aos="fade-up">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center whitespace-nowrap justify-center w-auto min-w-max text-xs sm:text-sm">
                View All Job Postings
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
        {/* Section 3: Applicants */}
        <section
          ref={applicantsRef}
          className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f0f9ff] to-[#f9fffe]"
        >
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 text-center" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Review Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Applicants
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                Manage all your job applicants in one place. Filter, sort, and
                find the perfect candidates for your positions.
              </p>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8"
              data-aos="fade-up"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Recent Applicants
                  </h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search applicants..."
                        className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <select className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white">
                      <option>All Jobs</option>
                      <option>Software Engineer</option>
                      <option>Product Manager</option>
                      <option>UX Designer</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applicant
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Position
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Applied Date
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                            Match Score
                          </th>
                          <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Applicant 1 */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold flex-shrink-0 text-xs sm:text-sm">
                                JD
                              </div>
                              <div className="ml-2 sm:ml-4">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">
                                  John Doe
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                                  john.doe@example.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-xs sm:text-sm text-gray-900">
                              Software Engineer
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              Engineering
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-xs sm:text-sm text-gray-900">
                              May 12, 2023
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Interview
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                            <div className="flex items-center">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 mr-2">
                                92%
                              </span>
                              <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-1.5 sm:h-2">
                                <div
                                  className="bg-emerald-600 h-1.5 sm:h-2 rounded-full"
                                  style={{ width: "92%" }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                            <button className="text-emerald-600 hover:text-emerald-900 mr-2 sm:mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Message
                            </button>
                          </td>
                        </tr>

                        {/* Applicant 2 */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold flex-shrink-0 text-xs sm:text-sm">
                                AS
                              </div>
                              <div className="ml-2 sm:ml-4">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">
                                  Alice Smith
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                                  alice.smith@example.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-xs sm:text-sm text-gray-900">
                              UX Designer
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              Design
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-xs sm:text-sm text-gray-900">
                              May 10, 2023
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Review
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                            <div className="flex items-center">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 mr-2">
                                85%
                              </span>
                              <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-1.5 sm:h-2">
                                <div
                                  className="bg-emerald-600 h-1.5 sm:h-2 rounded-full"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                            <button className="text-emerald-600 hover:text-emerald-900 mr-2 sm:mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Message
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center whitespace-nowrap justify-center w-auto min-w-max text-xs sm:text-base">
                View All Applicants
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: AI Matches */}
        <section
          ref={aiMatchesRef}
          className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f9fffe] to-[#f0f9ff]"
        >
          <div className="container mx-auto">
            <div
              className="mb-6 sm:mb-8 md:mb-12 text-center"
              data-aos="fade-up"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                AI-Powered{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Candidate Matching
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                Our advanced AI algorithm finds the perfect candidates for your
                positions based on skills, experience, and cultural fit.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                  data-aos="fade-up"
                >
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Top AI Matches for Software Engineer
                    </h3>

                    <div className="space-y-4 sm:space-y-6">
                      {/* Match 1 */}
                      <div className="flex flex-col sm:flex-row border border-gray-100 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-base sm:text-xl">
                            RJ
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                Robert Johnson
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Full Stack Developer with 4 years experience
                              </p>
                            </div>
                            <div className="flex items-center bg-emerald-100 px-2 sm:px-3 py-1 rounded-full mt-1 sm:mt-0">
                              <span className="text-xs sm:text-sm font-semibold text-emerald-800">
                                98% Match
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                React
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                Node.js
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                TypeScript
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                AWS
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                MongoDB
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-2 sm:px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors">
                              Contact
                            </button>
                            <button className="px-2 sm:px-3 py-1 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Match 2 */}
                      <div className="flex flex-col sm:flex-row border border-gray-100 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-base sm:text-xl">
                            ML
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <div>
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                Maria Lopez
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Backend Developer with 3 years experience
                              </p>
                            </div>
                            <div className="flex items-center bg-emerald-100 px-2 sm:px-3 py-1 rounded-full mt-1 sm:mt-0">
                              <span className="text-xs sm:text-sm font-semibold text-emerald-800">
                                95% Match
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                Python
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                Django
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                PostgreSQL
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                Docker
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                CI/CD
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-2 sm:px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors">
                              Contact
                            </button>
                            <button className="px-2 sm:px-3 py-1 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Match Settings
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Job Position
                        </label>
                        <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-xs sm:text-sm">
                          <option>Software Engineer</option>
                          <option>Product Manager</option>
                          <option>UX Designer</option>
                          <option>Data Scientist</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Experience Level
                        </label>
                        <div className="flex space-x-1 sm:space-x-2">
                          <button className="px-2 sm:px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium">
                            Entry
                          </button>
                          <button className="px-2 sm:px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm font-medium">
                            Mid
                          </button>
                          <button className="px-2 sm:px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm font-medium">
                            Senior
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Skills Priority
                        </label>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">
                              Technical Skills
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-gray-800">
                              70%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div
                              className="bg-emerald-600 h-1.5 sm:h-2 rounded-full"
                              style={{ width: "70%" }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-gray-600">
                              Soft Skills
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-gray-800">
                              30%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div
                              className="bg-teal-500 h-1.5 sm:h-2 rounded-full"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Location Preference
                        </label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-xs sm:text-sm text-gray-700">
                            Remote Only
                          </label>
                        </div>
                        <div className="flex items-center mt-1 sm:mt-2">
                          <input
                            type="checkbox"
                            className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-xs sm:text-sm text-gray-700">
                            Include Hybrid
                          </label>
                        </div>
                      </div>

                      <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        Update Matches
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center whitespace-nowrap justify-center w-auto min-w-max text-xs sm:text-sm">
                View All AI Matches
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
        {/* Section 5: Top Students */}
        <section
          ref={topStudentsRef}
          className="py-8 sm:py-12 md:py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-8 sm:mb-10 md:mb-12"
              data-aos="fade-up"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Top Students
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with exceptional talent ready to make an impact at your
                company
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Student Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-emerald-600 font-bold text-sm sm:text-base">
                        JS
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">
                        Jane Smith
                      </h3>
                      <p className="text-emerald-600 text-xs sm:text-sm">
                        Computer Science • 3.8 GPA
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Stanford University • Class of 2023
                    </p>
                    <p className="text-gray-700 mt-1 sm:mt-2 text-xs sm:text-sm">
                      Full-stack developer with experience in React, Node.js,
                      and cloud infrastructure.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      React
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Node.js
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      AWS
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      TypeScript
                    </span>
                  </div>
                  <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Student Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-emerald-600 font-bold text-sm sm:text-base">
                        MJ
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">
                        Michael Johnson
                      </h3>
                      <p className="text-emerald-600 text-xs sm:text-sm">
                        Data Science • 3.9 GPA
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      MIT • Class of 2023
                    </p>
                    <p className="text-gray-700 mt-1 sm:mt-2 text-xs sm:text-sm">
                      Data scientist with strong background in machine learning
                      and statistical analysis.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Python
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      TensorFlow
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      SQL
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      R
                    </span>
                  </div>
                  <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Student Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-emerald-600 font-bold text-sm sm:text-base">
                        AL
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">
                        Aisha Lee
                      </h3>
                      <p className="text-emerald-600 text-xs sm:text-sm">
                        Software Engineering • 4.0 GPA
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      UC Berkeley • Class of 2024
                    </p>
                    <p className="text-gray-700 mt-1 sm:mt-2 text-xs sm:text-sm">
                      Software engineer specializing in mobile development and
                      UI/UX design.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Swift
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Kotlin
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Figma
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      Firebase
                    </span>
                  </div>
                  <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            <div
              className="text-center mt-6 sm:mt-8 md:mt-10"
              data-aos="fade-up"
            >
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors inline-flex items-center justify-center w-auto min-w-max text-xs sm:text-sm">
                Browse All Students
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 6: Messages */}
        <section ref={messagesRef} className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-8 sm:mb-10 md:mb-12"
              data-aos="fade-up"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Messages
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Stay connected with your candidates and manage conversations
                efficiently
              </p>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
              data-aos="fade-up"
            >
              <div className="flex flex-col md:flex-row">
                {/* Message List */}
                <div className="w-full md:w-1/3 border-r border-gray-200">
                  <div className="p-3 sm:p-4 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <svg
                        className="absolute left-2 sm:left-3 top-1.5 sm:top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Message Threads */}
                  <div className="overflow-y-auto h-64 sm:h-80 md:h-96">
                    <div className="p-2 sm:p-3 border-b border-gray-200 bg-emerald-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-emerald-600 font-bold text-xs sm:text-sm">
                            JS
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Jane Smith
                            </h4>
                            <span className="text-xs text-gray-500">
                              2m ago
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            Thank you for the opportunity to interview...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-emerald-600 font-bold text-xs sm:text-sm">
                            MJ
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Michael Johnson
                            </h4>
                            <span className="text-xs text-gray-500">
                              1d ago
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            I'm excited to learn more about the data science
                            position...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-emerald-600 font-bold text-xs sm:text-sm">
                            AL
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              Aisha Lee
                            </h4>
                            <span className="text-xs text-gray-500">
                              3d ago
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            Following up on our conversation about the mobile
                            dev role...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="w-full md:w-2/3 flex flex-col">
                  <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-2 sm:mr-3">
                      <span className="text-emerald-600 font-bold text-xs sm:text-sm">
                        JS
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm sm:text-base text-gray-900">
                        Jane Smith
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Stanford University • Computer Science
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-3 sm:p-4 overflow-y-auto h-56 sm:h-64 md:h-72">
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-emerald-100 text-gray-800 p-2 sm:p-3 rounded-lg max-w-xs">
                          <p className="text-xs sm:text-sm">
                            Hi Jane, thanks for your application. Would you be
                            available for an interview next week?
                          </p>
                          <span className="text-xs text-gray-500 block mt-1 text-right">
                            2:34 PM
                          </span>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="bg-gray-100 text-gray-800 p-2 sm:p-3 rounded-lg max-w-xs">
                          <p className="text-xs sm:text-sm">
                            Thank you for the opportunity to interview! Yes, I'm
                            available next week. Monday or Wednesday would work
                            best for me.
                          </p>
                          <span className="text-xs text-gray-500 block mt-1">
                            2:36 PM
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-emerald-100 text-gray-800 p-2 sm:p-3 rounded-lg max-w-xs">
                          <p className="text-xs sm:text-sm">
                            Great! Let's schedule for Wednesday at 2 PM EST.
                            I'll send a calendar invite with the meeting
                            details.
                          </p>
                          <span className="text-xs text-gray-500 block mt-1 text-right">
                            2:38 PM
                          </span>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="bg-gray-100 text-gray-800 p-2 sm:p-3 rounded-lg max-w-xs">
                          <p className="text-xs sm:text-sm">
                            Perfect! I've marked my calendar and look forward to
                            speaking with you on Wednesday.
                          </p>
                          <span className="text-xs text-gray-500 block mt-1">
                            2:40 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-3 sm:p-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <button className="ml-2 p-1.5 sm:p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 7: Analytics */}
        <section ref={analyticsRef} className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                Analytics Dashboard
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Track your recruitment performance and optimize your hiring
                strategy
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10"
              data-aos="fade-up"
            >
              {/* Stat Card 1 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base text-gray-700 font-medium">
                    Total Applications
                  </h3>
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                    247
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-emerald-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    12.5%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  vs. previous month
                </p>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base text-gray-700 font-medium">
                    Interviews Scheduled
                  </h3>
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                    42
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-emerald-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    8.3%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  vs. previous month
                </p>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base text-gray-700 font-medium">
                    Offer Acceptance Rate
                  </h3>
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                    78%
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-emerald-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    5.2%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  vs. previous month
                </p>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base text-gray-700 font-medium">
                    Time to Hire
                  </h3>
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                    18
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-gray-600 ml-1">
                    days
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-emerald-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2.3
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  vs. previous month
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Chart 1: Applications by Department */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Applications by Department
                </h3>
                <div className="h-48 sm:h-64 flex items-end justify-between px-2">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 sm:w-12 bg-emerald-500 rounded-t-lg"
                      style={{ height: "65%" }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">
                      Engineering
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 sm:w-12 bg-emerald-400 rounded-t-lg"
                      style={{ height: "45%" }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">Design</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 sm:w-12 bg-emerald-300 rounded-t-lg"
                      style={{ height: "80%" }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">
                      Marketing
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 sm:w-12 bg-emerald-200 rounded-t-lg"
                      style={{ height: "35%" }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">Sales</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 sm:w-12 bg-emerald-100 rounded-t-lg"
                      style={{ height: "55%" }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">Finance</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Hiring Funnel */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Hiring Funnel
                </h3>
                <div className="h-48 sm:h-64 flex flex-col justify-center space-y-3 sm:space-y-4">
                  <div className="relative">
                    <div className="h-6 sm:h-8 bg-emerald-500 rounded-lg w-full"></div>
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs sm:text-sm font-medium truncate w-3/4">
                      Applications (247)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-6 sm:h-8 bg-emerald-400 rounded-lg w-4/5"></div>
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs sm:text-sm font-medium truncate w-3/4">
                      Resume Screened (198)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-6 sm:h-8 bg-emerald-300 rounded-lg w-3/5"></div>
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs sm:text-sm font-medium truncate w-3/4">
                      Phone Interviews (148)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-6 sm:h-8 bg-emerald-200 rounded-lg w-2/5"></div>
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-xs sm:text-sm font-medium truncate w-3/4">
                      Technical Interviews (99)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-6 sm:h-8 bg-emerald-100 rounded-lg w-1/5"></div>
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-xs sm:text-sm font-medium truncate w-3/4">
                      Offers Extended (49)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-10" data-aos="fade-up">
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-sm sm:text-base font-medium hover:bg-emerald-50 transition-colors inline-flex items-center justify-center w-auto">
                View Detailed Reports
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section 8: Suggestions */}
        <section
          ref={suggestionsRef}
          className="py-8 sm:py-12 md:py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-8 sm:mb-10 md:mb-12"
              data-aos="fade-up"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Suggestions & Insights
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                AI-powered recommendations to improve your recruitment process
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12"
              data-aos="fade-up"
            >
              {/* Suggestion Card 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg mr-3 sm:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      Optimize Job Descriptions
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    Your job descriptions for engineering roles could be more
                    inclusive. Consider removing gender-coded language and
                    focusing more on growth potential rather than just
                    requirements.
                  </p>
                  <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-emerald-700 mb-1 sm:mb-2">
                      Impact Potential:
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Companies that use inclusive language see a 30% increase
                      in qualified diverse candidates.
                    </p>
                  </div>
                  <button className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors">
                    View Detailed Suggestions
                  </button>
                </div>
              </div>

              {/* Suggestion Card 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg mr-3 sm:mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      Reduce Time-to-Hire
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    Your technical interview stage is taking 2.5 days longer
                    than industry average. Consider implementing a structured
                    interview process with predefined evaluation criteria.
                  </p>
                  <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-emerald-700 mb-1 sm:mb-2">
                      Impact Potential:
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Reducing time-to-hire by just 3 days could help you secure
                      top candidates before competitors.
                    </p>
                  </div>
                  <button className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-colors">
                    View Detailed Suggestions
                  </button>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg mr-3 sm:mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Talent Market Insights
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Based on your hiring goals and current market conditions, here
                  are key insights to inform your recruitment strategy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-emerald-700 mb-1 sm:mb-2">
                      Salary Trends
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Software engineering salaries in your region have
                      increased by 8% in the last quarter, with senior roles
                      seeing the highest growth.
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-emerald-700 mb-1 sm:mb-2">
                      Skill Demand
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Candidates with AI/ML experience are in high demand, with
                      3x more companies competing for this talent compared to
                      last year.
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-emerald-700 mb-1 sm:mb-2">
                      Candidate Preferences
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Remote work flexibility and professional development
                      opportunities are the top factors candidates consider
                      beyond compensation.
                    </p>
                  </div>
                </div>
                <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  Get Customized Recruitment Strategy
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import Orb from "@/blocks/Backgrounds/Orb/Orb";
import AOS from "aos";
import "aos/dist/aos.css";
import Button1 from "../Button1";
import Button2 from "../Button2";
import { useEffect } from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import Image from "next/image";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import { signIn } from "next-auth/react";

export default function HeroSection() {
  useEffect(() => {
    // data-aos="fade-up" data-aos-delay="100"
    AOS.init({
      duration: 1000,
      // easing: "ease-in-out",
      once: true,
      mirror: true,
      easing: "ease-in-out",
    });
  }, []);

  const teamMembers = [
    {
      name: "James Samerton",
      role: "Mobile Developer",
      image: "/avatar2-half.png",
      color2: "#5fb088",
      color1: "#a8f68f",
      height: "100%",
      direction: "fade-right",
    },
    {
      name: "Queen Raturly",
      role: "Digital Marketing",
      image: "/avatar1-half.png",
      color2: "#4d9566",
      color1: "#5fb088",
      height: "90%",
      direction: "fade-right",
    },
    {
      name: "Wanderson James",
      role: "Product Designer",
      image: "/avatar3-half.png",
      color2: "#4d9566",
      color1: "#5fb088",
      height: "90%",
      direction: "fade-left",
    },
    {
      name: "Sabrina Uliyana",
      role: "UI/UX Designer",
      image: "/avatar4-half.png",
      color2: "#5fb088",
      color1: "#a8f68f",
      height: "100%",
      direction: "fade-left",
    },
  ];

  const comWork = [
    "Login with your details",
    "Set Role and salary offerings",
    "Filter students by location",
    "View qualified candidates",
  ];

  const studWork = [
    "Login with your details",
    "Complete Qualifocation test",
    "Create your resume board",
    "Get noticed by companies",
  ];
  return (
    <>
      <section className="m-s1 relative flex justify-center items-end w-screen h-screen bg-cover bg-center pb-24  overflow-hidden rounded-br-3xl rounded-bl-3xl">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/cc2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navigation Bar */}
        <nav
          className="absolute z-10 top-0 w-full h-16 sm:h-20 flex justify-between items-center px-4 sm:px-7"
          data-aos="fade-down"
          data-aos-delay="2000"
          data-aos-mirror="false"
        >
          <div
            className="h-9 sm:h-11 w-36 sm:w-48 bg-contain bg-no-repeat"
            style={{ backgroundImage: `url("/Campus_connect_white.svg")` }}
          ></div>
          <Button1>Join Us</Button1>
        </nav>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content Box */}
        <div className="relative z-10 text-center h-1/2 flex flex-col justify-center items-center gap-10 sm:gap-20 px-4">
          <div>
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold font-playflair drop-shadow-lg pr-2">
              <BlurText
                text="Find Your Dream Job | Hire the Best Talent"
                delay={100}
                animateBy="words"
                direction="top"
              />
            </h1>
            <p
              data-aos="zoom-in"
              data-aos-delay="1500"
              data-aos-mirror="false"
              className="text-white text-lg sm:text-2xl mt-3 sm:mt-4 opacity-90 font-light font-poppins tracking-wide sm:tracking-widest"
            >
              Connecting students with top companies through smart matchmaking.
            </p>
          </div>

          {/* Buttons & Stats */}
          <div
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-mirror="false"
            className="flex justify-center items-center flex-col gap-10 sm:gap-16"
          >
            <Button2>Get Started</Button2>

            <h2 className="text-white text-lg sm:text-2xl opacity-90 font-bold">
              <span className="mr-2.5">
                <span className="text-[#a8f68f]">
                  <CountUp
                    from={997}
                    to={1000}
                    separator=","
                    duration={1}
                    delay={3}
                  />
                  +
                </span>
                Students Registered
              </span>
              <span> | </span>
              <span className="ml-2.5">
                <span className="text-[#a8f68f]">
                  <CountUp
                    from={497}
                    to={500}
                    separator=","
                    duration={1}
                    delay={3}
                  />
                  +
                </span>
                Companies Hiring
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section className="m-s3 min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
        {/* Heading Section */}
        <div className="w-full flex flex-col justify-center items-center text-center mb-10">
          <h2
            className="text-4xl sm:text-6xl font-semibold font-playflair text-gray-900 mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-mirror="false"
          >
            How It Works
          </h2>
          <p
            className="text-gray-600 max-w-3xl text-lg sm:text-2xl px-4"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-mirror="false"
          >
            Our platform simplifies the connection between qualified students
            and companies looking for fresh talent.
          </p>
        </div>

        {/* Cards Container */}
        <div className="w-full flex flex-col md:flex-row justify-around items-center">
          {/* Companies Section */}
          <div
            className="w-full md:w-[40%] bg-[#a9f68f11] border-2 border-[#81c06c] rounded-2xl p-6 md:pt-8 md:mt-0 text-center mb-5"
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-mirror="false"
          >
            <h1 className="text-3xl sm:text-5xl font-mono text-[#4c813a] font-semibold">
              Companies
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mt-4">
              Find qualified students based on location, skills and test scores.
              Connect directly with the talent you want to hire.
            </p>
            {comWork.map((work, id) => (
              <p
                key={id}
                className="relative before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-7 before:h-7 before:bg-[url('/g-tick.png')] before:bg-contain before:bg-no-repeat text-lg sm:text-xl ml-12 sm:ml-15 mt-5 mb-2"
              >
                {work}
              </p>
            ))}
          </div>

          {/* Students Section */}
          <div
            className="w-full md:w-[40%] bg-[#a9f68f11] border-2 border-[#81c06c] rounded-2xl p-6 md:pt-8 md:mt-0 text-center"
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-mirror="false"
          >
            <h1 className="text-3xl sm:text-5xl font-mono text-[#4c813a] font-semibold">
              Students
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mt-4">
              Log in, take our qualification test, and showcase your skills on
              your resume board. Get noticed by companies looking for talent
              like you.
            </p>
            {studWork.map((work, id) => (
              <p
                key={id}
                className="relative before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-7  before:h-7 before:bg-[url('/g-tick.png')] before:bg-contain before:bg-no-repeat text-lg sm:text-xl ml-12 sm:ml-15 mt-5 mb-2"
              >
                {work}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-5 min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8">
        <div
          className="flex flex-col items-center justify-center text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playflair text-gray-900 mb-2 mt-10">
            Find the best candidates for your company
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl text-base sm:text-lg md:text-xl">
            Say Goodbye to Long Hiring Processes – Connect with the Best Talent
            Instantly
          </p>
          <button
            className="bg-[#a8f68f] text-black w-40 sm:w-50 h-12 px-6 py-2 rounded-lg font-semibold hover:bg-[#a8f68fa1] transition text-lg"
            onClick={() => signIn()}
          >
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl px-4 sm:px-0 mt-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group rounded-xl flex flex-col items-center justify-between gap-1 text-center shadow-lg overflow-hidden pt-6 min-h-[300px] sm:min-h-[350px]"
              style={{
                background: `linear-gradient(to bottom, ${member.color1}, ${member.color2})`,
              }}
              data-aos={`${member.direction}`}
              data-aos-delay="500"
            >
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-950">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-800">
                  {member.role}
                </p>
              </div>
              <Image
                src={member.image}
                alt={member.name}
                className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                width={180}
                height={180}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="m-s2 px-4 sm:px-6 lg:px-8">
        <TextReveal className="text-left">
          Meet all-in-one platform to Connect
        </TextReveal>
      </section>

      <section
        className="min-h-screen bg-transparent flex"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-mirror="false"
      >
        <div className="m-auto w-11/12 h-5/6 bg-[#a9f68f11] border-2 border-[#81c06c] rounded-2xl flex flex-col lg:flex-row overflow-hidden pt-5">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start gap-5 p-6 lg:pl-12">
            <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 text-center lg:text-left">
              Find the best job <br /> you deserve.
            </h1>
            <h2 className="text-center lg:text-left text-sm sm:text-base text-gray-600">
              Getting a new job is never easy. Check which companies{" "}
              <br className="hidden lg:block" />
              seeking for top talents.
            </h2>
            <div className="w-full h-16 bg-white flex sm:flex-row items-center border-2 rounded-lg p-2 gap-2 sm:gap-0">
              <div className="flex items-center gap-1 flex-1">
                <Image
                  src="/glass.png"
                  alt="Glass"
                  className="object-contain w-6 h-6"
                  width={200}
                  height={200}
                />
                <p className="text-sm text-gray-600">Job Title or keyword</p>
              </div>
              <div className="flex items-center gap-1 flex-1">
                <Image
                  src="/location.png"
                  alt="Location"
                  className="object-contain w-6 h-6"
                  width={200}
                  height={200}
                />
                <p className="text-sm text-gray-600">Location</p>
              </div>
              <button className="text-[#2a2a2ad6] px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-colors">
                Search
              </button>
            </div>
            <div className="flex mt-8 lg:mt-12 lg:-ml-12 self-center gap-10">
              <div className="w-20 sm:w-24 h-20 flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-gray-500">Jobs</p>
                <h1 className="font-sans text-gray-800">+300k</h1>
              </div>
              <div className="border-l-2 border-r-2 w-20 sm:w-24 h-20 flex flex-col justify-center items-center px-20">
                <p className="text-lg font-semibold text-gray-500">Startups</p>
                <h1 className="font-sans text-gray-800">+40k</h1>
              </div>
              <div className="w-20 sm:w-24 h-20 flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-gray-500">Talent</p>
                <h1 className="font-sans text-gray-800">+640k</h1>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="sm:w-1/2 sm:h-1/2 sm:self-center w-full lg:w-1/2 h-full flex justify-center items-center p-4 lg:p-0">
            <Image
              src="/ban1.png"
              alt="Banner"
              className="object-contain w-full h-full lg:w-[95%] lg:h-[95%]"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      <section className="h-screen bg-gray-50 flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 rounded-tr-3xl rounded-tl-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold">
          Ready to Find your <br /> Perfect Match?
        </h1>
        <p className="text-gray-600 text-center max-w-3xl text-lg sm:text-xl lg:text-2xl px-4">
          Whether you're a student looking for opportunities or a company
          seeking fresh talent, TalentBridge helps you make the right
          connections.
        </p>
        <button
          className="bg-[#a8f68f] text-black w-48 h-12 rounded-lg font-semibold hover:bg-[#a8f68fa1] transition text-lg"
          onClick={() => signIn()}
        >
          Get Started Today
        </button>
      </section>
    </>
  );
}

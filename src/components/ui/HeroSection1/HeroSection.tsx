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
      <section
        className="m-s1 relative flex justify-center items-end h-screen bg-cover bg-center pb-24 w-screen overflow-hidden rounded-br-3xl rounded-bl-3xl"
        // style={{ backgroundImage: `url("/cImage2.jpeg")` }}
      >
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
        <nav
          className="absolute z-10 top-0 w-screen h-20 flex justify-between items-center px-7"
          data-aos="fade-down"
          data-aos-delay="2000"
          data-aos-mirror="false"
        >
          {/* <Image src="/CC.png" width={100} height={10} alt="Logo" /> */}
          <div
            className="h-9 min-w-44"
            style={{
              backgroundImage: `url("/Campus_connect_white.svg")`,
              backgroundSize: "100% 100%",
            }}
          ></div>
          <Button1>Join Us</Button1>
        </nav>
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black  bg-opacity-30"></div>

        {/* Content Box */}
        <div className="relative z-10 text-center h-1/2 flex flex-col justify-center items-center gap-20">
          <div>
            <h1 className="">
              {/* <span ref={el}></span> */}
              <BlurText
                text="Find Your Dream Job | Hire the Best Talent"
                delay={100}
                animateBy="words"
                direction="top"
                // onAnimationComplete={handleAnimationComplete}
                className="text-white text-6xl font-bold font-playflair drop-shadow-lg pr-2"
              />
            </h1>
            <p
              data-aos="zoom-in"
              data-aos-delay="1500"
              data-aos-mirror="false"
              className="text-white text-2xl mt-4 opacity-90 font-light font-poppins tracking-widest"
            >
              Connecting students with top companies through smart matchmaking.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-mirror="false"
            className="flex justify-center items-center flex-col gap-16"
          >
            <Button2>Get Started</Button2>

            <h2 className="text-white text-2xl opacity-90 font-bold mr-8">
              <span className="mr-2.5">
                <span className="text-[#a8f68f]">
                  <CountUp
                    from={997}
                    to={1000}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={3}
                  />
                  +{" "}
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
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={3}
                  />
                  +{" "}
                </span>
                Companies Hiring
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <div
          className="flex flex-col items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-5xl font-bold font-playflair text-center text-gray-900 mb-2 mt-10">
            Find the best candidates for your company
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl text-xl">
            Say Goodbye to Long Hiring Processes – Connect with the Best Talent
            Instantly
          </p>
          <button className="bg-[#a8f68f] text-black w-50 h-12 px-6 py-2 rounded-lg font-semibold hover:bg-[#a8f68fa1] transition text-lg">
            Get Started
          </button>
        </div>

        <div className=" grid items-end grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group  rounded-xl flex flex-col items-center justify-between gap-1 text-center shadow-lg overflow-hidden pt-6"
              style={{
                background: `linear-gradient(to bottom, ${member.color1}, ${member.color2})`,
                height: `${member.height}`,
              }}
              data-aos={`${member.direction}`}
              data-aos-delay="500"
            >
              <div className="">
                <h3 className="text-lg font-semibold text-gray-950">
                  {member.name}
                </h3>
                <p className="text-gray-800">{member.role}</p>
              </div>
              <Image
                src={member.image}
                alt={member.name}
                className=" object-cover rounded-lg group-hover:scale-125 transition-transform"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        className="h-screen bg-gray-50 flex"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-mirror="false"
      >
        <div className=" m-auto w-11/12 h-5/6 bg-[#a9f68f11] border-2 border-[#81c06c] rounded-2xl flex overflow-hidden">
          <div className="w-1/2 h-full flex flex-col justify-center items-left gap-5 pl-12">
            <h1 className="font-poppins text-5xl font-semibold text-gray-800">
              Find the best job <br /> you deserve.
            </h1>
            <h2 className="text-left">
              Getting a new job is never easy. Check which companies <br />
              seeking for top talents.
            </h2>
            <div className="w-full h-16 bg-white flex items-center border-2 rounded-lg  p-2">
              <div className="flex items-center gap-1">
                <Image
                  src="/glass.png"
                  alt="Glass"
                  className="object-conatin w-[12%] h-[75%]"
                  width={200}
                  height={200}
                />
                <p className="text-sm text-gray-600">Job Title or keyword</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/location.png"
                  alt="Location"
                  className="object-conatin w-[12%] h-[75%]"
                  width={200}
                  height={200}
                />
                <p className="text-sm text-gray-600">Job Title or keyword</p>
              </div>
              <button className="text-[#2a2a2ad6]">Search</button>
            </div>
            <div className="flex mt-12 -ml-12">
              <div className="w-10 h-20 flex flex-col justify-center items-center  flex-grow">
                <p className="text-lg font-semibold text-gray-500">Jobs</p>
                <h1 className="font-sans text-gray-800">+300k</h1>
              </div>
              <div className="border-l-2 border-r-2 w-10 h-20 flex flex-col justify-center items-center  flex-grow">
                <p className="text-lg font-semibold text-gray-500">Startups</p>
                <h1 className="font-sans text-gray-800">+40k</h1>
              </div>
              <div className="w-10 h-20 flex flex-col justify-center items-center  flex-grow">
                <p className="text-lg font-semibold text-gray-500">Talent</p>
                <h1 className="font-sans text-gray-800">+640k</h1>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex pt-5">
            <Image
              src="/ban1.png"
              alt="Banner"
              className="m-auto object-conatin w-[95%] h-[95%]"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      <section className="m-s2">
        <TextReveal className="text-left">
          Meet all-in-one platform to Connect
        </TextReveal>
      </section>

      <section className="m-s3 h-screen bg-gray-50">
        <div className="bg-lime-0 h-[30%] flex flex-col justify-center items-center gap-2">
          <h2
            className="text-6xl font-semibold font-poppins text-center text-gray-900 mb-2 mt-14"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-mirror="false"
          >
            How It Works
          </h2>
          <p
            className="text-gray-600 text-center mb-10 max-w-3xl text-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-mirror="false"
          >
            Our platform simplifies the connection between qualified students
            and companies looking for fresh talent.
          </p>
        </div>
        <div className="h-[70%] flex justify-center items-center gap-32">
          <div
            className="h-[100%] w-[40%] flex flex-col border-2 border-[#81c06c] bg-[#a9f68f11] rounded-2xl pt-8 mt-10"
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-mirror="false"
          >
            <h1 className="text-5xl font-mono text-[#4c813a] self-center bg-gray-50  font-semibold">
              Companies
            </h1>
            <p className="text-gray-600 text-center text-xl mx-14 mt-5">
              Find qualified students based on location, skills and test scores.
              Connect directly with the talent you want to hire.
            </p>
            {comWork.map((work, id) => {
              return (
                <p
                  key={id}
                  className="relative before:absolute before:-left-9 before:top-1/2 before:-translate-y-1/2 before:w-7 before:h-7 before:bg-[url('/g-tick.png')] before:bg-contain before:bg-no-repeat text-xl ml-36 mt-5 mb-2"
                >
                  {work}
                </p>
              );
            })}
          </div>
          <div
            className="h-[100%] w-[40%] flex flex-col border-2 border-[#81c06c] bg-[#a9f68f11] rounded-2xl pt-8 mt-10"
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-mirror="false"
          >
            <h1 className="text-5xl text-[#4c813a] font-mono self-center bg-gray-50 font-semibold">
              Students
            </h1>
            <p className="text-gray-600 text-center text-xl mx-10 mt-5">
              Log in, take our qualification test, and showcase your skills on
              your resume board. Get noticed by companies looking for talent
              like you.
            </p>
            {studWork.map((work, id) => {
              return (
                <p
                  key={id}
                  className="relative before:absolute before:-left-9 before:top-1/2 before:-translate-y-1/2 before:w-7 before:h-7 before:bg-[url('/g-tick.png')] before:bg-contain before:bg-no-repeat text-xl ml-36 mt-5 mb-2"
                >
                  {work}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <section className="h-screen bg-gray-50 flex flex-col justify-center items-center gap-10">
        <h1 className="text-6xl text-center font-bold">
          Ready to Find your <br /> Perfect Match?
        </h1>
        <p className="text-gray-600 text-center max-w-3xl text-2xl">
          Whether you're a student looking for opportunities or a company
          seeking fresh talent, TalentBridge helps you make the right
          connections.
        </p>
        <button className="bg-[#a8f68f] text-black w-48 h-12 rounded-lg font-semibold hover:bg-[#a8f68fa1] transition text-lg">
          Get Started Today
        </button>
      </section>
    </>
  );
}

import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import AOS from "aos";
import "aos/dist/aos.css";
import Button1 from "../Button1";
import Button2 from "../Button2";
import { useEffect } from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import Image from "next/image";

export default function HeroSection() {
  useEffect(() => {
    // data-aos="fade-up" data-aos-delay="100"
    AOS.init({
      duration: 1000,
      // easing: "ease-in-out",
      once: false,
      mirror: false,
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
    },
    {
      name: "Queen Raturly",
      role: "Digital Marketing",
      image: "/avatar1-half.png",
      color2: "#4d9566",
      color1: "#5fb088",
      height: "90%",
    },
    {
      name: "Wanderson James",
      role: "Product Designer",
      image: "/avatar3-half.png",
      color2: "#4d9566",
      color1: "#5fb088",
      height: "90%",
    },
    {
      name: "Sabrina Uliyana",
      role: "UI/UX Designer",
      image: "/avatar4-half.png",
      color2: "#5fb088",
      color1: "#a8f68f",
      height: "100%",
    },
  ];
  return (
    <>
      <section
        className="m-s1 relative flex justify-center items-end h-screen bg-cover bg-center pb-24 w-screen"
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
          data-aos-delay="3000"
        >
          {/* <Image src="/CC.png" width={100} height={10} alt="Logo" /> */}
          <div
            className="h-9 min-w-44 "
            style={{
              backgroundImage: `url("/CC.png")`,
              backgroundSize: "100% 100%",
            }}
          ></div>
          <Button1>Join Us</Button1>
        </nav>
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

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
              data-aos-delay="2000"
              className="text-white text-2xl mt-4 opacity-90 font-light font-poppins tracking-widest"
            >
              Connecting students with top companies through smart matchmaking.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="3000"
            className="flex justify-center items-center flex-col gap-16"
          >
            <Button2>Get Started</Button2>

            <h2 className="text-white text-2xl opacity-90 font-bold mr-8">
              <span className="mr-2.5">
                <span className="text-[#a8f68f]">10,000+ </span>
                Students Registered
              </span>
              <span> | </span>
              <span className="ml-2.5">
                <span className="text-[#a8f68f]">500+</span> Companies Hiring
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section className="h-screen flex flex-col items-center justify-center bg-white">
        <div
          className="flex flex-col items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-2 mt-10">
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
              data-aos="fade-up"
              data-aos-delay="300"
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

      <section className="m-s3 h-screen">
        <div className="h-1/2 bg-blue-100"></div>
        <div className="h-1/2 bg-green-100"></div>
      </section>

      <section className="m-s2">
        <TextReveal className="text-left">
          Magic UI will change the way you design.
        </TextReveal>
      </section>

      <section className="m-s3 h-screen bg-lime-100"></section>
    </>
  );
}

"use client";

import { FaCode, FaPaintBrush, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    icon: <FaCode className="text-4xl text-blue-500" />,
    title: "Web Development",
    description:
      "Creating responsive and dynamic websites using the latest web technologies to deliver an engaging user experience.",
    link: "#readmore",
  },
  {
    icon: <FaPaintBrush className="text-4xl text-green-500" />,
    title: "UI/UX Design",
    description:
      "Designing intuitive and visually appealing user interfaces that enhance user satisfaction and interaction.",
    link: "#readmore",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-red-500" />,
    title: "Mobile App Development",
    description:
      "Developing mobile applications with a focus on functionality and user experience across different platforms.",
    link: "#readmore",
  },
];

const Services = () => {
  return (
    <section className="py-6 md:py-12 w-[90%] mx-auto" id="services">
      <h2 className="text-4xl font-bold text-center mb-8">
        Our <span className="text-blue-500">Services</span>
      </h2>

      <div className="flex flex-col md:flex-row justify-around items-start space-y-6 md:space-y-0 md:space-x-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center"
            data-aos="flip-left"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <a
              href={service.link}
              className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

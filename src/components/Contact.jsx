"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="p-6 md:p-12 w-full bg-gray-100" id="contact">
      {/* Heading */}
      <h2
        className="text-4xl font-black text-center mb-8"
        data-aos="fade-down-right"
      >
        Contact <span className="text-blue-500">Us</span>
      </h2>

      {/* Contact Form */}
      <div
        className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md"
        data-aos="fade-down-right"
      >
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          data-aos="flip-left"
        >
          <div className="sm:col-span-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="sm:col-span-1">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="sm:col-span-1">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="sm:col-span-1">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="col-span-1 sm:col-span-2 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;

import React from "react";
import { Link } from "react-router-dom"; 
import  Icon from "./appIcon.jsx"
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    const contactInfo = [
        { icon: 'MapPin', text: 'Biratnagar, Nepal' },
        { icon: 'Phone', text: '+977-9804359905' },
        { icon: 'Mail', text: 'Hamroaadhiyan@gmail.com' },
        { icon: 'Clock', text: 'Sun-Fri: 9:00 AM - 6:00 PM' }
      ];
      const quickLinks = [
        { name: 'Courses', path: '#' },
        { name: 'Notices', path: '#' },
        { name: 'Contact Us', path: '#' },
        { name: 'Student Dashboard', path: '#' }
      ];
      const resources = [
        { name: 'Study Materials', path: '/course-detail-page' },
        { name: 'Academic Calendar', path: '/notices-board' },
        { name: 'Student Support', path: '/contact-us' },
        { name: 'Career Guidance', path: '/contact-us' }
      ];
  return (
    <footer className="bg-zinc-200">
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Section 1 */}
        <div className="w-full md:w-1/3">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-pink-600">Hamro</span> Aadhiyan
          </h2>
          <p className="border-l-4 border-pink-400 pl-4 mt-2 text-justify text-base">
            Hamro Aadhiyan is an E-learning platform for Bachelor students. It
            provides complete notes, reference videos, past year question banks
            with solutions, notices, and other academic resources — all in one
            place.
          </p>
          </div>
         {/* Quick Links */}
         <div>
            <h3 className="text-lg font-semibold mb-6 mt-10">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className=" hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Icon name="ChevronRight" size={16} />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-6">Our Programs</h2>
          <div className="flex flex-col border-l-4 border-pink-400 pl-4 pt-2 text-base">
            <Link to="/csit" className="hover:text-pink-600">
              BSc.CSIT
            </Link>
            <Link to="/bit" className="hover:text-pink-600">
              BIT
            </Link>
            <Link to="/bba" className="hover:text-pink-600">
              BBA
            </Link>
            <Link to="#" className="hover:text-pink-600">
              Electronics Engineering
            </Link>
            <Link to="#" className="hover:text-pink-600">
              BSc. Zoology
            </Link>
          </div>
          <h4 className="text-md font-semibold mt-8 mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources?.map((resource) => (
                <li key={resource?.name}>
                  <Link
                    to={resource?.path}
                    className=" hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Icon name="FileText" size={16} />
                    <span>{resource?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
        </div>

        {/* Section 3 */}
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-5">Follow us on:</h2>
          <div className="flex gap-5 text-2xl pt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-600 hover:text-blue-800"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-pink-500 hover:text-pink-700"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-blue-400 hover:text-blue-600"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-blue-700 hover:text-blue-900"
              />
            </a>
          </div>
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 mt-10">Contact Info</h3>
              <ul className="space-y-4">
                {contactInfo?.map((info, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-1 flex-shrink-0">
                      <Icon
                        name={info?.icon}
                        size={20}
                        className="text-pink-400"
                      />
                    </div>
                    <span>{info?.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      <div className="text-center text-sm py-6 border-t border-gray-300">
        © {new Date().getFullYear()} Hamro Aadhiyan. All rights reserved.
      </div>
      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-300 text-center pb-2">
            <p className="text-gray-500 text-xs">
              Hamro Aadhiyan is committed to providing quality education and supporting student success. 
              Our platform is designed to enhance learning experiences for bachelor degree students across Nepal.
            </p>
          </div>
    </footer>
  );
}

export default Footer;

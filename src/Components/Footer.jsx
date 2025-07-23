import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Fix import
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
    return (
        <footer className='bg-zinc-200'>
            <div className='w-full max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-10'>
                {/* Section 1 */}
                <div className='w-full md:w-1/3'>
                    <h2 className='text-2xl font-bold'>
                        <span className="text-pink-600">Hamro</span> Aadhiyan
                    </h2>
                    <p className='border-l-4 border-pink-400 pl-4 mt-2 text-justify text-base'>
                        Hamro Aadhiyan is an E-learning platform for Bachelor students. It provides complete notes, reference videos, past year question banks with solutions, notices, and other academic resources — all in one place.
                    </p>
                </div>

                {/* Section 2 */}
                <div className='w-full md:w-1/4'>
                    <h2 className='text-2xl font-bold'>Courses</h2>
                    <div className='flex flex-col border-l-4 border-pink-400 pl-4 pt-2 text-base'>
                        <Link to="/csit" className='hover:text-pink-600'>BSc.CSIT</Link>
                        <Link to="/bit" className='hover:text-pink-600'>BIT</Link>
                        <Link to="/bba" className='hover:text-pink-600'>BBA</Link>
                        <Link to="#" className='hover:text-pink-600'>Electronics Engineering</Link>
                        <Link to="#" className='hover:text-pink-600'>BSc. Zoology</Link>
                    </div>
                </div>

                {/* Section 3 */}
                <div className='w-full md:w-1/4'>
                    <h2 className='text-2xl font-bold'>Follow us on:</h2>
                    <div className="flex gap-5 text-2xl pt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="text-blue-600 hover:text-blue-800" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="text-pink-500 hover:text-pink-700" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="text-blue-400 hover:text-blue-600" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 hover:text-blue-900" />
                        </a>
                    </div>
                </div>
            </div>

            <div className='text-center text-sm py-6 border-t border-gray-300'>
                © {new Date().getFullYear()} Hamro Aadhiyan. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

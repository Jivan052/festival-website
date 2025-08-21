import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";


const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-12 px-4 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-lg text-gray-600">Get in touch for more information or assistance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Contact Card */}
          <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              Quick Contact
            </h3>
            <div className="space-y-3 flex-grow">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPhone className="w-4 h-4 text-amber-600" />
                <a href="tel:+919876543210" className="hover:text-amber-600 transition-colors text-sm">+91 98765 43210</a>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="w-4 h-4 text-amber-600" />
                <a href="mailto:info@ganeshutsav2024.com" className="hover:text-amber-600 transition-colors text-sm truncate">info@ganeshutsav2024.com</a>
              </div>
            </div>
          </div>
          
          {/* WhatsApp Groups Card */}
          <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              WhatsApp Support
            </h3>
            <div className="space-y-3 flex-grow flex flex-col justify-between">
              <p className="text-sm text-gray-600">Get updates and support via our WhatsApp groups</p>
              <div className="flex space-x-2 mt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition-all duration-300 flex items-center justify-center flex-1"
                >
                  <FaWhatsapp className="w-4 h-4 mr-1" />
                  Main Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';

const ContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-24 right-4 z-40 sm:bottom-6 sm:right-6">
      {/* Contact Popup */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-4 w-64 animate-slide-in-right">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">Contact Us</h3>
            <button
              onClick={toggleWidget}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close contact widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-2 p-2 hover:bg-amber-50 rounded-md transition-colors text-gray-700 text-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>+91 98765 43210</span>
            </a>
            
            <a
              href="mailto:info@ganeshutsav2024.com"
              className="flex items-center space-x-2 p-2 hover:bg-amber-50 rounded-md transition-colors text-gray-700 text-sm"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              <span>info@ganeshutsav2024.com</span>
            </a>
            
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition-all duration-300 text-center mt-2"
            >
              <MessageCircle className="inline-block w-4 h-4 mr-1" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <button
        onClick={toggleWidget}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600 rotate-180' : 'bg-amber-500 hover:bg-amber-600'
        }`}
        aria-label="Toggle contact widget"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default ContactWidget;

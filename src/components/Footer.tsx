import React from 'react';
import { Sparkles, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";


interface FooterProps {
  scrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-12 w-12 overflow-hidden transition-all duration-500 group-hover:scale-150">
              <img 
              src="/images/GaneshaLogo.png" 
              alt="Ganesh Utsav Logo" 
              className="h-full w-full object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                // You could also set a fallback image here if needed
              }}
              />
            </div>
              <span className="text-lg font-bold">Ganesh Utsav 2025</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Celebrating the divine presence of Lord Ganesha with devotion, community, and joy.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('timetable')} 
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Festival Schedule
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('tickets')} 
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Book Tickets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('highlights')} 
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Event Highlights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('location')} 
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Location
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>+91 76661 23582</li>
              <li>ganeshutsav2025@gmail.com</li>
              <li>Yello Living, Pattandur Agrahara, Bangalore</li>
              <li>Daily: 6 AM - 10 PM</li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/reel/DNv68TD3Jht/?igsh=ZHZkaXphcjNsaGk4" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://wa.me/919876543210" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-xs">
            © PWIOI Shri Ganesh Utsav 2025. Made with love for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
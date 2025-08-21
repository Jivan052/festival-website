import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Calendar, 
  Ticket, 
  MapPin, 
  MessageCircle,
  X 
} from 'lucide-react';

interface NavBarProps {
  scrollToSection: (id: string) => void;
  activeNavItem: string;
}

const NavBar: React.FC<NavBarProps> = ({ scrollToSection, activeNavItem }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Set up scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-black/30 backdrop-blur-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with image */}
          <button 
            onClick={() => scrollToSection('home')}
            className="group flex items-center space-x-2"
          >
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
            <span className={`text-xl font-bold transition-all duration-500 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              <span className={`transition-colors duration-500 ${!isScrolled && 'text-amber-400 color-FF9B00'}`}>Ganesh</span> Utsav 2025
            </span>
          </button>
          
          {/* Enhanced Desktop Navigation with active indicator */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { id: 'highlights', icon: <Star className="w-4 h-4" />, label: 'Events' },
              { id: 'timetable', icon: <Calendar className="w-4 h-4" />, label: 'Timetable' },
              { id: 'contact', icon: <MessageCircle className="w-4 h-4" />, label: 'Contact' },
              { id: 'location', icon: <MapPin className="w-4 h-4" />, label: 'Location' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className={`flex items-center space-x-1 py-2 px-3 rounded-lg relative group
                  ${activeNavItem === item.id 
                    ? (isScrolled ? 'text-amber-600 bg-amber-50' : 'text-amber-400 bg-white/10') 
                    : (isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400')} 
                  transition-all duration-300`}
              >
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                {item.icon}
                <span>{item.label}</span>
                {activeNavItem === item.id && (
                  <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full transform -translate-x-1/2"></span>
                )}
              </button>
            ))}
            
            {/* Special CTA button */}
            <button 
              onClick={() => scrollToSection('tickets')}
              className={`hidden lg:flex items-center space-x-1 py-1.5 px-4 rounded-full 
                ${isScrolled 
                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'} 
                transition-all duration-300 border border-transparent hover:shadow-lg`}
            >
              <Ticket className="w-4 h-4 mr-1" />
              <span className="font-medium">Get Tickets</span>
            </button>
          </nav>

          {/* Mobile Menu Button with animation */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'} transition-colors relative`}
            aria-label="Menu"
          >
            <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300`}>
              <span className={`block w-5 h-0.5 ${isScrolled ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'translate-y-[-4px]'}`}></span>
              <span className={`block w-5 h-0.5 ${isScrolled ? 'bg-gray-800' : 'bg-white'} mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 ${isScrolled ? 'bg-gray-800' : 'bg-white'} mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-[4px]'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Improved Mobile Menu with animations and better UX */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-50 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
            {[
              { id: 'home', icon: <img src="/images/ganesh-logo.png" alt="Logo" className="w-6 h-6 object-contain" />, label: 'Home', color: 'amber' },
              { id: 'highlights', icon: <Star className="w-6 h-6 text-amber-600" />, label: 'Event Highlights', color: 'amber' },
              { id: 'timetable', icon: <Calendar className="w-6 h-6 text-amber-600" />, label: 'Festival Timetable', color: 'orange' },
              { id: 'tickets', icon: <Ticket className="w-6 h-6 text-amber-600" />, label: 'Book Tickets', color: 'red' },
              { id: 'contact', icon: <MessageCircle className="w-6 h-6 text-amber-600" />, label: 'Contact Us', color: 'green' },
              { id: 'location', icon: <MapPin className="w-6 h-6 text-amber-600" />, label: 'Find Location', color: 'blue' }
            ].map((item, index) => {
              const colorMap: Record<string, string> = {
                'amber': 'from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100',
                'orange': 'from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100',
                'red': 'from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100',
                'green': 'from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100',
                'blue': 'from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100'
              };
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 p-4 text-left rounded-2xl transition-all duration-300 
                    ${activeNavItem === item.id 
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100 shadow-md scale-[1.02]' 
                      : `bg-gradient-to-r ${colorMap[item.color] || colorMap['amber']} shadow-sm`}
                    transform hover:scale-[1.02]`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-inner flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-gray-800">{item.label}</span>
                    {activeNavItem === item.id && (
                      <span className="text-sm text-amber-600">Currently viewing</span>
                    )}
                  </div>
                  {activeNavItem === item.id && (
                    <div className="ml-auto w-2 h-10 bg-amber-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Close button for accessibility */}
          <button 
            onClick={toggleMobileMenu} 
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;

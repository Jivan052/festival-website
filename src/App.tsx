import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  Ticket, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Users,
  Music,
  Utensils,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Link,
  MapIcon
} from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccordion = (day: string) => {
    setOpenAccordion(openAccordion === day ? null : day);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleVideo = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(video.muted);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-black/30 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className={`w-8 h-8 ${isScrolled ? 'text-amber-600' : 'text-amber-400'}`} />
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Ganesh Utsav 2024</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('timetable')} className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400'} transition-colors`}>
                <Calendar className="w-4 h-4" />
                <span>Timetable</span>
              </button>
              <button onClick={() => scrollToSection('tickets')} className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400'} transition-colors`}>
                <Ticket className="w-4 h-4" />
                <span>Book Tickets</span>
              </button>
              <button onClick={() => scrollToSection('highlights')} className={`${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400'} transition-colors`}>Events</button>
              <button onClick={() => scrollToSection('contact')} className={`${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400'} transition-colors`}>Contact</button>
              <button onClick={() => scrollToSection('location')} className={`${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-400'} transition-colors`}>Location</button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'} transition-colors`}
            >
              {isMobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-50">
            <div className="p-6 space-y-6">
              <button
                onClick={() => scrollToSection('timetable')}
                className="w-full flex items-center space-x-3 p-4 text-left bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 shadow-sm"
              >
                <Calendar className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-medium">Timetable</span>
              </button>
              <button
                onClick={() => scrollToSection('tickets')}
                className="w-full flex items-center space-x-3 p-4 text-left bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition-all duration-300 shadow-sm"
              >
                <Ticket className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-medium">Book Tickets</span>
              </button>
              <button
                onClick={() => scrollToSection('highlights')}
                className="w-full flex items-center space-x-3 p-4 text-left rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                <Star className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-medium">Event Highlights</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center space-x-3 p-4 text-left rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                <Phone className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-medium">Contact Us</span>
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="w-full flex items-center space-x-3 p-4 text-left rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                <MapPin className="w-6 h-6 text-amber-600" />
                <span className="text-lg font-medium">Location</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg"
        >
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Video Controls */}
        <div className="absolute top-24 right-4 flex flex-col space-y-2 z-20">
          <button
            onClick={toggleVideo}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ganesh Utsav 2024
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join us for 10 days of devotion, celebration, and community spirit as we welcome Lord Ganesha
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('timetable')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[44px] flex items-center justify-center shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Timetable
            </button>
            <button
              onClick={() => scrollToSection('tickets')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[44px] flex items-center justify-center shadow-lg"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Book Tickets
            </button>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section id="highlights" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Festival Highlights</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the divine celebration with cultural programs, devotional activities, and community events</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8 text-amber-600" />,
                title: "Cultural Programs",
                description: "Traditional dance, music performances, and artistic presentations daily"
              },
              {
                icon: <Music className="w-8 h-8 text-amber-600" />,
                title: "Devotional Music",
                description: "Morning and evening aarti with live bhajan sessions"
              },
              {
                icon: <Utensils className="w-8 h-8 text-amber-600" />,
                title: "Prasadam",
                description: "Sacred food offerings and community meals throughout the festival"
              },
              {
                icon: <Star className="w-8 h-8 text-amber-600" />,
                title: "Special Events",
                description: "Grand procession on Anant Chaturdashi with immersion ceremony"
              }
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:scale-105 border-l-4 border-amber-500"
              >
                <div className="flex items-center mb-4">
                  {highlight.icon}
                  <h3 className="text-lg font-semibold text-gray-800 ml-3">{highlight.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section id="timetable" className="py-16 px-4 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Festival Timetable</h2>
            <p className="text-xl text-gray-600 mb-8">Daily schedule of events and activities</p>
            <div className="bg-white rounded-xl shadow-md p-6 text-left max-w-3xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About Ganesh Utsav</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ganesh Utsav is a 10-day Hindu festival celebrating the birth of Lord Ganesha, the remover of obstacles and patron of arts and sciences. 
                The festival begins with Ganesh Chaturthi and concludes with Anant Chaturdashi, featuring daily prayers, cultural programs, and community gatherings.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our celebration includes traditional rituals, devotional music, cultural performances, and community meals, bringing together people from all walks of life 
                in the spirit of devotion and unity.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              {
                day: "Day 1 - Ganesh Chaturthi",
                date: "Sept 19, 2024",
                description: "The grand installation ceremony marking the beginning of our 10-day celebration",
                events: [
                  { time: "6:00 AM", event: "Prana Pratishtha (Installation)", link: "https://example.com/installation" },
                  { time: "7:00 AM", event: "Morning Aarti & Prayers", link: null },
                  { time: "12:00 PM", event: "Afternoon Bhajan", link: "https://example.com/bhajan" },
                  { time: "7:00 PM", event: "Evening Aarti & Cultural Program", link: null }
                ]
              },
              {
                day: "Day 2-9 - Daily Celebrations",
                date: "Sept 20-27, 2024",
                description: "Daily worship, cultural programs, and community activities throughout the festival",
                events: [
                  { time: "6:00 AM", event: "Morning Aarti", link: null },
                  { time: "11:00 AM", event: "Abhishek & Special Prayers", link: "https://example.com/abhishek" },
                  { time: "4:00 PM", event: "Children's Programs", link: "https://example.com/children" },
                  { time: "7:30 PM", event: "Evening Aarti & Cultural Events", link: null }
                ]
              },
              {
                day: "Day 10 - Anant Chaturdashi",
                date: "Sept 28, 2024",
                description: "The grand finale with procession and immersion ceremony bidding farewell to Lord Ganesha",
                events: [
                  { time: "8:00 AM", event: "Final Morning Aarti", link: null },
                  { time: "2:00 PM", event: "Grand Procession Begins", link: "https://example.com/procession" },
                  { time: "4:00 PM", event: "Community Immersion Ceremony", link: null },
                  { time: "6:00 PM", event: "Farewell Prayers", link: null }
                ]
              }
            ].map((schedule, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleAccordion(schedule.day)}
                  className="w-full px-6 py-4 text-left bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg flex items-center justify-between hover:from-amber-600 hover:to-orange-600 transition-all duration-300 min-h-[44px]"
                >
                  <div>
                    <span className="block">{schedule.day}</span>
                    <span className="text-amber-100 text-sm">{schedule.date}</span>
                  </div>
                  {openAccordion === schedule.day ? <ChevronUp /> : <ChevronDown />}
                </button>
                
                {openAccordion === schedule.day && (
                  <div className="px-6 py-4">
                    <p className="text-gray-600 mb-4 italic">{schedule.description}</p>
                    <div className="space-y-4">
                    {schedule.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="font-medium text-amber-700 min-w-[80px]">{event.time}</span>
                          </div>
                          <span className="text-gray-700 flex-1">{event.event}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                            >
                              <Link className="w-4 h-4" />
                            </a>
                          )}
                          <button className="px-3 py-2 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 transition-colors min-h-[44px] flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Add to Calendar
                          </button>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Booking */}
      <section id="tickets" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Book Your Experience</h2>
            <p className="text-xl text-gray-600">Secure your spot for special programs and VIP darshan</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    "Priority darshan access",
                    "Cultural program seating",
                    "Prasadam meal voucher",
                    "Festival souvenir",
                    "Parking facility",
                    "Photography permissions"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-amber-600">₹299</span>
                  <span className="text-gray-600 text-lg">/person</span>
                </div>
                
                <button className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[44px] flex items-center justify-center shadow-lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Book Tickets Now
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Opens booking page in new tab for optimal mobile experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">Get in touch for more information or assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-amber-600" />
                    <a href="tel:+919876543210" className="text-gray-700 hover:text-amber-600 transition-colors">+91 98765 43210</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <a href="mailto:info@ganeshutsav2024.com" className="text-gray-700 hover:text-amber-600 transition-colors">info@ganeshutsav2024.com</a>
                  </div>
                </div>
              </div>
              
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">WhatsApp Groups</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center"
                >
                <MessageCircle className="w-5 h-5 mr-2" />
                  Main Group
                </a>
                <a
                  href="https://wa.me/919876543211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Volunteers Group
                </a>
              </div>
            </div>
              
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Sunday</span>
                    <span className="text-gray-800 font-medium">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Festival Days</span>
                    <span className="text-gray-800 font-medium">24/7 Available</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Visit us at our festival venue</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-xl h-64 sm:h-80 flex items-center justify-center relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267!2d77.6410!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">Interactive Google Maps</p>
                  <p className="text-sm">Enable location services for directions</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href="https://maps.google.com/?q=Yello+Living+Pattandur+Agrahara+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px] shadow-lg"
                >
                  <MapIcon className="w-5 h-5 mr-2" />
                  Open in Google Maps
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Venue Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-800">Address:</span>
                    <p className="text-gray-600">Shree Ganesh Temple Complex<br />Yello Living, Pattandur Agrahara<br />Bangalore - 560037</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Landmarks:</span>
                    <p className="text-gray-600">Near Electronic City Phase 1<br />Opposite to Infosys Mysore Road<br />Behind Yello Living PG</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Area:</span>
                    <p className="text-gray-600">Pattandur Agrahara is a developing locality in South Bangalore, well-connected to major IT hubs and easily accessible via public transport.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Parking Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free parking available</li>
                  <li>• 500+ vehicle capacity</li>
                  <li>• Separate two-wheeler area</li>
                  <li>• 24/7 security during festival</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Public Transport</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Metro: Upcoming Electronic City Metro</li>
                  <li>• Bus: BMTC Routes 500D, 500DA</li>
                  <li>• Auto/Taxi readily available</li>
                  <li>• Ola/Uber pickup point available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold">Ganesh Utsav 2024</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Celebrating the divine presence of Lord Ganesha with devotion, community, and joy.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('timetable')} className="text-gray-300 hover:text-amber-400 transition-colors">Festival Schedule</button></li>
                <li><button onClick={() => scrollToSection('tickets')} className="text-gray-300 hover:text-amber-400 transition-colors">Book Tickets</button></li>
                <li><button onClick={() => scrollToSection('highlights')} className="text-gray-300 hover:text-amber-400 transition-colors">Event Highlights</button></li>
                <li><button onClick={() => scrollToSection('location')} className="text-gray-300 hover:text-amber-400 transition-colors">Location</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>+91 98765 43210</li>
                <li>info@ganeshutsav2024.com</li>
                <li>Pattandur Agrahara, Bangalore</li>
                <li>Daily: 6 AM - 10 PM</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm">Facebook</a>
                <a href="#" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors text-sm">Instagram</a>
                <a href="#" className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm">YouTube</a>
                <a href="#" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm">WhatsApp</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Ganesh Utsav Committee. Made with love for the community.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 md:hidden">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => scrollToSection('timetable')}
            className="flex flex-col items-center py-3 text-xs font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <Calendar className="w-5 h-5 mb-1" />
            Timetable
          </button>
          <button
            onClick={() => scrollToSection('tickets')}
            className="flex flex-col items-center py-3 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-colors"
          >
            <Ticket className="w-5 h-5 mb-1" />
            Tickets
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex flex-col items-center py-3 text-xs font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            Contact
          </button>
        </div>
      </div>

      {/* Mobile padding for bottom nav */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}

export default App;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Ticket,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Link,
  Clock,
  Award,
  Share2,
  Star,
  MapPin
} from 'lucide-react';
import ContactSection from './components/ContactSection';
import FindUsSection from './components/FindUsSection';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SmallTimer from './components/SmallTimer';
import Loader from './components/Loader';
import ContactWidget from './components/ContactWidget';
import HighlightsSection from './components/HighlightsSection';
import VideoBackground from './components/VideoBackground';

function App() {
  // State management
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false); // Set to false for unmuted video
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  // References
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({});

  // Initialize and track sections
  useEffect(() => {
    // Set up scroll event listener
    const handleScroll = () => {
      // Determine which section is currently in view
      const currentPosition = window.scrollY + window.innerHeight / 3;
      
      for (const key in sectionsRef.current) {
        const section = sectionsRef.current[key];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
            setActiveNavItem(key);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize section refs
    const sections = ['home', 'highlights', 'timetable', 'tickets', 'contact', 'location'];
    sections.forEach(id => {
      sectionsRef.current[id] = document.getElementById(id);
    });
    
    // Set up countdown timer
    const countdownInterval = setInterval(() => {
      // Festival date - September 19, 2024
      const festivalDate = new Date('2024-09-19T00:00:00');
      const now = new Date();
      
      if (now >= festivalDate) {
        clearInterval(countdownInterval);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(countdownInterval);
    };
  }, []);

  const toggleAccordion = (day: string) => {
    setOpenAccordion(openAccordion === day ? null : day);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveNavItem(id);
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
  
  // Initialize video playing state to true when component mounts
  useEffect(() => {
    setIsVideoPlaying(true);
  }, []);
  
  useEffect(() => {
    // Hide loader after 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Loader Component */}
      {isLoading && <Loader duration={1000} />}
      
      {/* Small Timer Component */}
      <SmallTimer festivalDate="2024-09-19T00:00:00" />
      
      {/* Contact Widget */}
      <ContactWidget />
      
      {/* Using the NavBar component */}
      <NavBar scrollToSection={scrollToSection} activeNavItem={activeNavItem} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background with autoplay using VideoBackground component */}
        <div className="absolute inset-0 w-full h-full">
          <VideoBackground
            id="hero-video"
            videoUrl="/videos/GaneshVideo.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            muted={isVideoMuted}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onError={(e) => {
              console.error("Video failed to load:", e);
            }}
          />
        </div>

        
        {/* Enhanced Video Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Video Controls with improved styling */}
        <div className="absolute top-24 right-4 flex flex-col space-y-2 z-20">
          <button
        onClick={toggleVideo}
        className="p-3 bg-black/50 hover:bg-amber-600 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
        {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
        onClick={toggleMute}
        className="p-3 bg-black/50 hover:bg-amber-600 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
          >
        {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Animated title with better typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-down">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">Ganesh Utsav 2025</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us for 3 days of devotion, celebration, and community spirit as we welcome Lord Ganesha
          </p>
          
          {/* Enhanced call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('timetable')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-amber-500/30 min-h-[44px] flex items-center justify-center relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Calendar className="w-5 h-5 mr-2" />
              View Timetable
            </button>
            <button
              onClick={() => scrollToSection('tickets')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-red-500/30 min-h-[44px] flex items-center justify-center relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-300 to-pink-300 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Ticket className="w-5 h-5 mr-2" />
              Book Tickets
            </button>
          </div>
          
          {/* Quick info badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white">Aug 27-29, 2025</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white">Yello Living, Pattandur Agrahara, Bangalore</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white">Annual Grand Celebration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <HighlightsSection />

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
                date: "Aug 27, 2025",
                description: "The grand installation ceremony marking the beginning of our 10-day celebration",
                events: [
                  { time: "6:00 AM", event: "Prana Pratishtha (Installation)", link: "https://example.com/installation" },
                  { time: "7:00 AM", event: "Morning Aarti & Prayers", link: null },
                  { time: "12:00 PM", event: "Afternoon Bhajan", link: "https://example.com/bhajan" },
                  { time: "7:00 PM", event: "Evening Aarti & Cultural Program", link: null }
                ]
              },
              {
                day: "Day 2 - Satyanarayan Mahapuja & Prasad Distribution",
                date: "Aug 28, 2025",
                description: "Daily worship, cultural programs, and community activities throughout the festival",
                events: [
                  { time: "6:00 AM", event: "Morning Aarti", link: null },
                  { time: "11:00 AM", event: "Abhishek & Special Prayers", link: "https://example.com/abhishek" },
                  { time: "4:00 PM", event: "Children's Programs", link: "https://example.com/children" },
                  { time: "7:30 PM", event: "Evening Aarti & Cultural Events", link: null }
                ]
              },
              {
                day: "Day 3 - Anant Chaturdashi",
                date: "Aug 29, 2025",
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
          <span className="text-4xl font-bold text-amber-600">₹151</span>
          <span className="text-gray-600 text-lg">/person</span>
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mb-4">Book through your preferred platform:</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
          <a href="https://in.bookmyshow.com" target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors">
            <img src="https://assets-in.bmscdn.com/webin/common/icons/logo.svg" alt="BookMyShow" 
             className="h-8 object-contain mb-2" />
            <span className="text-sm text-gray-700">BookMyShow</span>
          </a>
          
          <a href="https://lu.ma" target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors">
            <img src="https://lu.ma/favicon.ico" alt="Luma" 
             className="h-8 object-contain mb-2" />
            <span className="text-sm text-gray-700">Luma</span>
          </a>
          
          <a href="https://allevents.in" target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors">
            <img src="https://allevents.in/img/ae-logo-website.png" alt="All Events" 
             className="h-8 object-contain mb-2" />
            <span className="text-sm text-gray-700">All Events</span>
          </a>
          
          <a href="#contact" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
             className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-amber-500 transition-colors">
            <div className="h-8 flex items-center justify-center mb-2">
              <Share2 className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm text-gray-700">Contact Us</span>
          </a>
            </div>
            
            <button className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[44px] flex items-center justify-center shadow-lg">
          <ExternalLink className="w-5 h-5 mr-2" />
          Book Directly Now
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
          Booking opens in new tab for optimal mobile experience
            </p>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <ContactSection />

      {/* Location */}
      <FindUsSection />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Enhanced Mobile Bottom Navigation */}
      <div className="fixed bottom-6 left-0 right-0 z-40 px-4 md:hidden">
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-full border border-gray-100 px-2 py-1">
          <div className="grid grid-cols-5 gap-1">
            <button
              onClick={() => scrollToSection('home')}
              className={`flex flex-col items-center py-2 px-1 rounded-full text-xs font-medium transition-colors relative
                ${activeNavItem === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
            >
              <Sparkles className="w-5 h-5 mb-1" />
              <span>Home</span>
              {activeNavItem === 'home' && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>
            
            <button
              onClick={() => scrollToSection('highlights')}
              className={`flex flex-col items-center py-2 px-1 rounded-full text-xs font-medium transition-colors relative
                ${activeNavItem === 'highlights' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
            >
              <Star className="w-5 h-5 mb-1" />
              <span>Events</span>
              {activeNavItem === 'highlights' && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>
            
            <button
              onClick={() => scrollToSection('tickets')}
              className="flex flex-col items-center justify-center relative"
            >
              <div className="absolute -top-5 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse-gentle">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium mt-8 text-amber-600">Tickets</span>
            </button>
            
            <button
              onClick={() => scrollToSection('timetable')}
              className={`flex flex-col items-center py-2 px-1 rounded-full text-xs font-medium transition-colors relative
                ${activeNavItem === 'timetable' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
            >
              <Calendar className="w-5 h-5 mb-1" />
              <span>Schedule</span>
              {activeNavItem === 'timetable' && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>
            
            <button
              onClick={() => scrollToSection('location')}
              className={`flex flex-col items-center py-2 px-1 rounded-full text-xs font-medium transition-colors relative
                ${activeNavItem === 'location' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
            >
              <MapPin className="w-5 h-5 mb-1" />
              <span>Map</span>
              {activeNavItem === 'location' && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile padding for bottom nav */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
}

export default App;
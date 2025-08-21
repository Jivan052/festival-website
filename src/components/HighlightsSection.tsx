import React from 'react';
import { Star, AlertCircle } from 'lucide-react';

const HighlightsSection: React.FC = () => {
  // Festival highlight data
  const highlights = [
    {
      icon: "bi bi-people",
      title: "Cultural Programs",
      description: "Traditional dance performances and musical shows",
      color: "amber"
    },
    {
      icon: "bi bi-music-note-beamed",
      title: "Devotional Music",
      description: "Morning and evening aarti with live bhajan sessions",
      color: "red"
    },
    {
      icon: "bi bi-cup-hot",
      title: "Prasadam & Feasts",
      description: "Sacred food offerings and community meals daily",
      color: "green"
    },
    {
      icon: "bi bi-camera",
      title: "Photo Opportunities",
      description: "Beautifully decorated mandap with photography zones",
      color: "blue"
    },
    {
      icon: "bi bi-gift",
      title: "Community Gifts",
      description: "Special gift distributions for children and seniors",
      color: "purple"
    },
    {
      icon: "bi bi-heart",
      title: "Charity Initiatives",
      description: "Fundraising activities for local causes",
      color: "pink"
    },
    {
      icon: "bi bi-star",
      title: "Grand Procession",
      description: "Spectacular farewell procession on Anant Chaturdashi",
      color: "yellow"
    },
    {
      icon: "bi bi-info-circle",
      title: "Learning Sessions",
      description: "Daily talks on mythology, spirituality and culture",
      color: "indigo"
    }
  ];

  return (
    <section id="highlights" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              <Star className="w-3.5 h-3.5 mr-1" /> 
              What to expect
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Festival <span className="text-amber-600">Highlights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the divine celebration with cultural programs, devotional activities, and community events
          </p>
        </div>
        
        {/* Simplified highlight cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {highlights.map((highlight, index) => {
            // Color classes for different highlights
            const colorClasses: {[key: string]: {bg: string, text: string, border: string}} = {
              amber: {bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200"},
              red: {bg: "bg-red-50", text: "text-red-700", border: "border-red-200"},
              green: {bg: "bg-green-50", text: "text-green-700", border: "border-green-200"},
              blue: {bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200"},
              purple: {bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200"},
              pink: {bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200"},
              yellow: {bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200"},
              indigo: {bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200"}
            };
            
            const colors = colorClasses[highlight.color as keyof typeof colorClasses];
            
            return (
              <div
                key={index}
                className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border ${colors.border} ${colors.bg} flex flex-col items-center text-center`}
              >
                <i className={`${highlight.icon} text-xl ${colors.text} mb-2`}></i>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{highlight.title}</h3>
                <p className="text-xs text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;

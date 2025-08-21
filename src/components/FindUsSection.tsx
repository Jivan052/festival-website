import React from 'react';
import { MapPin, MapIcon } from 'lucide-react';

const FindUsSection: React.FC = () => {
  return (
    <section id="location" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Find Us</h2>
          <p className="text-lg text-gray-600">Visit us at our festival venue</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-lg shadow-md h-64 sm:h-80 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267!2d77.6410!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Festival Location Map"
              ></iframe>
            </div>
            
            {/* Map Button */}
            <div className="mt-4 text-center">
              <a
                href="https://maps.google.com/?q=Yello+Living+Pattandur+Agrahara+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-all duration-300 shadow-sm"
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="space-y-4">
            {/* Venue Details Card */}
            <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <MapPin className="w-4 h-4 text-amber-600 mr-2" />
                Venue Details
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Address:</p>
                  <p className="text-sm text-gray-600">
                    Shree Ganesh Temple Complex<br />
                    Yello Living, Pattandur Agrahara<br />
                    Bangalore - 560037
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Landmarks:</p>
                  <p className="text-sm text-gray-600">
                    Near Electronic City Phase 1<br />
                    Opposite to Infosys Mysore Road
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsSection;

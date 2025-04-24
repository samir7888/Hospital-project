"use client";
import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - in a real implementation, this would come from an API or CMS
  const items = [
    {
      id: 1,
      type: 'news',
      title: 'MedCare Hospital Receives National Excellence Award',
      date: 'April 15, 2025',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'MedCare Hospital has been recognized for its outstanding patient care and medical innovation with the prestigious National Healthcare Excellence Award.',
      category: 'Awards'
    },
    {
      id: 2,
      type: 'event',
      title: 'Free Community Health Screening Day',
      date: 'May 10, 2025',
      time: '9:00 AM - 3:00 PM',
      image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'Join us for a day of free health screenings including blood pressure, diabetes, and cholesterol checks. Our medical professionals will be available to answer your health questions.',
      category: 'Community'
    },
    {
      id: 3,
      type: 'news',
      title: 'New Cardiology Center Opening Next Month',
      date: 'April 3, 2025',
      image: '/api/placeholder/600/400',
      excerpt: 'MedCare Hospital is proud to announce the opening of our state-of-the-art Cardiology Center, featuring the latest diagnostic and treatment technologies.',
      category: 'Facilities'
    },
    {
      id: 4,
      type: 'event',
      title: 'Blood Donation Drive',
      date: 'April 28, 2025',
      time: '10:00 AM - 4:00 PM',
      image: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'Help save lives by donating blood at our upcoming blood drive. Each donation can save up to three lives!',
      category: 'Community'
    },
    {
      id: 5,
      type: 'news',
      title: 'Dr. Sarah Johnson Joins Oncology Department',
      date: 'March 30, 2025',
      image: '/api/placeholder/600/400',
      excerpt: 'We are pleased to welcome Dr. Sarah Johnson, a renowned oncologist, to our medical team. Dr. Johnson brings over 15 years of experience in cancer treatment and research.',
      category: 'Staff'
    },
    {
      id: 6,
      type: 'event',
      title: 'Diabetes Management Workshop',
      date: 'May 15, 2025',
      time: '2:00 PM - 4:00 PM',
      image: '/api/placeholder/600/400',
      excerpt: 'Learn practical strategies for managing diabetes with our expert nutritionists and endocrinologists. Registration required.',
      category: 'Education'
    }
  ];

  // Filter items based on active tab and search term
  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className='py-10'>
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
          Stay updated with the latest news, events, and announcements from MedCare Hospital..
          </p>
        </div>
      </div>
      
      {/* News & Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
        
        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'all' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'news' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
            >
              News
            </button>
            <button 
              onClick={() => setActiveTab('event')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'event' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
            >
              Events
            </button>
          </div>
          
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search news and events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </div>
        
        {/* News and Events Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{item.date}</span>
                    {item.type === 'event' && (
                      <>
                        <Clock size={16} className="ml-4 mr-2" />
                        <span>{item.time}</span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  
                  <button className="text-blue-700 font-medium flex items-center hover:text-blue-900 transition-colors">
                    Read more <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </div>
        )}
        
        {/* View All Button */}
        {/* <div className="text-center mt-12">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All News & Events
          </button>
        </div> */}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-blue-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600">Subscribe to our newsletter to receive the latest news and events.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
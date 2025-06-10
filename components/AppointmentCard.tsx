import { CompanyInfoResponse } from '@/app/types/company-type';
import { serverFetch } from '@/lib/server-fetch';
import { Check, Clipboard, PhoneCall } from 'lucide-react'
import React from 'react'

const AppointmentCard = async() => {
  const companyInfo = await serverFetch<CompanyInfoResponse>("company-info");
  return (
    <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Book an Appointment
              </h2>
              <div className="h-1 w-20 bg-blue-600 mt-4 mb-6"></div>
              <p className="text-xl text-gray-600">
                Schedule your visit with our specialists and receive the care
                you deserve.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clipboard className="h-6 w-6 mr-2" />
                Why Book Online?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-3" />
                  <span>Quick and easy scheduling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-3" />
                  <span>No waiting on hold</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-3" />
                  <span>24/7 booking availability</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-3" />
                  <span>Automatic confirmation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-3" />
                  <span>Easy rescheduling if needed</span>
                </li>
              </ul>

              <div className="mt-8 p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-inner">
                <div className="flex items-center">
                  <div className="bg-red-500 p-3 rounded-full mr-4">
                    <PhoneCall />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Need urgent care?</p>
                    <p className="mt-1 text-blue-100">
                      Call our 24/7 emergency line:
                    </p>
                    <p className="text-xl font-bold mt-1">{companyInfo?.emergencyPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default AppointmentCard
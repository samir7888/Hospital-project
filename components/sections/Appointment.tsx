import AppointmentCard from "../AppointmentCard";
import AppointmentForm from "../AppointmentForm";

const Appointment: React.FC = () => {
  return (
    <div id="appointment" className="py-20 bg-gray-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:flex lg:items-stretch lg:space-x-12">
        {/* Left Column - Image and Info */}
        <AppointmentCard />

        {/* Right Column - Form */}
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;

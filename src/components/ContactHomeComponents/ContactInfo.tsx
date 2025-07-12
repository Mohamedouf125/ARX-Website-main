import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Business District", "New York, NY 10001", "United States"],
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@spaciaz.com", "support@spaciaz.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Let&apos;s Start a Conversation
        </h3>
        <p className="text-gray-600 mb-8">
          We&apos;re always ready to help you with your real estate and
          construction needs. Reach out to us through any of the following
          methods.
        </p>
      </div>

      <div className="grid gap-6">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              {item.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-gray-600 text-sm">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h4 className="text-xl font-bold mb-2">Ready to Get Started?</h4>
        <p className="text-blue-100 mb-4">
          Join thousands of satisfied clients who trust us with their projects.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Schedule a Call
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;

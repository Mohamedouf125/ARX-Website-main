"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const ContactForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [phone, setPhone] = useState<Value>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: phone,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-9 max-w-[656px] w-full mx-4">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[#dba426] text-2xl font-bold font-['Lato']">
              Send Us A Message
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-100 rounded"
                  placeholder="Name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-100 rounded"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Phone</label>
                {/* <div className="flex">
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-l">
                    <span className="text-sm">(+20)</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-r"
                    placeholder="Phone Number"
                  />
                </div> */}
                <PhoneInput
                  international
                  defaultCountry="EG"
                  value={phone}
                  onChange={setPhone}
                  className="w-full px-4 py-2 bg-gray-100 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-100 rounded"
                >
                  <option value="">Interested In</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-100 rounded h-32"
                placeholder="Message"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-10 py-2.5 bg-[#dba426] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

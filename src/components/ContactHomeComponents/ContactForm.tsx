"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

const ContactForm = () => {
  const t = useTranslations("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiry: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry: "",
      });
    }, 1000);
  };

  return (
    <div className="rounded-3xl p-8 md:p-12 w-full xl:max-w-2xl">
      {/* Header Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
          <span className="w-2 h-2 bg-[#035B8D] rounded-full"></span>
          {t("property")}
          <span className="mx-2">•</span>
          {t("quick_enquiry")}
        </div>

        <h2 className="text-2xl lg:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {t("get_specialist_advice")}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="h-14 bg-gray-50 border-0 rounded-2xl px-6 text-gray-600 placeholder:text-gray-400"
            placeholder={t("your_name")}
          />
          <Input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="h-14 bg-gray-50 border-0 rounded-2xl px-6 text-gray-600 placeholder:text-gray-400"
            placeholder={t("your_email")}
          />
        </div>

        {/* Phone and Inquiry Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="h-14 bg-gray-50 border-0 rounded-2xl px-6 text-gray-600 placeholder:text-gray-400"
            placeholder={t("your_phone")}
          />
          <Select
            value={formData.inquiry}
            onValueChange={handleInquiryChange}
            required
          >
            <SelectTrigger className="h-14! bg-gray-50 border-0 rounded-2xl px-6 text-gray-600 w-full ">
              <SelectValue placeholder={t("your_inquiry_about")} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
              <SelectItem value="residential">
                {t("residential_property")}
              </SelectItem>
              <SelectItem value="commercial">
                {t("commercial_property")}
              </SelectItem>
              <SelectItem value="investment">
                {t("investment_opportunities")}
              </SelectItem>
              <SelectItem value="consultation">
                {t("free_consultation")}
              </SelectItem>
              <SelectItem value="valuation">
                {t("property_valuation")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#DEA228] hover:bg-[#DEA228] text-white font-semibold px-8 py-4 rounded-2xl h-auto transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <span>{t("get_a_call_back")}</span>
                <FaArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

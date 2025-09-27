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
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useLocale } from "next-intl";
import { postData } from "@/libs/axios/server";
import toast from "react-hot-toast";

interface ContactFormProps {
  handleReloadAnimation?: () => void;
}

const ContactFormProject = ({ handleReloadAnimation }: ContactFormProps) => {
  const t = useTranslations("home");
  const l = useTranslations("LeasingApplicationForm");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company & Contact Information
    company_name: "",
    webiste: "",
    postal_address: "",
    company_phone: "",
    company_email: "",
    company_fax: "",

    // Step 2: Responsible Person Details
    responsible_person: "",
    responsible_person_phone: "",
    responsible_person_email: "",
    responsible_person_position: "",

    // Step 3: Brand Information
    brand_name: "",
    franchise_name: "",
    country_of_origin: "",
    no_of_branches_in_egypt: "",
    no_of_branches_outside_egypt: "",
    no_of_employees: "",

    // Step 4: Business Categories
    business_category: "",
    other_business_category: "",

    // Step 5: Target Market
    product_price: "",
    target_customer: "",
    icome: "",

    // Step 6: Location Information
    location_name: "",
    shop_no: "",
    floor_no: "",
    area_no: "",
    required_area: "",
    other_conditions: "",

    // Step 7: File Uploads
    company_profile: null as File | null,
    brand_presentation: null as File | null,
    shop_photos: null as FileList | null,
  });

  const locale = useLocale();
  const totalSteps = 7;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file") {
      if (name === "shop_photos") {
        setFormData((prev) => ({ ...prev, [name]: files }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files && files[0] ? files[0] : null,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);

        if (handleReloadAnimation) {
          handleReloadAnimation();
        }
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);

        if (handleReloadAnimation) {
          handleReloadAnimation();
        }
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await postData("leasing-application-forms", formData)
      .then(() => {
        setIsSubmitting(false);
        setFormData({
          // Step 1: Company & Contact Information
          company_name: "",
          webiste: "",
          postal_address: "",
          company_phone: "",
          company_email: "",
          company_fax: "",

          // Step 2: Responsible Person Details
          responsible_person: "",
          responsible_person_phone: "",
          responsible_person_email: "",
          responsible_person_position: "",

          // Step 3: Brand Information
          brand_name: "",
          franchise_name: "",
          country_of_origin: "",
          no_of_branches_in_egypt: "",
          no_of_branches_outside_egypt: "",
          no_of_employees: "",

          // Step 4: Business Categories
          business_category: "",
          other_business_category: "",

          // Step 5: Target Market
          product_price: "",
          target_customer: "",
          icome: "",

          // Step 6: Location Information
          location_name: "",
          shop_no: "",
          floor_no: "",
          area_no: "",
          required_area: "",
          other_conditions: "",

          // Step 7: File Uploads
          company_profile: null as File | null,
          brand_presentation: null as File | null,
          shop_photos: null as FileList | null,
        });
        toast.success("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        toast.error("Error submitting form. Please try again.");
      });
  };

  // Validation functions for each step
  const isStep1Valid = () => {
    return (
      formData.company_name.trim() !== "" &&
      formData.company_email.trim() !== "" &&
      formData.company_phone.trim() !== ""
    );
  };

  const isStep2Valid = () => {
    return (
      formData.responsible_person.trim() !== "" &&
      formData.responsible_person_position.trim() !== ""
    );
  };

  const isStep3Valid = () => {
    return (
      formData.brand_name.trim() !== "" &&
      formData.country_of_origin.trim() !== ""
    );
  };

  const isStep4Valid = () => {
    if (formData.business_category.trim() === "") {
      return false;
    }
    // If "Others" is selected, require the other_business_category field
    if (formData.business_category === "Others") {
      return formData.other_business_category.trim() !== "";
    }
    return true;
  };

  const isStep5Valid = () => {
    return formData.product_price !== "" && formData.icome !== "";
  };

  const isStep6Valid = () => {
    return formData.location_name.trim() !== "";
  };

  const isStep7Valid = () => {
    return true; // File uploads are optional
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return isStep4Valid();
      case 5:
        return isStep5Valid();
      case 6:
        return isStep6Valid();
      case 7:
        return isStep7Valid();
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return l("sections.companyInformation");
      case 2:
        return l("sections.contactPerson");
      case 3:
        return l("sections.brandInformation");
      case 4:
        return l("sections.businessCategories");
      case 5:
        return l("sections.targetMarket");
      case 6:
        return l("sections.locationInformation");
      case 7:
        return "File Uploads";
      default:
        return "";
    }
  };

  // For business_category select
  const businessCategories = [
    "Clothes",
    "Accessories",
    "Shoes & Leather",
    "Perfumes & Beauty",
    "Restaurants",
    "Jewels & Watches",
    "Furniture",
    "Services",
    "Others",
  ];

  // For product_price and icome
  const productPriceOptions = [
    { value: "low", label: "Low" },
    { value: "average", label: "Average" },
    { value: "high", label: "High" },
  ];
  const incomeOptions = [
    { value: "average", label: "Average" },
    { value: "above-average", label: "Above Average" },
    { value: "high", label: "High" },
  ];

  // For target_customer
  const targetCustomerOptions = [
    { value: "women", label: "Women" },
    { value: "gents", label: "Men" },
    { value: "kids", label: "Kids" },
    { value: "family", label: "Family" },
  ];

  return (
    <div className="w-full lg:h-auto h-[110vh] px-4 sm:px-6 lg:px-0">
      {/* Header Badge */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mt-4 sm:mt-6 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-600 mb-6 sm:mb-8 transform transition-all duration-300 hover:scale-105">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#035B8D] rounded-full animate-ping"></span>
          {t("property")}
          <span className="mx-1 sm:mx-2">•</span>
          {t("quick_enquiry")}
        </div>

        <div className="overflow-hidden">
          <h2
            className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 transition-all duration-500 transform ${
              isTransitioning
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {getStepTitle()}
          </h2>
        </div>
        <p
          className={`text-gray-600 text-xs sm:text-sm transition-all duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentStep} / {totalSteps}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full">
        <div className="relative w-full min-h-[400px] sm:min-h-[500px]">
          {/* Step 1: Company & Contact Information */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 1
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : currentStep > 1
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-100 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="company_name"
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.companyName")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-150 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="webiste"
                    type="text"
                    value={formData.webiste}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.website")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="company_email"
                    type="email"
                    required
                    value={formData.company_email}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.email")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="company_phone"
                    type="tel"
                    required
                    value={formData.company_phone}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.phone")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="company_fax"
                    type="tel"
                    value={formData.company_fax}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.fax")}
                  />
                </div>
              </div>
              <div
                className={`transition-all duration-700 delay-400 transform ${
                  currentStep === 1 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <textarea
                  name="postal_address"
                  value={formData.postal_address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228] resize-none"
                  placeholder={l("placeholders.postalAddress")}
                />
              </div>
              <div
                className={`flex justify-end transition-all duration-700 delay-450 transform ${
                  currentStep === 1 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2: Responsible Person Details */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 2
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : currentStep > 2
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-100 transform ${
                    currentStep === 2 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="responsible_person"
                    type="text"
                    required
                    value={formData.responsible_person}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.responsiblePerson")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-150 transform ${
                    currentStep === 2 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="responsible_person_position"
                    type="text"
                    required
                    value={formData.responsible_person_position}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.position")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 2 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="responsible_person_phone"
                    type="tel"
                    value={formData.responsible_person_phone}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.mobile")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 2 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="responsible_person_email"
                    type="email"
                    value={formData.responsible_person_email}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.email")}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-300 transform ${
                  currentStep === 2 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 3: Brand Information */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 3
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : currentStep > 3
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-100 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="brand_name"
                    type="text"
                    required
                    value={formData.brand_name}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.agencyBrandName")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-150 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="franchise_name"
                    type="text"
                    value={formData.franchise_name}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.franchiseOwner")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="country_of_origin"
                    type="text"
                    required
                    value={formData.country_of_origin}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.countryOfOrigin")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="no_of_employees"
                    type="number"
                    value={formData.no_of_employees}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder="No. of Employees"
                    min="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="no_of_branches_in_egypt"
                    type="number"
                    value={formData.no_of_branches_in_egypt}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.branchesInEgypt")}
                    min="0"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-350 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="no_of_branches_outside_egypt"
                    type="number"
                    value={formData.no_of_branches_outside_egypt}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.branchesOutsideEgypt")}
                    min="0"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-400 transform ${
                  currentStep === 3 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 4: Business Categories */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 4
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : currentStep > 4
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div
                className={`transition-all duration-700 delay-100 transform ${
                  currentStep === 4 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Select
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  value={formData.business_category}
                  onValueChange={(value) =>
                    handleSelectChange("business_category", value)
                  }
                >
                  <SelectTrigger className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 w-full transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]">
                    <SelectValue
                      placeholder={l("sections.businessCategories")}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-500 rounded-xl shadow-2xl">
                    {businessCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {(() => {
                          switch (cat) {
                            case "Clothes":
                              return l("categories.clothes");
                            case "Accessories":
                              return l("categories.accessories");
                            case "Shoes & Leather":
                              return l("categories.shoesLeather");
                            case "Perfumes & Beauty":
                              return l("categories.perfumesBeauty");
                            case "Restaurants":
                              return l("categories.restaurants");
                            case "Jewels & Watches":
                              return l("categories.jewellsWatches");
                            case "Furniture":
                              return l("categories.furniture");
                            case "Services":
                              return l("categories.services");
                            case "Others":
                              return l("categories.others");
                            default:
                              return cat;
                          }
                        })()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.business_category === "Others" && (
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 4 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="other_business_category"
                    type="text"
                    value={formData.other_business_category}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-300 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("categories.others")}
                  />
                </div>
              )}
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-300 transform ${
                  currentStep === 4 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 5: Target Market */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 5
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : currentStep > 5
                ? "-translate-x-full opacity-0 pointer-events-none"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Product Price */}
              <div
                className={`transition-all duration-700 delay-100 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  {l("labels.productPrice")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {productPriceOptions.map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-[5px] cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                        formData.product_price === item.value
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-500 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_price"
                        value={item.value}
                        checked={formData.product_price === item.value}
                        onChange={(e) =>
                          handleSelectChange("product_price", e.target.value)
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-500 focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {(() => {
                          switch (item.value) {
                            case "low":
                              return l("options.low");
                            case "average":
                              return l("options.average");
                            case "high":
                              return l("options.high");
                            default:
                              return item.label;
                          }
                        })()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Target Customer */}
              <div
                className={`transition-all duration-700 delay-500 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  {l("labels.targetedCustomers")}
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {targetCustomerOptions.map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-[5px] cursor-pointer p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        formData.target_customer === item.value
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-500 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="target_customer"
                        value={item.value}
                        checked={formData.target_customer === item.value}
                        onChange={(e) =>
                          handleSelectChange("target_customer", e.target.value)
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-500 focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {(() => {
                          switch (item.value) {
                            case "women":
                              return l("subcategories.women");
                            case "gents":
                              return l("subcategories.gents");
                            case "kids":
                              return l("subcategories.kids");
                            case "family":
                              return l("subcategories.family");
                            default:
                              return item.label;
                          }
                        })()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Income */}
              <div
                className={`transition-all duration-700 delay-300 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  {l("labels.customerIncome")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {incomeOptions.map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-[5px] cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                        formData.icome === item.value
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-500 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="icome"
                        value={item.value}
                        checked={formData.icome === item.value}
                        onChange={(e) =>
                          handleSelectChange("icome", e.target.value)
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-500 focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {(() => {
                          switch (item.value) {
                            case "average":
                              return l("options.average");
                            case "above-average":
                              return l("options.aboveAverage");
                            case "high":
                              return l("options.high");
                            default:
                              return item.label;
                          }
                        })()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-400 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 6: Location Requirements */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 6
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div
                className={`transition-all duration-700 delay-100 transform ${
                  currentStep === 6 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Input
                  name="location_name"
                  type="text"
                  required
                  value={formData.location_name}
                  onChange={handleInputChange}
                  className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                  placeholder={l("placeholders.requiredLocation")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-150 transform ${
                    currentStep === 6 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="shop_no"
                    type="text"
                    value={formData.shop_no}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.shopNo")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 6 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="floor_no"
                    type="text"
                    value={formData.floor_no}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.floorNo")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 6 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="area_no"
                    type="text"
                    value={formData.area_no}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.areaNo")}
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    currentStep === 6 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="required_area"
                    type="number"
                    value={formData.required_area}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228]"
                    placeholder={l("placeholders.requiredArea")}
                    min="0"
                  />
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-350 transform ${
                  currentStep === 6 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <textarea
                  name="other_conditions"
                  value={formData.other_conditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-2 border-gray-500 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 focus:border-[#DEA228] resize-none"
                  placeholder={l("placeholders.otherConditions")}
                />
              </div>

              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-400 transform ${
                  currentStep === 6 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>{l("buttons.next")}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Step 7: File Uploads */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentStep === 7
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Company Profile Upload */}
              <div
                className={`transition-all duration-700 delay-100 transform ${
                  currentStep === 7 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="space-y-3">
                  <label className="text-sm sm:text-md font-medium text-gray-800">
                    Company Profile (PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="company_profile"
                      accept=".pdf"
                      onChange={handleInputChange}
                      className="hidden"
                      id="company_profile"
                    />
                    <label
                      htmlFor="company_profile"
                      className="flex items-center justify-center w-full h-16 sm:h-20 bg-gray-50 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-100 hover:border-[#DEA228] transition-all duration-300 group"
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-[#DEA228] mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-500 group-hover:text-[#DEA228]">
                          {formData.company_profile
                            ? formData.company_profile.name
                            : "Click to upload company profile"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Brand Presentation Upload */}
              <div
                className={`transition-all duration-700 delay-200 transform ${
                  currentStep === 7 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="space-y-3">
                  <label className="text-sm sm:text-md font-medium text-gray-800">
                    Brand Presentation (PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="brand_presentation"
                      accept=".pdf"
                      onChange={handleInputChange}
                      className="hidden"
                      id="brand_presentation"
                    />
                    <label
                      htmlFor="brand_presentation"
                      className="flex items-center justify-center w-full h-16 sm:h-20 bg-gray-50 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-100 hover:border-[#DEA228] transition-all duration-300 group"
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-[#DEA228] mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-500 group-hover:text-[#DEA228]">
                          {formData.brand_presentation
                            ? formData.brand_presentation.name
                            : "Click to upload brand presentation"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Shop Photos Upload */}
              <div
                className={`transition-all duration-700 delay-300 transform ${
                  currentStep === 7 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="space-y-3">
                  <label className="text-sm sm:text-md font-medium text-gray-800">
                    Shop Photos (Multiple Images)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="shop_photos"
                      accept="image/*"
                      multiple
                      onChange={handleInputChange}
                      className="hidden"
                      id="shop_photos"
                    />
                    <label
                      htmlFor="shop_photos"
                      className="flex items-center justify-center w-full h-16 sm:h-20 bg-gray-50 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-100 hover:border-[#DEA228] transition-all duration-300 group"
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-[#DEA228] mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-500 group-hover:text-[#DEA228]">
                          {formData.shop_photos &&
                          formData.shop_photos.length > 0
                            ? `${formData.shop_photos.length} file(s) selected`
                            : "Click to upload shop photos"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-400 transform ${
                  currentStep === 7 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{l("buttons.previous")}</span>
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !isCurrentStepValid() || isSubmitting || isTransitioning
                  }
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{l("buttons.processing")}</span>
                    </div>
                  ) : (
                    <>
                      <span>{l("buttons.submit")}</span>
                      <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactFormProject;

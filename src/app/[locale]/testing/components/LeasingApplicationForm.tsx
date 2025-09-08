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

interface ContactFormProps {
  handleReloadAnimation?: () => void;
}

interface CategoryOptions {
  women: boolean;
  gents: boolean;
  kids: boolean;
  family: boolean;
}

const ContactFormProject = ({ handleReloadAnimation }: ContactFormProps) => {
  const t = useTranslations("home");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Contact Info (Step 1)
    name: "",
    email: "",
    phone: "",
    companyName: "",
    postalAddress: "",
    website: "",
    fax: "",

    // Contact Person Details (Step 2)
    responsiblePerson: "",
    position: "",
    mobile: "",

    // Brand Information (Step 3)
    agencyBrandName: "",
    franchiseOwner: "",
    countryOfOrigin: "",
    branchesInEgypt: "",
    branchesOutsideEgypt: "",

    // Business Categories (Step 4)
    clothes: {
      women: false,
      gents: false,
      kids: false,
      family: false,
    } as CategoryOptions,
    accessories: {
      women: false,
      gents: false,
      kids: false,
      family: false,
    } as CategoryOptions,
    shoesLeather: {
      women: false,
      gents: false,
      kids: false,
      family: false,
    } as CategoryOptions,
    perfumesBeauty: false,
    restaurants: false,
    jewellsWatches: false,
    furniture: "",
    services: "",
    others: "",

    // Target Market (Step 5)
    productPrice: "",
    targetedCustomers: {
      women: false,
      gents: false,
      kids: false,
      family: false,
    } as CategoryOptions,
    customerIncome: "",

    // Location Information (Step 6)
    requiredLocation: "",
    shopNo: "",
    floorNo: "",
    areaNo: "",
    requiredArea: "",
    otherConditions: "",

    // Original inquiry field
    inquiry: "",
  });

  const locale = useLocale();
  const totalSteps = 6;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (
    category: "clothes" | "accessories" | "shoesLeather" | "targetedCustomers",
    subcategory: keyof CategoryOptions,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: checked,
      },
    }));
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

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Form submitted:", formData);
      setCurrentStep(1);
    }, 2000);
  };

  // Validation functions for each step
  const isStep1Valid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== ""
    );
  };

  const isStep2Valid = () => {
    return (
      formData.responsiblePerson.trim() !== "" &&
      formData.position.trim() !== ""
    );
  };

  const isStep3Valid = () => {
    return (
      formData.agencyBrandName.trim() !== "" &&
      formData.countryOfOrigin.trim() !== ""
    );
  };

  const isStep4Valid = () => {
    return true; // Optional fields
  };

  const isStep5Valid = () => {
    return formData.productPrice !== "" && formData.customerIncome !== "";
  };

  const isStep6Valid = () => {
    return formData.requiredLocation.trim() !== "";
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
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Company & Contact Information";
      case 2:
        return "Responsible Person Details";
      case 3:
        return "Brand Information";
      case 4:
        return "Business Categories";
      case 5:
        return "Target Market";
      case 6:
        return "Location Requirements";
      default:
        return "";
    }
  };

  const categoryItems = [
    { key: "women" as keyof CategoryOptions, label: "Women" },
    { key: "gents" as keyof CategoryOptions, label: "Men" },
    { key: "kids" as keyof CategoryOptions, label: "Kids" },
    { key: "family" as keyof CategoryOptions, label: "Family" },
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

        {/* <ProgressIndicator /> */}

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
          Step {currentStep} of {totalSteps}
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
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Company Name"
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
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder={t("your_name")}
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
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder={t("your_email")}
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
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder={t("your_phone")}
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
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Website"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-350 transform ${
                    currentStep === 1 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="fax"
                    type="tel"
                    value={formData.fax}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Fax"
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
                  name="postalAddress"
                  value={formData.postalAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-0 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 resize-none"
                  placeholder="Postal Address"
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
                  <span>Next</span>
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
                    name="responsiblePerson"
                    type="text"
                    required
                    value={formData.responsiblePerson}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Responsible Person"
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
                    name="position"
                    type="text"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Position"
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
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Mobile"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-250 transform ${
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
                  <span>Previous</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>Next</span>
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
                    name="agencyBrandName"
                    type="text"
                    required
                    value={formData.agencyBrandName}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Brand Name"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-150 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Select
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    value={formData.franchiseOwner}
                    onValueChange={(value) =>
                      handleSelectChange("franchiseOwner", value)
                    }
                  >
                    <SelectTrigger className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 w-full transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105">
                      <SelectValue placeholder="Franchise Owner?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-2xl">
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="countryOfOrigin"
                    type="text"
                    required
                    value={formData.countryOfOrigin}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Country of Origin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <textarea
                    name="branchesInEgypt"
                    value={formData.branchesInEgypt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-0 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 resize-none"
                    placeholder="Branches in Egypt"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    currentStep === 3 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <textarea
                    name="branchesOutsideEgypt"
                    value={formData.branchesOutsideEgypt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-0 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 resize-none"
                    placeholder="Branches Outside Egypt"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-350 transform ${
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
                  <span>Previous</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>Next</span>
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
              {/* Clothes Category */}
              <div
                className={`transition-all duration-700 delay-100 transform ${
                  currentStep === 4 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  Clothes
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {categoryItems.map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center cursor-pointer p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        formData.clothes[item.key]
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-200 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.clothes[item.key]}
                        onChange={(e) =>
                          handleCategoryChange(
                            "clothes",
                            item.key,
                            e.target.checked
                          )
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-300 rounded focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    currentStep === 4 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="furniture"
                    type="text"
                    value={formData.furniture}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Furniture (specify)"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-250 transform ${
                    currentStep === 4 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="services"
                    type="text"
                    value={formData.services}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Services (specify)"
                  />
                </div>
                <div
                  className={`transition-all duration-700 delay-300 transform ${
                    currentStep === 4 && !isTransitioning
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Input
                    name="others"
                    type="text"
                    value={formData.others}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Others (specify)"
                  />
                </div>
              </div>

              <div
                className={`flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 transition-all duration-700 delay-350 transform ${
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
                  <span>Previous</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>Next</span>
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
                  Product Price Range
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: "low", label: "Low" },
                    { value: "average", label: "Average" },
                    { value: "high", label: "High" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                        formData.productPrice === item.value
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-200 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="productPrice"
                        value={item.value}
                        checked={formData.productPrice === item.value}
                        onChange={(e) =>
                          handleSelectChange("productPrice", e.target.value)
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-300 focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Targeted Customers */}
              <div
                className={`transition-all duration-700 delay-200 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  Targeted Customers
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {categoryItems.map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center cursor-pointer p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        formData.targetedCustomers[item.key]
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-200 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.targetedCustomers[item.key]}
                        onChange={(e) =>
                          handleCategoryChange(
                            "targetedCustomers",
                            item.key,
                            e.target.checked
                          )
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-300 rounded focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Income */}
              <div
                className={`transition-all duration-700 delay-300 transform ${
                  currentStep === 5 && !isTransitioning
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h4 className="text-sm sm:text-md font-medium text-gray-800 mb-3 sm:mb-4">
                  Customer Income Level
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: "average", label: "Average" },
                    { value: "above-average", label: "Above Average" },
                    { value: "high", label: "High" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                        formData.customerIncome === item.value
                          ? "border-[#DEA228] bg-[#DEA228]/10 scale-105"
                          : "border-gray-200 hover:border-[#DEA228]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="customerIncome"
                        value={item.value}
                        checked={formData.customerIncome === item.value}
                        onChange={(e) =>
                          handleSelectChange("customerIncome", e.target.value)
                        }
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#DEA228] border-gray-300 focus:ring-[#DEA228]"
                      />
                      <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium">
                        {item.label}
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
                  <span>Previous</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isTransitioning}
                  className="bg-[#DEA228] hover:bg-[#c8911e] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl h-auto transition-all duration-300 transform hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span>Next</span>
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
                  name="requiredLocation"
                  type="text"
                  required
                  value={formData.requiredLocation}
                  onChange={handleInputChange}
                  className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                  placeholder="Required Location"
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
                    name="shopNo"
                    type="text"
                    value={formData.shopNo}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Shop Number (Optional)"
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
                    name="floorNo"
                    type="text"
                    value={formData.floorNo}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Floor Number (Optional)"
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
                    name="areaNo"
                    type="text"
                    value={formData.areaNo}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Area Number (Optional)"
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
                    name="requiredArea"
                    type="number"
                    value={formData.requiredArea}
                    onChange={handleInputChange}
                    className="h-12 sm:h-16 bg-gray-50 border-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105"
                    placeholder="Required Area (sq meters)"
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
                  name="otherConditions"
                  value={formData.otherConditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-0 rounded-xl sm:rounded-2xl text-gray-600 placeholder:text-gray-400 transition-all duration-300 focus:bg-white focus:shadow-lg focus:scale-105 resize-none"
                  placeholder="Other Conditions or Requirements"
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
                  <span>Previous</span>
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
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Application</span>
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
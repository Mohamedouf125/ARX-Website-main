import React, { useState } from 'react';

const countryCodes = [
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  // Add more countries as needed
];

const CountryCodeSelect = () => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);

  const handleChange = (e) => {
    const selected = countryCodes.find((item) => item.code === e.target.value);
    setSelectedCode(selected);
  };

  return (
    <div className="px-3 py-2 bg-gray-100 rounded-md">
      <select
        value={selectedCode.code}
        onChange={handleChange}
        className="bg-transparent border-none outline-none w-full"
      >
        {countryCodes.map(({ code, name, dialCode }) => (
          <option key={code} value={code}>
            {dialCode} {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryCodeSelect;

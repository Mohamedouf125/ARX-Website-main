import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberInput = () => {
  const [value, setValue] = useState();

  return (
    <div className="px-3 py-2 bg-gray-100 rounded-md">
      <PhoneInput
        international
        defaultCountry="EG"
        value={value}
        onChange={setValue}
        className="w-full border-none rounded-md"
        placeholder="Enter phone number"
      />
    </div>
  );
};

export default PhoneNumberInput;

import React, { useState, useRef, useEffect } from 'react';
import './agepicker.css'

 // Import custom styles

const AgePicker = ({ setInput }) => {
  const [selectedAge, setSelectedAge] = useState(37);
  const scrollContainer = useRef(null);
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  const [age, setage] = useState(null)

  // Function to center the selected age
  const scrollToCenter = (age) => {
    setSelectedAge(age);
    setInput((prev) => ({ ...prev, age }));  // Update the input in the App.jsx
   

    const container = scrollContainer.current;
    const ageIndex = ages.indexOf(age);
    const ageWidth = 70;  // Width of each age item
    const containerWidth = container.clientWidth;

    const offset = (containerWidth / 2) - (ageWidth / 2);

    container.scrollTo({
      left: ageIndex * ageWidth - offset,
      behavior: 'smooth',
    });
  };

  // Automatically center the selected age on mount
  useEffect(() => {
    scrollToCenter(selectedAge);

    const container = scrollContainer.current;

    // Enable horizontal scrolling with the mouse wheel
    const handleWheelScroll = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;  // Horizontal scroll
    };

    container.addEventListener('wheel', handleWheelScroll);
    return () => container.removeEventListener('wheel', handleWheelScroll);
  }, [selectedAge]);

  return (
    <div className="age-picker-container">
      <div>
        
        <span className='text-2xl' >Age</span>
        <p className='mt-5 text-5xl  fw-bolder'>{age}</p>
      </div>

      <div className="scroll-wrapper" ref={scrollContainer}>
        <div className="scroll-content">
          {ages.map((age) => (
            <div style={{}}
              key={age}
              className={`age-item ${selectedAge === age ? 'selected text-center ' : ''}`}
              onClick={() =>{ scrollToCenter(age),setage(age)} }
            >
            <p>{age}</p>  

            </div>
          ))}
        </div>
      </div>

      <div className="triangle"></div>
    </div>
  );
};

export default AgePicker;

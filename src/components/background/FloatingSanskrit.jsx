import React from 'react';

const FloatingSanskrit = () => {
  const letters = [
    { char: 'ॐ', top: '20%', left: '10%', delay: '0s', duration: '8s' },
    { char: 'अ', top: '70%', left: '15%', delay: '2s', duration: '10s' },
    { char: 'ध', top: '40%', left: '85%', delay: '1s', duration: '9s' },
    { char: 'कर्म', top: '80%', left: '80%', delay: '3s', duration: '11s' },
    { char: 'योग', top: '15%', left: '80%', delay: '4s', duration: '7s' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <style>{`
        @keyframes floatSanskrit {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>
      {letters.map((item, index) => (
        <span
          key={index}
          className="absolute font-serif text-amber-200 select-none text-3xl md:text-5xl blur-[0.5px]"
          style={{
            top: item.top,
            left: item.left,
            animation: `floatSanskrit ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};

export default FloatingSanskrit;
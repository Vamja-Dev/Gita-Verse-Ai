import React from 'react';

const MandalaLayer = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10 animate-[spin_120s_linear_infinite]">
      <div className="w-[800px] h-[800px] rounded-full border border-amber-500/20 flex items-center justify-center">
        <div className="w-[650px] h-[650px] rounded-full border border-amber-400/10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border border-amber-300/10" />
        </div>
      </div>
    </div>
  );
};

export default MandalaLayer;
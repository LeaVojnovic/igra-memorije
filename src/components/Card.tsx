import React from "react";

type CardProps = {
  icon: string; 
  isFlipped: boolean; 
  onClick: () => void; 
};

const Card: React.FC<CardProps> = ({ icon, isFlipped, onClick }) => {
    return (
        <div
        className={`w-16 h-16 flex items-center justify-center border-2 border-white rounded-lg bg-gray-700 cursor-pointer transition-transform transform hover:bg-gray-600 hover:scale-105`}
        onClick={onClick}
      >
        {isFlipped && <span className="text-xl">{icon}</span>}
      </div>
    );
  };
export default Card;

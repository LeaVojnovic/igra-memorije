import React from "react";

type CardProps = {
  icon: string; // Ikona kartice (emoji)
  isFlipped: boolean; // Je li kartica okrenuta prema gore
  onClick: () => void; // Funkcija koja se poziva kada kliknemo karticu
};

const Card: React.FC<CardProps> = ({ icon, isFlipped, onClick }) => {
    return (
      <div className="card" onClick={onClick}>
        {isFlipped && <span>{icon}</span>}
      </div>
    );
  };
export default Card;

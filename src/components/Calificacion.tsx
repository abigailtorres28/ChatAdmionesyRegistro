import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStars = ({ onRate }: { onRate: (rating: number) => void }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex justify-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered !== null
          ? star <= hovered
          : star <= (selected ?? 0);

        return (
          <button
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              setSelected(star);
              onRate(star); // ejecuta lógica de cierre, limpieza, etc.
            }}
            className="text-2xl transition-transform hover:scale-110"
          >
            {isFilled ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-yellow-400" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars; 
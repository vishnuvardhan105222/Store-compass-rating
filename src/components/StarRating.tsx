import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isPartial = starRating - 0.5 <= rating && starRating > rating;

        return (
          <button
            key={index}
            type="button"
            className={cn(
              'relative transition-colors',
              interactive
                ? 'hover:scale-110 cursor-pointer'
                : 'cursor-default'
            )}
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled
                  ? 'fill-rating-gold text-rating-gold'
                  : isPartial
                  ? 'fill-rating-gold/50 text-rating-gold'
                  : 'fill-none text-rating-silver'
              )}
            />
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
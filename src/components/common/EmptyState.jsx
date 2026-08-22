import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon,
  title = "Nothing Found",
  description = "We couldn't find any items matching your selection.",
  actionLabel = "Explore Collection",
  actionLink = "/shop",
  onAction,
}) => {
  return (
    <div className="py-16 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-2xl font-bold text-luxury-black mb-2">
        {title}
      </h3>
      <p className="text-xs text-neutral-500 max-w-xs mb-6 leading-relaxed">
        {description}
      </p>

      {onAction ? (
        <button onClick={onAction} className="btn-luxury text-xs">
          {actionLabel}
        </button>
      ) : actionLink ? (
        <Link to={actionLink} className="btn-luxury text-xs">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;

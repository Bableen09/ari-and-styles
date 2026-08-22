import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-0">
      <ol className="flex items-center space-x-2 text-[11px] font-medium tracking-wider uppercase text-neutral-500 overflow-x-auto no-scrollbar">
        <li>
          <Link
            to="/"
            className="hover:text-luxury-black transition-colors inline-flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2 flex-shrink-0">
              <ChevronRight className="w-3 h-3 text-neutral-400" />
              {isLast ? (
                <span className="font-bold text-luxury-black truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-luxury-black transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

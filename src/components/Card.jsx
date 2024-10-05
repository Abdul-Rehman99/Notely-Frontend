import React from 'react';
import { Tag, Edit2, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const Card = ({ title, description, category, date }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm w-full mx-auto transition-colors duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className="inline-block bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 text-xs font-semibold rounded-full px-2 py-1">
          {category}
        </span>
        <div className="flex space-x-2">
          <Checkbox />
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <Edit2 size={16} />
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Tag size={14} className="mr-1" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default Card;
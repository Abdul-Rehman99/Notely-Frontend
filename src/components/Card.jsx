import React from 'react';
import { Tag, Edit2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';

const Card = ({ title, description, category, date }) => {
  const categoryColor = 
  {
    personal: 'bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200',
    home: 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200',
    business: 'bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200'
  }
  return (
    <div className="bg-white relative space-y-1.5 dark:bg-gray-800 rounded-lg shadow-xl p-4 pb-3 max-w-sm w-full mx-auto transition-colors duration-200">
      <div className="flex justify-between items-center">{/*mb-2 items-start*/}
        <span className={`inline-block text-xs font-semibold rounded-full px-2 py-1 ${categoryColor[category]}`}>
          {category}
        </span>
        <div className="flex space-x-2">
          <Checkbox />
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UpdateDialog/>
          </button>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <DeleteDialog />
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{title}</h2>{/*mb-2*/}
      <p className="leading-tight text-gray-600 dark:text-gray-300 mb-2">{description}</p> {/*mb-3 */}
      <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
        <Tag size={14} className="mr-1" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default Card;
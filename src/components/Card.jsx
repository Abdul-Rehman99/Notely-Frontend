import { Tag } from 'lucide-react';
import UpdateDialog from './UpdateDialog';
import DeleteDialog from './DeleteDialog';
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import { Context } from "../App";
import { useContext } from 'react';

const Card = ({ id, title, description, category, isCompleted, date }) => {
  const { setIsTaskModified } = useContext(Context)
  const categoryColor = {
    personal: 'bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200',
    home: 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200',
    business: 'bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200'
  };

  const completedStyles = isCompleted
    ? 'opacity-90 shadow-xl bg-gray-100 dark:bg-gray-700'
    : 'bg-white shadow-lg dark:bg-gray-800';

  const handleIsCompleted = async(id,isCompleted) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/todo/${id}`,
        {isCompleted},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  
          }
        }
      )
      console.log(response.data)
      setIsTaskModified(prev => !prev)
    } 
    catch (error) {
      console.log("Error in Upadting isCompleted state")
      console.log(error.resonse ? error.resonse.data.message: error.message)
    }
  }

  return (
    <div className={`relative space-y-1.5 rounded-lg border p-4 pb-3 max-w-sm w-full mx-auto transition-colors duration-200 ${completedStyles}`}>
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Completed
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className={`inline-block text-xs font-semibold rounded-full px-2 py-1 ${categoryColor[category]}`}>
          {category}
        </span>
        <div className="flex space-x-2">
          <Checkbox checked={isCompleted} onCheckedChange={() => handleIsCompleted(id,!isCompleted)}/>
          {!isCompleted &&
          (<button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <UpdateDialog data={{id, title, description, category}} />
          </button>)
          }
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <DeleteDialog id={id} />
          </button>
        </div>
      </div>
      <h2 className={`text-xl font-bold mb-1 ${isCompleted ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>
        {title}
      </h2>
      <p className={`leading-tight mb-2 ${isCompleted ? 'text-gray-500 dark:text-gray-500 line-through' : 'text-gray-600 dark:text-gray-300'}`}>
        {description}
      </p> 
      <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
        <Tag size={14} className="mr-1" />
        <span>{new Date(date).toLocaleDateString('en-GB')}</span>
      </div>
    </div>
  );
};

export default Card;


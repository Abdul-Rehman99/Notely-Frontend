import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from 'lucide-react';

const DeleteDialog = ({id}) => {

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/todo/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  
          }
        }
      )
      console.log('Response:', response.data);
    } 
    catch (error) {
      console.error('Error in Deleting Todo :', error.response ? error.response.data : error.message);
    }

  }

  return (
    <AlertDialog className="max-w-52">
      <AlertDialogTrigger asChild>
      <Trash2 size={16} /> 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete note</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure you want to delete this note?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-red-600 text-gray-100 hover:bg-red-700 dark:bg-red-800">
            <Button onClick={handleDelete}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;

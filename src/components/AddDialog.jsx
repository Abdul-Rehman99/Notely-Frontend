import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

const AddDialog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false)

  const clearForm = () => {
    setTitle('')
    setCategory('personal');
    setDescription('');
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (description.length > 200) {
      newErrors.description = 'Description must not exceed 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { title, category, description });
      // Here you would typically send the data to your backend
      try {
        const response = await axios.post('http://localhost:8080/api/todo',
          { title, category, description },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  
            }
          }
        )
        console.log('Response:', response.data);
      } 
      catch (error) {
        console.error('Error in Creating Todo :', error.response ? error.response.data : error.message);
      }
      
      clearForm();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogTitle className="text-2xl font-semibold">New note</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                  errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (optional)
              </Label>
              <span className={`text-sm ${description.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                {description.length}/200
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Type your description here."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200'
              }`}
              rows={4}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">
              Add Note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
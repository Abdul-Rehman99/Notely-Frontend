import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Context } from '../App'
import { useToast } from "../hooks/use-toast.js"

const SignupDialog = ({ isOpen, onClose, onLoginClick }) => {
  const { toast } = useToast()
  const { setIsLogedIn } = useContext(Context);
  const [UserName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!UserName.trim()) newErrors.username = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup form submitted:', { username:UserName, email, password });
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
          { username:UserName, email, password }
        )
        const token = response.data.token;
        console.log("JWT Token:", token);
        localStorage.setItem('jwtToken', token);
        setIsLogedIn(true)
        onClose()
        window.location.reload();
      } 
      catch (error) {
        console.error("Error during authentication:", error.response.data);
        onClose()
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.response ? error.response.data.message : error.message,
          variant: "destructive"
        })
        localStorage.clear()
      }

    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-2xl font-bold">Sign Up</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-300 focus:ring-blue-200'
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={onLoginClick} className="text-gray-800 hover:underline dark:text-gray-300 font-semobold">
              Log in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
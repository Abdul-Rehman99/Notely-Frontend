import  { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Context } from '../App';
import { useToast } from "../hooks/use-toast.js"


const LoginDialog = ({ isOpen, onClose, onSignupClick }) => {
  const { toast } = useToast()
  const { setIsLogedIn } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const clearForm = ( ) => {
    setEmail('')
    setPassword('')
    setErrors('')
  }

  const validateForm = () => {
    const newErrors = {};
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
      console.log('Login form submitted:', { email, password });
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
          {email,password}
        )
        const token = response.data.token; 
        console.log("JWT Token:", token);
        localStorage.setItem('jwtToken', token);
        setIsLogedIn(true)
        onClose();
        window.location.reload();
      } 
      catch (error) {
        // console.log('Error:', error.response ? error.response.data.message : error.message);
        console.log("Server Error -",error.response.data)
        onClose();
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.response ? error.response.data.message : error.message,
          variant: "destructive"
        })
        clearForm()
        localStorage.clear()
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input
              id="email"
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
            <Button type="button" variant="outline" onClick={onClose} >
              Cancel
            </Button>
            <Button type="submit" >
              Login
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Button  variant="Link" onClick={onSignupClick} className="font-semibold hover:underline text-gray-800 dark:text-gray-300 ">{/**className="text-blue-500 hover:underline font-medium" */}
              Sign up
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
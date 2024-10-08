import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Notebook, ArrowRight } from 'lucide-react';
import { Context } from '../App';

const WelcomePage = () => {
  const { setIsLoginOpen } = useContext(Context)
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Notebook className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to Notely</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Your personal space for ideas, thoughts, and memories.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
            "The palest ink is better than the best memory."
          </blockquote>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">- Chinese Proverb</p>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button 
            onClick={() => setIsLoginOpen(true)} 
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-colors duration-300"
          >
            Start Writing
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
            Log in to access your notes, create new ones, and stay organized.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomePage;
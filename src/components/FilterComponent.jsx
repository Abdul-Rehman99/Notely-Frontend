import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CardList from "./CardList";
const sampleTasks = [
  {
    title: "Complete React Webpage",
    description: "I have to complete react project today at any how",
    category: "Personal",
    date: "26/7/2024",
  },
  {
    title: "Write Documentation",
    description: "Document the new features for the upcoming release",
    category: "Work",
    date: "27/7/2024",
  },
  {
    title: "Complete React Webpage",
    description: "I have to complete react project today at any how",
    category: "Personal",
    date: "26/7/2024",
  },
  {
    title: "Write Documentation",
    description: "Document the new features for the upcoming release",
    category: "Work",
    date: "27/7/2024",
  },
  {
    title: "Team Meeting",
    description: "Discuss project progress and next steps",
    category: "Work",
    date: "29/7/2024",
  }
  // Add more tasks as needed
];
const FilterComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Your Notes</h1>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between gap-4 flex-col-reverse md:flex-row">
          <TabsList>
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="home">HOME</TabsTrigger>
            <TabsTrigger value="business">BUSINESS</TabsTrigger>
            <TabsTrigger value="personal">PERSONAL</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Show only completed notes</Label>
          </div>
        </div>
        <TabsContent value="all">
          <div className="min-h-screen">
            <CardList tasks={sampleTasks.slice(0, 2)} />
          </div>
        </TabsContent>
        <TabsContent value="home">
          <div className="min-h-screen">
            <CardList tasks={sampleTasks.slice(0, 4)} />
          </div>
        </TabsContent>
        <TabsContent value="business">
          <div className="min-h-screen">
            <h1 className="text-4xl text-center pt-16 font-bold dark:text-slate-100">Ooop! Page not Found</h1>
          </div>
        </TabsContent>
        <TabsContent value="personal">
          <div className="min-h-screen">
            <CardList tasks={sampleTasks.slice(0, 3)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterComponent;

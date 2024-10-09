import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CardList from "./CardList";
import axios from "axios";
import { Context } from "../App";
import { useContext } from 'react';

const FilterComponent = () => {
  const [sampleTasks,setSampleTasks] = useState([])
  const [isCheked,setIsChecked] = useState(false)
  const { isTaskModified, searchQuery } = useContext(Context);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`http://localhost:8080/api/todos?isChecked=${isCheked}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        })
        console.log(response.data)
        setSampleTasks(response.data)
        setData(response.data)
      } 
      catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    }
    fetchData()
  },[isTaskModified,isCheked])

  const filteredTasks = sampleTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Checkbox id="terms" onCheckedChange={() => setIsChecked(prev => !prev)}/>
            <Label htmlFor="terms">Show only completed notes</Label>
          </div>
        </div>
        <TabsContent value="all">
          <div className="min-h-screen">
            <CardList tasks={filteredTasks} />
          </div>
        </TabsContent>
        <TabsContent value="home">
          <div className="min-h-screen">
            <CardList tasks={filteredTasks.filter(({category}) => category==="home")}/>
          </div>
        </TabsContent>
        <TabsContent value="business">
          <div className="min-h-screen">
          <CardList tasks={filteredTasks.filter(({category}) => category==="business")}/>
          </div>
        </TabsContent>
        <TabsContent value="personal">
          <div className="min-h-screen">
            <CardList tasks={filteredTasks.filter(({category}) => category==="personal")}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterComponent;

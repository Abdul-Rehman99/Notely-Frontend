import React from 'react'
import Card from './Card'

const CardList = ({tasks}) => {
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tasks.map((task, index) => (
        <Card
          key={task._id+index}
          id={task._id}
          title={task.title}
          description={task.description}
          category={task.category}
          date={task.updatedAt}
        />
      ))}
    </div>
  </div>
  )
}

export default CardList
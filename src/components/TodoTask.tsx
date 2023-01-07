import { Trash, CheckCircle } from 'phosphor-react';

import { ITask } from '../interface';

import styles from './TodoTask.module.css';

interface TaskProps {
  task: ITask,
  handleDeleteTask(DeleteTaskById: number): void,
  onComplete: (taskId: number) => void
}

export function TodoTask({ task, handleDeleteTask, onComplete }: TaskProps) {


  return (
    <div className={ styles.taskContent }>
      
      <button 
        className={ styles.checkContainer }
        onClick={() => onComplete(task.id)}
        > {task.isCompleted ? <CheckCircle 
            size={20} 
            color="#5e60ce" 
            weight="fill" 
        /> : <div/>}
        
      </button>

      <p 
        className={ task.isCompleted ? styles.textCompleted : ''}>
          { task.nameTask }
      </p>
      
      <button
        className={ styles.deleteButton }
        onClick={() => handleDeleteTask(task.id)}>
          <Trash size={20}/>
      </button>
    </div>
  )
}
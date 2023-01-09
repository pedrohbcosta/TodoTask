import { ChangeEvent, useState } from 'react'

import { PlusCircle, ClipboardText } from 'phosphor-react';

import styles from './App.module.css'
import { Header } from './components/Header'
import { TodoTask } from './components/TodoTask'
import { ITask } from './interface'

export function App() {
  const [task, setTask] = useState<string>('')

  const [todo, setTodo] = useState<ITask[]>([])

  const tasksQuantity = todo.length

  const completedTasks = todo.filter(todo => todo.isCompleted).length

  const isNewTaskEmpty = task.length === 0

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTask(event.target.value);
  }

  function handleAddTask() {
    const idRandom = (num: number) => Math.floor(Math.random() * num)

    const newTask = { id : idRandom(999999), nameTask : task, isCompleted: false }

    setTodo([...todo, newTask]);

    setTask('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTask('');
    } else if (event.key === 'Enter') {
      
      const idRandom = (num: number) => Math.floor(Math.random() * num)

      const newTask = { id : idRandom(999999), nameTask : task, isCompleted: false }

      setTodo([...todo, newTask]);

      setTask('');
    }
  }

  function handleInvalidTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo deve ser preenchido!')
  }

  function handleDeleteTask(DeleteTaskById: number) {
    setTodo(todo.filter((taskName) => taskName.id !== DeleteTaskById))
  }

  function toggleTaskCompletedById(taskId: number) {
    const newTasks = todo.map(task => {
      if (task.id === taskId) {
        return {
          ...task, 
          isCompleted: !task.isCompleted 
        };
      }
      return task;
    });
    setTodo(newTasks);
  }

  return (
    <div>
      
      <Header />
      
      <main >
        <header className={ styles.inputContainer }>
          <input 
            className={ styles.addTask }
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={task}
            onChange={handleNewTask}
            onKeyDown={handleKeyDown}
            onInvalid={handleInvalidTask}
            required/>
          
          <button
            className={ styles.addButton }
            type='submit'
            onClick={handleAddTask}
            disabled={isNewTaskEmpty}>
              Criar
              <PlusCircle size={20} />
          </button>
        </header>

        <section className={ styles.todos }>
          <header className={ styles.todosHeader }>
            <div className={ styles.createdTodos }>
              <p>Tarefas criadas 
                <span 
                  className={styles.createdTodosCounting}>
                    { tasksQuantity }
                </span>
              </p>
            </div>
            
            <div className={ styles.doneTodos }>
              <p>Concluidas
                <span 
                  className={ styles.doneTodosCounting }>
                    { completedTasks } de { tasksQuantity }
                </span>
              </p>
            </div>
          </header>
        </section>

        <footer className={ styles.taskBox }>
          {todo.map((task, key) => (
            <TodoTask 
              key={key} 
              task={task} 
              handleDeleteTask={handleDeleteTask}
              onComplete={toggleTaskCompletedById}/>
          ))}
        </footer>
        
        {todo.length <= 0 && (
          <section className={ styles.empyt}>
            <ClipboardText size={56} opacity={0.3} />
              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
          </section>
        )}
      </main>
      
    </div>
  )
}



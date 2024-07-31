import Footer from './components/Footer'
import Header from './components/Header'
import styles from "./App.module.css"
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { ITask } from './interfaces/Task'
import { useState } from 'react'
import Modal from './components/Modal'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskUpdate, setTaskUpdate] = useState<ITask | null>(null);

  const deleteTask = (id:number) => {
      setTaskList(
        taskList.filter((task) => {
          return task.id !== id;
        })
      )

  }

  const hideShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if(display){
      modal!.classList.remove("hide");

    }else {
      modal!.classList.add("hide");
    }

  }


  const editTastk = (task: ITask): void => {
    hideShowModal(true);
    setTaskUpdate(task)
  }

  const updateEditTastk = (id:number, title:string, diffyculty: number): void => {
    const update: ITask = { id, title, diffyculty};
    const updateList = taskList.map((task) => {
      return task.id === update.id ? update : task;

    })

    setTaskList(updateList)
    hideShowModal(false);
  }

  return (
    <div>
      <Modal  children={<TaskForm btnText={"Editar tarefa"} taskList={taskList} taksUpdate={taskUpdate} handleUpdate={updateEditTastk} />}/>
      <Header />
      <main className={styles.main}>
         <div>
            <h2>O que você vai fazer</h2>
              <TaskForm 
              btnText={"Criar tarefa"}
              taskList={taskList}
              setTaskList={setTaskList}
              />
         </div>

         <div>
            <h2>Suas tarefas</h2>
              <TaskList 
              handleDelete={deleteTask}
              handleEdit={editTastk}
              taskList={taskList}
              />

         </div>
      </main>
    <Footer />
    </div>
  )
}

export default App

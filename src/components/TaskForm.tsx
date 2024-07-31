import styles from "./TaskForm.module.css"
import { ITask } from "../interfaces/Task"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
interface Props {
    btnText: string;
    taskList:ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    taksUpdate?: ITask | null;
    handleUpdate?(id:number, title:string, diffyculty: number):void
}

const TaskForm = ({btnText, taskList, setTaskList, taksUpdate, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [diffyculty, setDifficulty] = useState<number>(0);

    const addTaskHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(handleUpdate){
            handleUpdate(id, title, diffyculty)


        }else {
            const id = Math.floor(Math.random() * 1000);
            const newTask: ITask = {id, title, diffyculty};
    
            setTaskList!([...taskList, newTask]);
    
            setTitle("");
            setDifficulty(0);
            console.log(taskList);
        }


    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title") {
            setTitle(e.target.value)
        } else {
            setDifficulty(parseInt(e.target.value));
        }

    }

    useEffect(() =>{
        if(taksUpdate){
            setId(taksUpdate.id);
            setTitle(taksUpdate.title)
            setDifficulty(taksUpdate.diffyculty)
        }
    }, [taksUpdate])

  return (
    <form onSubmit={addTaskHandle} className={styles.form}>
        <div className={styles.input_container}>
            <label htmlFor="title"> Título: </label>
            <input type="text" name="title" placeholder="Título da tarefa" onChange={handleChange} value={title} />
        </div>
        
        <div className={styles.input_container}>
            <label htmlFor="difficulty"> Dificuldade: </label>
            <input type="number" name="difficulty" placeholder="Dificuldade da tarefa" onChange={handleChange} value={diffyculty}/>
        </div>
        <input type="submit" value={btnText}/>

    </form>    

)
}

export default TaskForm
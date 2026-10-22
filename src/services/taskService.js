// src/services/taskService.js
import * as repository from '../data/taskRepository';

export const fetchAllTasks = async () => {
  const data = await repository.getTasks();
  return data;
};

export const createNewTask = async (title) => {
  // REGRA DE NEGÓCIO: Não permitir criar tarefa sem título
  if (!title || title.trim() === '') {
    throw new Error("O título da tarefa não pode ser vazio.");
  }
  
  // Cria o objeto da tarefa
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false
  };

  // Manda a camada de dados salvar
  await repository.addTask(newTask);
  return newTask;
};

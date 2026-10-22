// src/data/taskRepository.js

// Simulando um banco de dados em memória
let tasks = [
  { id: '1', title: 'Estudar React Native', completed: false },
  { id: '2', title: 'Entregar trabalho de Mobile', completed: true },
];

export const getTasks = async () => {
  // Simula o tempo de resposta de um banco de dados
  return [...tasks]; 
};

export const addTask = async (task) => {
  tasks.push(task);
  return task;
};

// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { fetchAllTasks, createNewTask } from '../services/taskService';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchAllTasks(); 
    setTasks(data);
  };

  const handleAddTask = async () => {
    try {
      await createNewTask(inputText); 
      setInputText('');
      loadTasks(); 
    } catch (error) {
      Alert.alert("Erro", error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={item.completed ? styles.completedText : styles.taskText}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10, borderRadius: 8, backgroundColor: '#fff' },
  taskItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  taskText: { fontSize: 16, color: '#333' },
  completedText: { fontSize: 16, textDecorationLine: 'line-through', color: '#999' }
});

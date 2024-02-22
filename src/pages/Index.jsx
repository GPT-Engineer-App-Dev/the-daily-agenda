import React, { useState } from "react";
import { Box, VStack, Heading, Input, IconButton, HStack, Text, useToast, Container } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4}>
        <Heading>Todo App</Heading>
        <HStack w="full">
          <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a new task..." variant="filled" />
          <IconButton icon={<FaPlus />} onClick={addTodo} aria-label="Add todo" colorScheme="green" />
        </HStack>
        <VStack w="full" spacing={2}>
          {todos.map((todo, index) => (
            <HStack key={index} w="full" justify="space-between" p={4} borderWidth="1px" borderRadius="lg">
              <Text>{todo}</Text>
              <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} aria-label="Delete todo" colorScheme="red" />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;

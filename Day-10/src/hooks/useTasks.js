import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch Tasks
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  console.log("taskquery", tasksQuery)
  // Add Task
  const addTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  // Update Task
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  // Delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return {
    tasksQuery,
    addTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
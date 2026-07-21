import axios from "axios";
import {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} from "./taskApi";

jest.mock("axios");

describe("taskApi", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTasks", () => {

    test("should fetch tasks", async () => {

      const mockData = {
        tasks: [
          { id: 1, title: "Task 1" },
          { id: 2, title: "Task 2" },
        ],
      };

      axios.get.mockResolvedValue({
        data: mockData,
      });

      const result = await getTasks(2, 5, "React");

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/tasks`,
        {
          params: {
            page: 2,
            limit: 5,
            search: "React",
          },
        }
      );

      expect(result).toEqual(mockData);

    });

    test("should throw error", async () => {

      axios.get.mockRejectedValue(
        new Error("Server Error")
      );

      await expect(
        getTasks()
      ).rejects.toThrow("Server Error");

    });

  });

  describe("getTaskById", () => {

    test("should fetch task", async () => {

      axios.get.mockResolvedValue({
        data: {
          id: 10,
          title: "Learn Jest",
        },
      });

      const result = await getTaskById(10);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/tasks/10`
      );

      expect(result).toEqual({
        id: 10,
        title: "Learn Jest",
      });

    });

  });

  describe("addTask", () => {

    test("should create task", async () => {

      const task = {
        title: "React",
      };

      axios.post.mockResolvedValue({
        data: task,
      });

      const result = await addTask(task);

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/tasks`,
        task
      );

      expect(result).toEqual(task);

    });

  });

  describe("updateTask", () => {

    test("should update task", async () => {

      const updated = {
        title: "Updated",
      };

      axios.put.mockResolvedValue({
        data: updated,
      });

      const result = await updateTask(5, updated);

      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/tasks/5`,
        updated
      );

      expect(result).toEqual(updated);

    });

  });

  describe("deleteTask", () => {

    test("should delete task", async () => {

      axios.delete.mockResolvedValue({
        data: {
          success: true,
        },
      });

      const result = await deleteTask(7);

      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/tasks/7`
      );

      expect(result).toEqual({
        success: true,
      });

    });

  });

});
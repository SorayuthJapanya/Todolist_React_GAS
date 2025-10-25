import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { postTodoApi } from "../api/todoApi";

const AddTodoForm = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const AddTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Please enter content!");
    try {
      setIsLoading(true);
      await postTodoApi(content);
      setContent("");
      toast.success("✅ Todo created successfully!!");
    } catch {
      toast.error("❌ Failed to create Todo!!");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    }
  };

  return (
    <form
      onSubmit={AddTodoHandler}
      className="relative w-full flex items-center"
    >
      <input
        type="text"
        name="content"
        id="content"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        className="w-full px-6 py-3 rounded-full text-base text-gray-800 placeholder:text-sm placeholder-gray-400 bg-gray-100 outline-none"
        placeholder="Add your task here"
      />
      <button
        type="submit"
        className="absolute right-0 px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-700 duration-300 text-white font-medium text-base cursor-pointer"
      >
        {isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddTodoForm;

import { useEffect, useState } from "react";
import type { ITodo } from "../types";
import { deleteTodoApi, getAllTodo } from "../api/todoApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import ModalEditTodo from "./ModalEditTodo";

const TodoLists = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Function Query get all todo
  const { data: allTodos, isLoading: isDataLoading } = useQuery({
    queryKey: ["Todos"],
    queryFn: async () => await getAllTodo(),
  });

  const { mutate: deleteTodo, isPending: isDeleteTodoPending } = useMutation({
    mutationFn: async (taskId: string) => await deleteTodoApi(taskId),
    onSuccess: () => {
      toast.success("✅ Todo deleted successfully!!");
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
    onError: () => {
      toast.error("❌ Failed deleted Todo");
    },
  });

  // Function deleted todo
  const deleteTodoHandler = (todoId: string) => {
    deleteTodo(todoId);
  };

  // function Open modal
  const openTodoModal = (todoId: string) => {
    setIsOpenModal(todoId);
  };

  useEffect(() => {
    if (allTodos) setTodos(allTodos.allData);
  }, [allTodos, setTodos]);

  if (isDataLoading || isDeleteTodoPending) {
    return (
      <div className="w-full flex justify-center">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-4 w-full max-h-72 overflow-y-auto space-y-2.5">
      {todos.map((todo) => (
        <div
          key={todo.id}
          onClick={() => openTodoModal(todo.id)}
          className="flex items-center justify-between"
        >
          <p className="text-gray-600 hover:text-gray-800 cursor-pointer duration-200">
            {todo.content}
          </p>
          <button
            onClick={() => deleteTodoHandler(todo.id)}
            className="p-1.5 rounded-full text-gray-500 hover:text-red-400 bg-transparent hover:bg-gray-100 duration-300 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>
      ))}

      <AnimatePresence initial={false}>
        {isOpenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 w-full h-screen flex items-center justify-center"
            onClick={() => setIsOpenModal(null)}
          >
            <AnimatePresence initial={false}>
              {isOpenModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="w-full flex items-center justify-center"
                >
                  <ModalEditTodo
                    taskId={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoLists;

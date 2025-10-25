import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardEdit, Loader2 } from "lucide-react";
import { getTodoApi, updateTodoApi } from "../api/todoApi";
import { useEffect, useState } from "react";
import type { ITodo } from "../types";
import toast from "react-hot-toast";

interface ModalEditTodoProps {
  taskId: string;
  setIsOpenModal: (value: string | null) => void;
}

const ModalEditTodo: React.FC<ModalEditTodoProps> = ({
  taskId,
  setIsOpenModal,
}) => {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const queryClient = useQueryClient()

  // fetch todo data
  const { data: getTodo, isLoading: isTodoLoading } = useQuery({
    queryKey: ["getTodo", taskId],
    queryFn: () => getTodoApi(taskId),
  });

  // mutatiaon
  const { mutate: editTodoHandler, isPending: isEditTodoLoading } = useMutation(
    {
      mutationFn: (content: string) => updateTodoApi(taskId, content),
      onSuccess: () => {
        onClose();
        toast.success("Updated successfully!!");
        queryClient.invalidateQueries({queryKey: ["Todos"]})
      },
      onError: (error) => {
        onClose();
        console.error(error);
        toast.error(error.message);
      },
    }
  );

  // handle close modal
  const onClose = () => {
    setIsOpenModal(null);
  };

  // hangle input change
  const handleChange = (id: string, value: string) => {
    setTodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: value } : item))
    );
  };

  // handle edit submite
  const editTodoSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    content: string
  ) => {
    e.preventDefault();
    if (!todo[0].content.trim()) return toast.error("Please enter content!");
    editTodoHandler(content);
  };

  useEffect(() => {
    if (getTodo?.todo) {
      setTodo(getTodo.todo);
    }
  }, [getTodo]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[420px] bg-white rounded-xl p-6 space-y-4 sm:space-y-8"
    >
      <h1 className="text-xl font-bold text-blue-950 flex items-center text-center gap-2">
        Edit Todo <ClipboardEdit />
      </h1>
      {isTodoLoading ? (
        <div className="w-full flex justify-center">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : (
        <>
          {todo.map((item) => (
            <form
              key={item.id}
              onSubmit={(e) => {
                editTodoSubmitHandler(e, item.content);
              }}
              className="relative w-full flex items-center"
            >
              <input
                type="text"
                name="content"
                id="content"
                value={item.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(item.id, e.target.value);
                }}
                className="w-full px-6 py-3 rounded-full text-base text-gray-800 placeholder:text-sm placeholder-gray-400 bg-gray-100 outline-none"
                placeholder="Add your task here"
              />
              <button
                type="submit"
                className="absolute right-0 px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-700 duration-300 text-white font-medium text-base cursor-pointer"
              >
                {isEditTodoLoading ? "Editing..." : "Edit"}
              </button>
            </form>
          ))}
        </>
      )}
    </div>
  );
};

export default ModalEditTodo;

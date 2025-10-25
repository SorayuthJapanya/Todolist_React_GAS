import toast from "react-hot-toast";

type FetchOptionsInput = {
  httpMethod: string;
  apiMethod: string;
  headerBody?: string;
  body?: unknown;
};

const fetchOptions = (options: FetchOptionsInput): RequestInit => ({
  method: options.httpMethod,
  mode: "no-cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  body: options.body
    ? JSON.stringify({
        method: options.apiMethod,
        ...(options.headerBody
          ? { [options.headerBody]: options.body }
          : options.body),
      })
    : undefined,
});

// Post Todo (C: Create Todo)
export const postTodoApi = async (content: string) => {
  return await fetch(
    import.meta.env.VITE_BASE_URL,
    fetchOptions({
      httpMethod: "POST",
      apiMethod: "POST",
      headerBody: "content",
      body: content,
    })
  );
};

// Get all Todo (R: Read Todo)
export const getAllTodo = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "?action=getAll"
    );
    if (!response.ok) throw new Error("Network error");

    const todos = await response.json();
    return todos;
  } catch (error: unknown) {
    toast.error("❌ Failed to fetch data");
    throw error;
  }
};

// Get once todo (R: Read Todo)
export const getTodoApi = async (taskId: string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}?action=getById&id=${taskId}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    const todos = await response.json();
    return todos;
  } catch (error: unknown) {
    toast.error("❌ Failed to fetch data");
    throw error;
  }
};

// Update todo (U: Update Todo)
export const updateTodoApi = async (taskId: string, content: string) => {
  return await fetch(
    import.meta.env.VITE_BASE_URL,
    fetchOptions({
      httpMethod: "POST",
      apiMethod: "PUT",
      body: {
        id: taskId,
        content: content,
      },
    })
  );
};

// Delete todo (D: Delete Todo)
export const deleteTodoApi = async (taskId: string) => {
  return await fetch(
    import.meta.env.VITE_BASE_URL,
    fetchOptions({
      httpMethod: "POST",
      apiMethod: "DELETE",
      headerBody: "id",
      body: taskId,
    })
  );
};

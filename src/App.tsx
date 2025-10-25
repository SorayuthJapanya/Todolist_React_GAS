import AddTodoForm from "./components/AddTodoForm"
import TodoLists from "./components/TodoLists"


const App = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#091E3A] to-[#4B0082] px-6 sm:px-16">
      <div className="w-full max-w-md bg-white rounded-xl p-6 space-y-4 sm:space-y-8">
        <h1 className="text-2xl font-bold text-blue-950">To-Do-List 📋</h1>
        <AddTodoForm />
        <TodoLists />
      </div>
    </div>
  )
}

export default App
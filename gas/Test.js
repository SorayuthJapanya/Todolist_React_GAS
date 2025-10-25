function testGetAllTodo() {
  const data = getAllTodo();
  console.log("All data: ", JSON.stringify(data));
}

function testCreateTodo() {
  createTodo("Buy Banana at supermarket2")
}

function testGetTodo() {
  const todo = getTodoById("28991331-fc44-431b-ae32-eb99ae3f0897")
  console.log("[todo retrieved]", JSON.stringify(todo))
}

function testUpdateTodo() {
  try {
    updateTodoById("28991331-fc44-431b-ae32-eb99ae3f0897", "Buy Apple at supermarket2")
    console.log("Updated successfully!!")
  } catch (error) {
    console.error("error: ", error)
  }
}

function testDeleteTodo() {
  try {
    deleteTodoById("798dc83c-da00-46fe-a3aa-d59decf10766")
    console.log("Deleted successflly!!")
  } catch (error) {
    console.error("error: ", error)
  }
}
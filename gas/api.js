/**
 * Main entry for Get requests
 */

function doGet(e) {
  const action = e.parameter.action;

  try {
    if (action === 'getAll') {
      const allData = getAllTodo();
      return sendJSON({ allData })
    }

    if (action === "getById") {
      const id = e.parameter.id;
      const todo = getTodoById(id);
      return sendJSON({ todo })
    }

    return sendJSON({ status: 400, error: "Invalid action" });

  } catch (error) {
    return sendJSON({ status: 500, error: error.message })
  }
}

/**
 * Main entry for POST/PUT/DELETE requests
 */
function doPost(e) {
  const body = e.postData ? JSON.parse(e.postData.contents) : {};
  const method = body.method;

  try {
    if (method === "POST") {
      createTodo(body.content);
      return sendJSON({ status: 201, message: "Todo created" });
    }

    if (method === "PUT") {
      updateTodoById(body.id, body.content);
      return sendJSON({ status: 200, message: "Todo updated" });
    }

    if (method === "DELETE") {
      deleteTodoById(body.id);
      return sendJSON({ status: 200, message: "Todo deleted" });
    }
  } catch (error) {
    return sendJSON({ status: 500, error: error.message })
  }
}

/**
 * Helper: สร้าง JSON response ที่ถูกต้อง
 * @param {Object} obj - The JavaScript object to be returned as JSON.
 * @return {GoogleAppsScript.Content.TextOutput} - The JSON response.
 */
function sendJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

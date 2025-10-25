function getTodoTable() {
  const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1AQKfuGTOQPR4WN_YJ8IPsA8W-beLSg1q5dwmxW9NesU/edit?gid=0#gid=0');
  const table = ss.getSheetByName("Todo-sheet");
  return table;
}


// Helper: Format data useful
function formatDataToJson(data) {
  const table = getTodoTable();
  const headers = table.getRange(1, 1, 1, table.getLastColumn()).getValues();

  const headerValues = headers[0];

  const todos = data.map(row => {
    const todo = {};
    headerValues.forEach((header, i) => {
      todo[header] = row[i];
    });
    return todo;
  });

  return todos
}

function getRowByColumnValue(columnVal, columnName) {
  const table = getTodoTable();

  const dataRange = table.getDataRange();
  const values = dataRange.getValues();

  // Find the col index based on the col name
  const headers = values[0];
  const colIndex = headers.indexOf(columnName)

  if (colIndex !== null) {
    // Loop through each row to find the matching valuw in the specified col
    for (let i = 0; i < values.length; i++) {
      if (values[i][colIndex] === columnVal) {
        // Retur the row num if a match is found
        return i + 1 // Adding to account for 0-based indexing in arrays and  1-based indexing in sheets
      }
    }
  }

  return null
}

// GET getAllData Function 
function getAllTodo() {
  const sheet = getTodoTable();
  const values = sheet.getDataRange().getValues();

  // delete row 1 = headers row
  const dataRows = values.slice(1)
  const data = formatDataToJson(dataRows);

  return data;
}

// POST CreateTodo Function
function createTodo(content) {
  const table = getTodoTable();

  // [id	content 	created_at	update_at]
  const now = new Date();
  const newRow = [Utilities.getUuid(), content, now.toISOString(), now.toISOString()];

  table.appendRow(newRow)
}

// GET GetTodoById Function
function getTodoById(id) {
  const table = getTodoTable();

  const rowNumber = getRowByColumnValue(id, "id");

  if (rowNumber === null) {
    return;
  }

  const rowRange = table.getRange(rowNumber, 1, 1, table.getLastColumn());
  const todoRow = rowRange.getValues();
  const todo = formatDataToJson(todoRow);
  return todo;
}

// PUT UpdateTodoById Function {
function updateTodoById(id, content) {
  // GET Todo
  const table = getTodoTable();

  // What is the row number that matches the id
  const rowNumber = getRowByColumnValue(id, "id");

  // Need a way to modify the existing row
  // --- getRowRange
  // --- manipulate row range
  const rowRange = table.getRange(rowNumber, 1, 1, table.getLastColumn())

  const rowValue = rowRange.getValues()[0];
  console.log(`[todo retrieved]: ${rowValue}`)

  // To update --- content and updated_at
  
  rowValue[1] = content;
  rowValue[3] = new Date().toISOString();

  rowRange.setValues([rowValue])
}

// DELETE deleteTodoById
function deleteTodoById(id) {
  // Get table
  const table = getTodoTable();

  // Get row number
  const rowNumber = getRowByColumnValue(id, "id")

  // Delete rowvalue
  table.deleteRow(rowNumber)
}





































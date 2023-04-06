const getAllTasks = async (req, res) => {
  try {
    return res.status(200).json({
      message,
      data: [
        { id: 1, description: "desc" },
        { id: 2, description: "desc 2" },
      ],
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (error.message.includes("  not found")) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "  found",
      data: { id: 1, description: "desc" },
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (error.message.includes("Task not found")) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    // const task = new Tasks({
    //   description: req.body.description,
    // });

    // const result = await task.save();
    return res.status(201).json({
      message: "Task created successfully.",
      // data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      error: true,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const tasks = await Tasks.findByIdAndUpdate({ _id: id }, req.body, {
    //   new: true,suc
    // });

    // if (!tasks) {
    //   throw new Error("No task found");
    // }

    return res.status(200).json({
      message: `Task with id ${id} edited.`,
      // data: tasks,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("No task found")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const result = await Tasks.findByIdAndDelete(id);
    // if (!result) {
    //   throw new Error("Task not found");
    // }
    return res.status(200).json({
      message: `Task with id ${id} successfully deleted!`,
      // data: result,
      error: false,
    });
  } catch (error) {
    const statusCode = error.message.includes("Task not found") ? 404 : 400;
    return res.status(statusCode).json({
      message: error.toString(),
      error: true,
    });
  }
};

export { getAllTasks, getTaskById, createTask, deleteTask, editTask };

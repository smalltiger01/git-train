function requireTitle(title) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("任务标题不能为空");
  }

  return normalizedTitle;
}

export function createTask(title, id = Date.now()) {
  return {
    id,
    title: requireTitle(title),
    done: false,
  };
}

export function addTask(tasks, title, id) {
  return [...tasks, createTask(title, id)];
}

export function setTaskDone(tasks, taskId, done) {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          done,
        }
      : task,
  );
}

export function getTaskSummary(tasks) {
  const completed = tasks.filter((task) => task.done).length;

  return {
    total: tasks.length,
    completed,
    remaining: tasks.length - completed,
  };
}

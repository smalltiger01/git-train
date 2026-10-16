const tasks = [
  { id: 1, title: "查看功能分支提交历史", priority: "high", done: false },
  { id: 2, title: "在 GitHub 阅读 PR 差异", priority: "medium", done: false },
];

const taskForm = document.querySelector("#task-form");
const taskTitle = document.querySelector("#task-title");
const taskPriority = document.querySelector("#task-priority");
const taskList = document.querySelector("#task-list");

const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低",
};

function renderTasks() {
  taskList.replaceChildren(
    ...tasks.map((task) => {
      const item = document.createElement("li");
      item.className = `task${task.done ? " task--done" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", `完成任务：${task.title}`);
      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        renderTasks();
      });

      const title = document.createElement("span");
      title.textContent = task.title;

      const priority = document.createElement("strong");
      priority.className = `priority priority--${task.priority}`;
      priority.textContent = priorityLabels[task.priority];
      priority.setAttribute("aria-label", `${priorityLabels[task.priority]}优先级`);

      item.append(checkbox, title, priority);
      return item;
    }),
  );
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) return;

  tasks.push({
    id: Date.now(),
    title,
    priority: taskPriority.value,
    done: false,
  });
  taskForm.reset();
  taskTitle.focus();
  renderTasks();
});

renderTasks();

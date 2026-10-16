import {
  addTask,
  getTaskSummary,
  setTaskDone,
} from "./task-service.js";

let tasks = [
  { id: 1, title: "查看功能分支提交历史", done: false },
  { id: 2, title: "在 GitHub 阅读 PR 差异", done: false },
];

const taskForm = document.querySelector("#task-form");
const taskTitle = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const taskSummary = document.querySelector("#task-summary");

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
        tasks = setTaskDone(tasks, task.id, checkbox.checked);
        renderTasks();
      });

      const title = document.createElement("span");
      title.textContent = task.title;
      item.append(checkbox, title);
      return item;
    }),
  );

  const summary = getTaskSummary(tasks);
  taskSummary.textContent = `共 ${summary.total} 项 · 已完成 ${summary.completed} 项 · 待完成 ${summary.remaining} 项`;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) {
    taskTitle.focus();
    return;
  }

  tasks = addTask(tasks, title);
  taskForm.reset();
  taskTitle.focus();
  renderTasks();
});

renderTasks();

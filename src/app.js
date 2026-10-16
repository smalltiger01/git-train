const tasks = [
  { id: 1, title: "查看功能分支提交历史", done: false },
  { id: 2, title: "在 GitHub 阅读 PR 差异", done: false },
];

const taskForm = document.querySelector("#task-form");
const taskTitle = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");

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
      item.append(checkbox, title);
      return item;
    }),
  );
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title, done: false });
  taskForm.reset();
  taskTitle.focus();
  renderTasks();
});

renderTasks();

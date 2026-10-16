import test from "node:test";
import assert from "node:assert/strict";

import {
  addTask,
  createTask,
  getTaskSummary,
  removeTask,
  setTaskDone,
} from "../src/task-service.js";

test("createTask trims the title and creates an incomplete task", () => {
  assert.deepEqual(createTask("  阅读 PR  ", 101), {
    id: 101,
    title: "阅读 PR",
    done: false,
  });
});

test("createTask rejects an empty title", () => {
  assert.throws(() => createTask("   "), /任务标题不能为空/);
});

test("addTask returns a new list without mutating the original", () => {
  const original = [{ id: 1, title: "同步 main", done: false }];
  const updated = addTask(original, "创建功能分支", 2);

  assert.equal(original.length, 1);
  assert.equal(updated.length, 2);
  assert.equal(updated[1].title, "创建功能分支");
});

test("setTaskDone updates only the matching task", () => {
  const tasks = [
    { id: 1, title: "任务一", done: false },
    { id: 2, title: "任务二", done: false },
  ];

  assert.deepEqual(setTaskDone(tasks, 2, true), [
    { id: 1, title: "任务一", done: false },
    { id: 2, title: "任务二", done: true },
  ]);
});

test("removeTask removes only the matching task without mutating the original", () => {
  const tasks = [
    { id: 1, title: "保留任务", done: false },
    { id: 2, title: "删除任务", done: true },
  ];

  const updated = removeTask(tasks, 2);

  assert.equal(tasks.length, 2);
  assert.deepEqual(updated, [{ id: 1, title: "保留任务", done: false }]);
});

test("getTaskSummary reports total, completed, and remaining tasks", () => {
  const summary = getTaskSummary([
    { id: 1, title: "任务一", done: true },
    { id: 2, title: "任务二", done: false },
    { id: 3, title: "任务三", done: true },
  ]);

  assert.deepEqual(summary, {
    total: 3,
    completed: 2,
    remaining: 1,
  });
});

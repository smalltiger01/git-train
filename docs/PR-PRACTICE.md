# 分支与 Pull Request 练习

## 训练目标

完成本练习后，你应该能够解释并实际操作：

1. 为什么功能开发不直接在 `main` 上进行。
2. commit、push、PR、review、merge 各自改变了什么。
3. 如何比较功能分支与主分支。
4. PR 合并后，另一个本地仓库为什么还需要 `pull`。

## 当前布置

- `trainA` 停留在 `feature/task-priority`，模拟 PR 作者。
- `trainB` 停留在 `main`，模拟审核者。
- GitHub 上有一个从 `feature/task-priority` 指向 `main` 的开放 PR。

## 练习一：在 B 中查看但不合并功能

在 `trainB` 中执行：

```bash
git fetch origin
git branch -a
git log --oneline --graph --decorate --all
git diff main..origin/feature/task-priority
```

注意：`fetch` 会下载远程信息，但不会修改当前 `main` 的文件。

如果想临时查看功能分支：

```bash
git switch --track origin/feature/task-priority
git switch main
```

## 练习二：在 GitHub 审核 PR

1. 打开仓库的 Pull requests 页面。
2. 进入开放的任务优先级 PR。
3. 查看 `Commits`，理解功能为何拆成多个提交。
4. 查看 `Files changed`，逐文件阅读差异。
5. 可以留下普通评论，或在代码行旁留下 review comment。
6. 准备好后选择 `Merge pull request`。

> 同一 GitHub 账号通常不能正式批准自己创建的 PR，但仍然可以查看差异、评论并合并，足够完成本地双用户训练。

## 练习三：PR 合并后同步 A、B

在 `trainB`：

```bash
git switch main
git pull origin main
```

在 `trainA`：

```bash
git switch main
git pull origin main
git branch -d feature/task-priority
git fetch --prune
```

只有在 PR 已合并且确认不再需要本地功能分支后，才执行 `git branch -d`。

## 练习四：自己再创建一个 PR

可在 `trainB` 中尝试：

```bash
git switch main
git pull origin main
git switch -c feature/task-filter
```

然后实现“只显示未完成任务”的筛选功能，按以下节奏操作：

```bash
git status
git add <你修改的文件>
git commit -m "feat: add task status filter"
git push -u origin feature/task-filter
```

最后在 GitHub 创建从 `feature/task-filter` 到 `main` 的 PR，并使用 `trainA` 检查它。

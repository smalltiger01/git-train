# Git 协作训练场

这是一个专门用来练习 **分支、提交、Pull Request、审核、合并和同步主分支** 的小项目。

项目本身是一张无需安装依赖的任务清单：直接用浏览器打开 `index.html` 即可运行。

## 仓库角色

- `trainA`：模拟开发者 A，负责创建功能分支和提交 PR。
- `trainB`：模拟开发者 B，负责查看主分支、审核 PR，并在合并后同步代码。
- GitHub：远程协作中心，保存分支、提交和 PR 讨论。

## 当前练习场景

`main` 是稳定基线，只支持新增任务和标记完成。

`feature/task-priority` 是待审核的功能分支，它将在任务中加入高、中、低优先级。该分支会通过一个保持未合并状态的 PR 提交给 `main`。

## 核心边界

| 对象 | 作用 | 是否直接改变 `main` |
| --- | --- | --- |
| commit | 保存当前分支的一次本地快照 | 否 |
| push | 把本地提交发送到同名远程分支 | 否 |
| Pull Request | 请求审核两个分支之间的差异 | 否 |
| review | 评论、批准或要求修改 PR | 否 |
| merge | 把 PR 的变更正式合入目标分支 | 是 |
| pull | 把远程分支的新提交同步到本地 | 只更新当前本地分支 |

## 推荐观察命令

```bash
git status
git branch -a
git log --oneline --graph --decorate --all
git diff main..feature/task-priority
```

完整练习步骤见 [`docs/PR-PRACTICE.md`](docs/PR-PRACTICE.md)。

## 历史练习文件

`user-a.txt`、`user-b.txt` 以及旧的 `index.js`、`src/change.js`、`src/config.js` 是此前提交练习留下的材料，本案例保留它们，便于继续查看提交历史。

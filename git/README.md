# git

## git:最先进分布版本控制系统

### 1. git初始化添加

`git config --global username` git全局添加username

`git config --global email` git全局添加邮件地址

`git init` 初始化

### 2. git快照

`git add ...文件` 添加文件 (`git add .` 修改的全部提交)

`git commit -m 提交`，-m 注释，必填

`git diff` 查看修改的代码

`git reset --hard HEAD^ `回调到上一个版本，几个尖角号几个版本   

`git reset --hard` 回退到未开发时

`git log` 查看日志 可查看ID号 （一般都用git reflog）

`git reflog` 所有改变版本的操作

`git reset --hard` ID号 回退到当前ID所对应的版本

### 3.创建分支

`git branch` 观看主干和分支

`git branch dev` 创建dev分支

`git checkout dev` 到dev分支上

`git checkout -b dev` 创建dev分支并且切换到dev分支

`git merge dev` 合并dev分支的代码

**用SSH协议，密钥 绑定后即可.gitignore  忽略哪个文件**

`git push` 不加分支直接推送到当前分支的远程分支上

`git push origin dev`  推送到网上仓库的dev分支上

`git push -u origin master`

`git pull` 不加分支直接拉取当前分支的远程分支上

`git pull origin dev`

**更新远程分支** `git remote update origin -p`
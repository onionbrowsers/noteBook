# git

git:最先进分布版本控制系统
git config --global username
git config --global email
git init 初始化
git快照
git add ... 文件 添加文件 (git add . 修改的全部提交)
git commit -m '' 提交，-m 注释，必填
git diff 查看修改的代码
git reset --head HEAD^ 回调到上一个版本，几个尖角号几个版本   
git log 查看日志 可查看ID号 （一般都用git reflog）
git reflog 所有改变版本的操作
git reset --head ID号 回退到当前ID所对应的版本

// 创建分支
git branch 观看主干和分支
git branch dev 创建dev分支
git checkout dev 到dev分支上
git merge 融合分支

用SSH协议，密钥 绑定后即可
.gitignore  忽略哪个文件

git push origin master:dev  到网上仓库的dev分支上

git push -u origin master
# Git cheatsheet commands

1. to start off you are on the master branch for quizapp
2. when working on a new feature, create a branch and switch to it
   - `git branch feature/my_branch_name`
   - `git checkout feature/my_branch_name`
3. now you can start making changes on vscode for the file you are working on. git add, git commit, and git push to push code onto github. On github's end a remote branch will get created to mirror your local branch
   - `git add <file_name>`
   - `git commit -m "message"`
   - `git push origin feature/my_branch_name`
4. when you have finished working on your feature in your branch, you are ready to push your branch's code to master, and ultimately to the remote repo github. Conflicts may/may not come up in this step depending on what files your team-mates have updated
   - `git checkout master`
   - `git pull`
   - `git merge feature/my_branch_name`
   - `git push origin master`
5. Now that you have pushed all the code in your local master branch into the remote master on github, you can go ahead and delete your local branch
   - `git branch -d feature/my_branch_name`

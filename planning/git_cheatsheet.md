# Git cheatsheet commands

1. create and checkout new branch for feature you are working on
   `git checkout -b my_feature_branch`

2. add, commit code to your feature branch (usual commnds we've used in bootcamp)
   `git add file_name`
   `git commit -m "some commit message"`

3. if others have added to the master branch while you have been working off your branch, you want to ensure your local master is up to data
   `git checkout master`
   `git pull origin master`

4. make sure master is up to date before you merge your feature branch into master

5. once you have completed and tested your feature, you want to merge your branch back into master
   `git checkout master`
   `git merge my_feature_branch`

6. delete your feature branch since you have merged your code and no longer have use for it
   `git branch -d my_feature_branch`

7. Finally push everything to the github repo
   `git push origin master`

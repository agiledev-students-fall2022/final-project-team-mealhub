# Guide to Contributing
Thank you for putting in the  time to contribute to  our project! </br>
Continue reading to get an overview of our team norms as well as the contribution workflow.
## Team norms
### Team values
#### How the team will work together
* All team members will contribute to the project during every sprint, working to complete their assigned tasks.
* All team members will attend and enagage in scheduled meetings on zoom or in-person.
#### How members who need help will solicit it from the others
* When issues arise, any member who needs help will communicate these issues through meetings or chat applications where other team members will address these issues and offer advice.
#### How the team will resolve conflicts
  * How we will reach consensus when there are disagreements on direction
    * All team members will sit down in a meeting and discuss the different directions, brainstorm other options which could incorporate these multiple ideas, and ultimatley have a majority vote on the desired direction.
* What to do when a member is failing to deliver on their obligations to the team
    * The team should discuss with this member to find out the reason for this issue, and if the issues cannot be resolved, the team will go to management to discuss a better option.
* How quickly team members are expected to respond to messages directed at them
    * Team members are expected to respond to messages directed at them the same day the message is sent.


### Sprint cadence
* 2 weeks per sprint

### Daily standups
* Standups will occur on the following days: (Based off of the class schedule)
    * 10/13/2022
    * 10/20/2022
    * 11/01/2022
    * 11/03/2022
    * 11/08/2022
    * 11/15/2022
    * 11/17/2022
    * 11/22/2022

* The time in which the the standups will occur will be discussed amongst the team members through a chat application
* The standups will last for 15 mintues.

* All members should attend.
* Members who do not make any progress for two standups or more will be reported to management. 

### Coding standards
* Visual Studio Code will be the designated code editor.
* ESLint will be the designated code linter.
* Prettier will be used for formatting.
* Write self documenting code.
* Commented code should be deleted.
* Make small commits per bug or feature fix.
* Offer meaningul commit messages.
* All code must be working before being pushed, and the one who breaks the build must fix it.
* Code submitted for each task and spike must be reviewed by a peer and pass all tests before being merged into the main branch.

## Git workflow
The MealHub team uses a feature branch workflow.  Developers will have access to two repositories: 
* a centralized remote repository (Github repository) accessible by all team members
* a local clone of the remote repository


## How to make a contribution
* Clone this remote repository on GitHub to your local machine.
* Before making any changes, pull from the shared central repository to download the latest code.
* Create a new local branch and switch to it. Name the branch based off the user story, task, or spike associated to the changes that you plan to make.</br></br>
    * Here is an example for a Task with identification number 4 belonging to a User Story with identificaation number 2:</br>
`git checkout -b user-story/2/task/4/implement-user-signup`</br></br>
* Update the task board in GitHub for this sprint by moving the card for this Task or Spike to the applicable "In Process" column.
* Make your changes locally and commit those changes to the local branch.  
* Download the latest code from the master branch of the shared central repository, and merge it into the local feature branch and resolve any existing conflicts.
* Push the feature branch to the shared remote repository.
* You must issue a Pull Request to other teammates, asking that they accept the changes into the `master` branch.
* Update the task board in GitHub by moving the card for this Task or Sprint to the relevant "Awaiting Review" column.
## Rules of contributing
* Submit only relevant and appropriate code 
* Touch only the necessary files related to the Tasks or Spikes you are working on 
* Do not leave Tasks or Spikes unmerged with the master branch for more than two days.
* Make sure your code is clean following the coding standards listed here: [Coding standards](#coding-standards)
* Be descriptive in your PR.





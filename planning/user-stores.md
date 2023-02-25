# User-stories

1. As a user, I can create quizzes so that other users can attempt the quizzes

Acceptance Criteria:
Users have to create 5 questions (set number)
Quizzes can only be in multiple choice format
Character limit for question is VARCHAR(300)

2. As a user, I can make the quiz I created unlisted/private because I don't want them to be publicly available

Acceptance Criteria:
private quizzes are not available on the home page
The user who created the quiz can see it
We can have a toggle button to make a quiz public vs private
if a user has the quiz url, they can still access and take the quiz

3. As a user, I can share a link to a single quiz so that my friends can attempt the quiz
   (note: where do we want to show the quiz link)

4. As a user, I can see a list of public quizzes on the home page

5. As a user, I can see attempt a quiz and see the result of my recent attempt so that I know how well I did
   Acceptance Criteria
   Users can click on a quiz and this should redirect user to the quiz page
   When user picks a choice, we sum the ‘trues’ together to give the result
   Since there is 5 questions, score will always be based off 5

6. As a user, I can share the link to the result of my attempted quiz because I want to share the result with my friends
   Acceptance Criteria
   Have a page with the quizzes user has attempted in the past along with their results and associated links

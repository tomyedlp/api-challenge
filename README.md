# API Challenge

There is a list of Activities to do in a City, they are grouped into different Categories, such as "Outdoors", "Food & Drinks", "Clubs", etc.
For each Activity there are different Users, one of them is the Activity Organizer, who can send invitations to other Users for joining that Activity and any User can also request to join a specific Activity. In any case the invitations can be accepted or rejected.

## Requirements:

Implement a REST API that allow to perform CRUD opperations over Users and Activities.
Implement authentication using JWT tokens and users authorization.
Any user can request the Activities list and Users list, but only authenticated users can create, authorize and update Activities.

As an Organizer User:
- Be able to update or remove an Activity.
- Be able to submit invitations for an Activity.
- Be able to accept or reject a request to join an Activity.
        
As a Regular User:
- Be able to submit a request for joining an Activity.
- Be able to accept or reject invitations to join an Activity.
     
Objectives:
- Get Activities based on their Category (can perform a search by the Category id).
- List all the Activities organized by a specific User.
- List all the Activities for which a specific User is a Member of.
         
## Extra credit:

1. Deploy the solution to a web server (AWS, Heroku, cloud servers, etc.).
2. Implement tests for the models and the API requests.
         
## Delivery Steps: 

Please clone the repository, complete the exercise, upload the solution to your own repo and share the link with us. If you have any questions, you can reach out directly via email. Remember, all instructions for running the application (including installing relevant libraries, etc.) should be included in the README.md file. 

1. Clone the repo to your local machine.
2. Implement the functionality and update the README.md file with instructions to setup and run the application. Also add the list of endpoints.
3. Create a repo with your personal account and upload the solution to it. **We don't accept Pull Requests to this repository**.
4. Share the link to your personal repository with us so we can review it.

Thank you and good luck!

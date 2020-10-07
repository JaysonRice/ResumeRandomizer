This repo is a template for creating a full stack C#/React application with the Semantic UI library.
Template begins with login and register through firebase authentication set up along with all necessary GUIs and installations.

# Steps to Change

1. Change all file instances of NetflixHelper to new project name. (Models, Controllers, Repositories, Data, folder names, .sln file, appsettings.JSON connection string)
2. Create new Firebase project and replace projectId and WEB API Key. (appsettings.JSON) 
3. Create .env.local file in client/src where REACT_APP_API_KEY='Firebase API Key' (no quotes)
4. Run updated SQL script with new database name and FirebaseIds.
5. Make any necessary changes to UserProfileRepository your new database requires.
6. Move git origin to new repo.

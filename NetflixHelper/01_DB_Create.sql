USE [master]

IF db_id('NetflixHelper') IS NULl
  CREATE DATABASE [NetflixHelper]
GO

USE [NetflixHelper]
GO

DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [Username] varchar(50) NOT NULL,
)
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, Email, Username) values (1, 'xxCMLtZzHtYnGvDORaZWUeGiFc62', 'jayson@gmail.com', 'JaysonMoistRice');
insert into UserProfile (Id, FirebaseUserId, Email, Username) values (2, '3RsFw0YDNNUYyKmNFqXsPFbaQFD2', 'ryan@gmail.com', 'RentPayingReeves');
insert into UserProfile (Id, FirebaseUserId, Email, Username) values (3, '9e0DgARwFKdlF61kcLHZlQW9E322', 'brett@gmail.com', 'Mr. Unoriginal');
set identity_insert [UserProfile] off

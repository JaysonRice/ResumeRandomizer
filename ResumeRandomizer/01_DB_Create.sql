﻿USE [master]

IF db_id('ResumeRandomizer') IS NULl
  CREATE DATABASE [ResumeRandomizer]
GO

USE [ResumeRandomizer]
GO

DROP TABLE IF EXISTS [ResumeProject];
DROP TABLE IF EXISTS [ResumeEducation];
DROP TABLE IF EXISTS [ResumeExperience];
DROP TABLE IF EXISTS [Resume];
DROP TABLE IF EXISTS [Color];
DROP TABLE IF EXISTS [Font];
DROP TABLE IF EXISTS [ExperienceBullet];
DROP TABLE IF EXISTS [ProjectBullet];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Experience];
DROP TABLE IF EXISTS [Education];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL,
  [FirstName] varchar(255) NOT NULL,
  [LastName] varchar(255) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [Phone] varchar(15),
  [PortfolioLink] varchar(255)
)
GO

CREATE TABLE [Resume] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Title] varchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [UserProfileId] integer NOT NULL,
  [HeaderFontId] integer NOT NULL,
  [BodyFontId] integer NOT NULL,
  [ColorId] integer NOT NULL
)
GO

CREATE TABLE [Education] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Institution] varchar(255) NOT NULL,
  [Degree] varchar(255) NOT NULL,
  [DateGraduated] datetime,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [Experience] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [JobTitle] varchar(255) NOT NULL,
  [Company] varchar(255) NOT NULL,
  [DateStarted] datetime,
  [DateFinished] datetime,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [Project] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ProjectName] varchar(255) NOT NULL,
  [DateStarted] datetime,
  [DateFinished] datetime,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [ResumeExperience] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ResumeId] integer NOT NULL,
  [ExperienceId] integer NOT NULL
)
GO

CREATE TABLE [ResumeEducation] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ResumeId] integer NOT NULL,
  [EducationId] integer NOT NULL
)
GO

CREATE TABLE [ResumeProject] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ResumeId] integer NOT NULL,
  [ProjectId] integer NOT NULL
)
GO

CREATE TABLE [ProjectBullet] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ProjectId] integer,
  [Content] varchar(255) NOT NULL,
)
GO

CREATE TABLE [ExperienceBullet] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ExperienceId] integer,
  [Content] varchar(255) NOT NULL,
)
GO

CREATE TABLE [Font] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [FontName] varchar(255) NOT NULL
)
GO

CREATE TABLE [Color] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [ColorName] varchar(55) NOT NULL
)
GO


ALTER TABLE [Resume] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [ResumeExperience] ADD FOREIGN KEY ([ExperienceId]) REFERENCES [Experience] ([Id])
GO

ALTER TABLE [ResumeExperience] ADD FOREIGN KEY ([ResumeId]) REFERENCES [Resume] ([Id])
GO

ALTER TABLE [ProjectBullet] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [ExperienceBullet] ADD FOREIGN KEY ([ExperienceId]) REFERENCES [Experience] ([Id])
GO

ALTER TABLE [ResumeProject] ADD FOREIGN KEY ([ResumeId]) REFERENCES [Resume] ([Id])
GO

ALTER TABLE [ResumeProject] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [ResumeEducation] ADD FOREIGN KEY ([EducationId]) REFERENCES [Education] ([Id])
GO

ALTER TABLE [ResumeEducation] ADD FOREIGN KEY ([ResumeId]) REFERENCES [Resume] ([Id])
GO

ALTER TABLE [Resume] ADD FOREIGN KEY ([HeaderFontId]) REFERENCES [Font] ([Id])
GO

ALTER TABLE [Resume] ADD FOREIGN KEY ([BodyFontId]) REFERENCES [Font] ([Id])
GO

ALTER TABLE [Resume] ADD FOREIGN KEY ([ColorId]) REFERENCES [Color] ([Id])
GO

ALTER TABLE [Experience] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Education] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Phone, PortfolioLink) values (1, 'xxCMLtZzHtYnGvDORaZWUeGiFc62',  'Jayson', 'Rice', 'jayson@gmail.com', '(423) 426-7257', 'jaysonrice.github.io');
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Phone, PortfolioLink) values (2, 'bJTZg8U5hsXjdbl1vBCh91021fp1',  'Lindsey', 'King', 'lindsey@gmail.com', '(423) 555-7557', null);
set identity_insert [UserProfile] off

set identity_insert [Font] on
insert into Font (Id, FontName) values (1, 'Raleway');
insert into Font (Id, FontName) values (2, 'Oswald');
set identity_insert [Font] off

set identity_insert [Color] on
insert into Color (Id, ColorName) values (1, 'Black');
insert into Color (Id, ColorName) values (2, 'Blue');
set identity_insert [Color] off

set identity_insert [Education] on
insert into Education (Id, Institution, Degree, DateGraduated, UserProfileId) values (1, 'Middle Tennessee State University', 'B.S. in Mass Communication', '2017-8-1', 1);
insert into Education (Id, Institution, Degree, DateGraduated, UserProfileId) values (2, 'Nashville Software School', 'Web Software Developer Certificate', '2020-8-1', 1);
set identity_insert [Education] off

set identity_insert [Experience] on
insert into Experience (Id, JobTitle, Company, DateStarted, DateFinished, UserProfileId) values (1, 'Digital Marketing Associate', 'DotFM Group', '2017-12-1', '2019-02-01', 1);
insert into Experience (Id, JobTitle, Company, DateStarted, DateFinished, UserProfileId) values (2, 'Software Developer', 'Nashville Software School', '2020-2-1', '2020-8-1', 1);
set identity_insert [Experience] off

set identity_insert [Project] on
insert into Project (Id, ProjectName, DateStarted, DateFinished, UserProfileId) values (1, 'Pets Please', null, null, 1);
insert into Project (Id, ProjectName, DateStarted, DateFinished, UserProfileId) values (2, 'Frame Advance', null, null, 1);
set identity_insert [Project] off

set identity_insert [Resume] on
insert into Resume (Id, Title, CreateDateTime, UserProfileId, HeaderFontId, BodyFontId, ColorId) values (1, 'Software Developer 1', 2020-12-18, 1, 2, 1, 1);
set identity_insert [Resume] off

set identity_insert [ResumeExperience] on
insert into ResumeExperience (Id, ResumeId, ExperienceId) values (1, 1, 1);
insert into ResumeExperience (Id, ResumeId, ExperienceId) values (2, 1, 2);
set identity_insert [ResumeExperience] off

set identity_insert [ResumeEducation] on
insert into ResumeEducation (Id, ResumeId, EducationId) values (1, 1, 1);
insert into ResumeEducation (Id, ResumeId, EducationId) values (2, 1, 2);
set identity_insert [ResumeEducation] off

set identity_insert [ResumeProject] on
insert into ResumeProject (Id, ResumeId, ProjectId) values (1, 1, 1);
insert into ResumeProject (Id, ResumeId, ProjectId) values (2, 1, 2);
set identity_insert [ResumeProject] off

set identity_insert [ExperienceBullet] on
insert into ExperienceBullet (Id, ExperienceId, Content) values (1, 1, 'Drafted and proposed digital marketing strategies to clients');
insert into ExperienceBullet (Id, ExperienceId, Content) values (2, 1, 'Worked in collaboration with manager to develop marketing content for Robert Schuller Ministries, Honey Do Service, Tan 2000, ALuxuryLimo, and Red Rooster Bakery');
insert into ExperienceBullet (Id, ExperienceId, Content) values (3, 1, 'Ran 2-4 Facebook Ad campaigns per client and updated content based on interaction');
insert into ExperienceBullet (Id, ExperienceId, Content) values (4, 1, 'Produced 20 episodes of Sunday at Sunnybrook on YouToo America and 10 episodes of World Changers with Jamie Osborne on BizTV');
insert into ExperienceBullet (Id, ExperienceId, Content) values (5, 1, 'Created 5-10 images and 2-3 videos per week for social media posts with Adobe Suite software');
insert into ExperienceBullet (Id, ExperienceId, Content) values (6, 2, 'Developed full-stack applications using HTML, CSS, JavaScript, React, C#, and .NET framework');
insert into ExperienceBullet (Id, ExperienceId, Content) values (7, 2, 'Constructed CRUD functional applications that utilize authentication through Firebase');
insert into ExperienceBullet (Id, ExperienceId, Content) values (8, 2, 'Communicated with teams remotely and in person to complete group sprints');
insert into ExperienceBullet (Id, ExperienceId, Content) values (9, 2, 'Demonstrated use of source code version control with Git / GitHub');
insert into ExperienceBullet (Id, ExperienceId, Content) values (10, 2, 'Designed applications through white-boarding dependencies, drawing wireframes, and building ERDs');
insert into ExperienceBullet (Id, ExperienceId, Content) values (11, 2, 'Managed a database with SQL subqueries, stored procedures, transactions, and indexes');
set identity_insert [ExperienceBullet] off

set identity_insert [ProjectBullet] on
insert into ProjectBullet (Id, ProjectId, Content) values (12, 1, 'Users are able to follow other users to tailor their main feed');
insert into ProjectBullet (Id, ProjectId, Content) values (13, 1, 'Customize the experience by following interesting pet photographers and filtering by animal type');
insert into ProjectBullet (Id, ProjectId, Content) values (14, 1, 'Built with React using JSON server, with full CRUD functionality to store user and pet information');
insert into ProjectBullet (Id, ProjectId, Content) values (15, 1, 'Single page application where users upload pictures of pets to share on a social platform');
insert into ProjectBullet (Id, ProjectId, Content) values (16, 1, 'Photos stored using Cloudinary''s image services');
insert into ProjectBullet (Id, ProjectId, Content) values (17, 2, 'Frame Advance is an application created for competitive people who want to review footage of past games in order to improve');
insert into ProjectBullet (Id, ProjectId, Content) values (18, 2, 'Users can make a post with a YouTube link, create timestamps, and leave notes about what happened ');
insert into ProjectBullet (Id, ProjectId, Content) values (19, 2, 'Built using C#, ASP.NET Core, Entity Framework Core, SQL Server, React, and styled with Reactstrap ');
set identity_insert [ProjectBullet] off
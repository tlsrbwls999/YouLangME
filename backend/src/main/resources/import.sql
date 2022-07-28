-- Favorite
INSERT INTO Favorite(`id`,`name`) VALUES(1,'Movie');
INSERT INTO Favorite(`id`,`name`) VALUES(2,'Sports');
INSERT INTO Favorite(`id`,`name`) VALUES(3,'Music');
INSERT INTO Favorite(`id`,`name`) VALUES(4,'Investment');
INSERT INTO Favorite(`id`,`name`) VALUES(5,'Travel');
INSERT INTO Favorite(`id`,`name`) VALUES(6,'Coding');
INSERT INTO Favorite(`id`,`name`) VALUES(7,'Game');
INSERT INTO Favorite(`id`,`name`) VALUES(8,'Food');
INSERT INTO Favorite(`id`,`name`) VALUES(9,'Cooking');
INSERT INTO Favorite(`id`,`name`) VALUES(10,'Cafe');
INSERT INTO Favorite(`id`,`name`) VALUES(11,'Reading');
INSERT INTO Favorite(`id`,`name`) VALUES(12,'Pet');
INSERT INTO Favorite(`id`,`name`) VALUES(13,'Party');
INSERT INTO Favorite(`id`,`name`) VALUES(14,'Collecting');


-- User
INSERT INTO user VALUES(1001,'2022-07-20 09:30:22.232051','2022-07-21 16:30:22.232051',25,'1999-07-02','hello!','userbot1@gmail.com',0,'MALE',null,'KOREAN','userbot1','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
INSERT INTO user VALUES(1002,'2022-07-18 16:31:22.232051','2022-07-21 16:30:22.232051',27,'1994-04-30','hello?','userbot2@gmail.com',0,'FEMALE',null,'KOREAN','userbot2','KOREA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','JAPANESE');
INSERT INTO user VALUES(1003,'2022-07-21 16:32:22.232051','2022-07-21 16:30:22.232051',28,'1995-03-21','hello...','userbot3@gmail.com',0,'FEMALE',null,'CHINESE','userbot3','CHINA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');
INSERT INTO user VALUES(1004,'2022-07-21 12:33:22.232051','2022-07-21 16:30:22.232051',29,'2001-02-13','hello!!','userbot4@gmail.com',0,'MALE',null,'ENGLISH','userbot4','USA','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','KOREAN');
INSERT INTO user VALUES(1005,'2022-07-22 16:34:22.232051','2022-07-22 16:34:22.232051',20,'1997-11-02','hello!!!','userbot5@gmail.com',0,'FEMALE',null,'JAPANESE','userbot5','JAPAN','{bcrypt}$2a$10$MBmYHjIMbwXWBX2YZsZrLOexUQabMCexGf8AvznT97DRbppdAfimO','ENGLISH');


-- User Roles
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1001,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1002,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1003,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1004,'ROLE_USER');
INSERT INTO user_roles(`user_id`,`roles`) VALUES (1005,'ROLE_USER');


-- User_Favorite
INSERT INTO user_favorite VALUES(2001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',2,1001);
INSERT INTO user_favorite VALUES(2002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',3,1001);
INSERT INTO user_favorite VALUES(2003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',4,1001);
INSERT INTO user_favorite VALUES(2004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1002);
INSERT INTO user_favorite VALUES(2005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',12,1003);
INSERT INTO user_favorite VALUES(2006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',10,1003);
INSERT INTO user_favorite VALUES(2007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',7,1004);
INSERT INTO user_favorite VALUES(2008,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',9,1005);


-- Follow (userbot1(1001) 위주)
INSERT INTO follow VALUES(3001,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1005);
INSERT INTO follow VALUES(3002,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1004);
INSERT INTO follow VALUES(3003,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1003);
INSERT INTO follow VALUES(3004,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1001,1002);
INSERT INTO follow VALUES(3005,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1002,1001);
INSERT INTO follow VALUES(3006,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1004,1001);
INSERT INTO follow VALUES(3007,'2022-07-21 16:30:22.232051','2022-07-21 16:30:22.232051',1005,1001);


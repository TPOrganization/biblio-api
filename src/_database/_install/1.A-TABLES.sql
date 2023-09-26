CREATE TABLE `user` (
  `id` integer PRIMARY KEY NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255)
);

CREATE TABLE `book` (
  `id` integer PRIMARY KEY NOT NULL,
  `user_id` integer NOT NULL,
  `status_id` integer NOT NULL,
  `author_id` integer NOT NULL,
  `title` varchar(255) NOT NULL,
  `comment` text,
  `start_date` date,
  `end_date` date,
  `cover` varchar(255) NOT NULL
);

CREATE TABLE `author` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) 
);

CREATE TABLE `type` (
  `id` integer PRIMARY KEY,
  `label` varchar(255)
);

CREATE TABLE `book_type` (
  `id` integer PRIMARY KEY,
  `book_id` integer,
  `type_id` integer
);

CREATE TABLE `status` (
  `id` integer PRIMARY KEY,
  `label` varchar(255)
);

ALTER TABLE `book` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (`author_id`) REFERENCES `author` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `book_type` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);
ALTER TABLE `book_type` ADD FOREIGN KEY (`type_id`) REFERENCES `type` (`id`);

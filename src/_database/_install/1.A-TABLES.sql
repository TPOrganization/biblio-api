CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `last_name` varchar(255),
  `first_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `avatar` varchar(255)
);

CREATE TABLE `book` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `status_id` integer,
  `author_id` integer,
  `title` varchar(255),
  `comment` text,
  `start_date` date,
  `end_date` date,
  `cover` varchar(255)
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

ALTER TABLE `author` ADD FOREIGN KEY (`id`) REFERENCES `book` (`author_id`);

ALTER TABLE `status` ADD FOREIGN KEY (`id`) REFERENCES `book` (`status_id`);

ALTER TABLE `book_type` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

ALTER TABLE `book_type` ADD FOREIGN KEY (`type_id`) REFERENCES `type` (`id`);

CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `last_name` varchar(255),
  `first_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `avatar` varchar(255)
);

CREATE TABLE `book` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
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
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `type` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255)
);

CREATE TABLE `book_type` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `book_id` integer,
  `type_id` integer
);

CREATE TABLE `status` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255)
);

ALTER TABLE `book` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (`author_id`) REFERENCES `author` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `book_type` ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);
ALTER TABLE `book_type` ADD FOREIGN KEY (`type_id`) REFERENCES `type` (`id`);

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
  `isbn` varchar(255)
);

CREATE TABLE `author` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `types_of_books` (
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
  `label` varchar(255),
  `color` varchar(10)
);

ALTER TABLE `book` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
ALTER TABLE `book` ADD FOREIGN KEY (`author_id`) REFERENCES `author` (`id`)  ON DELETE CASCADE;
ALTER TABLE `book` ADD FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE;

ALTER TABLE `book_type`ADD FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)  ON DELETE CASCADE;
ALTER TABLE `book_type`ADD FOREIGN KEY (`type_id`) REFERENCES `types_of_books` (`id`)  ON DELETE CASCADE;

INSERT INTO `author` (`name`) VALUES
 ('JK Rowling'),
 ('Sarah J.Maas'), 
 ('Musso');

INSERT INTO `status` (`label`,`color`) VALUES
 ('A lire','#ff8b85'), 
 ('En cours','#8dd6ff'),
 ('Terminé','#afcba5'),
 ('Whislist','#db82dd');

 INSERT INTO `types_of_books` (`label`) VALUES
 ('Fantasy'),
 ('Jeunesse'), 
 ('Comtemporain'),
 ('Science-Fiction'),
 ('Thiller'),
 ('Polar'),
 ('Manga'),
 ('Biographie'),
 ('Horreur'),
 ('Poesie');
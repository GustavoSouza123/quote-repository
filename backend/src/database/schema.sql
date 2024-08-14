CREATE DATABASE quote_repository;
USE quote_repository;

CREATE TABLE quotes (
    id INT NOT NULL AUTO_INCREMENT,
    quote VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT,
    tag VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE quotes_tags (
    quoteId INT NOT NULL,
    tagId INT NOT NULL,
    FOREIGN KEY (quoteId) REFERENCES quotes(id),
    FOREIGN KEY (tagId) REFERENCES tags(id)
);

-- INSERT INTO quotes (quote, author) VALUES ('my first quote', 'Albert Einstein');
-- INSERT INTO quotes (quote, author) VALUES ('a random quote from the former president of the USA', 'Donald Trump');
-- INSERT INTO quotes (quote, author) VALUES ('a quote from myself', 'Gustavo Souza');
-- INSERT INTO quotes (quote, author) VALUES ('a super inspirational quote from the former president of the USA', 'Joe Biden');
-- INSERT INTO tags (tag) VALUES ('Albert Einstein'), ('Gustavo Souza');
-- INSERT INTO quotes_tags (quoteId, tagId) VALUES (1, 1), (1, 2), (2, 2), (3, 1), (3, 3);
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
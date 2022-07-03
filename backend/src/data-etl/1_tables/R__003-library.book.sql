CREATE TABLE IF NOT EXISTS library.book
(
    id bigserial NOT NULL PRIMARY KEY,
    name text,
    release_date date DEFAULT now()::date,
    is_deleted boolean DEFAULT false,
    author_id bigint DEFAULT -1::BIGINT,
    catalog_id bigint NOT NULL,

    CONSTRAINT author_id_fk FOREIGN KEY (author_id)
        REFERENCES library.author (id)
        ON DELETE CASCADE,

    CONSTRAINT catalog_id_fk FOREIGN KEY (catalog_id)
        REFERENCES library.catalog (id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS book_id_index
    ON library.book (id);

ALTER TABLE IF EXISTS library.book
    OWNER to postgres;

COMMENT ON TABLE library.book
    IS 'Информация о книгах';
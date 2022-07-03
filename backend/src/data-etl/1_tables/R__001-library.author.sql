CREATE TABLE IF NOT EXISTS library.author
(
    id bigserial NOT NULL PRIMARY KEY,
    name text
);

CREATE INDEX IF NOT EXISTS author_id_index
    ON library.author (id);

ALTER TABLE IF EXISTS library.author
    OWNER to postgres;

COMMENT ON TABLE library.author
    IS 'Содержит информацию об авторе';

INSERT INTO library.author VALUES (-1, 'Неизвестный автор') ON CONFLICT DO NOTHING;
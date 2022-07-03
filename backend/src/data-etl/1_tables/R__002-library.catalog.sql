CREATE TABLE IF NOT EXISTS library.catalog
(
    id bigserial NOT NULL PRIMARY KEY,
    name text NOT NULL
);

CREATE INDEX IF NOT EXISTS catalog_id_index
    ON library.catalog (id);

ALTER TABLE IF EXISTS library.catalog
    OWNER to postgres;

COMMENT ON TABLE library.catalog
    IS 'Каталоги в библиотеке';

INSERT INTO library.catalog VALUES (1, 'Публичный') ON CONFLICT DO NOTHING;
INSERT INTO library.catalog VALUES (2, 'Закрытый') ON CONFLICT DO NOTHING;
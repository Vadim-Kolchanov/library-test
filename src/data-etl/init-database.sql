CREATE DATABASE "test-task"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "test-task"
    IS 'База предназначена для тестового задания';

	-------------------------------

CREATE SCHEMA library
    AUTHORIZATION postgres;

COMMENT ON SCHEMA library
    IS 'Библиотека';

	-------------------------------
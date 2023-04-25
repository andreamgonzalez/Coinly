\echo 'Delete and recreate coinly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE coinly;
CREATE DATABASE coinly;
\connect coinly

\i coinly-schema.sql
\i coinly-seed.sql

\echo 'Delete and recreate coinly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE coinly_test;
CREATE DATABASE coinly_test;
\connect coinly_test

\i coinly-schema.sql
\i coinly-seed.sql
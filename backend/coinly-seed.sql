-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO coins (symbol, price)
VALUES ('ETH', 110000),
       ('BTC', 200000),
       ('DOGE', 60000),
       ('BNB', 55000),
       ('USDC', 77000),
       ('XRP', 144000),
       ('ADA', 157000),
       ('DOT', 171000),
       ('SOL', 198000);

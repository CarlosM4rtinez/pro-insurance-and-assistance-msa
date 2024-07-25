-- channel
CREATE TABLE channel (
    channel_id SERIAL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    acronym    VARCHAR(5) NOT NULL,
    secret_key VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE UNIQUE INDEX channel_name_un ON channel(name);
CREATE UNIQUE INDEX channel_acronym_un ON channel(acronym);
CREATE UNIQUE INDEX channel_key_un ON channel(secret_key);

-- process
CREATE TABLE process (
    process_id  SERIAL PRIMARY KEY,
    key         UUID DEFAULT uuid_generate_v4() UNIQUE,
    duration    VARCHAR(10) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at  TIMESTAMPTZ DEFAULT current_timestamp,
    channel_id  INTEGER NOT NULL,
    customer_id VARCHAR(50),
    FOREIGN KEY (channel_id) REFERENCES channel(channel_id)
);

CREATE UNIQUE INDEX process_key_un ON process(key);

-- enable extension for uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
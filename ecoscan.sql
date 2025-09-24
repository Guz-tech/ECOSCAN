CREATE TABLE IF NOT EXISTS users (
        id_user UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enterprise (
    id_enterprise UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_enterprise VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    waste_type VARCHAR(50) NOT NULL,
    schedule_frequency VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scanner_location (
    id_scan UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name VARCHAR(255),
    waste_name VARCHAR(255) NOT NULL,
    waste_category VARCHAR(50),
    quantity INT,
    weight DECIMAL(10, 2),
    photo_url VARCHAR(255),
    scan_status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    id_user UUID NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

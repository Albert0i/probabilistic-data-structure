--
-- Table Creation
--
CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    details TEXT,
    imageUrls JSON NOT NULL -- Store multiple images as JSON
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled') NOT NULL,
    totalCost DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2),
    shippingCharge DECIMAL(10,2),
    FOREIGN KEY (customerId) REFERENCES Customer(id)
);

CREATE TABLE Order_Details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES Order(id),
    FOREIGN KEY (productId) REFERENCES Product(id)
);

--
-- Insert Sample Data
--
INSERT INTO Customers (name, email, phone) VALUES
('Alice Johnson', 'alice@example.com', '123-456-7890'),
('Bob Smith', 'bob@example.com', '987-654-3210'),
('Charlie Lee', 'charlie@example.com', '456-789-1234');

INSERT INTO Products (name, price, stock, details, imageUrls) VALUES
('Laptop', 1200.00, 50, 'High-performance laptop', '["laptop1.jpg", "laptop2.jpg"]'),
('Headphones', 200.00, 100, 'Noise-canceling headphones', '["headphone1.jpg"]'),
('Smartphone', 900.00, 80, 'Latest model smartphone', '["phone1.jpg", "phone2.jpg"]');

INSERT INTO Orders (customerId, orderDate, status, totalCost, discount, shippingCharge) VALUES
(1, '2025-05-22 14:00:00', 'Shipped', 1400.00, 100.00, 20.00),
(2, '2025-05-20 10:30:00', 'Processing', 900.00, 0.00, 10.00);

INSERT INTO Order_Details (orderId, productId, quantity, price) VALUES
(1, 1, 1, 1200.00),
(1, 2, 1, 200.00),
(2, 3, 1, 900.00);

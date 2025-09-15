-- Employee details table
CREATE TABLE employee_details (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    position VARCHAR(255),
    date_of_joining DATE,
    contact VARCHAR(255) UNIQUE
);

-- Add more employee details
INSERT INTO employee_details (employee_id, name, department, position, contact)
VALUES
  (2, 'Ateef Hussain Sheikh', 'Gen AI Development', 'Gen AI Developer', 'AteefHussain@karanji.com'),
  (3, 'Sumith R Naik', 'Gen AI Development', 'Gen AI Developer', 'sumithrnaik@karanji.com'),
  (4, 'K Sumanth', 'Gen AI Development', 'Gen AI Developer', 'KSumanth@karanji.com'),
  (5, 'Grifith Sheeba Menon', 'Gen AI Development', 'Gen AI Developer', 'Sheebam@karanji.com'),
  (6, 'Sowmyashree', 'Gen AI Development', 'Gen AI Developer', 'Sowmyashree@karanji.com'),
  (7, 'AthulyaRoy', 'Gen AI Development', 'Gen AI Developer', 'AthulyaRoy@karanji.com'),
  (8, 'Shivani', 'Gen AI Development', 'Gen AI Developer', 'Shivani@karanji.com');

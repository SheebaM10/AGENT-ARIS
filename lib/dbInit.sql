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
  (1, 'Ateef Hussain Sheikh', 'Gen AI Development', 'Gen AI Developer', 'AteefHussain@karanji.com'),
  (2, 'Sumith R Naik', 'Gen AI Development', 'Gen AI Developer', 'sumithrnaik@karanji.com'),
  (3, 'K Sumanth', 'Gen AI Development', 'Gen AI Developer', 'KSumanth@karanji.com'),
  (4, 'Grifith Sheeba Menon', 'Gen AI Development', 'Gen AI Developer', 'Sheebam@karanji.com'),
  (5, 'Sowmyashree', 'Gen AI Development', 'Gen AI Developer', 'Sowmyashree@karanji.com'),
  (6, 'AthulyaRoy', 'Gen AI Development', 'Gen AI Developer', 'AthulyaRoy@karanji.com'),
  (7, 'Shivani', 'Gen AI Development', 'Gen AI Developer', 'Shivani@karanji.com');

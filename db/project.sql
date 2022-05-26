-- Write the query to create the 4 tables below.
CREATE TABLE person (
	id int(11) AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
    birth_day date,
    gender char,
    job varchar(255) NOT NULL,
	id_location int(11),
	id_group int(11)
);

CREATE TABLE location (
	id int(11) AUTO_INCREMENT PRIMARY KEY,
	city varchar(255) NOT NULL,
	street varchar(255),
	street_number int(11),
	zip varchar(255),
	country varchar(255) NOT NULL,
	name varchar(255) NOT NULL
);

CREATE TABLE event (
	id int(11) AUTO_INCREMENT PRIMARY KEY,
    datum date NOT NULL,
	description varchar(255),
	duration time,
	name varchar(255),
	id_location int(11),
	FOREIGN KEY (id_location) REFERENCES location(id)
);

CREATE TABLE person_event (
	id_person int(11) NOT NULL,
	id_event int(11) NOT NULL,
	FOREIGN KEY(id_person) REFERENCES person(id),
	FOREIGN KEY(id_event) REFERENCES event(id),
	PRIMARY KEY(id_person, id_event)
);

CREATE TABLE work_group (
	id int(11) NOT NULL,
    name varchar(255),
    manager varchar(255)
);

CREATE TABLE group_person (
	id_person int(11) NOT NULL,
	id_group int(11) NOT NULL,
    position varchar(255),
	FOREIGN KEY(id_person) REFERENCES person(id),
	FOREIGN KEY(id_group) REFERENCES work_group(id),
	PRIMARY KEY(id_person, id_group)
);




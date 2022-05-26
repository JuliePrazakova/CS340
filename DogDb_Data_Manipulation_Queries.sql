-- SELECT 
-- select anything from user 
SELECT * from person
INNER JOIN location ON person.id_location = location.id
INNER JOIN person_event ON person.id = person_event.id_person
INNER JOIN group_person ON person.id = group_person.id_person
INNER JOIN work_group ON group_person.id_group = work_group.id
WHERE id = :id_person;


SELECT * from person
INNER JOIN location ON person.id_location = location.id
WHERE person.first_name = :searched_first_name;

SELECT * from person
INNER JOIN location ON person.id_location = location.id
 WHERE last_name = :searched_last_name;
 
SELECT * from person
INNER JOIN location ON person.id_location = location.id
WHERE mail = :searched_mail;

SELECT * from person
INNER JOIN location ON person.id_location = location.id
WHERE gender = :searched_gender;

SELECT * from person
INNER JOIN location ON person.id_location = location.id
WHERE job = :searched_job;

SELECT * from person
INNER JOIN location ON person.id_location = location.id
WHERE birth_day = :searched_date;

-- select all events from a person
SELECT * from event
INNER JOIN person_event ON event.id = person_event.id_event
WHERE person_event.id_person = :searched_person;

-- select all people from an event
SELECT * from person
INNER JOIN person_event ON person.id = person_event.id_person
WHERE person_event.id_event = :searched_event;


-- select people from same location
SELECT * from person WHERE id_location = (SELECT id_location FROM location WHERE city = :searched_city);
SELECT * from person WHERE id_location = (SELECT id_location FROM location WHERE zip = :searched_zip);
SELECT * from person WHERE id_location = (SELECT id_location FROM location WHERE country = :searched_country);



-- INSERT 
-- insert into person
INSERT INTO person (first_name, last_name, birth_day, gender, job, id_location)VALUES (:first_name, :last_name, :birth_day, :gender, :job, :id_location);

-- insert into location
INSERT INTO location (city, street, street_number, zip, country, name)VALUES (:city, :street,:street_number, :zip, :country, :name);

-- insert into event
INSERT INTO event (date, description, duration, name, id_location)VALUES (:date, :description, :duration, :name, :id_location);


-- insert into a group
INSERT INTO work_group (id, name, manager)VALUES (:id, :name, :manager);



-- DELETE
-- delete person
DELETE FROM person WHERE id = :id_person;

-- delete event
DELETE FROM event WHERE id = :id_event;

-- delete group
DELETE FROM work_group WHERE id = :id_group;

-- delete group_person relationship
DELETE FROM group_person WHERE id_group = :id_group AND id_person = :id_person;


-- UPDATE
-- update only person
UPDATE person
SET first_name = :first_name, last_name = :last_name, birth_day = :birth_day, gender = :gender, job = :job
WHERE id = :id_person;

-- update person's location
UPDATE person
SET id_location = (SELECT id_location FROM location WHERE city = :city AND street = :street_name AND street_number = :street_number)
WHERE id = :id_person;

-- update person's group
UPDATE person
SET id_group = (SELECT id_group FROM work_group WHERE name = :group_name)
WHERE id = :id_person;

-- update event
UPDATE event
SET date = :date, description = :description, duration = :duration, name = :name
WHERE id = :id_event;

-- update event's location
UPDATE event
SET id_location = (SELECT id_location FROM location WHERE city = :city AND street = :street_name AND street_number = :street_number)
WHERE id = :id_event;


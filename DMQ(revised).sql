-- ------ Display ------ --
-- Movies:
SELECT movie_id, name, release_date, out_of_theater_date, rating FROM Movies
ORDER BY movie_id;

-- Auditoriums:
SELECT auditorium_id, 
	Auditoriums.name AS auditorium_name, number_of_seats, 
	Theaters.name AS theaters_name, 
	Projector_Equipments.type AS projector_equipment_type 
FROM Auditoriums 
INNER JOIN Theaters ON Auditoriums.theater_id = Theaters.theater_id
INNER JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id
ORDER BY auditorium_id;

-- Movies_Auditoriums:
SELECT Movies_Auditoriums.movie_auditorium_id, 
	Movies.name AS movies_name, 
	Auditoriums.name AS auditoriums_name, 
    time_slot
FROM Movies_Auditoriums
INNER JOIN Movies ON Movies_Auditoriums.movie_id=Movies.movie_id
INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id=Auditoriums.auditorium_id
ORDER BY Movies_Auditoriums.movie_auditorium_id;

-- Tickets:
SELECT DISTINCT
	ticket_id,
	Movies.name AS movies_name,
	Auditoriums.name AS auditoriums_name,
	Customers.name AS customers_name,
	Projector_Equipments.type AS projector,
	Projector_Equipments.ticket_price AS price,
	seat,
	time,
FROM Tickets
	LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id
	LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id
	LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id
	LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id
	LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id
	ORDER BY Tickets.ticket_id;

-- Theaters:
SELECT
	theater_id,
	name,
	address,
	phone 
FROM Theaters;

-- Customers:
SELECT
	customer_id,
	name,
	email,
	phone 
FROM Customers;

-- Projector_Equipments:
SELECT
	projector_equipment_id,
	type,
	ticket_price
FROM Projector_Equipments;


-- ------ Filters ------ --
-- Movies:
-- filter by name
SELECT `movie_id`, `name`, `release_date`, `out_of_theater_date`, `rating` FROM movies 
WHERE LOWER(`name`) LIKE LOWER(%:mov_name_from_webpage%);

-- Auditoriums:
-- filter by auditoriums.name
SELECT `auditorium_id`, 
		auditoriums.`name` AS auditorium_name, number_of_seats, 
		theaters.`name` AS theaters_name, 
		projector_equipments.`type` AS projector_equipment_type 
FROM auditoriums 
INNER JOIN theaters ON auditoriums.`theater_id` = Theaters.`theater_id`
INNER JOIN projector_equipments ON auditoriums.`projector_equipment_id` = projector_equipments.`projector_equipment_id`
WHERE LOWER(auditoriums.name) LIKE (%:aud_name_from_webpage%)
ORDER BY auditoriums.auditorium_id;

-- filter by theaters.name
SELECT auditorium_id, 
		Auditoriums.name AS auditorium_name, number_of_seats, 
    Theaters.name AS theaters_name, 
    Projector_Equipments.type AS projector_equipments_type 
FROM Auditoriums 
INNER JOIN Theaters ON Auditoriums.theater_id = Theaters.theater_id
INNER JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id
WHERE LOWER(Theaters.name) LIKE (%:aud_theater_name_from_webpage%)
ORDER BY Auditoriums.auditorium_id;

-- filter by projector.type
SELECT `auditorium_id`, \
		auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
		theaters.`name` AS theater_name, \
		projector_equipments.`type` AS projector_equipment_type \
FROM auditoriums \
INNER JOIN theaters \
ON auditoriums.`theater_id` = Theaters.`theater_id` \
INNER JOIN projector_equipments \
ON auditoriums.`projector_equipment_id` = projector_equipments.`projector_equipment_id` \
WHERE LOWER(projector_equipments.type) LIKE LOWER(%:aud_projector_type_from_webpage%) \
ORDER BY auditoriums.auditorium_id;

-- Movies_Auditoriums:
-- filter by movies.name
SELECT Movies_Auditoriums.movie_auditorium_id, \
		Movies.name AS movie_name, \
		Auditoriums.name AS auditorium_name, \
		time_slot \
FROM Movies_Auditoriums \
INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
WHERE LOWER(Movies.name) LIKE LOWER(%:M_A_movie_name_from_webpage%) \
ORDER BY Movies_Auditoriums.movie_auditorium_id;

-- filter by auditoriums.name
SELECT Movies_Auditoriums.movie_auditorium_id, \
		Movies.name AS movie_name, \
		Auditoriums.name AS auditorium_name, \
		time_slot \
FROM Movies_Auditoriums \
INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
WHERE LOWER(Auditoriums.name) LIKE LOWER(%:M_A_auditorium_name_from_webpage%) \
ORDER BY Movies_Auditoriums.movie_auditorium_id;

-- filter by time_slot
SELECT Movies_Auditoriums.movie_auditorium_id, Movies.name AS movies_name, Auditoriums.name AS auditoriums_name, time_slot
FROM Movies_Auditoriums
INNER JOIN Movies ON Movies_Auditoriums.movie_id=Movies.movie_id
INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id=Auditoriums.auditorium_id
WHERE time_slot = :M_A_time_slot_from_webpage
ORDER BY Movies_Auditoriums.movie_auditorium_id;

-- Tickets:
-- filter by movies.name
SELECT DISTINCT
	ticket_id,
	Movies.name AS movies_name,
	Auditoriums.name AS auditoriums_name,
	Customers.name AS customers_name, 
	seat,
	time,
	price
FROM
	Tickets
	LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id
	LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id
	LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id
	LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id
WHERE LOWER(Movies.name) LIKE LOWER(:tic_movies_name_from_webpage)
ORDER BY Tickets.ticket_id;

-- filter by the auditoriums.name
SELECT DISTINCT
	ticket_id,
	Movies.name AS movies_name,
	Auditoriums.name AS auditoriums_name,
	Customers.name AS customers_name, 
	seat,
	time,
	price
FROM
	Tickets
	LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id
	LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id
	LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id
	LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id
WHERE LOWER(Auditoriums.name) LIKE LOWER(:tic_auditoriums_name_from_webpage)
ORDER BY Tickets.ticket_id;

-- filter by the customers.name
SELECT DISTINCT
	ticket_id,
	Movies.name AS movies_name,
	Auditoriums.name AS auditoriums_name,
	Customers.name AS customers_name, 
	seat,
	time,
	price
FROM
	Tickets
	LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id
	LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id
	LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id
	LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id
WHERE LOWER(Customers.name) LIKE LOWER(:tic_Customers_name_from_webpage)
ORDER BY Tickets.ticket_id;

	
-- Theaters:
-- filter the theaters by its name
SELECT
	theater_id,
	name,
	address,
	phone 
FROM
	Theaters 
WHERE
	LOWER(name) LIKE LOWER(:theater_name_from_webpage);

-- Customers:
-- filter the customer by its name
SELECT
	customer_id,
	name,
	email,
	phone 
FROM
	Customers 
WHERE
	LOWER(name) LIKE LOWER(:customer_name_from_webpage);

-- Projector_Equipments:
-- filter the projectors by its type
SELECT
	projector_equipment_id,
	type 
FROM
	Projector_Equipments 
WHERE
	LOWER(type) LIKE LOWER(:projector_type_from_webpage);



-- Movies:
-- INSERT:
INSERT INTO Movies (name, release_date, out_of_theater_date, rating ) VALUES(
	:mov_input_name,
	:mov_input_releaseDate,
	:mov_input_outOfTheaterDate,
	:mov_input_rating);

-- UPDATE
UPDATE Movies 
SET name = :mov_input_name,
release_date = :mov_input_releaseDate,
out_of_theater_date = :mov_input_outOfTheaterDate,
rating =:mov_input_rating 
WHERE
	movie_id = :mov_ID_from_the_update_form;

-- DELETE
DELETE FROM Movies WHERE movie_id = :mov_ID_from_the_delete_row;

-- Auditoriums:
-- INSERT
INSERT INTO Auditoriums(name, number_of_seats, theater_id, projector_equipment_id) VALUES(
 :aud_input_name,
 :aud_input_numOfSeats, 
 :aud_input_theaterID, 
 :aud_input_projectorID);
 
-- UPDATE
UPDATE Auditoriums
SET name = :aud_edit_name,
number_of_seats = :aud_edit_numOfSeats,
theater_id = :aud_edit_theaterID,
projector_equipment_id = :aud_edit_projectorID
WHERE
	auditorium_id = :aud_ID_from_the_update_form;
    
-- DELETE	
DELETE FROM Auditoriums WHERE auditorium_id = :aud_ID_from_the_delete_row;

-- Movies_Auditoriums:
-- INSERT
INSERT INTO Movies_Auditoriums(movie_id, auditorium_id, time_slot) VALUES( 
:M_A_input_movieID, 
:M_A_input_auditoriumID, 
:M_A_input_timeSlot);

-- UPDATE
UPDATE Movies_Auditoriums
SET movie_id = :M_A_edit_movieID,
auditorium_id = :M_A_edit_auditoriumID,
time_slot = :M_A_edit_timeSlot
WHERE
	movie_auditorium_id = :M_A_ID_from_the_update_form;
    
-- DELETE
DELETE FROM Movies_Auditoriums WHERE movie_auditorium_id = :M_A_ID_from_the_delete_row;

-- Tickets:
-- INSERT
INSERT INTO Tickets(movie_auditorium_id, customer_id, seat, time, price)VALUES(
 :tic_input_movieAuditoriumID,
 :tic_input_customerID,
 :tic_input_seat,
 -- SELECT time_slot FROM movies_auditoriums WHERE movie_auditorium_id = :tic_input_movieAuditoriumID
 :tic_input_time, -- get time from above SQL command and concate with the selected date by javascript
 --  (SELECT pe.type FROM projector_equipments  pe
 -- 	RIGHT JOIN auditoriums a ON a.projector_equipment_id = pe.projector_equipment_id
 --     RIGHT JOIN movies_auditoriums ma ON ma.auditorium_id = a.auditorium_id
 --     WHERE movie_auditorium_id = :tic_input_movieAuditoriumID)
 :tic_price -- get equipment type from the above SQL command and determine the price in the backend code
);

-- UPDATE	
UPDATE Tickets
SET movie_auditorium_id = :tic_edit_movieAuditoriumID,
customer_id = :tic_edit_customerID,
seat = :tic_edit_seat,
-- SELECT time_slot FROM movies_auditoriums WHERE movie_auditorium_id = :tic_input_movieAuditoriumID
time = :tic_edit_time, -- get time from above SQL command and concate with the selected date by javascript
--  (SELECT pe.type FROM projector_equipments  pe
-- 	   RIGHT JOIN auditoriums a ON a.projector_equipment_id = pe.projector_equipment_id
--     RIGHT JOIN movies_auditoriums ma ON ma.auditorium_id = a.auditorium_id
--     WHERE movie_auditorium_id = :tic_input_movieAuditoriumID)
price = :tic_price -- get equipment type from the above SQL command and determine the price in the backend code
WHERE 
	ticket_id	= :tic_ID_from_the_update_form;
    
-- DELETE
DELETE FROM Tickets WHERE ticket_id = :tic_ID_from_the_delete_row;

-- Theaters
-- INSERT
INSERT INTO Theaters(name, address, phone)VALUES( 
 :thea_input_name,
 :thea_input_address,
 :thea_input_phone);
 
--  UPDATE
UPDATE Theaters
SET	name = :thea_edit_name,
address = :thea_edit_address,
phone = :thea_edit_phone
WHERE theater_id = :thea_ID_from_the_update_form;

-- DELETE
DELETE FROM Theaters WHERE theater_id = :thea_ID_from_the_delete_row;

-- Customers
-- INSERT
INSERT INTO Customers(name, email, phone)VALUES( 
 :cust_input_name,
 :cust_input_email,
 :cust_input_phone);
 
--  UPDATE
UPDATE Customers
SET	name = :cust_edit_name,
email = :cust_edit_email,
phone = :cust_edit_phone
WHERE customer_id = :cust_ID_from_the_update_form;

-- DELETE
DELETE FROM Customers WHERE customer_id = :cust_ID_from_the_delete_row;

-- Projector_Equipments
-- INSERT
INSERT INTO Projector_Equipments(type) VALUES(:equip_input_type);

-- UPDATE
UPDATE Projector_Equipments 
SET type = :equip_edit_type 
WHERE projector_equipment_id = :equip_ID_from_the_update_form;

-- DELETE
DELETE FROM Projector_Equipments WHERE projector_equipment_id = :equip_ID_from_the_delete_row;



	
	
	
	
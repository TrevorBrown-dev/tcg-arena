COPY card(id, name, imageUrl, code)
FROM '/db/resources/cards.csv'
DELIMITER ','
CSV HEADER;
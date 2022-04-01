FROM postgres:9.6
COPY ./resources /db/resources
COPY ./setup.sql /docker-entrypoint-initdb.d/setup.sql
CMD ["postgres"]
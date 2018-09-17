#!/bin/bash

echo "Configuring database: udemydb"

dropdb -U node_user udemydb
createdb -U node_user udemydb

psql -U node_user udemydb < ./users.sql

echo "udemydb configured"
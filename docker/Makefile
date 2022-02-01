export UID:=$(shell id -u)
export GID:=$(shell id -g)
CC:=docker-compose


all: help

%:
	@:

help:
	@echo "usage:"
	@echo
	@echo "  make build"
	@echo "  make clean"
	@echo "  make dev"
	@echo



clean: 
	$(CC) down --remove-orphans --rmi all

build:clean
	$(CC) build  --no-cache

dev: 
	$(CC)  run --rm  --service-ports nest

import:
	gunzip < datas/user.sql.gz | $(CC) exec -T mysql mysql -uprod -pprod  product 
	gunzip < datas/activite.sql.gz |$(CC) exec -T mysql mysql -uprod -pprod  product 


up:
	docker-compose down && docker-compose -f docker-compose.yml up -d --build
down: 
	docker-compose down

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate
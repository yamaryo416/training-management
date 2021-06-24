.PHONY:
	app test migrate pro admin django react 

app:
	docker-compose run --rm app sh -c "python manage.py startapp api"

migrate:
	docker-compose run --rm app sh -c "python manage.py makemigrations"
	docker-compose run --rm app sh -c "python manage.py migrate"

admin:
	docker-compose run --rm app sh -c "python manage.py createsuperuser"

django:
	docker-compose run --rm app sh -c "django-admin startproject app ."

next:
	docker-compose run --rm next sh -c "npx create-next-app . --ts"
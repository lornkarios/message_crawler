build:
	docker-compose exec puppeteer-chrome-linux npm run build --production
run:
	docker-compose exec puppeteer-chrome-linux node dist/main.js
build:
	rm -rf local
	fis release --domains --md5 --pack --unique --dest local --no-color

deploy: build
	node local/app.js
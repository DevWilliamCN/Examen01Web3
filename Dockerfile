FROM node:20-alpine

		LABEL authors="jruiz"

		RUN mkdir -p /apps/testing_01
		WORKDIR /apps/testing_01

		COPY package.json /apps/testing_01/
		RUN npm install
		COPY . /apps/testing_01/

		EXPOSE 3000
		CMD ["npm", "start"]
FROM node:14.16.0

#COPY . /src/
WORKDIR /src

RUN git config --global url."git@github.com:".insteadOf "https://github.com/"
#RUN npm cache clean --force

# npm doesn't work here
RUN yard add --ignore-engines truffle@5.2.4

#RUN npm ci
#RUN npm run build

CMD ["/bin/bash"]

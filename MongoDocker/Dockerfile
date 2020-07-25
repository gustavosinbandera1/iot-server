FROM debian:jessie-slim
RUN apt-get update && \
apt-get install -y ca-certificates && \
rm -rf /var/lib/apt/lists/*
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys 0C49F3730359A14518585931BC711F9BA15703C6 && \
gpg --export $GPG_KEYS > /etc/apt/trusted.gpg.d/mongodb.gpg
ARG MONGO_PACKAGE=mongodb-org
ARG MONGO_REPO=repo.mongodb.org
ENV MONGO_PACKAGE=${MONGO_PACKAGE} MONGO_REPO=${MONGO_REPO}
ENV MONGO_MAJOR 3.4
ENV MONGO_VERSION 3.4.18
RUN echo "deb http://$MONGO_REPO/apt/debian jessie/${MONGO_PACKAGE%-unstable}/$MONGO_MAJOR main" | tee "/etc/apt/sources.list.d/${MONGO_PACKAGE%-unstable}.list"
RUN echo "/etc/apt/sources.list.d/${MONGO_PACKAGE%-unstable}.list"
RUN apt-get update
RUN apt-get install -y ${MONGO_PACKAGE}=$MONGO_VERSION
VOLUME ["/data/db"]
WORKDIR /data
EXPOSE 27017
CMD ["mongod", "--smallfiles"]


#docker build -t hello-mongo:latest .
# You can start the MongoDB container by issuing the following command:
# docker run --name my-mongo -d -v /tmp/mongodb:/data/db -p 27017:27017 hello-mongo

# --name: Name of the container.
# -d: Will start the container as a background (daemon) process. Don’t specify this argument to run the container as foreground process.
# -v: Attach the /tmp/mongodb volume of the host system to /data/db volume of the container.
# -p: Map the host port to the container port.
#  Last argument is the name/id of the image.
#  To check whether the container is running or not, issue the following command: 
# - docker ps

# Accessing MongoDB From the Host
# Once the container is up and running, we can access it the same way as accessing the remote MongoDB instance. 
# You can use any utility like Compass or Robomongo to connect to this instance. For now, I’ll use mongo command to connect. 
# Run the following command in your terminal:
# mongo 27017

# It will open mongo shell where you can execute any mongo commands. 
# Now we’ll create one database and add some data in it.

# use mydb
# db.myColl.insert({“name”: “severalnines”})
# quit()
# Now to check whether our volume mapping is correct or not, we will restart the container and check whether it has our data or not.
# -Docker restart <container_id>
# Now again connect to mongo shell and run this command:# 
# - db.myColl.find().pretty()
# You should see this result:
# - { "_id" : ObjectId("5be7e05d20aab8d0622adf46"), "name" : "severalnines" }
# his means our container is persisting the database data even after restarting it.
#  This is possible because of volume mapping. The container will store all our data in /tmp/mongodb directory in the host system. 
# So when you restart the container, all data inside the container will be erased 
# and a new container will access the data from the host tmp/mongodb directory.
# Accessing MongoDB Container Shell
# $ docker exec -it <container-name> /bin/bash
# Accessing MongoDB Container Logs
# - $ docker logs <container-name>
# Connecting to the MongoDB Container From Another Container
# You can connect to the MongoDB container from any other container using --link argument which follows the following structure. 
# --link <Container Name/Id>:<Alias>
# Where Alias is an alias for link name. Run this command to link our Mongo container with express-mongo container.
# docker run --link my-mongo:mongo -p 8081:8081 mongo-express
# This command will pull the mongo-express image from dockerhub and start a new container. 
# Mongo-express is an admin UI for MongoDB. Now go to http://localhost:8081 to access this interface
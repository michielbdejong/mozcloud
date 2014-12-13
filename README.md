# Mozilla Cloud Services

## Prerequisites

Docker

## Build

````
sudo docker build -t michielbdejong/fxa-content-server fxa-content-server/
sudo docker build -t michielbdejong/fxa-auth-server fxa-auth-server/
#sudo docker build -t michielbdejong/loop loop/
#sudo docker build -t michielbdejong/sync-1.1 sync-1.1/
#sudo docker build -t michielbdejong/sync-1.5 sync-1.5/
#sudo docker build -t michielbdejong/findmydevice findmydevice/
````

## Run

````
sudo docker run -d --net=host michielbdejong/fxa-content-server
AUTH_CONTAINER=$(sudo docker run -d --net=host michielbdejong/fxa-auth-server)
#sudo docker run -d --net=host michielbdejong/loop
#sudo docker run -d --net=host michielbdejong/sync-1.1
#sudo docker run -d --net=host michielbdejong/sync-1.5
#sudo docker run -d --net=host michielbdejong/findmydevice

sudo docker logs -f $AUTH_CONTAINER | grep verify_email
````

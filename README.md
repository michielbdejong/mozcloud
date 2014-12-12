# Mozilla Cloud Services

## Prerequisites

Docker

## Build

````
sudo docker build -t michielbdejong/fxa-content-server fxa-content-server/
sudo docker build -t michielbdejong/fxa-auth-server fxa-auth-server/
sudo docker build -t michielbdejong/loop loop/
sudo docker build -t michielbdejong/sync-1.1 sync-1.1/
sudo docker build -t michielbdejong/sync-1.5 sync-1.5/
sudo docker build -t michielbdejong/findmydevice findmydevice/
````

## Run

````
sudo docker run -d -p 3030:3030 -p 3080:3080 michielbdejong/fxa-content-server
sudo docker run -d -p 3030:3030 -p 9000:9000 -p 9001:9001 -p 7000:7000 michielbdejong/fxa-auth-server
sudo docker run -d michielbdejong/loop
sudo docker run -d -p 5000:5000 michielbdejong/sync-1.1
sudo docker run -d michielbdejong/sync-1.5
sudo docker run -d michielbdejong/findmydevice
````

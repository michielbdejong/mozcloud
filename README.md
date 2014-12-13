# Mozilla Cloud Services

## Prerequisites

Docker

## Build

````
sudo docker build -t michielbdejong/fxa-content-server fxa-content-server/
sudo docker build -t michielbdejong/fxa-auth-server fxa-auth-server/
#sudo docker build -t michielbdejong/loop-server loop-server/
#sudo docker build -t michielbdejong/sync-1.1 sync-1.1/
sudo docker build -t michielbdejong/sync-1.5 sync-1.5/
#sudo docker build -t michielbdejong/findmydevice findmydevice/
#sudo docker build -t michielbdejong/pushgo pushgo/
````

## Run

````
sudo docker run -d --net=host michielbdejong/fxa-content-server
AUTH_CONTAINER=$(sudo docker run -d --net=host michielbdejong/fxa-auth-server)
#sudo docker run -d --net=host michielbdejong/loop-server
#sudo docker run -d --net=host michielbdejong/sync-1.1
sudo docker run -d --net=host michielbdejong/sync-1.5
#sudo docker run -d --net=host michielbdejong/findmydevice
#sudo docker run -d --net=host michielbdejong/pushgo

sudo docker logs -f $AUTH_CONTAINER | grep verify_email
````

* loop-server is blocked by https://bugzilla.mozilla.org/show_bug.cgi?id=1111210
* findmydevice and pushgo are not implemented yet
* sync-1.1 is only needed for Firefox < 29

## Configuring Firefox Desktop

Enter 'about:config' in the URL bar, and edit the following settings:

* services.sync.tokenServerURI			http://localhost:5000/token/1.0/sync/1.5

* identity.fxaccounts.auth.uri			http://localhost:9000/v1

* identity.fxaccounts.remote.force_auth.uri	http://localhost:3030/force_auth?service=sync&context=fx_desktop_v1
* identity.fxaccounts.remote.signin.uri		http://localhost:3030/signin?service=sync&context=fx_desktop_v1
* identity.fxaccounts.remote.signup.uri		http://localhost:3030/signup?service=sync&context=fx_desktop_v1
* identity.fxaccounts.settings.uri		http://localhost:3030/settings

# Mozilla Cloud Services

## Prerequisites

Docker

## Build

````
sudo docker build -t michielbdejong/fxa-content-server fxa-content-server/
sudo docker build -t michielbdejong/fxa-auth-server fxa-auth-server/
sudo docker build -t michielbdejong/sync-1.5 sync-1.5/
sudo docker build -t michielbdejong/fxa-https-proxy fxa-https-proxy/
````

## Run

````
sudo docker run -d --net=host michielbdejong/fxa-content-server
AUTH_CONTAINER=$(sudo docker run -d --net=host michielbdejong/fxa-auth-server)
sudo docker run -d --net=host michielbdejong/sync-1.5
sudo docker run -d --net=host michielbdejong/fxa-https-proxy
````

## Configuring Firefox Desktop

* Visit https://localhost:3031/ and permanently accept the self-signed cert.

* Enter 'about:config' in the URL bar, and edit the following settings:

  * services.sync.tokenServerURI			http://localhost:5000/token/1.0/sync/1.5

  * identity.fxaccounts.auth.uri			http://localhost:9000/v1

  * identity.fxaccounts.remote.force_auth.uri	https://localhost:3031/force_auth?service=sync&context=fx_desktop_v1
  * identity.fxaccounts.remote.signin.uri		https://localhost:3031/signin?service=sync&context=fx_desktop_v1
  * identity.fxaccounts.remote.signup.uri		https://localhost:3031/signup?service=sync&context=fx_desktop_v1
  * identity.fxaccounts.settings.uri		https://localhost:3031/settings

* Sign up for sync on your local Mozilla Cloud Services instance from Menu -> Edit -> Preferrences -> Sync.
* The verification email does not really get sent out (I think!), so run:

````
sudo docker logs -f $AUTH_CONTAINER | grep verify_email
````

To find the email verification link. If you see a blank page on about:accounts?action=signup, you can run fxAccounts.getAccountsSignUpURI() in the console to debug. Viewing the logs of the other docker containers may also help. If not, please [open an issue](https://github.com/michielbdejong/mozcloud/issues/new). Good luck.

# Mozilla Cloud Services

## Work in progress

Doesn't work yet, because of https://github.com/michielbdejong/mozcloud/issues/1

## Prerequisites

Docker

## Build

````
sudo docker build -t fxa-content-server fxa-content-server/
sudo docker build -t fxa-auth-server fxa-auth-server/
sudo docker build -t sync-1.5 sync-1.5/
sudo docker build -t fxa-https-proxy fxa-https-proxy/
````

## Run

````
sudo docker run -d --net=host fxa-content-server
AUTH_CONTAINER=$(sudo docker run -d --net=host fxa-auth-server)
sudo docker run -d --net=host sync-1.5
sudo docker run -d --net=host fxa-https-proxy
````

## Configuring Firefox Desktop

* Visit https://localhost:3031/ and  https://localhost:9002/, and permanently accept the self-signed certs.

* Enter 'about:config' in the URL bar, and edit the following settings:
````
services.sync.tokenServerURI			http://localhost:5000/token/1.0/sync/1.5

identity.fxaccounts.auth.uri			https://localhost:9002/v1

identity.fxaccounts.remote.force_auth.uri	https://localhost:3031/force_auth?service=sync&context=fx_desktop_v1
identity.fxaccounts.remote.signin.uri		https://localhost:3031/signin?service=sync&context=fx_desktop_v1
identity.fxaccounts.remote.signup.uri		https://localhost:3031/signup?service=sync&context=fx_desktop_v1
identity.fxaccounts.settings.uri		https://localhost:3031/settings
````
* Sign up for sync on your local Mozilla Cloud Services instance from Menu -> Edit -> Preferences -> Sync (it may take a while to load, so be patient).
* Ignore the 'Invalid request signature' (bad mac) error.
* The verification email does not really get sent out (I think!), so run:

````
sudo docker logs -f $AUTH_CONTAINER | grep verify_email
````

To find the email verification link. If you see a blank page on about:accounts?action=signup, you can run fxAccounts.getAccountsSignUpURI() in the console to debug. Viewing the logs of the other docker containers may also help. If not, please [open an issue](https://github.com/michielbdejong/mozcloud/issues/new).

The sync tab in the settings dialog will still show a 'Verify Email' button, but AFAIK this does nothing. Click 'forget email' and then 'Sign in'. This leads to a 'bad mac' error on a cross-origin post to https://localhost:9002/v1/certificate/sign. That's [how far I got so far](https://github.com/michielbdejong/mozcloud/issues/1).

Good luck! :)

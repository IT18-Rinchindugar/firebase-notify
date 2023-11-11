# Project Setup
### yarn install 

# Start 
### yarn start

# Development 
### yarn run dev 


### Testing for app release
curl --location 'http://localhost:5000/appReleases?version=1.0.17&platformOS=android'

### Testing for binary release
curl --location 'http://localhost:5000/binaryRelease?version=1.0.17&platformOS=android'
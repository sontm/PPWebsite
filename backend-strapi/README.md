# Install 

## MongoDB on ubuntu

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org=4.4.0 mongodb-org-server=4.4.0 mongodb-org-shell=4.4.0 mongodb-org-mongos=4.4.0 mongodb-org-tools=4.4.0

1. Start
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl stop mongod
sudo systemctl restart mongod


## Strapi application
https://strapi.io/documentation/3.0.0-beta.x/guides/registering-a-field-in-admin.html
https://github.com/strapi/strapi/issues/4369

yarn create strapi-app backend-strapi --no-run
    DB: ppcms

cd backend-strapi
yarn run strapi generate:plugin wysiwyg

Admin user: admin.pp@gmail.com, Phuphuong2020

cd plugins/wysiwyg
yarn add @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
yarn add ckeditor-build-with-simple-upload-provider-strapi

cd ../..
yarn develop --watch-admin

==> Apply Patch for CKEditor

yarn build
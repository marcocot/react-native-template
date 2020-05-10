# react-native-template

This project is a [React Native](https://facebook.github.io/react-native/) boilerplate that provides **an architecture optimized for building solid cross-platform mobile applications** through separation of concerns between the UI and business logic to help you kickstart your new app

When starting new apps I found myself repeatedly setting up my project with same packages over and over again so I decided to automate this process

This boilerplate consists of various elements and best practices I learned while going though apps written by various talented developers in the React Native Community :zap:

While this mostly consists of how I organize my projects but can be easily extended to suit any workflow :smile:

**Feel free to leave a :star: as motivation if this was useful to you :smile:**

## Included

* [x] React native 0.62
* [x] Firebase
* [x] TypeScript support
* [x] Redux
* [x] Apollo Graphql
* [ ] Fastlane
* [x] Github Actions
* [ ] Jest
* [ ] Theming
* [x] [bamlab/react-native-make](https://github.com/bamlab/react-native-make)

## Using the boilerplate

Make sure to remove the existing git history and initialize the project with your own

``` bash
rm -rf .git/
git init
git add .
git commit -m 'project init'
git remote add origin <your remote repo>
git push -u origin master
```

## Rename the project

Rename the project with the name and bundle identifier of your choosing
**Note**: it is advised to do so in a new branch

``` bash
git checkout -b rename
yarn run rename <new_name> -b <bundle_identifier>
```

## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

* `yarn install` to install the dependencies
* use the following steps for your platform

### Android

Run the following command while the simulator is open or a device is connected via adb.

``` bash
yarn run android
```

### iOS

Run the following commands to install pods and run the app on iPhone 6 simulator (device can be changed via `package.json` scripts)

``` bash
yarn run ios
```

## Updates

The boilerplate will follow latest React Native releases as soon as libraries and tools used here are compatible. I will personally try update this as I use this boilerplate in production :smile:

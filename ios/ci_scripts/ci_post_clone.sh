#!/bin/sh

#  ci_post_clone.sh
#  myKROSS
#
#  Created by Sebastian Kasiński on 31/08/2022.
#
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
# have to add node yourself
brew install node@14
# link it to the path
brew link node@14

brew install npm

# Install dependencies you manage with CocoaPods.
npm install
npm run test

pod install

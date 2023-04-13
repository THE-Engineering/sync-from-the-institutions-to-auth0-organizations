#!/bin/sh

echo "update-notifier=false" > .npmrc
npm run sync

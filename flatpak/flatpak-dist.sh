#!/bin/sh

cd "`dirname "$0"`"

PACKAGE_VERSION=`jq --raw-output '.version' ../package.json`

flatpak-node-generator yarn ../yarn.lock
flatpak-builder build me.tabinol.fastmail-desktop-client.yml --repo=repo --force-clean
mkdir -p ../dist
flatpak build-bundle repo ../dist/fastmail-desktop-client-${PACKAGE_VERSION}.flatpak me.tabinol.fastmail-desktop-client

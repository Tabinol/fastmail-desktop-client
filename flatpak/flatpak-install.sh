#!/bin/sh

cd "`dirname "$0"`"

flatpak-node-generator yarn ../yarn.lock
flatpak-builder build me.tabinol.fastmail-desktop-client.yml --install --force-clean --user

# Workaround Bug with Vite: Error: ELOOP: too many symbolic links encountered, stat '...'
rm -rf ./build ./.flatpak-builder ./repo


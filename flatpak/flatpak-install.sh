#!/bin/sh

cd "`dirname "$0"`"

flatpak-node-generator yarn ../yarn.lock
flatpak-builder build me.tabinol.fastmail-desktop-client.yml --install --force-clean --user

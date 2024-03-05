#!/usr/bin/env bash

cd "$(dirname "$0")"

flatpak-builder build me.tabinol.fastmail-desktop-client.yml --install --force-clean --user

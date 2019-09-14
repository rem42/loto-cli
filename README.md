loto-cli
========

Node script to play bananalotto or kingolo grid in cli

### Install

    git clone git@github.com:rem42/loto-cli.git
    cd loto-cli
    npm install && npm build
    chmod +x dist/index.js

### Usage

```bash
$ ./dist/index.js --help

  _           _                            _   _ 
 | |   ___   | |_    ___             ___  | | (_)
 | |  / _ \  | __|  / _ \   _____   / __| | | | |
 | | | (_) | | |_  | (_) | |_____| | (__  | | | |
 |_|  \___/   \__|  \___/           \___| |_| |_|
                                                 
Usage: index [options]

Play bananalotto grid without browser and ads

Options:
  -V, --version              output the version number
  -g, --game <game>          name of the game bananalotto or kingoloto
  -u, --user <user>          email of the credential
  -p, --password <password>  password of the credential
  --no-interaction           play add grid without interaction
  -h, --help                 output usage information
```

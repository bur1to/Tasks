#!/bin/bash

set -xeuo pipefail
IFS=$'\n\t'

cd "$( dirname "${BASH_SOURCE[0]}" )"
cd ..

npm start

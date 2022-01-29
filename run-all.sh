#!/bin/bash
./run-js.sh &
jsPID=$!

./run-py.sh &
pyPID=$!

tail --pid=$jsPID -f /dev/null
tail --pid=$pyPID -f /dev/null
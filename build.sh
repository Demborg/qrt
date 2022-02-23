#!/bin/bash
set -e
mkdir -p build
emcmake cmake -B build -S .

pushd build
emmake make 

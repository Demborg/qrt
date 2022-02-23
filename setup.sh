set -e
mkdir -p thirdparty
pushd thirdparty
git clone https://github.com/emscripten-core/emsdk.git
pushd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
popd

git clone https://github.com/opencv/opencv.git
pushd opencv
python3 ./platforms/js/build_js.py build_wasm --build_wasm --emscripten_dir ../emsdk/upstream/emscripten/


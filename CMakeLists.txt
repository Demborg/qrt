FILE(GLOB source "*.cpp" "*.hpp")
cmake_minimum_required( VERSION 3.1 )
project( QRT )

# Set Release as default build type
set(CMAKE_BUILD_TYPE Release)

set(LOCAL_OPENCV_REPOSITORY_PATH "thirdparty/opencv/")

# Needed for opencv2/opencv.hpp
include_directories("${LOCAL_OPENCV_REPOSITORY_PATH}include")

# Needed by opencv.hpp for opencv2/opencv_modules.hpp
include_directories("${LOCAL_OPENCV_REPOSITORY_PATH}build_wasm")

# Needed by opencv_modules.hpp for every module
file( GLOB opencv_include_modules "${LOCAL_OPENCV_REPOSITORY_PATH}modules/*/include" )
include_directories( ${opencv_include_modules} )

add_executable(lib ${source})

# Link to opencv.js precompiled libraries
file( GLOB opencv_js "${LOCAL_OPENCV_REPOSITORY_PATH}build_wasm/lib/*.a" )
target_link_libraries( lib ${opencv_js} )

# Specify linker arguments
set_target_properties(lib PROPERTIES LINK_FLAGS "-s LLD_REPORT_UNDEFINED -s DEMANGLE_SUPPORT=1 --bind -s EXPORTED_FUNCTIONS=_malloc,_free -s ALLOW_MEMORY_GROWTH=1")


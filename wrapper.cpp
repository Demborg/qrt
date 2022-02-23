#include <vector>

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <opencv2/calib3d.hpp>
#include <opencv2/core/mat.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>

void gray(int tmp, const int height, const int width)
{
    auto io_array = reinterpret_cast<uint8_t*>(tmp);
    cv::Mat img(height, width, CV_8UC4, io_array);
    cv::Mat1b input(height, width);
    cv::cvtColor(img, input, cv::COLOR_RGBA2GRAY);
    cv::cvtColor(input, img, cv::COLOR_GRAY2RGBA);
}

EMSCRIPTEN_BINDINGS(wrapper) {
    emscripten::function("gray", &gray, emscripten::allow_raw_pointers());
}

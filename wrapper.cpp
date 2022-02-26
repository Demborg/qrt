#include <vector>

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <opencv2/calib3d.hpp>
#include <opencv2/core/mat.hpp>
#include <opencv2/opencv.hpp>
#include <iostream>

struct Parameter {
    int value;
    int max;
    std::string name;
};

struct Parameters {
    Parameter threshold = {200, 255, "threshold"};
};

void detect(int tmp, const int height, const int width, const Parameters parameters)
{
    auto io_array = reinterpret_cast<uint8_t*>(tmp);
    cv::Mat img(height, width, CV_8UC4, io_array);
    cv::Mat1b input(height, width);
    cv::cvtColor(img, input, cv::COLOR_RGBA2GRAY);
    cv::threshold(input, input, parameters.threshold.value, 255, cv::THRESH_BINARY);
    cv::cvtColor(input, img, cv::COLOR_GRAY2RGBA);
}

Parameters getParameters()
{
    return Parameters();
}

EMSCRIPTEN_BINDINGS(wrapper) {
    emscripten::value_object<Parameter>("Parameter")
        .field("value", &Parameter::value)
        .field("max", &Parameter::max)
        .field("name", &Parameter::name);
    emscripten::value_array<Parameters>("Parameters")
        .element(&Parameters::threshold);
    emscripten::function("detect", &detect, emscripten::allow_raw_pointers());
    emscripten::function("getParameters", &getParameters);
}

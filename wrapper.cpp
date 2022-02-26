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

std::vector<cv::Point2i> scan(const cv::Mat1b threshold)
{
    std::vector<cv::Point2i> result = {};
    std::vector<int> target = {1, 1, 3, 1, 1};
    int state = -1;
    bool dark = false;
    int sum = 0;
    int unit = 0;
    for( int y=0; y< threshold.rows; y+=1){
        for (int x=0;x< threshold.cols;x+=1){
            if (dark != (threshold.at<uchar>({x, y}) > 0)){
                if (state == -1) {
                    state++;
                    unit = sum;
                } else {
                    if (sum < target[state] * unit * 1.5 && sum > target[state] * unit * 0.5) {
                        state++;
                    } else {
                        state = dark ? 0 : -1;
                    }
                }
                if (state == target.size()) {
                    result.push_back({x, y});
                    state = -1;
                }
                dark = !dark;
                sum = 0;
            }
            sum++;
        }
    }
    return result;
}

void detect(int tmp, const int width, const int height, const Parameters parameters)
{
    auto io_array = reinterpret_cast<uint8_t*>(tmp);
    cv::Mat img(height, width, CV_8UC4, io_array);
    cv::Mat1b input(height, width);
    cv::cvtColor(img, input, cv::COLOR_RGBA2GRAY);
    cv::threshold(input, input, parameters.threshold.value, 255, cv::THRESH_BINARY);
    cv::cvtColor(input, img, cv::COLOR_BGR2RGBA);
    const auto detections = scan(input);
    for (const auto detection : detections) {
        cv::circle(img, detection, 10, cv::Scalar(255, 0, 0, 255), cv::FILLED);
    }
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

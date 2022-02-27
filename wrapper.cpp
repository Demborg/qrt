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
    Parameter minRadius = {0, 200, "minimum radius"};
};

struct trackingResult {
    bool detection;
    int radius; 
};

struct PointWithSize {
    cv::Point2i point;
    int size;
};

struct Tracker {
    trackingResult track(const bool pixelIsBright, const int t) {
        if (dark != pixelIsBright){
            if (state == -1) {
                state++;
                unit = sum;
                start_t = t;
            } else {
                if (sum < target[state] * unit * 1.5 && sum > target[state] * unit * 0.5) {
                    state++;
                } else {
                    state = dark ? 0 : -1;
                }
            }
            dark = !dark;
            sum = 0;
            if (state == target.size()) {
                state = -1;
                return {true, (t - start_t)/2};
            }
        }
        sum++;
        return {false, -1};
    }

    void reset() {
        state = -1;
        dark = false;
        sum = 0;
        unit = 0;
        start_t = 0;
    }

private:
    std::vector<int> target = {1, 1, 3, 1, 1};
    int state = -1;
    bool dark = false;
    int sum = 0;
    int unit = 0;
    int start_t = 0;
};

std::vector<PointWithSize> scan(const cv::Mat1b& threshold, Tracker& tracker, const Parameters& parameters)
{
std::vector<PointWithSize> result = {};
    tracker.reset();
    for( int y=0; y< threshold.rows; y+=1){
        for (int x=0;x< threshold.cols;x+=1){
            const auto res = tracker.track(threshold.at<uchar>({x, y}) > 0, x);
            if (res.detection && res.radius > parameters.minRadius.value) {
                result.push_back({{x - res.radius, y}, res.radius});
            }
        }
    }
    tracker.reset();
    for (int x=0;x< threshold.cols;x+=1){
        for( int y=0; y< threshold.rows; y+=1){
            const auto res = tracker.track(threshold.at<uchar>({x, y}) > 0, y);
            if (res.detection && res.radius > parameters.minRadius.value) {
                result.push_back({{x, y - res.radius}, res.radius});
            }
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
    auto tracker = Tracker();
    const auto detections = scan(input, tracker, parameters);
    for (const auto detection : detections) {
        cv::circle(img, detection.point, detection.size, cv::Scalar(255, 0, 0, 255));
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
        .element(&Parameters::threshold)
        .element(&Parameters::minRadius);
    emscripten::function("detect", &detect, emscripten::allow_raw_pointers());
    emscripten::function("getParameters", &getParameters);
}

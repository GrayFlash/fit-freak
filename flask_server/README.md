# To identify Pose & present the confidence of its accuracy

For the sake of minimal implementation here we will focus on just a few poses, and the accuracy of users pose shall be determined by the confidence of our prediction.
This isn't the best way to it, and can be improved by focusing more iibt the pose detection from mediapipe and matching the angles formed by users predicted dots and can be matched with the base image.

The only category we are focusing at the moment is `YOGA`, and classes we will predicting it in are:

- downdog
- goddess
- plank
- tree
- warrior

## Environment Setup

* Create a ViretualEnv with, ```python3 -m venv env```.
* Activate virtual env, ```source env/bin/activate```.
* ```pip install -r requirements.txt```, for installing the dependencies.
* To export development environment, ```export FLASK_ENV=development```.
* To start the flask server, ```flask run```.

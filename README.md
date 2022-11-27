# fit-freak / fit-o-rama

A platform for collaborative games based on exercise and for matching the precision of your body's form and posture while performing a Exercise, Yoga, or any desired movement!!

## Inspiration

I'm often surrounded by gadgets, and books throughout the day and I am not able to work out a lot. Seems like an excuse right, it is, but there are a lot of difficulties a lot of normal people face due to which they are not able to show up to gyms or get the help of someone to help them train.

But there are times when I want to at least be able to do some exercise, and see whether I am doing it correctly or not, especially if I am doing something where I can sustain injury due to the wrong form.

Also, there should be some activity around it, which I can do with my bunch of folks, as a game, where we all perform some exercise and we are able to see who did it properly and the number of reps each one of us was able to do.

## What it does

So, I made a platform for these two needs. It will have a section for pose accuracy, where the user can upload a base/ideal image or video around how his pose should be, and his own image and we are able to predict the accuracy of his performance. Currently, it works only on static images but will like to build it further for videos as well.

The platform also has a video call functionality, where users can create a room, join together and perform a set of exercises from the options available. We can return the number of repetitions they perform and present a leaderboard at the end. Currently, was able to only work till adding the video call functionality using webRTC, the pose detection part is yet to be integrated.

## How we built it

Built the pose detection part on the flask server using Mediapipe for pose detection. I get the landmark points from this library, and I use it to calculate the angle formed around different body parts. Used angles because the absolute value of landmark points varies greatly in weight based on the shape and size of images, hence angles are away from this bias.
In the front end, when we select the images, we upload it to Cloudinary and obtain the URL. So the flask server expects the URLs of the base image and the actual image and compares the angles around various parts. Returns an exercise to be incorrect if the difference is more than 8 degrees.

Another feature was supposed to be a Video Call, where pose detection can be performed on each users video and they can participate in some sort of contest. Implemented the Video call using simple-peer and socket.io, it runs on server backend, and the part where I was supposed to load media pipe in frontend and perform the pose detection and update the counter is pending here.

## Challenges we ran into
* haven't worked on frontend and React.js for a while, so my work was a mess.
* There were deployment issues, and haven't worked on anything like socket.io or simple-peer, so wasn't able to deploy it, hence caused a lot of delay.

## What's next for Fit-freak

- Completion of the planned features.
- One thing I would love to see is if we can compare pose accuracy between two videos, haven't searched much of it, but there are a lot of challenges like the timing at which the poses change and how we are doing it, and the relative angles, so seems like a big feature and topic to cover.

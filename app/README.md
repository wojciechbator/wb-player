# WiFi Guitar #

Travis CI project status: [![Build Status](https://travis-ci.org/wojciechbator/wifi-guitar.svg?branch=develop)](https://travis-ci.org/wojciechbator/wifi-guitar)

## What is it? ##

With this project I aim to create simple and handy, yet powerful application for recording the music. Not only with guitar and not only via wi-fi. It works for pretty much everything You want to connect via line-in or micro-in interface. The aim for the project is to create nice drag-and-drop chains of effects, that would create different presets. User then can select one of the preset and play. Recording obviously is gonna be included, as well as backing tracks. It is electron app, but based on web application, so User can also enter the website, where the app is hosted and record from there.

## Tech stack and data flow ##

The concept is not that easy: to create reactive chain of audio nodes that works together as a preset. For reactive flow I included RxJS with Redux. Every change will trigger redux action, which is gonna also notify all subscribers. The full solution is a bit more complicated, and I'll update this readme with the gist. Node.js sits on the backend. 
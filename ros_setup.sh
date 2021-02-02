#!/usr/bin/env bash
# repo + keys
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

# update package db and install
sudo apt update
sudo apt install -y ros-*-desktop-full
sudo apt install -y ros-*-rosbridge-suite

# source ros environment
if [[ -d /opt/ros ]]; then
	DIST="$(ls -w 1 /opt/ros | head -n 1)"
	EXT="$(ps -q $$ -o comm=)"
	[[ -f /opt/ros/$DIST/setup.$EXT ]] && source /opt/ros/$DIST/setup.$EXT
fi

echo '
Add the following to ~/.bashrc or ~/.zshrc to source ROS on login.

## source ros environment ##
if [[ -d /opt/ros ]]; then
	DIST="$(ls -w 1 /opt/ros | head -n 1)"
	EXT="$(ps -q $$ -o comm=)"
	[[ -f /opt/ros/$DIST/setup.$EXT ]] && source /opt/ros/$DIST/setup.$EXT
fi
'

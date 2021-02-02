Sensor scripts are based on [this](http://wiki.ros.org/roslibjs/Tutorials/Publishing%20video%20and%20IMU%20data%20with%20roslibjs) roslibjs tutorial.

The teleop script is based on [this](https://medium.com/husarion-blog/bootstrap-4-ros-creating-a-web-ui-for-your-robot-9a77a8e373f9) bootstrap+ROS tutorial.

### Setup

1. Run `ros_setup.sh` to install ros and dependencies or follow the [ROS installation tutorial](http://wiki.ros.org/ROS/Installation) for your system.

  1. if you do a manual installation make sure to also install the [rosbridge suite](http://wiki.ros.org/rosbridge_suite).

2. Add the following to your `~/.bashrc` or `~/.zshrc` and then source it or reopen a new terminal.

```bash
## source ros environment ##
if [[ -d /opt/ros ]]; then
	DIST="$(ls -w 1 /opt/ros | head -n 1)"
	EXT="$(ps -q $$ -o comm=)"
	[[ -f /opt/ros/$DIST/setup.$EXT ]] && source /opt/ros/$DIST/setup.$EXT
fi
```

3. Run `create_workspace.sh` in whichever directory you want to make your catkin workspace and then run `catkin_make`.

4. Before every use of this workspace make sure to run `source ./devel/setup.bash` (or `source ./devel/setup.zsh`).

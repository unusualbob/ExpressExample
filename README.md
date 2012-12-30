Express Example
=============

To start out make sure you've got node installed. An easy way to do this is to install NVM (Node Version Manager). This will make installing node easy peasy.  

```curl https://raw.github.com/creationix/nvm/master/install.sh | sh```  
or  
```wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh```  

You will probably have to start a new terminal window since this modifies your bashrc file.  

```nvm install v0.8.9```  

This will automatically download and compile that version of node.  

Once its installed lets clone this repo we're in. (Or pull in that folder if you've already got it)  
```git clone git@github.com:SyntaxSimian/JadeNodejsDemo.git```  

Now we need to install the node modules this project requires, since I've setup a package.json file this is really simple.  
```npm install```

This automatically installs the requirements for the project.  

Next we're going to try running the project, this can be done by running `node app.js` unless you are on a system that blocks access to port 80, in that case use sudo.

---
The server should now be running, all you need to do is hit this box on a web browser and you can see the example pages. These are:
*  / (home)
*  /json (json example)
*  /auth (authentication, use test:test)
*  /anythingElse (404 example)

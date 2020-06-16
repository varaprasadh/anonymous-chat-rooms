<p align='center'>
 <img src='files/icon_192.png'/>
</p>

# anonymous chat rooms
 
![](https://img.shields.io/badge/licence-MIT-green)
![](https://img.shields.io/github/followers/varaprasadh?label=follow&style=social)![](https://img.shields.io/node/v-lts/express/latest)
![](https://img.shields.io/badge/version-0.0.1-red)


> try out the app at [https://anonymous-chatrooms.web.app/](https://anonymous-chatrooms.web.app/)

 it is a open source chat app runs on react and nodejs powered by   socket.io

### deployed on 

<div style="display:flex;align-items:flex-end">
<figure>
    <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_48dp.png" title="firebase hosting" alt="firebase hosting">
</figure>
 
<figure>
    <img src="https://brand.heroku.com/static/media/heroku-logo-stroke.aa0b53be.svg" title="heroku free tier dyno" alt="heroku free tier dyno">
</figure>
</div>

## features
 - create rooms
 - send emojis
 - send text 
 - markdown formatting (limited)
     - ```<big>text<big>``` will send bigger fontsize items
     - ```<lt>lottie name<lt>``` will send a animated lottie     available lotties are HEART,LIKE,DISLIKE,STATHOME
     - ```<a>text<a>``` will send animated text
 - send lottie reactions 
      - available lotties are HEART,LIKE,DISLIKE,STATHOME
-----
#### ***feel free to clone and contribute a feature and make a pull request***
---

 [click here](https://github.com/varaprasadh/anonymous-chat-rooms/issues) to report any bugs or issues

## configure development environment
  - clone the repo
  - go to the ```/client``` directory and run 
     - ```
        npm install 
       ```
     - ```
        npm start
       ```
   - open a new terminal tab/window and go to the  ```/server```    directory and run
     - ```
        npm install
       ```
     - ```
        npm start
       ```
   - open browser and go to where the react app running on!

`note:` client socket needs an endpoint on which socket server is running,so make sure `if you change your port or ip on server`,change it on client by going `/client/src/config.json`;


### versions
   - 0.0.1 (current)
      - takes username and room id to join in
   - 0.0.2 (upcoming)
     - cli-version
     - randomised chatroom connections
     - automated username genarations
     - avatars 
     - sticker support 







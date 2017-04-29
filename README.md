# voicequalizer

trying to teach https://dood.al/pinktrombone/ to make more human sounds aka speaking by hooking it to a Voice recognition software and applying ML

```
                                                                                                                                         
                                                                                                                                         
   +---------------------+                         +---------------------+                                                               
   |                     |                         |                     |                                                               
   |      HTTP Server    |                      /- |  Web Socket Server  |                                                               
   |                     |                     /   |                     |                                                               
   +----------|----------+                    /    +---------------------+                                                               
              |                              /                |                                                                          
          Index.html     --- << Command.json-             Next step                                                                      
              |         /                                     |                                                                          
              |        /                                      |                                                                          
   +---------------------+                         +---------------------+                                                               
   |                     |                         |                     |                                                               
   |    Pink Trombone                              | WebSocket Submitter |                                                               
   |                     |                         |                     |                                                               
   +---------------------+                         +---------------------+                                                               
              |                                               |                                                                          
            Audio                                             |                                                                          
              |                                               |                                                                          
              |                                               |                                                                          
   +---------------------+                         +---------------------+                                                               
   |                     |                         |                     |                                                               
   |    SoundFlower      |--------Audio >>-------- | PySpeechRecognition |                                                               
   |                     |                         |                     |                                                               
   +---------------------+                         +---------------------+                                                               
                                                             ||                                                                          
                                                             ||                                                                          
                                                             ||                                                                          
                                                       Recogniced Text.                                                                  
                                                             ||                                                                          
                                                             ||                                                                          
                                                           - || -                                                                        
                                                            \  /                                                                         
                                                             \/                                                                          

```
### thanks to:
```
https://github.com/evykassirer/pink-trombone
https://github.com/dpallot/simple-websocket-server/
https://github.com/mLupine/SoundflowerBed/releases
https://github.com/Uberi/speech_recognition/tree/master/examples
https://github.com/cmusphinx/pocketsphinx
```

### setup
#### all
```
see requirements
```
#### osx
```
brew install portaudio
brew install cmu-pocketsphinx
brew install swig
# install soundflower, tb added
set in and output to soundflower 2ch interface in OSX systems prefference
```

import firebase from 'firebase';
import uuid from 'uuid';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyA5IAyqvOJNbb8u3gHjKm80VBVKrwEiBrA',
        authDomain: 'chatsimplified-41e8a.firebaseapp.com',
        databaseURL: 'https://chatsimplified-41e8a.firebaseio.com',
        projectId: 'chatsimplified-41e8a',
        storageBucket: 'chatsimplified-41e8a.appspot.com',
        messagingSenderId: '1018931273351',
        appId: '1:1018931273351:web:baf1a221a83c1412ce6222'
      });
    }
  }
  createAccount = async user => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(`${user}@gmail.com`, user)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ...
        });
    } catch (err) {
      console.log(err);
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(`${user}@gmail.com`, user)
      .then(
        function() {
          console.log(
            'created user successfully. User email:' + user + ' name:' + user
          );
          var userf = firebase.auth().currentUser;
          userf
            .updateProfile({
              displayName: user
            })
            .then(
              function() {
                console.log('Updated displayName successfully. name:' + user);
              },
              function(error) {
                console.warn('Error update displayName.');
              }
            );
        },
        function(error) {
          console.error(
            'got error:' + typeof error + ' string:' + error.message
          );
          alert('Create account failed. Error: ' + error.message);
        }
      );
  };

  uploadImage = async messages => {
    let image = messages[0].image;
    const ext = image.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    let uri = image;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      var storageRef = firebase.storage().ref();

      var imgRef = storageRef.child(filename);
      imgRef.put(blob).then(snapshot => {
        var storage = firebase.storage();
        var pathReference = storage.ref(filename);
        pathReference.getDownloadURL().then(url => {
          let { uid, email } = firebase.auth().currentUser;
          const user = {
            _id: uid,
            id: uid,
            avatar:
              'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
            email: email,
            name: email.split('@')[0]
          };
          const message = {
            user,
            createdAt: new Date(),
            image: url,
            text: '',
            _id: uid
          };

          firebase
            .database()
            .ref('Messages')
            .push(message);
        });
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message);
    }
  };

  refOn = callback => {
    this.ref
      .limitToLast(2000)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };
  earlierMessages = callback => {
    this.ref
      .limitToLast(30)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user, image } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = { _id, timestamp, text, user, image };
    return message;
  };

  get timestamp() {
    let date = new Date();
    return date;
  }

  // send the message to the Backend
  send = messages => {
    try {
      for (let i = 0; i < messages.length; i++) {
        let image = '';
        const { text, user } = messages[i];
        const message = {
          text,
          user,
          createdAt: this.timestamp,
          image
        };
        this.ref.push(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  refOff() {
    this.ref.off();
  }
  get ref() {
    return firebase.database().ref('Messages');
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  updateAvatar = url => {
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url }).then(
        function() {
          console.log('Updated avatar successfully. url:' + url);
          alert('Avatar image is saved successfully.');
        },
        function(error) {
          console.warn('Error update avatar.');
          alert('Error update avatar. Error:' + error.message);
        }
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert('Unable to update avatar. You must login first.');
    }
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;

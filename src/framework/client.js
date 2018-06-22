import firebase from 'firebase/app'
import 'firebase/database'
import config from '../../firebaseKey.json'

var Client = (function() {

    var ref = {
      set: () => {},
    };

    return {
      start: function(id, setState){
        firebase.initializeApp(config);
        ref = firebase.database().ref('games/' + id );

        ref.on('value', function(snapshot) {
          if(snapshot.val()) setState(snapshot.val());
        });
      },
      pushState: function(state){
        ref.set(state);
      }
    };
})();

export default Client

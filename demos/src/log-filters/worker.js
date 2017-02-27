/**
 * Created by Vova on 27.02.2017.
 */

self.onmessage = function(e) {
    console.log('Message received from main script');
    var workerResult = 'Result: ' + (e.data);
    console.log('Posting message back to main script');
    console.log(e)
    self.postMessage(workerResult);
    console.log(e.type)
}
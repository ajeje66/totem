AGGIUNGERE IN TUTTE LE PAGINE CARICATE DA 1.HTML


function signalActivity() {

    parent.parent.postMessage('activity', '*');

}

document.addEventListener('click', signalActivity);
document.addEventListener('touchstart', signalActivity);
document.addEventListener('mousemove', signalActivity);
document.addEventListener('scroll', signalActivity);
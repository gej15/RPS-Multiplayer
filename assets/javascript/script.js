$(document).ready(function(){
        // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDIBTaio5PpId7jOOiALxx4C2NBNW_aXx0",
        authDomain: "rps-multiplayer-38699.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-38699.firebaseio.com",
        projectId: "rps-multiplayer-38699",
        storageBucket: "rps-multiplayer-38699.appspot.com",
        messagingSenderId: "18276418037",
        appId: "1:18276418037:web:d55e16d74c81d5dfaa60bc"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
 
    let database = firebase.database();

let player1Name = ""
let player2Name = ""
let symbol = ""
let player1Wins = 0
let player2Wins = 0
let ties = 0
let thisPlayer = ""
let inputAndName = " "
let number = 0

database.ref('player1').set({
    name: player1Name,
    symbolSelect: symbol,
    })

database.ref('player2').set({
    name: player2Name,
    symbolSelect: symbol,
    })

database.ref('messages').set({
    inputAndName,
    number,
})

$('#player1SignInButton').click(function() {
    console.log('go')
    let player1Name = $('#player1Name').val().trim()
    console.log(player1Name)
    thisPlayer = player1Name

    database.ref('player1').set({
        name: player1Name,
        symbolSelect: symbol,
      })
      document.querySelector('#player1Rock').style.display = 'inline'
    document.querySelector('#player1Paper').style.display = 'inline'
    document.querySelector('#player1Scissors').style.display = 'inline'
    document.querySelector('#player1EnterNameButton').style.display = 'none'
    document.querySelector('#player2EnterNameButton').style.display = 'none'
    $('#make').css("visibility", "visible")
    $('#gameText').text('Make a selection')


})

$('#player2SignInButton').click(function() {
    console.log('go2')
    let player2Name = $('#player2Name').val().trim()
    console.log(player2Name)
    thisPlayer = player2Name
    database.ref('player2').set({
        name: player2Name,
        symbolSelect: symbol,
      })
      document.querySelector('#player2Rock').style.display = 'inline'
      document.querySelector('#player2Paper').style.display = 'inline'
      document.querySelector('#player2Scissors').style.display = 'inline'
    document.querySelector('#player2EnterNameButton').style.display = 'none'
    document.querySelector('#player1EnterNameButton').style.display = 'none'
    $('#gameText').text('Make a selection')
    $('#make').css("visibility", "visible")
})


database.ref().on("value", function(snapshot) {
    let player1Name = snapshot.val().player1.name
    let player2Name = snapshot.val().player2.name

     $('#player1Title').text(player1Name)
     $('#player2Title').text(player2Name)
     if (player1Name === "") {
        $('#player1Title').text('Player 1')
        console.log('no player 1')
        // document.querySelector('#player1Rock').style.display = 'none'
        // document.querySelector('#player1Paper').style.display = 'none'
        // document.querySelector('#player1Scissors').style.display = 'none'
     } 
    // else {
    //     console.log('there is a player one')    
    //     console.log(player1Name)
    //     document.querySelector('#player1Rock').style.display = 'inline'
    //     document.querySelector('#player1Paper').style.display = 'inline'
    //     document.querySelector('#player1Scissors').style.display = 'inline'
    //     document.querySelector('#player1EnterNameButton').style.display = 'none'

    // }       
    if (player2Name === "") {
        $('#player2Title').text('Player 2')
        console.log('no player 2')
        // document.querySelector('#player2Rock').style.display = 'none'
        // document.querySelector('#player2Paper').style.display = 'none'
        // document.querySelector('#player2Scissors').style.display = 'none'
    }
    //  else {
    //     console.log('there is a player two')    
    //     console.log(player2Name)
    //     document.querySelector('#player2Rock').style.display = 'inline'
    //     document.querySelector('#player2Paper').style.display = 'inline'
    //     document.querySelector('#player2Scissors').style.display = 'inline'
    //     document.querySelector('#player2EnterNameButton').style.display = 'none'
    // }
})

$('.player1Symbols').on('click', function(){
    let symbol = $(this).attr('value')
    player1Name = $('#player1Title').text()
    console.log(player1Name)
    console.log(symbol)
    // $('#make').css("visibility", "hidden")
    database.ref('player1').update({
        symbolSelect: symbol,
      })
})

$('.player2Symbols').on('click', function(){
    let symbol = $(this).attr('value')
    player2Name = $('#player2Title').text()
    // $('#make').css("visibility", "hidden")
    console.log(player2Name)
    console.log(symbol)
    database.ref('player2').update({
        symbolSelect: symbol,
      })
})

database.ref('player1').on('value', function(snapshot){
  let player1Name = snapshot.val().name
  console.log(player1Name)
  if (player1Name !== "") {
    document.querySelector('#player1EnterNameButton').style.display = 'none'
  }
})

database.ref('player2').on('value', function(snapshot){
  let player2Name = snapshot.val().name
  if (player2Name !== "") {
    document.querySelector('#player2EnterNameButton').style.display = 'none'
  }
})

database.ref().on("value", function(snapshot) {
  if (snapshot.val().player1.name !== "" && snapshot.val().player2.name != "") {
   
    
    
  }
})

database.ref().on("value", function(snapshot) {
    if (snapshot.val().player1.symbolSelect === "" && snapshot.val().player2.symbolSelect != "") {
        $('#gameText').text('Waiting on player 1')
    } else if (snapshot.val().player2.symbolSelect === "" && snapshot.val().player1.symbolSelect != "") {
        $('#gameText').text('Waiting on player 2')
    } else if (snapshot.val().player1.symbolSelect != ""  && snapshot.val().player2.symbolSelect != "") {
        console.log('player1' + snapshot.val().player1.symbolSelect)
        console.log('both')
        let player1 = snapshot.val().player1.symbolSelect
        let player2 = snapshot.val().player2.symbolSelect
        let result =""
         if (player1 == player2) {
            result = 0
        }
        if (player1 === 'r') {
            // switch statement
            // can substitute if statements
            switch (player2) {
              case 's':
                result = 1;
                break;
              case 'p':
                result = -1;
                break;
            }
          } else if (player1 == 's') {
            switch (player2) {
              case 'p':
                result = 1;
                break;
              case 'r':
                result = -1;
                break;
            }
          } else if (player1 == 'p') {
            switch (player2) {
              case 'r':
                result = 1;
                break;
              case 's':
                result = -1;
                break;
            }
          } else if (player1 == player2) {
              result = 0
          }
        
        //   return result;
        console.log(result)
        let symbol = ''
        database.ref('player1').update({
            symbolSelect: symbol,
          })
        database.ref('player2').update({
        symbolSelect: symbol,
        })
        
        
        if (result === 0) {
            console.log("it's a tie")
            ties++
            $('#ties').text(ties)
            $('#make').text('It was a Tie')

        } else if (result === 1) {
            console.log('player1 wins')
            player1Wins++
            $("#player1Wins").text(player1Wins)
            let player1Name = $('#player1Title').text()
            $('#make').text(player1Name +' Wins')
        } else {
            console.log('player2 wins')
            player2Wins++
            $('#player2Wins').text(player2Wins)
            let player2Name = $('#player2Title').text()
            $('#make').text(player2Name +' Wins')
        }
        $('#gameText').text('Make a selection')
    }    
    })

    $('#submitButton').on('click', function(e){
        e.preventDefault()
        console.log(number)
         database.ref('messages').on("value", function(snapshot) {
          number = snapshot.val().number
         })
        number++
        console.log(number)

        let input = $('#smackTalk').val().trim()
        
        let inputAndName1 = thisPlayer + ": " + input 
        //console.log(inputAndName1.slice(0, -1))
        
        
        let inputAndName = inputAndName1
        console.log(inputAndName) 
        database.ref('messages').update({
            inputAndName,
            number,
          })
  
    })

    database.ref('messages').on("value", function(snapshot) {
      let message = $('<div>')  
      incomingMessage = snapshot.val().inputAndName
      message.append(incomingMessage)
        // incomingMessage.style.display = 'block'
        $('#messages').append(message)
        $('#messages').scrollTop($('#messages')[0].scrollHeight)
    })


}) //document.ready

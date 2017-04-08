import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myvideo') myVideo: any;

  peer;
  anotherid;
  mypeerid;

  constructor() {

  }

  ngOnInit() {
    let video = this.myVideo.nativeElement;
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    },3000);

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      });
    });

    var n = <any>navigator;

    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );

    this.peer.on('call', (call) => {
      n.getUserMedia({video: true, audio: true}, (stream) => {
        call.answer(stream);
        call.on('stream', (remotestream) => {
          video.src = URL.createObjectURL(remotestream);
          video.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
  }

  connect(text){
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', () => {
      conn.send(text);
    });
  }

  videoconnect(){
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;

    var n = <any>navigator;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    n.getUserMedia({video: true, audio: true}, (stream) => {
      var call = localvar.call(fname, stream);
      call.on('stream', (remotestream) => {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      })
    }, (err) => {
      console.log('Failed to get stream', err);
    })
  }
}

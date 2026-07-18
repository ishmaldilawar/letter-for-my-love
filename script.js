// script.js - handle interactions: tap-to-start, pendant open, image uploads, confetti, letter download
(function(){
  const startOverlay = document.getElementById('startOverlay');
  const pendant = document.getElementById('pendant');
  const pendantKnot = document.getElementById('pendantKnot');
  const afterOpen = document.getElementById('afterOpen');
  const toLetter = document.getElementById('toLetter');
  const letterSection = document.getElementById('letterSection');
  const letterInput = document.getElementById('letterInput');
  const downloadBtn = document.getElementById('downloadBtn');
  const finishBtn = document.getElementById('finishBtn');
  const finalSection = document.getElementById('finalSection');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const muteBtn = document.getElementById('muteBtn');
  const youtubeUrlInput = document.getElementById('youtubeUrl');
  const setYoutube = document.getElementById('setYoutube');

  let ytIframe = null;
  let audioElem = null;
  let isMuted = false;
  let started = false;

  function startGesture() {
    if (started) return;
    started = true;
    startOverlay.style.display = 'none';
    // if a youtube url was already set, create iframe and autoplay
    const url = youtubeUrlInput.value.trim();
    if (url) setYouTube(url, {autoplay:true});
    // if local audio selected earlier, play it
    if (audioElem){ audioElem.play().catch(()=>{}); }
    // reveal pendant (small attention animation)
    pendant.style.transform = 'scale(1.02)';
    setTimeout(()=>pendant.style.transform = '', 300);
  }

  document.body.addEventListener('click', startGesture, {once:true});

  // pendant open/close
  pendant.addEventListener('click', (e)=>{
    if (!pendant.classList.contains('open')){
      pendant.classList.add('open');
      afterOpen.hidden = false;
      launchConfetti();
    }
  });

  toLetter.addEventListener('click', ()=>{
    document.querySelector('.stage').hidden = true;
    letterSection.hidden = false;
  });

  finishBtn.addEventListener('click', ()=>{
    letterSection.hidden = true;
    finalSection.hidden = false;
    // stop audio if present
    if (audioElem) audioElem.pause();
    if (ytIframe) ytIframe.contentWindow.postMessage('{
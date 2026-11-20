(() => {
  const viewer=document.getElementById('bottle360');
  if(!viewer)return;
  const image=document.getElementById('bottle360Image');
  const total=20;
  const paths=Array.from({length:total},(_,i)=>`images/botella-360/display/frame-${String(i).padStart(2,'0')}.webp?v=3`);
  const frames=paths.map(src=>{const img=new Image();img.decoding='async';img.src=src;return img;});
  let frame=0,dragStartX=null,dragStartFrame=0;
  const mod=value=>(value%total+total)%total;
  function showFrame(index){
    const next=mod(index);
    if(next===frame)return;
    frame=next;
    image.src=frames[frame].src;
  }
  viewer.addEventListener('pointerdown',event=>{
    dragStartX=event.clientX;dragStartFrame=frame;
    viewer.setPointerCapture(event.pointerId);
  });
  viewer.addEventListener('pointermove',event=>{
    if(dragStartX===null)return;
    const steps=Math.round((dragStartX-event.clientX)/12);
    showFrame(dragStartFrame+steps);
  });
  const end=()=>{dragStartX=null;};
  viewer.addEventListener('pointerup',end);viewer.addEventListener('pointercancel',end);
  viewer.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();showFrame(frame+1);}
    else if(event.key==='ArrowLeft'){event.preventDefault();showFrame(frame-1);}
  });
})();

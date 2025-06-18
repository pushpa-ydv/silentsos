export const recordMedia = async (duration = 5000) =>{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const chunks = [];
    const recorder = new MediaRecorder(stream);

    return new Promise ((resolve)=>{
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, {type: "video/webm"});
            resolve(blob);
        };
        recorder.start();
        setTimeout(()=>{
            recorder.stop();
            stream.getTracks().forEach((track)=> track.stop());
        }, duration);
    });
};
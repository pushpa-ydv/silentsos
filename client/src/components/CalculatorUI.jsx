import React, { useEffect, useState } from "react";
import "./CalculatorUI.css";
import "./ContactForm.css";
import useSecretCode from "../hooks/useSecretCode";
import { getCurrentLocation } from "../services/LocationService";
import { recordMedia } from "../services/MediaRecorder";
import ContactForm from "./ContactForm";

export default function CalculatorUI() {
    const [input, setInput] = useState("");
    const secretCode = "911#";

    const isCodeTriggered = useSecretCode(input, secretCode);

    const sendAlert = async (location, mediaBlob) => {
        const formData = new FormData();
        formData.append("latitude", location.latitude);
        formData.append("longitude", location.longitude);
        formData.append("video", mediaBlob, "sos-video.webm");

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/send-alert`, {
                method: "POST",
                body: formData,

            });
            console.log("✅ Alert sent to backend");
        } catch (err) {
            console.error("❌ Failed to send alert", err);
        }
    };

    useEffect(() => {
        if (isCodeTriggered) {
            const triggerSOS = async () => {
                try {
                    const mediaBlob = await recordMedia();
                    console.log("🎥 Media recorded:", mediaBlob);

                    const coords = await getCurrentLocation();

                    sendAlert(coords, mediaBlob);

                }
                catch (err) {
                    console.log("SOS failed", err);
                }
            }
            triggerSOS();
            setInput("");
        }
    }, [isCodeTriggered])

    const handleInput = (value) => {
        if (value === "DEL") {
            setInput((prev) => prev.slice(0, -1));
            return;
        }
        const updatedValue = input + value;
        setInput(updatedValue);
    }

    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "#", ".", "DEL"];

    return (
        <div className="container">
            <div className="calculator">
                <input className="display" value={input} readOnly />
                <div className="buttons">
                    {buttons.map((btn, i) => (
                        <button key={i} className={btn === "DEL" ? "del-button" : ""} onClick={() => handleInput(btn)}>
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
            <ContactForm />
        </div>
    )
}
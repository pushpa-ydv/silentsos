import React, { useState } from "react";

export default function AddContact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleAddContact = async () => {
        const res = await fetch("http://localhost:5000/add-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });
        const data = await res.json();
        alert(data.message);
        setName("");
        setEmail("");
    };

    return (
        <div className="contact-form-container" style={{ padding: "20px" }}>
            <h2>Add Emergency Contact</h2>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <button onClick={handleAddContact}>Add Contact</button>
        </div>
    );
}

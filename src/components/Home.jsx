import { useState } from 'react';
import './Home.css';
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    const [query, setQuery] = useState('');
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('Your substitute is Vanilla Ice cream');
    const [justification, setJustification] = useState('Above substitute was made because I like to eat Vanilla Ice cream and you should too');
    const [submitted, setSubmitted] = useState(false);

    const handleQueryChange = (e) => setQuery(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Query:', query);
        console.log('Image:', image);
        setSubmitted(true);
    };

    return (
        <>
        <ToastContainer/>
        
        <div className={`home-container ${submitted ? 'submitted' : ''}`}>
            <h1 className="home-title">Welcome to Shopper Substitutes</h1>
            <p className="home-subtitle">Enter the product you want to substitute and take a picture of the shelf of like products</p>
            <form className='home-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        placeholder="Product to be substituted…"
                        value={query}
                        onChange={handleQueryChange}
                        className="home-input"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                        accept="image/*"
                        className="home-input"
                        capture="environment"
                    />
                    <button type="submit" className="home-button">
                        Submit
                    </button>
            </form>

            {submitted && 
                <div className="response-message">
                    <p className="response-substitute">{response}</p>
                    <div className="response-justification">
                        <p id="justification-text">
                            {justification}
                        </p>
                        
                        <FaCopy onClick={() => {
                                const text = document.getElementById("justification-text").innerText;
                                navigator.clipboard.writeText(text);
                                toast("Justification copied to clipboard!", {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            }} className="icon"/>

                    </div>
                </div>
            }
            
            <div className="home-footer">
                <p>Powered by <a href='https://www.sipplylabs.com/' target='blank'>Sipply</a></p>
            </div>
        </div>
        </>
    );
}
import "./Main.css";
import { useRef, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import isURL from "validator/lib/isURL";

export default function Main() {
  const [generatedURL, setGeneratedURL] = useState("");
  const contentDiv = useRef(null);
  const generateBtn = useRef(null);
  const copyBtn = useRef(null);
  const input = useRef(null);

  const handleGenerate = async () => {
    if (
      !isURL(input.current.value, {
        protocols: ["http", "https", "ftp"],
        require_protocol: true,
      })
    ) {
      input.current.setCustomValidity(
        "This is not a valid URL, provide the full URL!"
      );
      input.current.reportValidity();
      return;
    }
    try {
      generateBtn.current.classList.add("spin");
      const response = await axios.post(
        "https://paether-url-shortener.herokuapp.com/api/create/",
        {
          url: input.current.value,
        }
      );
      setGeneratedURL(
        "https://paether-url-shortener.herokuapp.com/" +
          response.data.shortedCode
      );
      generateBtn.current.classList.remove("spin");
      contentDiv.current.classList.add("generated");
    } catch (error) {
      generateBtn.current.classList.remove("spin");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedURL);
    copyBtn.current.classList.add("copied");
    setTimeout(() => {
      copyBtn.current.classList.remove("copied");
    }, 2000);
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div ref={contentDiv} className="content">
          <div className="front">
            <div className="inner">
              <h2>Generate your URL and QR Code</h2>
              <form className="form">
                <input
                  ref={input}
                  onChange={(e) => {
                    e.target.setCustomValidity("");
                  }}
                  type="text"
                  className="link-input"
                  placeholder="Your link"
                />
                <button
                  type="button"
                  ref={generateBtn}
                  onClick={handleGenerate}
                  className="generate"
                >
                  Generate
                </button>
              </form>
            </div>
          </div>
          <div className="back">
            <div className="inner">
              <div className="qrcode">
                <QRCodeSVG
                  id="123"
                  size={100}
                  value={generatedURL}
                  bgColor="#d54005"
                  fgColor="black"
                  level="H"
                />
              </div>
              <div className="result-container">
                <div className="result-url">{generatedURL}</div>
                <div onClick={handleCopy} ref={copyBtn} className="result-copy">
                  copy <span>Copied!</span>
                </div>
              </div>
              <button
                onClick={() => {
                  input.current.value = "";
                  contentDiv.current.classList.remove("generated");
                }}
                className="return"
              >
                New link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

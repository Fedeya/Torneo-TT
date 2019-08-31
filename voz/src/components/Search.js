import React, { useState } from "react";
import { key, cx } from "../config";
import axios from "axios";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "es-MX";

function Search({ setItems }) {


  const [search, setSearch] = useState("");
  const [listening, setListening] = useState(false);
  const [color, setColor] = useState("");
  const [placeholder, setPlaceholder] = useState("Busqueda o Consulta");

  const toogleListening = () => {
    setListening(!listening);
  }

  const voice = () => {
    toogleListening();

    if (listening) {
      recognition.start();
      setColor("primary")
      setPlaceholder("Escuchando...");
      recognition.onresult = e => {
        setSearch(e.results[0][0].transcript);

      }
    } else {
      recognition.stop();
      setColor("");
      setPlaceholder("Busqueda o Consulta");
    }

  }

  const searchInGoogle = async () => {
    const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        q: search,
        key,
        cx
      }
    });

    setItems({ items: res.data.items, source: "google" });
  }

  const searchInYT = async () => {
    const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        key,
        q: search
      }
    });

    setItems({ items: res.data.items, source: "youtube" });
  }

  const decir = () => {
    const activators = ["decir", "deci", "decí", "di"]
    const texto = search.split(" ");
    if (activators.includes(texto[0].toLowerCase())) {
      texto.forEach(text => {
        if (activators.includes(text.toLowerCase())) {
          return;
        }
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-sm">
              <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <ion-icon className="col-md mx-auto" color={color} onClick={voice} name="mic" size="large" ></ion-icon>
          </div>

          <div className="row text-center mt-2">
            <div className="col">
              <span className="mr-2">Buscar en</span>
              <button className="btn btn-danger mr-2" onClick={searchInGoogle} >
                <ion-icon name="logo-google" size="small" ></ion-icon>
              </button>
              <button className="btn btn-danger" onClick={searchInYT} >
                <ion-icon name="logo-youtube" size="medium"></ion-icon>
            </button>
            </div>
            <div className="col">
              <button onClick={decir} className="btn btn-primary">
                Decir
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
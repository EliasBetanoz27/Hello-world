import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Componentes/Navbar";
import BooksList from "./Componentes/BooksList";
import Form from "./Componentes/Form";

function App() {
  const[book,setBook]= useState({
    titulo:'',
    autor:'', 
    edicion:''
  })
  const [books, setBooks] = useState([]);

  const [listaActualizada,setActualizar]=useState(false);

  useEffect(() => {
     fetch(" http://localhost:9000/api")
        .then((res) => res.json())
        .then((res) => setBooks(res));

    setActualizar(false)
  }, [listaActualizada]);

  return (
    <div className="App">
        <Navbar brand="mi app" />
        <div className="container">
          <div className="row">
            <div className="col-5  shadow">
              <h2 style={{ textAlign: "center" }}>Registra</h2>
              <Form book={book} setBook={setBook}/>
            </div>
          
            <div className="col-7 ">
              <h2 className="" style={{ textAlign: "center" }}>Lista de libros</h2>
              <BooksList books={books} setActualizar={setActualizar} setBook={setBook} book={book}/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

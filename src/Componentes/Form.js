import React from "react";
import "../css/Form.css";
import Swal from "sweetalert2";
const Form = ({ book, setBook }) => {
  const Cambio = (e) => {
    setBook({
      // hacer una copia del state con el ...
      ...book,
      [e.target.name]: e.target.value,
    });
  };
  let { titulo, autor, edicion } = book;

  const submit = () => {
    edicion = parseInt(edicion, 10);
    //validacion
    if (titulo === "" || autor === "" || edicion <= 0) {
      alert("todos los campos son obligatorios");
      return;
    }
    //consulta

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };
    fetch(" http://localhost:9000/api", requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res));

    //reiniciar el state del libro
    setBook({
      titulo: "",
      autor: "",
      edicion: 0,
    });
    alert("Guardado correctamete");
  };

  return (
    <form onSubmit={submit}>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <b>Titulo</b>
          </label>
          <input
            type="text"
            value={titulo}
            name="titulo"
            onChange={Cambio}
            id="title"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">
            <b>Autor</b>
          </label>
          <input
            type="text"
            value={autor}
            name="autor"
            onChange={Cambio}
            id="autor"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edicion" className="form-label">
            <b>Edicion</b>
          </label>
          <input
            type="number"
            value={edicion}
            name="edicion"
            onChange={Cambio}
            id="edicion"
            className="form-control"
          />
        </div>
        <div align="right">
          <button type="submit" className="">
            Enviar{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;

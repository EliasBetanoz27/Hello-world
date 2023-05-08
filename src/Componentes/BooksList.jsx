import React from "react";
import "../css/Tabla.css";
import Swal from 'sweetalert2';
const BooksList = ({books,setActualizar,book,setBook}) => {

  const Delete = id => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "No podrá revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        const requestInit = {
          method: "DELETE"
        };
        fetch(`http://localhost:9000/api/${id}`, requestInit)
          .then(res => res.text())
          .then(res => {
            Swal.fire({
              title: "Eliminado",
              text: "El libro ha sido eliminado correctamente",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            });
            setActualizar(true);
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar el libro",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            });
          });
      }
    });
  };
  let { titulo, autor, edicion } = book;
  const Actualizar = id => {
    
    edicion = parseInt(edicion, 10);
    //validacion
   
    Swal.fire({
      title: "¿Está seguro?",
     
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        if (titulo === "" || autor === "" || edicion <= 0) {
          Swal.fire({
            title: "TODOS LOS CAMPOS SON OBLIGATORIOS",
           
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Volver",
          
          })
          return;
        }
        const requestInit = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        };
        fetch(`http://localhost:9000/api/${id}`, requestInit)
          .then(res => res.text())
          .then(res => {
            Swal.fire({
              title: "Actualizado",
              text: "El libro ha sido Actualizado correctamente",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            });
            setActualizar(true);
            setBook({
              titulo: "",
              autor: "",
              edicion: 0,
            });
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar el libro",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            });
          });
      }
    });
  };
  

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Edicion</th>
          <th className="crud">Crud</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.titulo}</td>
            <td>{book.autor}</td>
            <td>{book.edicion}</td>

            <div className="mb-3">
              <div className="boton">
              <button onClick={()=>Delete(book.id)} className="btn btn-danger"><b>Eliminar</b></button>
            <button onClick={()=>Actualizar(book.id)} className="btn btn-success"><b>Actualizar</b></button>
              </div>
          
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksList;

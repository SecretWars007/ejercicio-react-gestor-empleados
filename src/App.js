import React from "react"; // Importa React y la clase Component para crear un componente de clase.
import "./estilos/App.css"; // Importa los estilos del proyecto.
import empleadosData from "./datos/empleados.json"; //Importa los datos de empleados desde un archivo JSON.
import CmpEmpleados from "./componentes/CmpEmpleados"; //Importa el componente que mostrará la lista de empleados.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: empleadosData, // Carga la lista de empleados desde el JSON.
      filtro: "todos", // Estado inicial del filtro: muestra todos los empleados.
    };
  }
  render() {
    // Filtrar empleados según la opción seleccionada
    const empleadosFiltrados = this.state.empleados.filter((empleado) => {
      if (this.state.filtro === "activos") return empleado.activo;
      if (this.state.filtro === "inactivos") return !empleado.activo;
      return true; // "todos" muestra todos
    });

    return (
      <div className="container">
        <h1>Gestor de Empleados</h1>
        <label>Filtrar por estado: </label>
        <select onChange={this.cambiarFiltro} value={this.state.filtro}>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>
        <CmpEmpleados
          empleados={empleadosFiltrados}
          cambiarEstado={this.cambiarEstadoEmpleado}
        />
      </div>
    );
  }
  // Función para cambiar el estado de un empleado (activo/inactivo)
  cambiarEstadoEmpleado = (id) => {
    this.setState((prevState) => ({
      empleados: prevState.empleados.map((empleado) =>
        empleado.id === id
          ? { ...empleado, activo: !empleado.activo }
          : empleado
      ),
    }));
  };

  // Función para actualizar el filtro
  cambiarFiltro = (event) => {
    this.setState({ filtro: event.target.value });
  };
}

export default App;

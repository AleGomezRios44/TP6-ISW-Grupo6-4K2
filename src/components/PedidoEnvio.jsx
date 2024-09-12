import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Datepicker from "./DatePicker";
import { useState, useEffect } from "react";
import axios from "axios";
// import de los servicios
//import { useNavigate } from "react-router-dom";
import "../Texto.css";

function PedidoEnvio() {
  //const navigate = useNavigate();

  const [fecha, setFecha] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProvincias = async () => {
    try {
      const response = await axios.get(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      setProvincias(response.data.provincias);
    } catch (error) {
      Swal.fire({
        text: "Error al obtener provincias",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // Función para obtener localidades por provincia
  const fetchLocalidades = async (provinciaId) => {
    try {
      const response = await axios.get(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}`
      );
      console.log("Localidades obtenidas:", response.data.localidades);
      setLocalidades(response.data.localidades);
    } catch (error) {
      Swal.fire({
        text: "Error al obtener localidades",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    fetchProvincias();
  }, []);

  const handleProvinciaChange = (e) => {
    const provinciaId = e.target.value;
    setSelectedProvincia(provinciaId);
    fetchLocalidades(provinciaId);
  };

  //seteo de fecha del DatePicker (formato previo para comparacion)
  const tomarFecha = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const fechaFormateada = `${year}-${month}-${day}`;
    setFecha(fechaFormateada);
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  const onSubmit = async (data) => {
    let error = false;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayFormatted = `${year}-${month}-${day}`;

    if (fecha === null || fecha === todayFormatted) {
      error = true;
      Swal.fire({
        text:
          fecha === null
            ? "Debe seleccionar una fecha"
            : "No se puede seleccionar la fecha de hoy",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    if (fecha === null) {
      error = true;
      Swal.fire({
        text: "Debe seleccionar una fecha",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    if (!error) {
    }
  };

  const handleCancelar = () => {
    Swal.fire({
      text: "¿Seguro que quiere cancelar la operación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        reset();
        //navigate("/home");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 className="roboto-titulo" style={{ paddingBottom: "15px" }}>
        Pedido de Envio
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="roboto-texto">Domicilio de retiro:</h4>
        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Calle:</h5>
            <input
              type="string"
              className="form-control"
              {...register("calleRetiro", { required: true })}
              autoComplete="off"
            />
            {errors.calleRetiro && (
              <div className="alert alert-danger" role="alert">
                El nombre de la calle es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Altura:</h5>
            <input
              type="string"
              className="form-control"
              {...register("alturaRetiro", { required: true })}
              autoComplete="off"
            />
            {errors.alturaRetiro && (
              <div className="alert alert-danger" role="alert">
                El numero del domicilio es necesario
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5
              className="form-label roboto-texto"
              style={{ paddingBottom: "6px" }}
            >
              Departamento:
            </h5>
            <input
              type="text"
              className="form-control"
              placeholder="(opcional)"
              {...register("dptoRetiro", { required: false })}
              autoComplete="off"
            />
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5
              className="form-label roboto-texto"
              style={{ paddingBottom: "6px" }}
            >
              Referencia:
            </h5>
            <input
              type="text"
              className="form-control"
              placeholder="(opcional)"
              {...register("referenciaRetiro", { required: false })}
              autoComplete="off"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Provincia:</h5>
            <select
              className="form-select"
              {...register("prov", { required: true })}
              value={selectedProvincia}
              onChange={handleProvinciaChange}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            {errors.prov && (
              <div className="alert alert-danger" role="alert">
                La provincia es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Localidad:</h5>
            <select
              className="form-select"
              {...register("loc", { required: true })}
            >
              <option value="">Seleccione una localidad</option>
              {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.nombre}
                </option>
              ))}
            </select>
            {errors.loc && (
              <div className="alert alert-danger" role="alert">
                La localidad es un campo necesario
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
          }}
        >
          <div
            className="mb-3 roboto-texto"
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <h5
              className="form-label roboto-texto"
              style={{ paddingBottom: "6px" }}
            >
              Fecha de retiro:
            </h5>
            <div style={{ display: "inline-block" }}>
              {" "}
              {/* Contenedor para centrar el DatePicker */}
              <Datepicker cambioFecha={tomarFecha} />
            </div>
          </div>

          <div
            className="mb-3 roboto-texto"
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <h5 className="form-label roboto-texto">Tipo de carga:</h5>
            <div style={{ display: "inline-block", maxWidth: "250px" }}>
              <select className="form-select" {...register("carga")}>
                <option value="">Seleccione un tipo de carga</option>
                <option value="0" disabled={false}>
                  Documentación
                </option>
                <option value="1" disabled={false}>
                  Paquete
                </option>
                <option value="2" disabled={false}>
                  Granos
                </option>
                <option value="3" disabled={false}>
                  Hacienda
                </option>
              </select>
            </div>
          </div>
        </div>
        <h4 className="roboto-texto">Domicilio de entrega:</h4>
        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Calle:</h5>
            <input
              type="string"
              className="form-control"
              {...register("calle", { required: true })}
              autoComplete="off"
            />
            {errors.dni && (
              <div className="alert alert-danger" role="alert">
                El nombre de la calle es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Altura:</h5>
            <input
              type="string"
              className="form-control"
              {...register("altura", { required: true })}
              autoComplete="off"
            />
            {errors.mail && (
              <div className="alert alert-danger" role="alert">
                El numero del domicilio es necesario
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5
              className="form-label roboto-texto"
              style={{ paddingBottom: "6px" }}
            >
              Departamento:
            </h5>
            <input
              type="text"
              className="form-control"
              placeholder="(opcional)"
              {...register("dpto", { required: false })}
              autoComplete="off"
            />
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5
              className="form-label roboto-texto"
              style={{ paddingBottom: "6px" }}
            >
              Referencia:
            </h5>
            <input
              type="text"
              className="form-control"
              placeholder="(opcional)"
              {...register("referencia", { required: false })}
              autoComplete="off"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Provincia:</h5>
            <select
              className="form-select"
              {...register("prov", { required: true })}
              value={selectedProvincia}
              onChange={handleProvinciaChange}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            {errors.prov && (
              <div className="alert alert-danger" role="alert">
                La provincia es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Localidad:</h5>
            <select
              className="form-select"
              {...register("loc", { required: true })}
            >
              <option value="">Seleccione una localidad</option>
              {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.nombre}
                </option>
              ))}
            </select>
            {errors.loc && (
              <div className="alert alert-danger" role="alert">
                La localidad es un campo necesario
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 roboto-texto" style={{}}>
          <h5
            className="form-label roboto-texto"
            style={{ paddingBottom: "6px" }}
          >
            Fecha de entrega:
          </h5>
          <Datepicker cambioFecha={tomarFecha} />
        </div>
        <div className="roboto-texto">
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PedidoEnvio;

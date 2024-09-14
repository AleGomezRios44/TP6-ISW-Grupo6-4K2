import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Datepicker from "./DatePicker";
import { useState, useEffect } from "react";
//import axios from "axios";
//import de los servicios
//import { useNavigate } from "react-router-dom";
import "../Texto.css";
import { Country, State, City }  from 'country-state-city';

function PedidoEnvio() {
  //const navigate = useNavigate();

  const [fechaRetiro, setFechaRetiro] = useState(null);
  const [fechaEntrega, setFechaEntrega] = useState(null)
  const [pais, setPais] = useState(null);
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
    const prov = State.getStatesOfCountry("AR")
    setProvincias(prov);
  };

  // Función para obtener localidades por provincia
  const fetchLocalidades = async (provinciaId) => {
    const loc = City.getCitiesOfState("AR", provinciaId)
    setLocalidades(loc);
    console.log(loc)
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
  const tomarFechaRetiro = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const fechaFormateada = `${year}-${month}-${day}`;
    setFechaRetiro(fechaFormateada);
  };

  const tomarFechaEntrega = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const fechaFormateada = `${year}-${month}-${day}`;
    setFechaEntrega(fechaFormateada);
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
    const diferenciaDias = (new Date(fechaEntrega).getTime() - new Date(fechaRetiro).getTime()) / (1000 * 60 * 60 * 24);

    if (fechaRetiro === null || fechaEntrega === null || fechaEntrega < fechaRetiro) {
      error = true;
      Swal.fire({
        text:
          fechaRetiro === null || fechaEntrega === null
            ? "Debe seleccionar una fecha de retiro y de entrega"
            : "La fecha de entrega no puede ser anterior a la de retiro",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    if (diferenciaDias > 10) {
      error = true;
      Swal.fire({
        text: "La fecha de entrega debe ser como máximo de 10 días despúes del retiro",
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
                <option key={provincia.isoCode} value={provincia.isoCode}>
                  {provincia.name}
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
                  {localidad.name}
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
              <Datepicker cambioFecha={tomarFechaRetiro} />
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
                  {provincia.name}
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
                  {localidad.name}
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
          <Datepicker cambioFecha={tomarFechaEntrega} />
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

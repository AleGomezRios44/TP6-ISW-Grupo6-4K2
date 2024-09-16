import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Datepicker from "./DatePicker";
import { useState, useEffect } from "react";
import PedidoEnvioServices from "../services/PedidoEnvioServ";
import { uploadFile } from "../services/firebase";
import "../Texto.css";
import { State } from "country-state-city";

function PedidoEnvio() {
  const [fechaRetiro, setFechaRetiro] = useState(null);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [selectedProvinciaRetiro, setSelectedProvinciaRetiro] = useState("");
  const [selectedProvinciaEntrega, setSelectedProvinciaEntrega] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProvincias = async () => {
    const prov = State.getStatesOfCountry("AR");
    setProvincias(prov);
  };

  useEffect(() => {
    fetchProvincias();
  }, []);

  const handleProvinciaRetChange = (e) => {
    const provinciaId = e.target.value;
    setSelectedProvinciaRetiro(provinciaId);
  };

  const handleProvinciaEntChange = (e) => {
    const provinciaId = e.target.value;
    setSelectedProvinciaEntrega(provinciaId);
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

  const tomarImagenes = (imagenes) => {
    let error = false;
    let totalSize = 0;
    // Tipos permitidos
    const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];

    if (imagenes.length > 3) {
      Swal.fire({
        text: "No se pueden subir más de 3 imágenes.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      error = true;
    }

    // Recorrer todas las imágenes para comprobar el tamaño
    for (let i = 0; i < imagenes.length; i++) {
      const fileSizeMB = imagenes[i].size / (1024 * 1024); // tamaño en MB
      totalSize += fileSizeMB;
      if (fileSizeMB > 10) {
        Swal.fire({
          text: `La imagen ${imagenes[i].name} supera el límite de 10 MB.`,
          icon: "warning",
          confirmButtonText: "Ok",
        });
        error = true;
        break;
      }

      // Validar el tipo de archivo
      if (!tiposPermitidos.includes(imagenes[i].type)) {
        Swal.fire({
          text: `El archivo ${imagenes[i].name} no es un tipo de imagen permitido. Solo se aceptan archivos PNG, JPG o JPEG.`,
          icon: "warning",
          confirmButtonText: "Ok",
        });
        error = true;
        break;
      }
    }

    if (totalSize > 10) {
      Swal.fire({
        text: "El tamaño total de las imágenes no puede superar los 10 MB.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      error = true;
    }

    if (!error) {
      // Si no hay errores, guardar las imágenes en el estado
      setImagenes(imagenes);
      Swal.fire({
        text: "Imágenes cargadas correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const uploadImgs = async (images) => {
    try {
      const imgURLs = await Promise.all(
        Array.from(images).map((image) => uploadFile(image))
      );
      return imgURLs;
    } catch (error) {
      Swal.fire({
        text: "Error al procesar el pedido. Reintente más tarde.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return [];
    }
  };
  
  function normalizeText(text) {
    return text
      .toLowerCase() // Convierte a minúsculas
      .normalize("NFD") // Normaliza el texto a su forma canónica
      .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
  }

  const onSubmit = async (data) => {
    let error = false;

    const diferenciaDias =
      (new Date(fechaEntrega).getTime() - new Date(fechaRetiro).getTime()) /
      (1000 * 60 * 60 * 24);

    if (
      fechaRetiro === null ||
      fechaEntrega === null ||
      fechaEntrega <= fechaRetiro
    ) {
      error = true;
      Swal.fire({
        text:
          fechaRetiro === null || fechaEntrega === null
            ? "Debe seleccionar una fecha de retiro y de entrega"
            : "La fecha de entrega no puede ser anterior o igual a la de retiro",
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

    const regexSoloLetras = /^[a-zA-Z\s]+$/;
    const regexSoloNumeros = /^[0-9]+$/;

    // Validación de la calle de retiro
    if (!regexSoloLetras.test(data.calleRetiro)) {
      error = true;
      Swal.fire({
        text: "El nombre de la calle de retiro solo puede contener letras y espacios.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    // Validación de la calle de entrega
    if (!regexSoloLetras.test(data.calleEntrega)) {
      error = true;
      Swal.fire({
        text: "El nombre de la calle de entrega solo puede contener letras y espacios.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    // Validación de la altura de retiro
    if (!regexSoloNumeros.test(data.alturaRetiro)) {
      error = true;
      Swal.fire({
        text: "La altura de retiro debe contener solo números.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    // Validación de la altura de entrega
    if (!regexSoloNumeros.test(data.alturaEntrega)) {
      error = true;
      Swal.fire({
        text: "La altura de entrega debe contener solo números.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    //Validacion localidad de retiro sin numeros
    if (!regexSoloLetras.test(data.localidadRetiro)) {
      error = true;
      Swal.fire({
        text: "El nombre de la localidad de retiro solo puede contener letras y espacios.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    //Validacion localidad entrega sin numeros
    if (!regexSoloLetras.test(data.localidadEntrega)) {
      error = true;
      Swal.fire({
        text: "El nombre de la localidad de entrega solo puede contener letras y espacios.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    if (!error) {

      //subir fotos
      let imgs
      if(imagenes){
        imgs = await uploadImgs(imagenes) //devuelve una lista con las urls de las imagenes
      }
      else{
        imgs = imagenes
      }

      //transformar los inputs
      const localidadEntNormalizada = normalizeText(data.localidadEntrega)
      const localidadRetNormalizada = normalizeText(data.localidadRetiro)
      const calleEntNormalizada = normalizeText(data.calleEntrega)
      const calleRetNormalizada = normalizeText(data.calleRetiro)

      //hacer el objeto con todo
      const pedidoEnvio = {
        domicilioRetiro: {
          calle: calleRetNormalizada,
          altura: data.alturaRetiro,
          dpto: data.dptoRetiro,
          referencia: data.referenciaRetiro,
          provincia: data.provRetiro,
          localidad: localidadRetNormalizada
        },
        domicilioEntrega: {
          calle: calleEntNormalizada,
          altura: data.alturaEntrega,
          dpto: data.dptoEntrega,
          referencia: data.referenciaEntrega,
          provincia: data.provEntrega,
          localidad: localidadEntNormalizada
        },
        carga: data.carga,
        fechaRetiro: fechaRetiro,
        fechaEntrega: fechaEntrega,
        imagenes: imgs
      }

      //mostrar modal intermedio de confirmacion de datos
      
      const res = await PedidoEnvioServices.guardarDatos(pedidoEnvio)
      
      reset()
      Swal.fire({
        text: "Pedido realizado correctamente. Notificación enviada.",
        icon: "success",
        confirmButtonText: "Ok",
      });
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#CAF0F8", padding: "30px" }}>
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
                El nombre de la calle del domicilio de retiro es un campo
                necesario
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
                El numero del domicilio de retiro es un campo necesario
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
              defaultValue={""}
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
              defaultValue={""}
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
              {...register("provRetiro", { required: true })}
              value={selectedProvinciaRetiro}
              onChange={handleProvinciaRetChange}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.isoCode} value={provincia.name}>
                  {provincia.name}
                </option>
              ))}
            </select>
            {errors.provRetiro && (
              <div className="alert alert-danger" role="alert">
                La provincia de retiro es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Localidad:</h5>
            <input
              type="string"
              className="form-control"
              {...register("localidadRetiro", { required: true })}
              autoComplete="off"
            />
            {errors.localidadRetiro && (
              <div className="alert alert-danger" role="alert">
                La ciudad de retiro es un campo necesario
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
              <select
                className="form-select"
                {...register("carga", { required: true })}
              >
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
              {errors.carga && (
                <div className="alert alert-danger" role="alert">
                  Debe seleccionar un tipo de carga
                </div>
              )}
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
              {...register("calleEntrega", { required: true })}
              autoComplete="off"
            />
            {errors.calleEntrega && (
              <div className="alert alert-danger" role="alert">
                El nombre de la calle del domicilio de entrega es un campo
                necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Altura:</h5>
            <input
              type="string"
              className="form-control"
              {...register("alturaEntrega", { required: true })}
              autoComplete="off"
            />
            {errors.alturaEntrega && (
              <div className="alert alert-danger" role="alert">
                El numero del domicilio de entrega es necesario
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
              {...register("dptoEntrega", { required: false })}
              autoComplete="off"
              defaultValue={""}
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
              {...register("referenciaEntrega", { required: false })}
              autoComplete="off"
              defaultValue={""}
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
              {...register("provEntrega", { required: true })}
              value={selectedProvinciaEntrega}
              onChange={handleProvinciaEntChange}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.isoCode} value={provincia.name}>
                  {provincia.name}
                </option>
              ))}
            </select>
            {errors.provEntrega && (
              <div className="alert alert-danger" role="alert">
                La provincia es un campo necesario
              </div>
            )}
          </div>
          <div className="mb-3 roboto-texto" style={{ flex: 1 }}>
            <h5 className="form-label roboto-texto">Localidad:</h5>
            <input
              type="string"
              className="form-control"
              {...register("localidadEntrega", { required: true })}
              autoComplete="off"
            />
            {errors.localidadEntrega && (
              <div className="alert alert-danger" role="alert">
                La ciudad de entrega es un campo necesario
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
        <div className="mb-3 roboto-texto">
          <h4
            className="form-label roboto-texto"
            style={{ paddingBottom: "6px" }}
          >
            Imagen/es de la carga:
          </h4>
          <input
            type="file"
            multiple
            style={{ paddingBottom: "5px" }}
            onChange={(e) => tomarImagenes(e.target.files)}
          ></input>
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

const whatsapp = "526624212850";

function mostrarCampos(){
  const tipo = document.getElementById("tipo").value;
  const formato = document.getElementById("formato").value;
  const camposEvento = document.getElementById("camposEvento");
  const datosEvento = document.getElementById("datosEvento");
  const camposMedidas = document.getElementById("camposMedidas");
  const camposPendon = document.getElementById("camposPendon");
  const descripcionTipo = document.getElementById("descripcionTipo");
  const descripcionFormato = document.getElementById("descripcionFormato");

  if(tipo === "Flyer de evento" || tipo === "Invitación / convocatoria"){
    // Evento completo: nombre, técnico, fecha, hora, dirección
    camposEvento.classList.remove("hidden");
    datosEvento.classList.remove("hidden");
    camposPendon.classList.add("hidden");
  }else if(tipo === "Pendón publicitario"){
    // Pendón: solo nombre del evento + información del pendón, nada de técnico/fecha/hora/dirección
    camposEvento.classList.remove("hidden");
    datosEvento.classList.add("hidden");
    camposPendon.classList.remove("hidden");
  }else{
    camposEvento.classList.add("hidden");
    camposPendon.classList.add("hidden");
  }

  if(formato === "Impreso" || tipo === "Pendón publicitario" || tipo === "Otro"){
    camposMedidas.classList.remove("hidden");
  }else{
    camposMedidas.classList.add("hidden");
  }

  let textoTipo = "";
  if(tipo === "Historia para redes"){
    textoTipo = "Material pensado para publicarse en historias de Instagram, Facebook o WhatsApp. Normalmente es digital y vertical.";
  }else if(tipo === "Post para redes"){
    textoTipo = "Material pensado para publicación fija en redes sociales. Normalmente es digital.";
  }else if(tipo === "Flyer de evento"){
    textoTipo = "Usa esta opción para cursos, certificaciones, demostraciones o eventos presenciales. Se solicitarán datos del evento.";
  }else if(tipo === "Invitación / convocatoria"){
    textoTipo = "Usa esta opción para invitar a socios, técnicos o clientes a una actividad específica. Se solicitarán datos del evento.";
  }else if(tipo === "Pendón publicitario"){
    textoTipo = "Usa esta opción para materiales impresos de exhibición. Es obligatorio indicar medidas, tipo de material e información del pendón.";
  }else if(tipo === "Otro"){
    textoTipo = "Describe claramente qué material necesitas y cómo será utilizado. Se mostrarán todos los campos para que Marketing pueda evaluar la mejor opción.";
  }

  if(textoTipo){
    descripcionTipo.innerText = textoTipo;
    descripcionTipo.classList.remove("hidden");
  }else{
    descripcionTipo.classList.add("hidden");
  }

  let textoFormato = "";
  if(formato === "Digital"){
    textoFormato = "Selecciona esta opción si el material será usado en redes sociales, WhatsApp, correo o medios digitales.";
  }else if(formato === "Impreso"){
    textoFormato = "Selecciona esta opción si el material será impreso. Debes indicar medidas y tipo de material para evitar errores de diseño.";
  }

  if(textoFormato){
    descripcionFormato.innerText = textoFormato;
    descripcionFormato.classList.remove("hidden");
  }else{
    descripcionFormato.classList.add("hidden");
  }
}

function mostrarOtroPendon(){
  const tipoPendon = document.getElementById("tipoPendon").value;
  const otroPendon = document.getElementById("otroPendon");
  if(tipoPendon === "Otro"){
    otroPendon.classList.remove("hidden");
  }else{
    otroPendon.classList.add("hidden");
  }
}

function enviarWhatsapp(){
  const fechaNecesaria = document.getElementById("fechaNecesaria").value;
  const socio = document.getElementById("socio").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const tipo = document.getElementById("tipo").value;
  const formato = document.getElementById("formato").value;
  const medidas = document.getElementById("medidas").value.trim();
  const tipoMaterial = document.getElementById("tipoMaterial").value.trim();
  const objetivo = document.getElementById("objetivo").value.trim();
  const notas = document.getElementById("notas").value.trim();
  const evento = document.getElementById("evento").value.trim();
  const tecnico = document.getElementById("tecnico").value.trim();
  const fechaEvento = document.getElementById("fechaEvento").value;
  const horaEvento = document.getElementById("horaEvento").value;
  const direccion = document.getElementById("direccion").value.trim();
  const tipoPendon = document.getElementById("tipoPendon").value;
  const otroTipoPendon = document.getElementById("otroTipoPendon").value.trim();
  const textoPendon = document.getElementById("textoPendon").value.trim();

  if(!fechaNecesaria || !socio || !ciudad || !tipo || !formato || !objetivo){
    alert("Por favor completa todos los campos obligatorios marcados con *.");
    return;
  }

  if((formato === "Impreso" || tipo === "Pendón publicitario" || tipo === "Otro") && (!medidas || !tipoMaterial)){
    alert("Para materiales impresos, pendones u otro tipo de solicitud debes indicar medidas y tipo de material.");
    return;
  }

  // Solo Flyer de evento e Invitación piden el paquete completo de datos del evento
  if((tipo === "Flyer de evento" || tipo === "Invitación / convocatoria") &&
     (!evento || !tecnico || !fechaEvento || !horaEvento || !direccion)){
    alert("Para este tipo de solicitud completa nombre del evento, técnico, fecha, hora y dirección.");
    return;
  }

  // Pendón solo exige su propia información, no técnico/fecha/hora/dirección
  if(tipo === "Pendón publicitario"){
    if(!tipoPendon || !textoPendon || (tipoPendon === "Otro" && !otroTipoPendon)){
      alert("Para el pendón publicitario completa el tipo de evento o campaña y el texto que llevará el pendón.");
      return;
    }
  }

  let mensaje = "Hola, quiero solicitar un material gráfico:%0A%0A";
  mensaje += `Fecha requerida: ${fechaNecesaria}%0A`;
  mensaje += `Socio comercial: ${socio}%0A`;
  mensaje += `Ciudad: ${ciudad}%0A`;
  mensaje += `Celular para publicidad: ${celular || "No aplica / no desea mostrar celular"}%0A`;
  mensaje += `Tipo de material: ${tipo}%0A`;
  mensaje += `Formato del material: ${formato}%0A`;

  if(formato === "Impreso" || tipo === "Pendón publicitario" || tipo === "Otro"){
    mensaje += `Medidas: ${medidas}%0A`;
    mensaje += `Tipo de hoja/material: ${tipoMaterial}%0A`;
  }

  mensaje += `%0AObjetivo del material:%0A${objetivo}%0A%0A`;

  if(tipo === "Pendón publicitario"){
    mensaje += "Información del pendón:%0A";
    mensaje += `Tipo de evento o campaña: ${tipoPendon === "Otro" ? otroTipoPendon : tipoPendon}%0A`;
    mensaje += `Texto del pendón: ${textoPendon}%0A`;
    if(evento){
      mensaje += `Nombre del evento: ${evento}%0A`;
    }
    mensaje += "%0A";
  }else if(tipo === "Flyer de evento" || tipo === "Invitación / convocatoria"){
    mensaje += "Datos del evento:%0A";
    mensaje += `Nombre del evento: ${evento}%0A`;
    mensaje += `Técnico: ${tecnico}%0A`;
    mensaje += `Fecha: ${fechaEvento}%0A`;
    mensaje += `Hora: ${horaEvento}%0A`;
    mensaje += `Dirección completa: ${direccion}%0A%0A`;
  }

  mensaje += `Especificaciones adicionales:%0A${notas || "Sin especificaciones adicionales"}`;

  window.open(`https://wa.me/${whatsapp}?text=${mensaje}`, "_blank");
}

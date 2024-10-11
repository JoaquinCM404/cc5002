let data = {};
fetch('../js/region_comuna.json')
    .then((response) => response.json())
    .then(json => {
        data = json.regiones;
      })

const poblarRegiones = () => {
    let regionSelect = document.getElementById("select-region");
    data.forEach(region => {
      let option = document.createElement("option");
      option.value = region.id;
      option.text = region.nombre;
      regionSelect.appendChild(option);
    });
    
  };

const updateComuna = () => {
    let regionSelect = document.getElementById("select-region");
    let comunaSelect = document.getElementById("select-comuna");
    
    let selectedRegionId = regionSelect.value;
    
    comunaSelect.innerHTML = "";
    
    let selectedRegion = data.find(region => region.id == selectedRegionId);
    
    if (selectedRegion && selectedRegion.comunas) {
        selectedRegion.comunas.forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna.id;
            option.text = comuna.nombre;
            comunaSelect.appendChild(option);
        });
    }
};
  
  document.getElementById("select-region").addEventListener("change", updateComuna);

  const tipo = {
    "device":["Pantalla", "Notebook","Tablet","Celular", "Consola","Mouse", "Teclado", "Impresora", "Parlante", "Audífonos", "Otro"]
  };
  const poblarTipo = () => {
    let deviceSelect = document.getElementById("select-device");
    tipo["device"].forEach(device => {
      let option = document.createElement("option");
      option.value = device;
      option.text = device;
      deviceSelect.appendChild(option);
  });
};


  const state = {
    "state" : ["Funciona perfecto", "Funciona a medias", "No funciona"]
  }
  const poblarEstado = () => {
    let stateSelect = document.getElementById("select-state");
    state["state"].forEach(state => {
      let option = document.createElement("option");
      option.value = state;
      option.text = state;
      stateSelect.appendChild(option);
    })  
  };
  window.onload = () => {
    poblarRegiones();
    poblarTipo();
    poblarEstado();
  };
document.addEventListener("DOMContentLoaded", function () {
    let addDeviceBtn = document.getElementById("add-device-btn");
    let deviceContainer = document.getElementById("device-container");
    let deviceIndex = 1;  // Contador para identificar dispositivos

    addDeviceBtn.addEventListener("click", function () {
        // Seleccionar el primer bloque de dispositivo
        let originalDeviceBlock = document.querySelector(".device-block");
        
        // Clonar el bloque
        let clonedBlock = originalDeviceBlock.cloneNode(true);

        // Actualizar los atributos 'id' y 'name' de los inputs clonados
        let inputs = clonedBlock.querySelectorAll("input, textarea, select");
        inputs.forEach(function (input) {
            if (input.name) {
                input.name = input.name.replace(/[0-9]+/, '') + "_" + deviceIndex;
            }
            if (input.id) {
                input.id = input.id.replace(/[0-9]+/, '') + "_" + deviceIndex;
            }
            // Limpiar los campos del clon
            if (input.type === "text" || input.type === "number" || input.tagName === "TEXTAREA") {
                input.value = "";  
            } else if (input.type === "file") {
                input.value = null;  // Limpiar campos de archivo
            }
        });
        deviceContainer.appendChild(clonedBlock);
        deviceIndex++;
    });
});
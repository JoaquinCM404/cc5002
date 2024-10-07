const validateName = (name) => {
    if(!name) return false;
    let lengthValid = name.trim().length >= 3;
    return lengthValid;
  }
  
  const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15;
  
    // validamos el formato
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
  };
  
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    // validación de longitud
    let lengthValid = phoneNumber.length >= 8;
  
    // validación de formato
    let re = /^(\+?56)?[0-9]{8,}$/;
    //let re = /^[0-9]+$/; 
    let formatValid = re.test(phoneNumber);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
  };
  
  const validateFiles = (files) => {
    if (!files) return false;
  
    // validación del número de archivos
    let lengthValid = 1 <= files.length && files.length <= 3;
  
    // validación del tipo de archivo
    let typeValid = true;
  
    for (const file of files) {
      // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
      let fileFamily = file.type.split("/")[0];
      typeValid &&= fileFamily == "image" || file.type == "application/pdf";
    }
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && typeValid;
  };
  const validateSelect = (select) => {
    if(!select) return false;
    return true
  }
  const validateInt = (int) => {
    if(!int) return false;
    let intVal = parseInt(int);
    let typeValid = Number.isInteger(intVal)
    let lengthValid = 1 <= int.length && int.length < 3;
    let rangeValid = 1 <= intVal <= 99;
    return typeValid && lengthValid && rangeValid;   
  }
  const validateDesc = (desc) => {
    if(!desc) return false;
    let lengthValid = desc.trim().length <= 200;
    return lengthValid;
  }
  const validateForm = () => {
    // obtener elementos del DOM usando el nombre del formulario.
    let myForm = document.forms["donation"];
    let email = myForm["email"].value;
    let phoneNumber = myForm["celular"].value;
    let name = myForm["nombre"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;

    // Validar los campos de información de contacto
    let invalidInputs = [];
    let isValid = true;

    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    // Validar los campos de información de contacto
    if (!validateName(name)) {
        setInvalidInput("Nombre");
    }
    if (!validateEmail(email)) {
        setInvalidInput("Email");
    }
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        setInvalidInput("Número");
    }
    if (!validateSelect(region)) {
        setInvalidInput("Región");
    }
    if (!validateSelect(comuna)) {
        setInvalidInput("Comuna");
    }

    // Obtener todos los bloques de dispositivos
    let deviceBlocks = document.querySelectorAll(".device-block");

    // Recorrer cada bloque de dispositivo y validarlo
    deviceBlocks.forEach((block, index) => {
        let dname = block.querySelector("[name^='name']").value;
        let desc = block.querySelector("[name^='desc']").value;
        let uso = block.querySelector("[name^='uso']").value;
        let tipo = block.querySelector("[name^='select-device']").value;
        let state = block.querySelector("[name^='select-state']").value;
        let files = block.querySelector("[name^='files']").files;

        // Validar cada campo dentro del bloque
        if (!validateName(dname)) {
            setInvalidInput(`Nombre del dispositivo #${index + 1}`);
        }
        if (!validateInt(uso)) {
            setInvalidInput(`Años de uso del dispositivo #${index + 1}`);
        }
        if (desc && !validateDesc(desc)) {
            setInvalidInput(`Descripción del dispositivo #${index + 1}`);
        }
        if (!validateFiles(files)) {
            setInvalidInput(`Fotos del dispositivo #${index + 1}`);
        }
        if (!validateSelect(tipo)) {
            setInvalidInput(`Tipo del dispositivo #${index + 1}`);
        }
        if (!validateSelect(state)) {
            setInvalidInput(`Estado del dispositivo #${index + 1}`);
        }
    });

    // Mostrar los errores de validación si hay
    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");

    if (!isValid) {
        validationListElem.textContent = "";
        invalidInputs.forEach(input => {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        });

        validationMessageElem.innerText = "Los siguientes campos son inválidos:";
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
        validationBox.hidden = false;
    } else {
        // Ocultar el formulario y mostrar mensaje de éxito
        myForm.style.display = "none";
        validationMessageElem.innerText = "¿Confirma que desea publicar esta donación?";
        validationListElem.textContent = "";

        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        let submitButton = document.createElement("button");
        submitButton.innerText = "Sí, confirmo";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
            myForm.style.display = "none";
            validationMessageElem.innerText = "Hemos recibido la información de su donación. ¡Muchas gracias!";
            validationListElem.textContent = "";

            let returnButton = document.createElement("a");
            returnButton.innerText = "Volver al Inicio";
            returnButton.href = "index.html";
            validationListElem.appendChild(returnButton);

            validationBox.style.backgroundColor = "#ddffdd";
            validationBox.style.borderLeftColor = "#4CAF50";
            validationBox.hidden = false;
        });

        let backButton = document.createElement("button");
        backButton.innerText = "No, quiero volver al formulario";
        backButton.addEventListener("click", () => {
            myForm.style.display = "block";
            validationBox.hidden = true;
        });

        validationListElem.appendChild(submitButton);
        validationListElem.appendChild(backButton);
        validationBox.hidden = false;
    }
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);

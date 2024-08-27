function isValidInput(input) {
    // Regular expression to validate only lowercase letters and no accents
    const regex = /^[a-z\s]+$/;
    return regex.test(input);
}

function encryptMessage() {
    const textarea = document.getElementById("inputValue");
    const outputContainer = document.getElementById("outputContainer");
    const outputContainerNotFound = document.getElementById("outputContainerNotFound");
    const decryptButton = document.getElementById("decrypt");

    if (textarea.value.trim() !== "") {

        if (!isValidInput(textarea.value.trim())) {
            alert("El texto debe contener solo letras minúsculas y sin acentos.");
            return;
        }

        // Encrypt the message using btoa (Base64 encoding)
        const encryptedMessage = btoa(textarea.value);

        // Display encrypted message
        document.getElementById("encryptedMessage").innerText = encryptedMessage;

        // Show the encrypted message container and hide the "not found" container
        outputContainer.classList.remove("hidden");
        outputContainer.classList.add("visible");
        outputContainerNotFound.classList.remove("visible");
        outputContainerNotFound.classList.add("hidden");

        // Enable the decrypt button since there's an encrypted message
        decryptButton.disabled = false;
    } else {
        // If the textarea is empty, reset the visibility to show "not found"
        resetOutput();
    }
}

function decryptMessage() {
    const encryptedMessage = document.getElementById("encryptedMessage").innerText;
    const outputContainer = document.getElementById("outputContainer");
    const outputContainerNotFound = document.getElementById("outputContainerNotFound");
    const decryptButton = document.getElementById("decrypt");

    if (encryptedMessage.trim() !== "") {
        try {
            // Decrypt the message using atob (Base64 decoding)
            const decryptedMessage = atob(encryptedMessage);

            // Display decrypted message
            document.getElementById("encryptedMessage").innerText = decryptedMessage;

            // Ensure the "not found" container stays hidden and the output container remains visible
            outputContainer.classList.remove("hidden");
            outputContainer.classList.add("visible");
            outputContainerNotFound.classList.add("hidden");

            // Disable the decrypt button after successful decryption
            decryptButton.disabled = true;
        } catch (error) {
            alert("El texto ingresado no es válido para desencriptar.");
        }
    }
}

function resetOutput() {
    const outputContainer = document.getElementById("outputContainer");
    const outputContainerNotFound = document.getElementById("outputContainerNotFound");

    // Clear the textarea
    document.getElementById("inputValue").value = "";

    // Reset visibility: show "not found" and hide the encrypted message container
    outputContainer.classList.remove("visible");
    outputContainer.classList.add("hidden");
    outputContainerNotFound.classList.remove("hidden");
    outputContainerNotFound.classList.add("visible");

    // Clear the encryptedMessage content
    document.getElementById("encryptedMessage").innerText = "";
}

function copyToClipboard() {
    const encryptedMessage = document.getElementById("encryptedMessage").innerText;
    navigator.clipboard.writeText(encryptedMessage).then(() => {
        alert("Mensaje copiado al portapapeles");
    });
}

document.getElementById("inputValue").addEventListener("input", function () {
    const textarea = document.getElementById("inputValue");
    const outputContainerNotFound = document.getElementById("outputContainerNotFound");

    if (textarea.value.trim() === "") {
        resetOutput();
    } else {
        outputContainerNotFound.classList.add("hidden");
    }
});

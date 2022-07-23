function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear();

    document.getElementById('nfe-url-input').value=decodedResult.decodedText
    document.getElementById('nfe-form-input').submit()
}

function onScanError(errorMessage) {
    // handle on error condition, with error message
    console.log("Error while reading: ", errorMessage);
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);


function applyStyle() {
    console.log("###  applyStyle")
    try {
        for (let item of document.getElementsByTagName("button")) {
            if (item.type != "button"){
                item.className="btn btn-outline-info";
                item.type="button";
            }        
        }
    } catch(err){
        alert(err)
    }        
}
    

function fixReaderDiv() {
    try {
        document.getElementById("reader").style=""
        document.getElementById('reader__dashboard_section_csr').style=""
    } catch(err){
        alert(err)
    }        
}


function fixScanButton() {
    try {
        var scanButton = document.getElementById("reader__camera_permission_button")
        scanButton.textContent = "Scan"
        scanButton.addEventListener("click", () => {
            startLoader()
            setTimeout(() => {
                stopLoader()
                applyStyle()
            }, 3000);
        })
    } catch(err){
        alert(err)
    }        
}


function stopLoader() {
    try {
        document.getElementById("wrapper").className = "wrapper"
        document.getElementById("loader").style = "display:none"
    }catch(err){
        alert(err)
    }
    
}

function startLoader() {
    try {
        document.getElementById("wrapper").className = "blur wrapper"
        document.getElementById("loader").style = "display:block"
    }catch(err){
        alert(err)
    }        
}


setTimeout(() => {
    applyStyle()
    fixScanButton()
    stopLoader() 
}, 3000);

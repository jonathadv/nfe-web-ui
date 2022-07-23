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


function applyStyleToButtons() {    
    for (let item of document.getElementsByTagName("button")) {
        console.log("Applying style to ", item)
        item.className="btn btn-outline-info";
        item.type="button";
    }
  }

  function applyStyleToRequiredButtons() {    
    var requiredButtons = ["Start Scanning", "Stop Scanning"]

    for (let item of document.getElementsByTagName("button")) {
        console.log("Applying style to ", item)
        item.className="btn btn-outline-info";
        item.type="button";

        if (requiredButtons.includes(item.textContent)){
            requiredButtons.pop(requiredButtons.indexOf(item.textContent))
        }
    }

    if (requiredButtons.length > 1) {
        throw new Error("None of required buttons " + requiredButtons + " waren't available for style changes.")
    }
  }


function fixReaderDiv() {
    document.getElementById("reader").style=""
    document.getElementById('reader__dashboard_section_csr').style=""
}


function fixScanButton() {
    var scanButton = document.getElementById("reader__camera_permission_button")
    if (scanButton) {
        scanButton.textContent = "Scan"
        scanButton.addEventListener("click", () => {
            runWithRetries(()=>{
                stopLoader()
                applyStyleToRequiredButtons()
            });
        });
    }
    
}


function stopLoader(counter) {
    document.getElementById("wrapper").className = "wrapper"
    document.getElementById("loader").style = "display:none"
}




function startLoader(counter) {
    document.getElementById("wrapper").className = "blur wrapper"
    document.getElementById("loader").style = "display:block"
}

function runWithRetries(func, numOfRetries = 20) {
    console.log("Running function, ", func, "; numOfRetries=", numOfRetries)

    try {
        func()
    } catch (err) {
        console.log("Error fount in ", func, " error: ", err, "; numOfRetries=", numOfRetries)

        if (numOfRetries <= 0){
            alert("Error: " + err)
            return
        }

        setTimeout(() => {
            runWithRetries(func, --numOfRetries)
        }, 500);
    }
}


runWithRetries(applyStyleToButtons)
runWithRetries(fixScanButton)
runWithRetries(fixReaderDiv)
runWithRetries(stopLoader)


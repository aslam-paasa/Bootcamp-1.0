const downloadBtn = document.getElementById("download-btn");
const progressFill = document.getElementById("progress-fill");

downloadBtn.addEventListener("click", () => {

    /**
     * Initialize variables:
    */
    let percent = 0;
    let seconds = 5;

    /**
     * Reset the progress bar:
     * 1. Set the width to 0%
     * 2. Set the text to 0%
     * 3. Disable the button
    */
    progressFill.style.width = "0%"; 
    progressFill.textContent = "0%";
    downloadBtn.disabled = true; // Disable button during download

    /**
     * Set the interval:
     * 1. Increment the percent by 1
     * 2. Set the width to the percent
     * 3. Set the text to the percent
     * 4. If the percent is greater than or equal to 100, clear the interval
     * 5. Set the text to "Download Complete"
     * 6. Enable the button
    */
    const interval = setInterval(() => {
        percent += 1;
        progressFill.style.width = `${percent}%`;
        progressFill.textContent = `${percent}%`;
        downloadBtn.textContent = "Downloading...";

        if (percent >= 100) {
            clearInterval(interval);
            downloadBtn.textContent = "Downloaded";
            progressFill.textContent = "Download Complete";
            downloadBtn.disabled = false;
        }
    }, seconds * 1000 / 100); // speed: every 50ms
});

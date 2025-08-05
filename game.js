const apiUrl = 'https://script.google.com/macros/s/AKfycbw5VMdM7_YfGXM1XfdnbG67tje5hjuZExUE0Libku3Pe6ewcoPLCjATGogoI8j8S2k/exec'; // Replace with your actual script URL
let progress = 0;

function loadEntry(id) {
  fetch(`${apiUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById('story').innerText = "ERROR: ENTRY NOT FOUND.";
        return;
      }

      document.getElementById('story').innerText = data.Text;
      const optionsDiv = document.getElementById('options');
      optionsDiv.innerHTML = '';

      const option1 = document.createElement('button');
      option1.textContent = data.Option1;
      option1.onclick = () => {
        updateProgress();
        loadEntry(data.Option1_ID);
      };

      const option2 = document.createElement('button');
      option2.textContent = data.Option2;
      option2.onclick = () => {
        updateProgress();
        loadEntry(data.Option2_ID);
      };

      optionsDiv.appendChild(option1);
      optionsDiv.appendChild(option2);
    });
}

function updateProgress() {
  progress = Math.min(progress + 2, 100);
  document.getElementById('progressBar').style.width = `${progress}%`;
}

window.onload = () => {
  loadEntry("START");
};

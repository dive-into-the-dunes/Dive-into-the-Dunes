let nodes = {};
let progress = 0;

Papa.parse("nodes.csv", {
  download: true,
  header: true,
  complete: function(results) {
    // Store all nodes in a dictionary
    results.data.forEach(row => {
      nodes[row.ID] = row;
    });
    loadEntry("START");
  }
});

function loadEntry(id) {
  const data = nodes[id];
  if (!data) {
    document.getElementById('story').innerText = "ERROR: NODE NOT FOUND.";
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
}

function updateProgress() {
  progress = Math.min(progress + 1, 100);
  document.getElementById('progressBar').style.width = `${progress}%`;
}

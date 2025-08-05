let nodes = {};
let currentNodeId = 'TITLE';

async function fetchData() {
  const response = await fetch('nodes.json');
  const data = await response.json();
  return data;
}

function loadEntry(id) {
  currentNodeId = id;
  const data = nodes[id];

  const storyDiv = document.getElementById('story');
  const optionsDiv = document.getElementById('options');

  if (!data) {
    storyDiv.innerText = "ERROR: ENTRY NOT FOUND.";
    optionsDiv.innerHTML = '';
    return;
  }

  storyDiv.innerText = data.Text;
  storyDiv.dataset.nodeId = data.ID;
  optionsDiv.innerHTML = '';

  if (data.Option1 && data.Option1_ID) {
    const btn1 = document.createElement('button');
    btn1.textContent = data.Option1;
    btn1.onclick = () => {
      localStorage.setItem("wayfarer_save", data.Option1_ID);
      loadEntry(data.Option1_ID);
    };
    optionsDiv.appendChild(btn1);
  }

  if (data.Option2 && data.Option2_ID) {
    const btn2 = document.createElement('button');
    btn2.textContent = data.Option2;
    btn2.onclick = () => {
      localStorage.setItem("wayfarer_save", data.Option2_ID);
      loadEntry(data.Option2_ID);
    };
    optionsDiv.appendChild(btn2);
  }
}

function saveGame() {
  localStorage.setItem("wayfarer_save", currentNodeId);
  alert("Progress saved.");
}

function loadGame() {
  const saved = localStorage.getItem("wayfarer_save");
  if (saved) {
    loadEntry(saved);
  } else {
    alert("No save found.");
  }
}

function resetGame() {
  localStorage.removeItem("wayfarer_save");
  loadEntry("TITLE");
}

fetchData().then(data => {
  nodes = data;
  const saved = localStorage.getItem("wayfarer_save");
  loadEntry(saved || currentNodeId);
});

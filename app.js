// Seleção de elementos
const addMachineBtn = document.getElementById('add-machine-btn');
const machineFormContainer = document.getElementById('machine-form-container');
const machineForm = document.getElementById('machine-form');
const machineNameInput = document.getElementById('machine-name');
const machineDescriptionInput = document.getElementById('machine-description');
const serialNumberInput = document.getElementById('serial-number');
const maintenanceDateInput = document.getElementById('maintenance-date');
const OSnumberInput = document.getElementById('OS-number');
const responsibleNameInput = document.getElementById('responsible-name');
const machineImagePreview = document.getElementById('machine-image-preview');
const machineImagePreviewContainer = document.getElementById('machine-image-preview-container');
const machinesContainer = document.getElementById('machines-container');
const mainScreen = document.getElementById('main-screen');

// Mapeamento dos nomes das máquinas
const machineNames = {
    Machine1: "Kappa 310",
    Machine2: "Kappa 320",
    Machine3: "Kappa 330 SH",
    Machine4: "Kappa 330 DH",
    Machine5: "Kappa 331",
    Machine6: "Kappa 340",
    Machine7: "Kappa 350",
    Machine8: "Mira 230",
    Machine9: "Mira 230Q",
    Machine10: "Mira 340",
    Machine11: "Mira 340Q",
    Machine12: "Mira 440",
    Machine13: "QpLite",
    Machine14: "Microforce",
    Machine15: "Microlab 10",
    Machine16: "Microlab 30",
    Machine17: "Q1210",
    Machine18: "K331",
    Machine19: "Mira 32M",
    Machine20: "Delta 220",
    Machine21: "Delta 240",
    Machine22: "Delta 260",
    Machine23: "Bt 722",
    Machine24: "Bt 752",
    Machine25: "Iota 330",
    Machine26: "Micropull 10",
};

// Dados das máquinas (substitua com caminhos de imagem corretos)
const machinesData = {
    Machine1: 'https://i.imgur.com/2eDXDL7.jpeg',
    Machine2: 'https://i.imgur.com/AaMEKDM.png',
    Machine3: 'https://i.imgur.com/UHAROA6.png',
    Machine4: 'https://i.imgur.com/UHAROA6.png',
    Machine5: '',
    Machine6: '',
    Machine7: '',
    Machine8: 'https://i.imgur.com/t6cMhgR.png',
    Machine9: 'https://i.imgur.com/t6cMhgR.png',
    Machine10: 'https://i.imgur.com/t6cMhgR.png',
    Machine11: 'https://i.imgur.com/t6cMhgR.png',
    Machine12: '',
    Machine13: 'https://i.imgur.com/umaXgfm.png',
    Machine14: 'https://i.imgur.com/wBOud4h.jpeg',
    Machine15: 'https://i.imgur.com/hWX7VX8.png',
    Machine16: 'https://i.imgur.com/v8x0Rlk.png',
    Machine17: 'https://i.imgur.com/uCq0tB1.png',
    Machine18: '',
    Machine19: 'https://i.imgur.com/OeYlgvA.png',
    Machine20: 'https://i.imgur.com/uk99lpN.png',
    Machine21: 'https://i.imgur.com/uk99lpN.png',
    Machine22: 'https://i.imgur.com/uk99lpN.png',
    Machine23: 'https://i.imgur.com/Bu8nvj9.jpeg',
    Machine24: 'https://i.imgur.com/Bu8nvj9.jpeg',
    Machine25: 'https://i.imgur.com/Xa2ZAEA.png',
    Machine26: 'https://i.imgur.com/595UDeO.png',
};

// Função para formatar a data no formato brasileiro (DD/MM/YYYY)
function formatDateToBrazilian(date) {
    const [year, month, day] = date.split('-'); // Divide a data no formato YYYY-MM-DD
    return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
}

// Função para alternar a visibilidade do formulário
function toggleMachineForm() {
    machineFormContainer.classList.toggle('hidden');
    mainScreen.classList.toggle('hidden');
}

// Função para adicionar a máquina à exibição
function addMachineToDisplay(machineData) {
    const { name, description, serialNumber, OSnumber, responsibleName, maintenanceDate, imageURL } = machineData;

    // Obter o nome legível da máquina com base no valor selecionado
    const machineName = machineNames[name] || name; // Se não encontrar o nome, usa o valor

    // Formatar a data de manutenção para o formato brasileiro
    const formattedDate = formatDateToBrazilian(maintenanceDate);

    const machineCard = document.createElement('div');
    machineCard.classList.add('machine-card');

    machineCard.innerHTML = `
        <!-- Botão de exclusão -->
        <button class="delete-btn">X</button>

        <img src="${imageURL}" alt="${machineName}">
        <h3>${machineName}</h3>
        <p><strong>OS:</strong> ${OSnumber}</p>
        <p><strong>Serial:</strong> ${serialNumber}</p>
        <p><strong>Data de chegada:</strong> ${formattedDate}</p> <!-- Exibe a data formatada -->
        <p><strong>Responsável:</strong> ${responsibleName}</p>
        <p>${description}</p>

        <!-- Seletor de Status -->
        <label for="status-${serialNumber}"></label>
        <select id="status-${serialNumber}" class="machine-status">
            <option value="Aguardando orçamento">Aguardando orçamento</option>
            <option value="Aguardando aprovação">Aguardando aprovação</option>
            <option value="Aguardando peças">Aguardando peças</option>
            <option value="Liberada para execução">Liberada para execução</option>
        </select>

        <!-- Indicador de status visual (barra colorida) -->
        <div class="status-indicator" id="status-indicator-${serialNumber}"></div> 
    `;

    // Adiciona o card na tela
    machinesContainer.appendChild(machineCard);

    // A cada alteração no select de status, atualiza a cor da barra
    const statusSelect = machineCard.querySelector('.machine-status');
    const statusIndicator = machineCard.querySelector('.status-indicator');

  // Configurar o status inicial
    if (statusSelect.value === 'Aguardando orçamento') {
        statusIndicator.className = 'status-indicator waiting-budget';
    }
  
  statusSelect.addEventListener('change', function() {
        const newStatus = statusSelect.value;

        // Atualiza a cor do indicador de status
        switch (newStatus) {
            case 'Aguardando orçamento':
                statusIndicator.className = 'status-indicator waiting-budget';
                break;
            case 'Aguardando aprovação':
                statusIndicator.className = 'status-indicator waiting-approval';
                break;
            case 'Aguardando peças':
                statusIndicator.className = 'status-indicator waiting-parts';
                break;
            case 'Liberada para execução':
                statusIndicator.className = 'status-indicator released';
                break;
        }
    });
  
  // Adiciona funcionalidade ao botão de exclusão
    const deleteBtn = machineCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        machineCard.remove(); // Remove o card da tela
    });
}

// Evento do botão para adicionar máquina
addMachineBtn.addEventListener('click', toggleMachineForm);

// Evento para envio do formulário
machineForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const machineData = {
        name: machineNameInput.value,
        description: machineDescriptionInput.value,
        serialNumber: serialNumberInput.value,
        maintenanceDate: maintenanceDateInput.value,
        responsibleName: responsibleNameInput.value || "Não informado", // Garantir que tenha um valor padrão se o campo estiver vazio
        OSnumber: OSnumberInput.value,
        imageURL: machinesData[machineNameInput.value] || 'default-image.jpg',
    };

    addMachineToDisplay(machineData);
    toggleMachineForm();
});

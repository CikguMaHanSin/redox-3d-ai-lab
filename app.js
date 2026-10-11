const speciesData = {
    mg: { name: 'Magnesium', symbol: 'Mg', protons: 12, electrons: 12, charge: 0, type: 'Atom Neutral', orbital: '2.8.2 (model sekolah)' },
    mg2plus: { name: 'Ion Magnesium', symbol: 'Mg²⁺', protons: 12, electrons: 10, charge: '+2', type: 'Kation', orbital: '2.8 (model sekolah)' },
    cu: { name: 'Kuprum', symbol: 'Cu', protons: 29, electrons: 29, charge: 0, type: 'Atom Neutral', orbital: '2.8.18.1 (model sekolah)' },
    cu2plus: { name: 'Ion Kuprum(II)', symbol: 'Cu²⁺', protons: 29, electrons: 27, charge: '+2', type: 'Kation', orbital: '2.8.18 (model sekolah)' },
    na: { name: 'Natrium', symbol: 'Na', protons: 11, electrons: 11, charge: 0, type: 'Atom Neutral', orbital: '2.8.1 (model sekolah)' },
    naplus: { name: 'Ion Natrium', symbol: 'Na⁺', protons: 11, electrons: 10, charge: '+1', type: 'Kation', orbital: '2.8 (model sekolah)' },
    cl: { name: 'Klorin', symbol: 'Cl', protons: 17, electrons: 17, charge: 0, type: 'Atom Neutral', orbital: '2.8.7 (model sekolah)' },
    clminus: { name: 'Ion Klorida', symbol: 'Cl⁻', protons: 17, electrons: 18, charge: '-1', type: 'Anion', orbital: '2.8.8 (model sekolah)' }
};

const simulatorSteps = [
    {
        title: 'Langkah 1: Sebelum tindak balas',
        description: 'Atom magnesium dan ion kuprum(II) berada berasingan. Atom Mg masih neutral dan ion Cu²⁺ masih berada dalam larutan.',
        feedback: 'Magnesium masih mempunyai 12 elektron dan ion kuprum(II) mempunyai cas +2. Dalam tindak balas ini, proton tidak berubah tetapi elektron dipindahkan.'
    },
    {
        title: 'Langkah 2: Mg kehilangan elektron',
        description: 'Atom magnesium melepaskan dua elektron untuk membentuk ion Mg²⁺.',
        feedback: 'Proses ini ialah pengoksidaan. Magnesium kehilangan elektron dan cas bertukar daripada 0 kepada +2.'
    },
    {
        title: 'Langkah 3: Mg menjadi Mg²⁺',
        description: 'Atom Mg berubah kepada ion Mg²⁺, dengan dua elektron yang dibebaskan.',
        feedback: 'Kehilangan dua elektron menghasilkan ion Mg²⁺, yang mempunyai 10 elektron dan 12 proton.'
    },
    {
        title: 'Langkah 4: Elektron dipindahkan ke Cu²⁺',
        description: 'Dua elektron bergerak dari Mg ke ion Cu²⁺.',
        feedback: 'Elektron yang dibebaskan oleh magnesium diterima oleh ion Cu²⁺. Ini ialah pemindahan elektron yang menyeimbangkan tindak balas redoks.'
    },
    {
        title: 'Langkah 5: Cu²⁺ menjadi Cu neutral',
        description: 'Ion Cu²⁺ menerima dua elektron dan berubah menjadi atom kuprum neutral.',
        feedback: 'Penurunan berlaku apabila ion Cu²⁺ menerima elektron. Cas berubah daripada +2 kepada 0.'
    },
    {
        title: 'Langkah 6: Setengah persamaan',
        description: 'Tindakan elektron dipaparkan sebagai dua setengah persamaan.',
        feedback: 'Setengah persamaan: Mg(s) → Mg²⁺(aq) + 2e⁻ dan Cu²⁺(aq) + 2e⁻ → Cu(s).'
    },
    {
        title: 'Langkah 7: Persamaan keseluruhan',
        description: 'Gabungkan setengah persamaan untuk membentuk persamaan ion keseluruhan yang seimbang.',
        feedback: 'Persamaan ion keseluruhan: Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s).' 
    }
];

let currentSimulatorStep = 0;
let simulatorInterval = null;
let simulationActive = false;
let simulationSpeed = 1;

const componentList = [
    'Mg', 'Mg²⁺', 'Cu²⁺', 'Cu', 'e⁻', '+', '2', '→'
];

const quizQuestions = [
    {
        question: 'Apakah yang berlaku kepada atom magnesium dalam tindak balas Mg + Cu²⁺?',
        options: [
            'Menerima elektron',
            'Mengalami pengoksidaan dan kehilangan 2 elektron',
            'Menjadi neutral semula',
            'Tidak berubah'
        ],
        answer: 1,
        explanation: 'Atom magnesium mengalami pengoksidaan kerana ia kehilangan 2 elektron untuk membentuk Mg²⁺.'
    },
    {
        question: 'Apakah fungsi ion Cu²⁺ dalam tindak balas ini?',
        options: [
            'Agen penurunan',
            'Agen pengoksidaan',
            'Elektron',
            'Ion neutral'
        ],
        answer: 1,
        explanation: 'Ion Cu²⁺ ialah agen pengoksidaan kerana ia menerima elektron dan mengalami penurunan.'
    },
    {
        question: 'Antara berikut, yang manakah benar tentang Mg²⁺?',
        options: [
            'Mempunyai 12 elektron',
            'Mempunyai cas 0',
            'Mempunyai 10 elektron dan cas +2',
            'Mempunyai 14 proton'
        ],
        answer: 2,
        explanation: 'Mg²⁺ mempunyai 12 proton, 10 elektron, dan cas +2.'
    },
    {
        question: 'Apakah maksud penurunan dalam konteks redoks?',
        options: [
            'Penambahan elektron',
            'Pengurangan bilangan proton',
            'Pembentukan ion Mg²⁺',
            'Kehilangan elektron'
        ],
        answer: 0,
        explanation: 'Penurunan ialah penerimaan elektron, bukan kehilangan elektron.'
    },
    {
        question: 'Dalam setengah persamaan Cu²⁺ + 2e⁻ → Cu, apakah yang berlaku kepada ion kuprum?',
        options: [
            'Mengalami pengoksidaan',
            'Menerima elektron dan berkurang',
            'Melepaskan elektron',
            'Menjadi Mg²⁺'
        ],
        answer: 1,
        explanation: 'Ion Cu²⁺ menerima 2 elektron untuk membentuk Cu, maka ia mengalami penurunan.'
    },
    {
        question: 'Apakah yang dikatakan jika sesuatu spesies bertindak sebagai agen penurunan?',
        options: [
            'Ia menerima elektron',
            'Ia mengalami pengoksidaan',
            'Ia menjadi neutral',
            'Ia tidak berubah'
        ],
        answer: 1,
        explanation: 'Agen penurunan mengalami pengoksidaan dengan melepaskan elektron.'
    },
    {
        question: 'Bilakah tindak balas digelar redoks?',
        options: [
            'Apabila hanya berlaku penurunan',
            'Apabila berlaku pengoksidaan dan penurunan serentak',
            'Apabila hanya berlaku pengoksidaan',
            'Apabila tidak ada perubahan cas'
        ],
        answer: 1,
        explanation: 'Redoks berlaku apabila pengoksidaan dan penurunan berlaku serentak.'
    },
    {
        question: 'Berapakah elektron yang diperlukan untuk menurunkan ion Cu²⁺ kepada Cu?',
        options: [
            '1 elektron',
            '2 elektron',
            '3 elektron',
            '0 elektron'
        ],
        answer: 1,
        explanation: 'Cu²⁺ memerlukan 2 elektron untuk menjadi Cu neutral.'
    },
    {
        question: 'Bagaimanakah perubahan warna larutan kuprum(II) boleh dikaitkan dengan tindak balas redoks?',
        options: [
            'Larutan kekal biru kerana semua ion tetap',
            'Ion Cu²⁺ berkurang dan kepekatan ion kuprum menurun',
            'Magnesium menambahkan ion kuprum',
            'Warna berubah kerana magnesium melarut sepenuhnya'
        ],
        answer: 1,
        explanation: 'Ion Cu²⁺ berkurang menjadi Cu metal, jadi kepekatan ion kuprum berkurang dan warna larutan berkurangan.'
    },
    {
        question: 'Apakah yang terbentuk pada permukaan magnesium apabila ia bertindak balas dengan ion kuprum(II)?',
        options: [
            'Mendakan kuprum berwarna perang kemerahan',
            'Gas oksigen',
            'Larutan klorida',
            'Mendakan magnesium'
        ],
        answer: 0,
        explanation: 'Kuprum logam yang terbentuk melekat pada permukaan magnesium, menghasilkan salutan perang kemerahan.'
    }
];

function showModule(moduleName) {
    document.querySelectorAll('.module-section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.toggle('active', button.dataset.module === moduleName);
    });

    const target = document.getElementById(`${moduleName}-module`);
    if (target) target.classList.add('active');
}

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => showModule(button.dataset.module));
});

function renderParticleCanvas(stepIndex) {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const step = simulatorSteps[stepIndex] || simulatorSteps[0];
    canvas.innerHTML = '';

    const magnesium = document.createElement('div');
    magnesium.className = 'particle-node magnesium';
    magnesium.innerHTML = '<span>Mg</span>';
    magnesium.style.position = 'absolute';
    magnesium.style.left = '18%';
    magnesium.style.top = '45%';

    const copperIon = document.createElement('div');
    copperIon.className = 'particle-node copper-ion';
    copperIon.innerHTML = '<span>Cu²⁺</span>';
    copperIon.style.position = 'absolute';
    copperIon.style.right = '22%';
    copperIon.style.top = '32%';

    const mgIon = document.createElement('div');
    mgIon.className = 'particle-node magnesium-ion';
    mgIon.innerHTML = '<span>Mg²⁺</span>';
    mgIon.style.position = 'absolute';
    mgIon.style.left = '38%';
    mgIon.style.top = '48%';
    mgIon.style.display = stepIndex >= 2 ? 'block' : 'none';

    const copperAtom = document.createElement('div');
    copperAtom.className = 'particle-node copper-atom';
    copperAtom.innerHTML = '<span>Cu</span>';
    copperAtom.style.position = 'absolute';
    copperAtom.style.right = '26%';
    copperAtom.style.bottom = '21%';
    copperAtom.style.display = stepIndex >= 4 ? 'block' : 'none';

    const electronNode = document.createElement('div');
    electronNode.className = 'particle-node electron';
    electronNode.innerHTML = '<span>e⁻</span>';
    electronNode.style.position = 'absolute';
    electronNode.style.left = '48%';
    electronNode.style.top = '35%';
    electronNode.style.display = stepIndex >= 2 && stepIndex <= 4 ? 'block' : 'none';

    canvas.appendChild(magnesium);
    canvas.appendChild(copperIon);
    canvas.appendChild(mgIon);
    canvas.appendChild(copperAtom);
    canvas.appendChild(electronNode);

    const stepText = document.getElementById('step-description');
    if (stepText) {
        stepText.textContent = `${step.title}: ${step.description}`;
    }

    const feedback = document.getElementById('feedback-content');
    if (feedback) {
        feedback.textContent = step.feedback;
    }

    const mgProtons = document.getElementById('mg-protons');
    const mgElectrons = document.getElementById('mg-electrons');
    const mgCharge = document.getElementById('mg-charge');
    const cuProtons = document.getElementById('cu-protons');
    const cuElectrons = document.getElementById('cu-electrons');
    const cuCharge = document.getElementById('cu-charge');

    if (stepIndex < 2) {
        if (mgProtons) mgProtons.textContent = '12';
        if (mgElectrons) mgElectrons.textContent = '12';
        if (mgCharge) mgCharge.textContent = '0';
        if (cuProtons) cuProtons.textContent = '29';
        if (cuElectrons) cuElectrons.textContent = '27';
        if (cuCharge) cuCharge.textContent = '+2';
    } else if (stepIndex >= 2 && stepIndex < 4) {
        if (mgProtons) mgProtons.textContent = '12';
        if (mgElectrons) mgElectrons.textContent = '10';
        if (mgCharge) mgCharge.textContent = '+2';
        if (cuProtons) cuProtons.textContent = '29';
        if (cuElectrons) cuElectrons.textContent = '27';
        if (cuCharge) cuCharge.textContent = '+2';
    } else {
        if (mgProtons) mgProtons.textContent = '12';
        if (mgElectrons) mgElectrons.textContent = '10';
        if (mgCharge) mgCharge.textContent = '+2';
        if (cuProtons) cuProtons.textContent = '29';
        if (cuElectrons) cuElectrons.textContent = '29';
        if (cuCharge) cuCharge.textContent = '0';
    }
}

function setSimulationStep(index) {
    currentSimulatorStep = Math.max(0, Math.min(index, simulatorSteps.length - 1));
    renderParticleCanvas(currentSimulatorStep);
}

function startSimulation() {
    if (simulationActive) return;
    simulationActive = true;

    simulatorInterval = setInterval(() => {
        if (currentSimulatorStep < simulatorSteps.length - 1) {
            currentSimulatorStep += 1;
            renderParticleCanvas(currentSimulatorStep);
        } else {
            stopSimulation();
        }
    }, 1600 / simulationSpeed);
}

function stopSimulation() {
    simulationActive = false;
    if (simulatorInterval) {
        clearInterval(simulatorInterval);
        simulatorInterval = null;
    }
}

function resetSimulation() {
    stopSimulation();
    currentSimulatorStep = 0;
    renderParticleCanvas(currentSimulatorStep);
}

function updateSpeedValue() {
    const slider = document.getElementById('speed-slider');
    const value = document.getElementById('speed-value');
    if (!slider || !value) return;
    value.textContent = `${slider.value}x`;
    simulationSpeed = Number(slider.value);
    if (simulationActive) {
        stopSimulation();
        startSimulation();
    }
}

function confirmPrediction() {
    const selected = document.querySelector('input[name="prediction"]:checked');
    if (!selected) {
        alert('Sila pilih satu jawapan sebelum meneruskan.');
        return;
    }

    const feedback = document.getElementById('feedback-content');
    if (selected.value === 'pindah' || selected.value === 'hilang') {
        if (feedback) {
            feedback.textContent = 'Ramalan anda menunjukkan pemahaman yang baik. Elektron dipindahkan dari Mg ke Cu²⁺. Mari kita lihat proses ini secara langkah demi langkah.';
        }
    } else {
        if (feedback) {
            feedback.textContent = 'Tiada masalah: mari kita lihat prosesnya secara visual. Ingat, magnesium kehilangan elektron, manakala ion Cu²⁺ menerima elektron.';
        }
    }

    renderParticleCanvas(currentSimulatorStep);
}

function renderExplorer(speciesKey = 'mg') {
    const species = speciesData[speciesKey];
    if (!species) return;

    const explorerName = document.getElementById('explorer-name');
    const explorerSymbol = document.getElementById('explorer-symbol');
    const explorerProtons = document.getElementById('explorer-protons');
    const explorerElectrons = document.getElementById('explorer-electrons');
    const explorerCharge = document.getElementById('explorer-charge');
    const explorerType = document.getElementById('explorer-type');
    const explorerText = document.getElementById('explorer-text');
    const canvas = document.getElementById('explorer-canvas');

    if (explorerName) explorerName.textContent = species.name;
    if (explorerSymbol) explorerSymbol.textContent = species.symbol;
    if (explorerProtons) explorerProtons.textContent = species.protons;
    if (explorerElectrons) explorerElectrons.textContent = species.electrons;
    if (explorerCharge) explorerCharge.textContent = species.charge;
    if (explorerType) explorerType.textContent = species.type;

    if (explorerText) {
        explorerText.textContent = `Model pembelajaran: ${species.symbol} mempunyai ${species.protons} proton dan ${species.electrons} elektron. Susunan elektron ialah ${species.orbital}. Cas keseluruhan ialah ${species.charge}.`;
    }

    if (canvas) {
        canvas.innerHTML = '';
        const electronCount = species.electrons;
        const protonCount = species.protons;
        const totalNodes = Math.max(8, Math.min(20, electronCount + 2));
        const nodes = [];

        for (let i = 0; i < totalNodes; i++) {
            const node = document.createElement('div');
            node.className = 'explorer-node';
            node.style.position = 'absolute';
            node.style.width = '18px';
            node.style.height = '18px';
            node.style.borderRadius = '50%';
            node.style.background = i < protonCount ? '#e2f0ff' : '#8bd1ff';
            node.style.left = `${15 + ((i * 9) % 70)}%`;
            node.style.top = `${20 + ((i * 11) % 50)}%`;
            node.textContent = i < protonCount ? 'p' : 'e';
            node.style.display = 'grid';
            node.style.placeItems = 'center';
            node.style.fontSize = '10px';
            node.style.color = '#0e2335';
            node.style.fontWeight = 'bold';
            nodes.push(node);
        }

        nodes.forEach(node => canvas.appendChild(node));

        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.bottom = '16px';
        label.style.left = '16px';
        label.style.right = '16px';
        label.style.textAlign = 'center';
        label.style.color = '#ebf7ff';
        label.style.fontWeight = 'bold';
        label.textContent = `${species.symbol} ${species.charge === 0 ? 'neutral' : 'bercas'} ${species.charge}`;
        canvas.appendChild(label);
    }
}

function addElectronToSpecies() {
    const active = document.querySelector('.species-btn.active');
    if (!active) return;

    const speciesKey = active.dataset.species;
    const species = speciesData[speciesKey];
    if (!species) return;

    const electronMap = {
        mg: 'mg2plus',
        cu: 'cu2plus',
        na: 'naplus',
        cl: 'clminus',
        mg2plus: 'mg',
        cu2plus: 'cu',
        naplus: 'na',
        clminus: 'cl'
    };

    const next = electronMap[speciesKey];
    if (next) {
        document.querySelectorAll('.species-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.species === next);
        });
        renderExplorer(next);
    }
}

function removeElectronFromSpecies() {
    const active = document.querySelector('.species-btn.active');
    if (!active) return;

    const speciesKey = active.dataset.species;
    const reverseMap = {
        mg2plus: 'mg',
        cu2plus: 'cu',
        naplus: 'na',
        clminus: 'cl',
        mg: 'mg2plus',
        cu: 'cu2plus',
        na: 'naplus',
        cl: 'clminus'
    };

    const next = reverseMap[speciesKey];
    if (next) {
        document.querySelectorAll('.species-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.species === next);
        });
        renderExplorer(next);
    }
}

document.querySelectorAll('.species-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.species-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderExplorer(button.dataset.species);
    });
});

document.getElementById('add-electron-btn')?.addEventListener('click', addElectronToSpecies);
document.getElementById('remove-electron-btn')?.addEventListener('click', removeElectronFromSpecies);
document.getElementById('reset-explorer-btn')?.addEventListener('click', () => renderExplorer('mg'));

document.getElementById('play-btn')?.addEventListener('click', startSimulation);
document.getElementById('pause-btn')?.addEventListener('click', stopSimulation);
document.getElementById('step-forward-btn')?.addEventListener('click', () => setSimulationStep(currentSimulatorStep + 1));
document.getElementById('step-back-btn')?.addEventListener('click', () => setSimulationStep(currentSimulatorStep - 1));
document.getElementById('reset-btn')?.addEventListener('click', resetSimulation);
document.getElementById('confirm-prediction')?.addEventListener('click', confirmPrediction);
document.getElementById('speed-slider')?.addEventListener('input', updateSpeedValue);

function populateComponents() {
    const grid = document.getElementById('components-grid');
    if (!grid) return;
    componentList.forEach(item => {
        const button = document.createElement('button');
        button.className = 'component-item';
        button.textContent = item;
        button.draggable = true;
        button.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', item);
        });
        grid.appendChild(button);
    });

    document.querySelectorAll('.builder-dropzone').forEach(dropzone => {
        dropzone.addEventListener('dragover', event => event.preventDefault());
        dropzone.addEventListener('drop', event => {
            event.preventDefault();
            const item = event.dataTransfer.getData('text/plain');
            const chip = document.createElement('span');
            chip.className = 'component-item';
            chip.textContent = item;
            dropzone.appendChild(chip);
        });
    });
}

function checkQuestionAnswer(questionNumber) {
    const response = document.getElementById(`answer-${questionNumber}`);
    const feedback = document.getElementById(`feedback-${questionNumber}`);
    if (!response || !feedback) return;

    const value = response.value.trim().toLowerCase();
    if (!value) {
        feedback.textContent = 'Sila tulis jawapan anda terlebih dahulu.';
        return;
    }

    if (questionNumber === 1) {
        if (value.includes('ion cu') || value.includes('kuprum') || value.includes('menerima') || value.includes('elektron')) {
            feedback.textContent = 'Betul. Kepekatan ion Cu²⁺ berkurang apabila ion ini menerima elektron dan berubah menjadi atom kuprum.';
        } else {
            feedback.textContent = 'Sila fikir semula. Ion Cu²⁺ menerima elektron untuk membentuk atom Cu, maka kepekatan ion kuprum dalam larutan berkurang.';
        }
    }

    if (questionNumber === 2) {
        if (value.includes('kuprum') || value.includes('ion cu') || value.includes('menerima elektron') || value.includes('logam')) {
            feedback.textContent = 'Betul. Kuprum logam terhasil daripada penerimaan elektron oleh ion Cu²⁺, lalu membentuk salutan berwarna perang kemerahan.';
        } else {
            feedback.textContent = 'Sila semak semula. Salutan itu terhasil daripada atom kuprum yang dibentuk apabila ion Cu²⁺ menerima elektron.';
        }
    }
}

window.checkExperimentAnswer = checkQuestionAnswer;

function renderQuiz() {
    const container = document.getElementById('quiz-questions');
    if (!container) return;
    container.innerHTML = '';

    quizQuestions.forEach((item, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'quiz-question';

        const title = document.createElement('h3');
        title.textContent = `Soalan ${index + 1}: ${item.question}`;
        questionCard.appendChild(title);

        const optionsWrap = document.createElement('div');
        optionsWrap.className = 'quiz-options';

        item.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => {
                document.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                item.selected = optionIndex;
                const feedback = document.createElement('div');
                feedback.className = 'quiz-feedback';
                const isCorrect = optionIndex === item.answer;
                feedback.textContent = isCorrect
                    ? `Betul! ${item.explanation}`
                    : `Salah. ${item.explanation}`;
                const existing = questionCard.querySelector('.quiz-feedback');
                if (existing) existing.remove();
                questionCard.appendChild(feedback);
            });
            optionsWrap.appendChild(button);
        });

        questionCard.appendChild(optionsWrap);
        container.appendChild(questionCard);
    });
}

function calculateQuizScore() {
    const allQuestionCards = document.querySelectorAll('.quiz-question');
    let score = 0;
    let answered = 0;
    const conceptErrors = [];

    allQuestionCards.forEach((card, index) => {
        const selected = card.querySelector('.quiz-option.selected');
        if (selected) {
            answered++;
            const answerIndex = Array.from(card.querySelectorAll('.quiz-option')).indexOf(selected);
            if (answerIndex === quizQuestions[index].answer) score++;
            else conceptErrors.push(`Soalan ${index + 1}: ${quizQuestions[index].question}`);
        }
    });

    return { score, answered, conceptErrors };
}

function showQuizResults() {
    const resultBox = document.getElementById('quiz-results');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const finalScore = document.getElementById('final-score');
    const resultText = document.getElementById('result-text');
    const conceptAnalysis = document.getElementById('concept-analysis');

    if (!resultBox || !progressFill || !progressText || !finalScore || !resultText || !conceptAnalysis) return;

    const { score, answered, conceptErrors } = calculateQuizScore();
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    progressFill.style.width = `${(answered / total) * 100}%`;
    progressText.textContent = `Soalan ${answered} daripada ${total}`;
    finalScore.textContent = `${score}/${total}`;

    resultText.textContent = `Markah anda: ${score}/${total} (${percentage}%).`;

    if (conceptErrors.length === 0) {
        conceptAnalysis.innerHTML = '<p>Semua konsep utama telah dikuasai dengan baik. Teruskan usaha anda.</p>';
    } else {
        conceptAnalysis.innerHTML = `
            <p>Konsep yang perlu ditambahbaik:</p>
            <ul>${conceptErrors.map(item => `<li>${item}</li>`).join('')}</ul>
        `;
    }

    resultBox.style.display = 'block';
}

function attachQuizSubmit() {
    const container = document.getElementById('quiz-questions');
    if (!container) return;
    const button = document.createElement('button');
    button.className = 'btn-primary';
    button.textContent = 'Selesaikan Kuiz';
    button.addEventListener('click', showQuizResults);
    container.appendChild(button);
}

function resetQuiz() {
    renderQuiz();
    attachQuizSubmit();
    const resultBox = document.getElementById('quiz-results');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    if (resultBox) resultBox.style.display = 'none';
    if (progressFill) progressFill.style.width = '0%';
    if (progressText) progressText.textContent = 'Soalan 0 daripada 10';
}

document.getElementById('retake-quiz-btn')?.addEventListener('click', resetQuiz);

function openHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.style.display = 'flex';
}

function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.style.display = 'none';
}

document.getElementById('help-btn')?.addEventListener('click', openHelpModal);

window.addEventListener('load', () => {
    renderParticleCanvas(0);
    renderExplorer('mg');
    populateComponents();
    renderQuiz();
    attachQuizSubmit();
    resetQuiz();
});

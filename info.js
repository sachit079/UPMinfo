document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('stateSelect');
    const districtSelect = document.getElementById('districtSelect');
    const blockSelect = document.getElementById('blockSelect');
    const villageSelect = document.getElementById('villageSelect');
    const villageInfoContainer = document.getElementById('villageInfoContainer');

    // Example data. Replace with actual API calls to fetch data
    const data = {
        states: {
            "Tamil Nadu": ["Theni", "District2"],
            "State2": ["District3", "District4"]
        },
        districts: {
            "Theni": ["Andipatti", "Chinnamanur","K Myladumparai","Theni","Bodinayakkanur","Cumbum","Periyakulam","Uttamapalaiyam"],
            "District2": ["Block3", "Block4"],
            "District3": ["Block5", "Block6"],
            "District4": ["Block7", "Block8"]
        },
        blocks: {
            "Block1": ["Village1", "Village2"],
            "Block2": ["Village3", "Village4"],
            "Block3": ["Village5", "Village6"],
            "Block4": ["Village7", "Village8"],
            "Block5": ["Village9", "Village10"],
            "Block6": ["Village11", "Village12"],
            "Block7": ["Village13", "Village14"],
            "Uttamapalaiyam": ["Uttamapalaiyam North", "Uttamapalaiyam South","Royappanpatti","Mallingapuram","Gokilapuram","Kombai East","Kombai West","Pannaipuram"]
        },
        villageInfo: {
            "Uttamapalaiyam North": {soil: "Red Loamy", crops: "coconut,cocoa,Banana", problems: "Rugose white Fluy", solutions: "Spraying of Maida Solution"},
            "Uttamapalaiyam South": {soil: "Red Loamy", crops: "coconut,cocoa,Banana", problems: "Rugose white Fluy", solutions: "Spraying of Maida Solution"},
            "Royappanpatti": {soil: "Red Loamy, red soil", crops: "Banana,coconut,onion,crucifers,Grapes", problems: "lodging of Banana", solutions: "propping"},
            "Mallingapuram": {soil: "Red sandy", crops: "coconut", problems: "Rhinocerous beetle,Rugose white fly", solutions: "bucket trap(Rhinocerus bettle),spraying of maida Solution(Rugose white fly)"},
            "Gokilapuram": {soil: "Black soil,Red soil", crops: "Paddy, Pulses", problems: "Zn deficiency Khira disease", solutions: "Application of Znso4"},
            "Kombai East": {soil: "Red soil", crops: "coconut, Grounnut,Sollam,Cumbu,lablab", problems: " ", solutions: " "},
            "Kombai West": {soil: "Red soil", crops: "coconut, Grounnut,Sollam,Cumbu,lablab", problems: " ", solutions: " "},
            "Pannaipuram": {soil: "Red loamy", crops: "coconut, Banana,Maize,chilli,Brinjal", problems: "Chilli Leaf Curl", solutions: "Beauveria basssiana Spray"},
            "T Meenakshipuram": {soil: "Red sandy", crops: "coconut,Banana", problems: "Rhinocerous beetle", solutions: "Bucket trap"},
            "Thevaram hills(Non Habitat)": {soil: "Laterite", crops: "pepper,Fig", problems: "Anthracnose/pollu disease", solutions: "Bordeaux Mixture 1%"},
            "Thevaram": {soil: "Red loamy", crops: "Cholam,Red gram,Maize,cumbu,Sorghum", problems: "Mosaic virus", solutions: " "}
    
            // Add more village information as needed
        }
    };
    function populateSelect(selectElement, items) {
        selectElement.innerHTML = '<option value="">Select an option</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            selectElement.appendChild(option);
        });
    }

    function handleStateChange() {
        const selectedState = stateSelect.value;
        const districts = data.states[selectedState] || [];
        populateSelect(districtSelect, districts);
        districtSelect.disabled = districts.length === 0;
        blockSelect.disabled = true;
        villageSelect.disabled = true;
        villageInfoContainer.classList.add('hidden');
    }

    function handleDistrictChange() {
        const selectedDistrict = districtSelect.value;
        const blocks = data.districts[selectedDistrict] || [];
        populateSelect(blockSelect, blocks);
        blockSelect.disabled = blocks.length === 0;
        villageSelect.disabled = true;
        villageInfoContainer.classList.add('hidden');
    }

    function handleBlockChange() {
        const selectedBlock = blockSelect.value;
        const villages = data.blocks[selectedBlock] || [];
        populateSelect(villageSelect, villages);
        villageSelect.disabled = villages.length === 0;
        villageInfoContainer.classList.add('hidden');
    }

    function handleVillageChange() {
        const selectedVillage = villageSelect.value;
        const info = data.villageInfo[selectedVillage] || {};
        if (selectedVillage) {
            villageInfoContainer.classList.remove('hidden');
            villageInfoContainer.innerHTML = `
                <h2>Information for ${selectedVillage}</h2>
                <p><strong>Soil Type:</strong> ${info.soil || 'N/A'}</p>
                <p><strong>Crops:</strong> ${info.crops || 'N/A'}</p>
                <p><strong>Problems:</strong> ${info.problems || 'N/A'}</p>
                <p><strong>Solutions:</strong> ${info.solutions || 'N/A'}</p>
            `;
            console.log(villageInfoContainer)

        } else {
            villageInfoContainer.classList.add('hidden');
            console.log(selectedVillage)
        }
    }

    stateSelect.addEventListener('change', handleStateChange);
    districtSelect.addEventListener('change', handleDistrictChange);
    blockSelect.addEventListener('change', handleBlockChange);
    villageSelect.addEventListener('change', handleVillageChange);

    // Initialize state select with example data
    populateSelect(stateSelect, Object.keys(data.states));
});

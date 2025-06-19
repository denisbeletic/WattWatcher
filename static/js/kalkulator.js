const VT_cijena = 0.09;        // €/kWh
const NT_cijena = 0.04;        // €/kWh
const VT_distribucija = 0.04;  // €/kWh
const NT_distribucija = 0.02;  // €/kWh
const VT_prijenos = 0.02;      // €/kWh
const NT_prijenos = 0.01;      // €/kWh
const porez = 0.1;             // %

const ctx = document.getElementById('graf').getContext('2d');
const graf = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['VT %', 'NT %'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#375E97', '#FFBB00'],
        }]
    },
    options: {
        cutout: '70%',
    }
});

function izracunaj_distribuciju(VT_potrosnja, NT_potrosnja) {
    return (VT_potrosnja * VT_distribucija) + (NT_potrosnja * NT_distribucija);
}

function izracunaj_prijenos(VT_potrosnja, NT_potrosnja) {
    return (VT_potrosnja * VT_prijenos) + (NT_potrosnja * NT_prijenos);
}

function izracunaj_ukupno(VT_potrosnja, NT_potrosnja, distribucija, prijenos) {
    const ukupno = ((VT_potrosnja * VT_cijena) + (NT_potrosnja * NT_cijena) + prijenos + distribucija) * (porez + 1);
    return ukupno;
}

function izracunaj_postotak(VT_potrosnja, NT_potrosnja) {
    const total = VT_potrosnja + NT_potrosnja;
    if (total == 0) {
        return 0;
    }
    return parseInt((VT_potrosnja / total) * 100);
}


function dohvati() {
    const VT_potrosnja = parseFloat(document.getElementById('VT').value) || 0;
    const NT_potrosnja = parseFloat(document.getElementById('NT').value) || 0;

    const distribucija = izracunaj_distribuciju(VT_potrosnja, NT_potrosnja);
    const prijenos = izracunaj_prijenos(VT_potrosnja, NT_potrosnja);

    const postotak = izracunaj_postotak(VT_potrosnja, NT_potrosnja);
    const ukupno = izracunaj_ukupno(VT_potrosnja, NT_potrosnja, distribucija, prijenos);

    graf.data.datasets[0].data = [postotak, 100 - postotak];
    graf.update();

    document.getElementById("potrosnja_VT").innerHTML = `<strong>${(VT_potrosnja * VT_cijena).toFixed(2)}€</strong>`;
    document.getElementById("potrosnja_NT").innerHTML = `<strong>${(NT_potrosnja * NT_cijena).toFixed(2)}€</strong>`;

    document.getElementById("distribucija").innerHTML = `<strong>${distribucija.toFixed(2)}€</strong>`;
    document.getElementById("prijenos").innerHTML = `<strong>${prijenos.toFixed(2)}€</strong>`;
    document.getElementById("ukupno").innerHTML = `<strong>${ukupno.toFixed(2)}€</strong>`;
    document.getElementById("postotak_potrosnje").innerHTML = `<strong>${postotak}</strong>%`;
}


document.getElementById("VT").addEventListener('input', dohvati);
document.getElementById("NT").addEventListener('input', dohvati);
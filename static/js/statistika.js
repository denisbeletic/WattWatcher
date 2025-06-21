let data = {
    labels: ['VT %', 'NT %'],
    datasets: [{
        data: [0, 100],
        backgroundColor: ['#375E97', '#FFBB00'],
    }]
}

const ctx = document.getElementById('graf_doughnut');

const config = {
    type: 'doughnut',
    options: {
        cutout: '70%',
    },
    data : data
}

const graf = new Chart(ctx, config)


let form_mm = document.getElementById('form_statistika_mm');
let select_mm = document.getElementById('prikaz_statistike_mm_odabir');

form_mm.addEventListener('submit', function () {      // radi slanja "stat_id_mm"-a i "stat_id_potrosnje"
    let odabrani_id_mm = select_mm.value;
    form_mm.action = '/statistika/mm/' + odabrani_id_mm;
});

let form_potrosnja = document.getElementById('form_statistika_potrosnja');
let select_potrosnja = document.getElementById('prikaz_statistike_potrošnje_odabir');

form_potrosnja.addEventListener('submit', function () {
    let odabrani_id_potrosnja = select_potrosnja.value;
    form_potrosnja.action = '/statistika/potrosnja/' + odabrani_id_potrosnja;
});

function osvjezi_graf() {
    const postotak = parseInt(document.getElementById('postotak').value, 10) || 0;
    graf.data.datasets[0].data = [postotak, 100 - postotak];
    graf.update();
}

window.addEventListener('DOMContentLoaded', osvjezi_graf);
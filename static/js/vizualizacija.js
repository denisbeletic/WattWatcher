let form_vizualizacija = document.getElementById('form_vizualizacija');
let godina_vizualizacija = document.getElementById('godina_vizualizacija');

form_vizualizacija.addEventListener('submit', function () {
    let odabrani_id_mm_viz = prikaz_vizualizacije.value;
    let odabrana_god_viz = godina_vizualizacija.value

    console.log("Selected ID:", odabrani_id_mm_viz);
    console.log("Selected Year:", odabrana_god_viz);

    form_vizualizacija.action = '/vizualizacija/' + odabrani_id_mm_viz + '/' + odabrana_god_viz;
});

const jsonDataElement = document.getElementById('json-data');
const targeted_data = JSON.parse(jsonDataElement.dataset.ocitanja);

let vals_za_mjesece = Array(12).fill(0);
for (let j = 0; j < targeted_data.length; j++) {
    let mjesec = targeted_data[j].mjesec;
    if (mjesec >= 1 && mjesec <= 12) {
        vals_za_mjesece[mjesec - 1] = (targeted_data[j].val_vt) + (targeted_data[j].val_nt);
    }
}

let data = {
    labels: [
        "Siječanj",
        "Veljača",
        "Ožujak",
        "Travanj",
        "Svibanj",
        "Lipanj",
        "Srpanj",
        "Kolovoz", 
        "Rujan",
        "Listopad",
        "Studeni",
        "Prosinac"
    ],

    datasets: [{
        data: vals_za_mjesece,
        backgroundColor: ['#FFBB00'],
    }]
}

const ctx = document.getElementById('graf_bar').getContext('2d');

const config = {
    type: 'bar',
    data : data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Potrošnja po mjesecima",
                font: {
                    size: 16
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16    // font size za x - mjeseci
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 16    // font size za y - potrosnja
                    }
                }
            }
        }
    }
}

const graf = new Chart(ctx, config)
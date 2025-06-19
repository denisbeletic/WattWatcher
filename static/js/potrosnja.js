document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('prikaz_potrosnje_mm_odabir');
    const unos = document.getElementById('unos_ocitanja_wrapper');
    dropdown.addEventListener('change', function () {
        if (dropdown.value) {
            unos.style.display = 'block';
        } else {
            unos.style.display = 'none';
        }
    });

    if (dropdown.value) {
        unos.style.display = 'block';
    } else {
        unos.style.display = 'none';
    }

    const edit_dropdown = document.getElementById('uredivanje_ocitanja_odabir');
    const edit_id_potrosnja = document.getElementById('edit_id_potrosnja');

    if (edit_dropdown && edit_id_potrosnja) {
        edit_dropdown.addEventListener('change', function () {
            edit_id_potrosnja.value = edit_dropdown.value;
        });

        edit_id_potrosnja.value = edit_dropdown.value;
    }

    let pokazi_form_e_potrosnja = document.getElementById('hide_potrosnje_e')
    if (pokazi_form_e_potrosnja) {
        pokazi_form_e_potrosnja.addEventListener('click', function () {
            document.getElementById('potrosnje').style.display = 'none';
            document.getElementById('form_e_potrosnje').style.display = 'block';
        })
    }

    let pokazi_potrosnje_from_e = document.getElementById('hide_form_e_potrosnje')
    if (pokazi_potrosnje_from_e) {
        pokazi_potrosnje_from_e.addEventListener('click', function () {
            document.getElementById('potrosnje').style.display = 'block';
            document.getElementById('form_e_potrosnje').style.display = 'none';
        })
    }

    let pokazi_form_d_potrosnja = document.getElementById('hide_potrosnje_d')
    if (pokazi_form_d_potrosnja) {
        pokazi_form_d_potrosnja.addEventListener('click', function () {
            document.getElementById('potrosnje').style.display = 'none';
            document.getElementById('form_d_potrosnje').style.display = 'block';
        })
    }

    let pokazi_potrosnje_from_d = document.getElementById('hide_form_d_potrosnje')
    if (pokazi_potrosnje_from_d) {
        pokazi_potrosnje_from_d.addEventListener('click', function () {
            document.getElementById('potrosnje').style.display = 'block';
            document.getElementById('form_d_potrosnje').style.display = 'none';
        })
    }
});
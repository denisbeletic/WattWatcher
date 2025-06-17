document.addEventListener('DOMContentLoaded', function () {

    let pokazi_form_c = document.getElementById('hide_list_c')
    if (pokazi_form_c) {
        pokazi_form_c.addEventListener('click', function() {
            document.getElementById('list').style.display = 'none';
            document.getElementById('form_c').style.display = 'block';
        })
    }

    let pokazi_form_d = document.getElementById('hide_list_d')
    if (pokazi_form_d) {
        pokazi_form_d.addEventListener('click', function() {
            document.getElementById('list').style.display = 'none';
            document.getElementById('form_d').style.display = 'block';
        })
    }

    let pokazi_form_e = document.getElementById('hide_list_e')
    if (pokazi_form_e) {
        pokazi_form_e.addEventListener('click', function() {
            document.getElementById('list').style.display = 'none';
            document.getElementById('form_e').style.display = 'block';
        })
    }

    let pokazi_list_from_c = document.getElementById('hide_form_c')
    if (pokazi_list_from_c) {
        pokazi_list_from_c.addEventListener('click', function() {
            document.getElementById('list').style.display = 'block';
            document.getElementById('form_c').style.display = 'none';
        })
    }

    let pokazi_list_from_d = document.getElementById('hide_form_d')
    if (pokazi_list_from_d) {
        pokazi_list_from_d.addEventListener('click', function() {
            document.getElementById('list').style.display = 'block';
            document.getElementById('form_d').style.display = 'none';
        })
    }

    let pokazi_list_from_e = document.getElementById('hide_form_e')
    if (pokazi_list_from_e) {
        pokazi_list_from_e.addEventListener('click', function() {
            document.getElementById('list').style.display = 'block';
            document.getElementById('form_e').style.display = 'none';
        })
    }
    

    let edit_dropdown = document.getElementById('uredivanje_mm_odabir');
    let edit_form = document.getElementById('edit_form');
    let edit_id = document.getElementById('edit_id');
    let hide_form_e = document.getElementById('hide_form_e');

    function hide_e_form() {
        edit_form.style.display = 'none';
        if (edit_dropdown) edit_dropdown.value = ""; // Reset-a dropdown
    }

    if (edit_dropdown && edit_form) {
        edit_dropdown.addEventListener('change', function() {
            if (edit_dropdown.value) {
                edit_id.value = edit_dropdown.value;
                edit_form.style.display = 'block';
            } else {
                hide_e_form();
            }
        });
        hide_e_form();
    }

    if (hide_form_e) {
        hide_form_e.addEventListener('click', function() {
            hide_e_form();
        });
    }

});
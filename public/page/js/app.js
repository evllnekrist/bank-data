console.log('____app js');

const apiHeaders = {
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
};
const formatterMonth = new Intl.DateTimeFormat('en-US', { month: 'short' });
const baseUrl = window.location.origin;
const loadingElementImg = `<div class="mx-auto"><img src="../../loading-unscreen.gif"></div>`;
const loadingElement = `<div class="mx-auto">memuat...</div>`;

$('.nospace').on('keyup', function(event) {
    if((event.target.value).includes(' ')){
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        html: 'Input ini tidak menerima spasi',
        showConfirmButton: false,
        timer: 2000
    });
    }
    event.target.value =  event.target.value.replaceAll(" ","")
});

$('.numeric').on('keyup', function(event) {
    if ((event.target.value).match(/[^$,.\d]/)){
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        html: 'Input ini hanya boleh angka',
        showConfirmButton: false,
        timer: 2000
    });
    }
    event.target.value =  event.target.value.replace(/[^\d]+/g,'')
});

$('.uppercase').on('keyup', function(event) {
    event.target.value =  event.target.value.toUpperCase()
});

$('.lowercase').on('keyup', function(event) {
    event.target.value =  event.target.value.toLowerCase()
});

const regexExp_slug = /^[a-z][-a-z0-9]*$/;
function checkSlug(str){
    if(regexExp_slug.test(str)){
    $('#slug-info').html('<i class="text-info">Slug valid</i>');
    $('[name="check_validity"]').val(1)
    }else{
    $('#slug-info').html('<b class="text-danger">Slug tidak valid</b>');
    $('[name="check_validity"]').val(0)
    }
    // console.log('check_validity',$('[name="check_validity"]').val() )
}
$('.slug').on('keyup', function(event) {
    checkSlug(event.target.value)
});

function display(id,id2){
    // console.log(id,id2);
    let action = $('#'+id).data('display')
    if(action == 'hide'){
    $('#'+id).show()
    $('#'+id2).hide()
    $('#'+id).data('display', 'show')
    $('#'+id+'-action-text').html('Batal Ganti Gambar')
    }else{
    $('#'+id).hide()
    $('#'+id2).show()
    $('#'+id).data('display', 'hide')
    $('#'+id+'-action-text').html('Ganti Gambar')
    }
}

function copyToClipboard(copyText) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    // Alert the copied text
    alert(`Anda sudah mengcopy: "` + copyText + `"`);
}

function hideLoading(appendTo){
    // console.log(appendTo+'Loading','toHide')
    $(appendTo+'_loading').hide()
}
var myModal = new bootstrap.Modal(document.getElementById("exampleModal"),{
    Keyboard: false
})

if(!localStorage.getItem('goods')) {
    localStorage.setItem("goods",JSON.stringify([]))
}

document.querySelector('button.add_new').addEventListener('click', function(e) {
    let name = document.getElementById('good_name').value
    let prise = document.getElementById('good_price').value
    let count = +document.getElementById('good_count').value
    if(name && prise && count) {
        document.getElementById('good_name').value = ''
        document.getElementById('good_price').value = ''
        document.getElementById('good_count').value = '1'
        let goods = JSON.parse(localStorage.getItem('goods'))
        goods.push(['good_'+ goods.length, name, prise, count, 0, 0, 0])
        localStorage.setItem('goods', JSON.stringify(goods))
      
        myModal.hide()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'ошибка',
            text: 'пожалуста, заполните все поля!',
        })
    }})
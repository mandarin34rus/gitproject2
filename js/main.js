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
        update_goods()
        
        myModal.hide()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'ошибка',
            text: 'пожалуста, заполните все поля!',
        })
    }})

update_goods()

function update_goods(){
    let tbody = document.querySelector('.list')
    tbody.innerHTML = ""
    document.querySelector('.cart').innerHTML = ""
    let goods = JSON.parse(localStorage.getItem('goods'))
    if (goods.length){
        // table1.hidden = false
        // table1.hidden = false
        for (let i=0; i < goods.length; i++){// python i +=1
            tbody.insertAdjacentHTML('beforeend',
            `
            <tr class='alighn-middle'>
            <td>${i+1}</td>
            <td class ='name'>${goods[i][1]}</td>
            <td class ='prise'>${goods[i][2]}</td>
            <td>${goods[i][3]}</td>
            <td><button class ='good_delete btn-danger' data-delete='${goods[i][0]}'>&#10006;</button></td>
            <td><button class ='good_delete btn-primary' data-goods='${goods[i][0]}'>&#10149;</button></td>
            </tr>
            `
            )
        }
    }
}

document.querySelector('.list').addEventListener('click', function(e){
    if (!e.target.dataset.goods) {
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods'))
    for (let i = 0; i < goods.lenght; i++){
        if (goods[i][4] > 0 && goods [i][0] == e.target.dataset.delete){
            good[i].splice(3, 1, goods[i][3]+1)
            goods[i].splice(4,1, goods[i][4] - 1)
            loicalStorage.setItem('goods', JSON.stringify(goods))
            update_goods()
        }
    }
})
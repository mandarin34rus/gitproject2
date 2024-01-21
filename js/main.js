var options = {
    valueNames: ['name','price']
}
var userList

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
    let result_price = 0
    let tbody = document.querySelector('.list')
    tbody.innerHTML = ""
    document.querySelector('.cart').innerHTML = ""
    let goods = JSON.parse(localStorage.getItem('goods'))
    if (goods.length){
        table1.hidden = false
        table2.hidden = false
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
            if (goods[i][4] > 0) {
                goods[i][6] = goods[i][4] * goods[i][2] - goods[i][4] * goods[i][5]*0.01
                result_price += goods[i][6]
                document.querySelector('.cart').insertAdjacentHTML('beforeend',
                `
                <tr class="alighn-middle">
                    <td>${i+1}</td>
                    <td class ="price_name">${goods[i][1]}</td>
                    <td class ="price_one">${goods[i][2]}</td>
                    <td class ="price_discount">${goods[i][4]}</td>
                    <td class ="price_discount">
                        <input data-goodid="${goods[i][0]}"type="text" value="${goods[i][5]}" min="0" max="100">
                    </td>
                    <td>${goods[i][6]}</td>
                    <td><button class ='good_delete btn-danger' data-delete='${goods[i][0]}'>&#10006;</button></td>
                </tr>
                `
                )
            }
        }
        userList = new List('goods', options);
    } else {
        table1.hidden = true
        table2.hidden = true
    }
    console.log(result_price)
    document.querySelector('.price_result').innerHTML = result_price + ' &#8381'
}

document.querySelector('.list').addEventListener('click', function(e){
    if (!e.target.dataset.goods) {
        console.log("oops")
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods'))
    for (let i = 0; i < goods.length; i++){
        if (goods[i][3] > 0 && goods [i][0] == e.target.dataset.goods){
            console.log("in if")
            goods[i].splice(3, 1, goods[i][3]-1)
            goods[i].splice(4,1, goods[i][4] + 1)
            localStorage.setItem('goods', JSON.stringify(goods))
            update_goods()
        }
    }
})

document.querySelector('.cart').addEventListener('click', function(e) {
    if (!e.target.dataset.delete) {
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods'))
    for (let i = 0; i < goods.length; i ++) {
        if (goods[i][0] == e.target.dataset.delete && goods[i][4] > 0){
        goods[i].splice(3, 1, goods[i][3] + 1)
        goods[i].splice(4, 1, goods[i][4] - 1)
        localStorage.setItem('goods', JSON.stringify(goods))
        update_goods()
        }
    }
})

document.querySelector('.cart').addEventListener('input', function(e) {
    if(!e.target.dataset.goodid) {
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods'))
    for(let i = 0; i < goods.length; i++) {
        if (goods[i][0] == e.target.dataset.goodid) {
            goods[i][5] = e.target.value
            goods[i][6] = goods[i][4]*goods[i][2] - goods[i][4]*goods[i][2] * goods[i][5]*0.01
            console.log(goods[i][6])
            localStorage.setItem('goods', JSON.stringify(goods))
            update_goods()
            let input = document.querySelector(`[data-goodid=${goods[i][0]}]`)
            input.focus()
            input.selectionStart = input.value.length;
        }
    }
})

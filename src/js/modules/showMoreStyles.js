import {getResource} from "../services/requests";
import {errors} from "browser-sync/dist/config";

const showMoreStyles = (trigger, wrapper) =>{
    const btn = document.querySelector(trigger);

    // cards.forEach(card =>{
    //     card.classList.add('animated', 'fadeInUp');
    // })
    //
    // btn.addEventListener('click', ()=>{
    //     cards.forEach(card=>{
    //         card.classList.remove('hidden-lg', 'hidden-md','hidden-sm','hidden-xs');
    //         card.classList.add()
    //     })
    //     btn.remove();
    // })


    btn.addEventListener('click', function(){
        getResource('http://localhost:3000/styles')
            .then(res=> createCards(res))
            .catch(errors => console.log(errors))
        this.remove();
    })

   function createCards(response) {
        response.forEach(({src, title, link})=>{
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-sx-offset-1');

            card.innerHTML = `
            <div class="styles-block">
                 <img src=${src} alt = "style">
                 <h4>${title}</h4>
                 <a href=${link}>Подробнее</a>
            </div> `

            document.querySelector(wrapper).appendChild(card);
        })
   }
}
export default showMoreStyles;

// <div className="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
//     <div className=styles-block>
//         <img src=assets/img/styles-5.jpg alt>
//             <h4>Пастелью</h4>
//             <a href="#">Подробнее</a>
//     </div>
// </div>
const modals = () =>{
    let btnPressed = false;
    function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false){
        const modal = document.querySelector(modalSelector),
            trigger = document.querySelectorAll(triggerSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(item =>{
            item.addEventListener('click', (e) =>{
                if (e.target) {
                    e.preventDefault();
                }


                btnPressed = true;



                if(destroy){
                    item.remove();
                }

                windows.forEach(it=>{
                    it.style.display = 'none';
                    it.classList.add('animated','fadeIn');
                })



                modal.style.display = "block";
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                //document.body.classList.add('modal-open');
            })

        })
        close.addEventListener('click', () =>{
            windows.forEach(item =>{
                item.style.display = 'none';
            })
            modal.style.display = "none";
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px'
            //document.body.classList.remove('modal-open');
        })
        modal.addEventListener('click',(e) =>{
            if (e.target === modal && closeClickOverlay){
                windows.forEach(item =>{
                    item.style.display = 'none';
                })
                modal.style.display = "none";
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px'
                // document.body.classList.remove('modal-open');
            }
        })
    }
    function showModalByTime (selector, time){
        setTimeout(function (){
            let display;

            document.querySelectorAll('[data-modal]').forEach(item =>{
                if (getComputedStyle(item).display !== 'none'){
                    display = 'block';
                }
                if (!display){
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow='hidden';
                    let scroll  = calcScroll();
                    document.body.style.marginRight = `${scroll}px`;
                }
            })
        }, time );
    }



    function calcScroll(){
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }


    function openByScroll(selector){
        window.addEventListener('scroll', ()=>{
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight)){
                document.querySelector(selector).click();
            }
        })
    }
    bindModals('.button-design','.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation','.popup-consultation .popup-close')
    bindModals('.fixed-gift','.popup-gift','.popup-gift .popup-close', true)
    openByScroll('.fixed-gift');
    //showModalByTime('.popup-consultation', 5000);
}

export default modals;
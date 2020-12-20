export default {
    bind (el){
        el.__autoResizer__= () =>{
            setTimeout(()=>{
                el.style.cssText = 'height:auto',
                el.style.cssText = 'height:' + el.scrollHeight + 'px'
            },0)
        }
        el.addEventListener('keydown', el.__autoResizer__)
    },
    unbind(el){
        el.removeEventListener('keydown',el.__autoResizer__)
    }
}
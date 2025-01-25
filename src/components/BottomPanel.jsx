import github from "../assets/github.png"
import tg from "../assets/tg.png"

function BottomPanel(){

    function urlToGithub(){
        window.open("https://github.com/artemka-ismagilov/pavliker2.0", '_blank')
    }
    function urlToTelegram(){
        window.open("https://t.me/qweKendrick228", '_blank')
    }

    return(
        <div className='bottomPanel'>
            <div className='icon' onClick={urlToGithub} >
                <img className='gitHubImage' src={github} alt="" />
            </div>
            <div className='icon' onClick={urlToTelegram}  >
                <img className='tgImage' src={tg} alt="" />
            </div>
        </div>
    )
}

export default BottomPanel;
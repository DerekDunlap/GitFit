import Navbar from './Navbar'
import Footer from './Footer'

function BaseLayoutDash(props){
    return(
        <div id='baseLayout-container'>
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default BaseLayoutDash
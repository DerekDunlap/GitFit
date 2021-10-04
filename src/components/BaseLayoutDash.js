import Navbar from './Navbar'
import Footer from './Footer'
import MobileNavbar from './MobileNavbar'

function BaseLayoutDash(props){
    return(
        <div id='baseLayout-container'>
            <Navbar/>
            <MobileNavbar/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default BaseLayoutDash
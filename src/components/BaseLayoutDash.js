import Navbar from './Navbar'
import Footer from './Footer'

function BaseLayoutDash(props){
    return(
        <div>
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default BaseLayoutDash